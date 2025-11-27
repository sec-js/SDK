const IntelXClient = require('../lib/IntelXClient');

(async () => {
  // Read API key from environment (both variants for convenience)
  const apiKey = process.env.INTELX_API_KEY
  const baseUrl = process.env.INTELX_API_BASE_URL

  if (!apiKey) {
    console.error('Please set INTELX_API_KEY or INTELX_KEY environment variable.');
    process.exit(1);
  }

  // Create client (baseUrl default is https://2.intelx.io in your IntelXClient)
  const client = new IntelXClient({ apiKey }, { baseUrl });

  // Search request body (equivalent to IntelligentSearchRequest in Go)
  const searchBody = {
    // Required: strong selector (email, domain, IP, URL, etc.)
    term: 'riseup.net',

    // Reasonable defaults mirroring the Go SDK
    maxresults: 100, // per bucket
    timeout: 30,     // seconds
    sort: 2,         // X-Score DESC = most relevant first
    media: 0         // 0 = all media

    // Optionally:
    // buckets: ['pastes', 'darknet.i2p'],
    // datefrom: '2024-01-01 00:00:00',
    // dateto:   '2024-01-31 23:59:59',
    // terminate: []
  };

  try {
    console.log('=== /intelligent/search ===');
    console.log('Term:', searchBody.term);

    // 1) Submit intelligent search
    const initResult = await client.intelligentSearch(searchBody);

    console.log('HTTP status:', initResult.status);

    if (!initResult.isSuccess()) {
      console.error('Search initialization failed:');
      console.error(initResult.data);
      process.exit(1);
    }

    const initBody = initResult.data;

    console.log('\n=== /intelligent/search response ===');
    console.log(JSON.stringify(initBody, null, 2));

    if (!initBody || typeof initBody.status !== 'number' || !initBody.id) {
      console.error('Unexpected response format, missing "status" or "id".');
      process.exit(1);
    }

    const searchId = initBody.id;

    // Optional: mimic the Go example behavior "only continue if 200 + status < 2"
    if (!(initResult.status === 200 && initBody.status < 2)) {
      console.log(
        `\nCondition not met: HTTP status = ${initResult.status}, body.status = ${initBody.status} (expected 200 and status < 2).`
      );
      process.exit(0);
    }

    console.log(
      `\nSearch started. ID = ${searchId}, initial status = ${initBody.status}`
    );

    // 2) Poll /intelligent/search/result (similar to SearchGetResultsAll in Go)

    // Configuration similar to the Go code:
    //   SearchGetResultsAll(ctx, searchID, Limit, Timeout)
    const LIMIT = 500;             // maximum total number of records
    const TIMEOUT_MS = 30000;      // overall timeout in ms
    const POLL_INTERVAL_MS = 250;  // 250 ms between result requests

    const startTime = Date.now();
    let lastStatus = 0;
    const records = [];

    console.log('\n=== Polling /intelligent/search/result ===');

    for (;;) {
      const currentLimit = LIMIT - records.length;
      if (currentLimit <= 0) {
        break;
      }

      const elapsed = Date.now() - startTime;
      if (elapsed > TIMEOUT_MS) {
        // Deadline exceeded -> status 5 (client-side, like in Go)
        lastStatus = 5;
        console.warn('Deadline exceeded while polling results.');
        break;
      }

      const resultParams = {
        id: searchId,
        limit: currentLimit,
        media: searchBody.media
        // Optionally:
        // statistics: 1,
        // previewlines: 3,
        // onebucket: 'pastes',
        // dateFrom: '2024-01-01 00:00:00',
        // dateTo:   '2024-01-31 23:59:59',
        // reset: 0
      };

      let resultResponse;
      try {
        resultResponse = await client.intelligentSearchResult(resultParams);
      } catch (err) {
        // In Go, context.Canceled / DeadlineExceeded are mapped to status 5
        lastStatus = 5;
        console.error('Transport error while calling intelligentSearchResult:', err);
        break;
      }

      if (!resultResponse.isSuccess()) {
        // HTTP error -> treat as status 4 (Error)
        lastStatus = 4;
        console.error(
          'intelligentSearchResult returned non-2xx HTTP status:',
          resultResponse.status
        );
        console.error(resultResponse.data);
        break;
      }

      const data = resultResponse.data || {};
      const pageRecords = Array.isArray(data.records) ? data.records : [];

      if (typeof data.status === 'number') {
        lastStatus = data.status;
      } else {
        // Missing or invalid status -> treat as error
        lastStatus = 4;
      }

      if (pageRecords.length > 0) {
        records.push(...pageRecords);
        console.log(
          `Fetched ${pageRecords.length} new record(s), total so far: ${records.length}`
        );
      }

      if (records.length >= LIMIT) {
        break;
      }

      // Status definitions (same as Go comment):
      //   0 = Success with results (continue)
      //   1 = No more results available (this response might still have results)
      //   2 = Search ID not found
      //   3 = No results yet available, keep trying
      //   4 = Error
      //
      // Go code:
      //   if lastStatus != 0 && lastStatus != 3 { break }
      if (lastStatus !== 0 && lastStatus !== 3) {
        console.log(`Stopping polling due to status = ${lastStatus}`);
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
    }

    // 3) Terminate the search if required (mirrors Go logic)
    // Go: terminate when Status: 0, 3, 4, 5
    if (lastStatus === 0 || lastStatus === 3 || lastStatus === 4 || lastStatus === 5) {
      try {
        console.log('\nTerminating search ...');
        await client.intelligentSearchTerminate({ id: searchId });
      } catch (err) {
        // Ignore termination errors
        console.warn('Failed to terminate search (ignored):', err.message || err);
      }
    }

    // In Go: if lastStatus != 4 { err = nil }  → only status 4 is treated as error
    if (lastStatus === 4) {
      console.error(
        'Search finished with error status (4). Records collected so far:',
        records.length
      );
      process.exit(1);
    }

    console.log('\n=== Search finished ===');
    console.log('Last status:', lastStatus);
    console.log('Total records:', records.length);

    // 4) Print records similar to what a CLI would do
    // Fields come from Item + SearchResult in the Go SDK:
    //   systemid, bucket, name, description, date, xscore, tagsh, ...
    records.forEach((rec, index) => {
      console.log('\n----------------------------------------');
      console.log(`[${index + 1}] ${rec.name || '(no title)'}`);

      if (rec.date) {
        console.log(`  Date: ${rec.date}`);
      }
      if (typeof rec.xscore === 'number') {
        console.log(`  XScore: ${rec.xscore}`);
      }
      if (rec.systemid) {
        console.log(`  SystemID: ${rec.systemid}`);
      }
      if (rec.bucket) {
        console.log(`  Bucket: ${rec.bucket}`);
      }

      if (rec.description) {
        const desc =
          rec.description.length > 200
            ? rec.description.slice(0, 200) + '...'
            : rec.description;
        console.log(`  Description: ${desc}`);
      }

      // Human-friendly tags (tagsh) if present
      if (Array.isArray(rec.tagsh) && rec.tagsh.length > 0) {
        const tagStrings = rec.tagsh.map((t) => t.valueh || t.value || '').filter(Boolean);
        if (tagStrings.length > 0) {
          console.log(`  Tags: ${tagStrings.join(', ')}`);
        }
      }
    });

    if (records.length === 0) {
      console.log('\nNo records returned.');
    }
  } catch (err) {
    console.error('\nFatal error while running ix.js:');
    console.error(err);
    process.exit(1);
  }
})();
