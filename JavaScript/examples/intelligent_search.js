const IntelXClient = require('../lib/IntelXClient');

(async () => {
  const apiKey = process.env.INTELX_API_KEY;

  if (!apiKey) {
    console.error('Please set the INTELX_API_KEY environment variable.');
    process.exit(1);
  }

  const client = new IntelXClient({ apiKey });

  // Request body for /intelligent/search (JSON body)
  const searchParams = {
    // Required: strong selector (email, domain, IP, URL, etc.)
    term: 'riseup.net',

    // Reasonable defaults similar to the Go SDK
    maxresults: 100, // per bucket
    timeout: 30,     // seconds
    sort: 2,         // X-Score DESC (most relevant first)
    media: 0,         // 0 = all media

    // Optionally:
    datefrom: '2024-01-01 00:00:00',
    dateto:   '2024-01-31 23:59:59',
    //buckets: ['pastes', 'darknet.i2p'],
    terminate: []
  };

  try {
    console.log('=== Calling /intelligent/search ===');

    const initResult = await client.intelligentSearch(searchParams);

    console.log('HTTP status:', initResult.status);
    console.log('Headers:', initResult.headers);

    if (!initResult.isSuccess()) {
      console.error('Intelligent search initialization failed:');
      console.error(initResult.data);
      process.exit(1);
    }

    const initBody = initResult.data;

    console.log('\n=== /intelligent/search response body ===');
    console.log(JSON.stringify(initBody, null, 2));

    if (!initBody || typeof initBody.status !== 'number' || !initBody.id) {
      console.error('Unexpected response format, missing "status" or "id".');
      process.exit(1);
    }

    // Only continue if HTTP 200 and status < 2 (same condition you requested earlier)
    if (!(initResult.status === 200 && initBody.status < 2)) {
      console.log(
        `\nCondition not met: HTTP status = ${initResult.status}, body.status = ${initBody.status} (expected 200 and status < 2).`
      );
      process.exit(0);
    }

    const searchId = initBody.id;

    console.log(
      `\nStatus is ${initBody.status} (< 2). Fetching results via /intelligent/search/result with id=${searchId} ...`
    );

    // Parameters equivalent to Limit and Timeout in the Go code
    const POLL_INTERVAL_MS = 250;  // wait 250 ms between requests

    let lastStatus = 0;
    const records = [];

    // Straightforward loop similar to:
    // for { recordsNew, lastStatus, err = api.SearchGetResults(...) ... }
    for (;;) {

      // Build query params for /intelligent/search/result
      const resultParams = {
        id: searchId,
        media: searchParams.media
        // You can add more params if needed: limit, statistics, previewlines, onebucket, dateFrom/dateTo, reset...
      };

      let resultResponse;
      try {
        resultResponse = await client.intelligentSearchResult(resultParams);
      } catch (err) {
        lastStatus = 5;
        break;
      }

      if (!resultResponse.isSuccess()) {
        // Treat HTTP errors as status 4 (Error)
        lastStatus = 4;
        break;
      }

      const data = resultResponse.data || {};
      const recordsNew = Array.isArray(data.records) ? data.records : [];

      if (typeof data.status === 'number') {
        lastStatus = data.status;
      } else {
        // Missing or invalid status -> treat as error
        lastStatus = 4;
      }

      if (recordsNew.length > 0) {
        records.push(...recordsNew);
      }

      // Status: 0 = Success with results (continue)
      //         1 = No more results available (this response might still have results)
      //         2 = Search ID not found
      //         3 = No results yet available, keep trying
      //         4 = Error
      //
      if (lastStatus !== 0 && lastStatus !== 3) {
        console.log('---------------')
        break;
      }

      // Wait 250 ms before querying the results again
      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
    }

    // Terminate the search if required.
    if (lastStatus === 0 || lastStatus === 3 || lastStatus === 4 || lastStatus === 5) {
      try {
        await client.intelligentSearchTerminate({ id: searchId });
      } catch {
        // Ignore termination errors
      }
    }

    // Only status 4 is treated as error.
    if (lastStatus === 4) {
      console.error(
        'Underlying API reported error status (4). Records collected so far:',
        records.length
      );
      process.exit(1);
    }

    console.log('\n=== Finished polling results ===');
    console.log('Last status:', lastStatus);
    console.log('Total records:', records.length);

    if (records.length > 0) {
      console.log('\nFirst record of ' + records.length);
      console.log(JSON.stringify(records[0], null, 2));
    }
  } catch (err) {
    console.error('Error while calling intelligent search endpoints:');
    console.error(err);
    process.exit(1);
  }
})();
