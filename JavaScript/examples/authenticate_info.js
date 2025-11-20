
const IntelXClient = require('../lib/IntelXClient');

(async () => {
  const apiKey = process.env.INTELX_API_KEY;

  if (!apiKey) {
    console.error('Please set the INTELX_API_KEY environment variable.');
    process.exit(1);
  }

  const client = new IntelXClient({ apiKey });

  try {
    const result = await client.authenticateInfo();

    console.log('=== /authenticate/info raw HTTP result ===');
    console.log('Status:', result.status);
    console.log('Headers:', result.headers);

    if (!result.isSuccess()) {
      console.error('Request failed, body:');
      console.error(result.data);
      process.exit(1);
    }

    // At this point result.data should be a JSON object
    const data = result.data;

    console.log('\n=== Parsed data ===');
    console.log(JSON.stringify(data, null, 2));

    // Example of some light endpoint-specific handling
    // without baking it into the HttpResult class
    if (data) {
      console.log('\nAdded:', data.added);
      console.log('Buckets:', data.buckets);
      console.log('Active searches:', data.searchesactive);
      console.log('Max concurrent searches:', data.maxconcurrentsearches);

      const path = '/phonebook/search';
      const pathInfo = data.paths ? data.paths[path] : undefined;

      console.log(`\nInfo for path ${path}:`);
      console.log(pathInfo || 'no information');
    }
  } catch (err) {
    console.error('Error while calling /authenticate/info:');
    console.error(err);
    process.exit(1);
  }
})();
