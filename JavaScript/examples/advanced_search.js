const IntelXClient = require('../lib/IntelXClient');

(async () => {
    const apiKey = "00000000-0000-0000-0000-000000000000"

    const client = new IntelXClient(apiKey)

    try {
        const target = 'riseup.net'

        console.info('Target: ', target)

        const resp1 = await client.search(target, {buckets: ['pastes'], maxresults: 2000})
        console.log("Found records in bucket 'pastes'", resp1.records.length)

        const resp2 = await client.search(target, {buckets: ['leaks.public', 'leaks.private'], maxresults: 2000})
        console.log("Found records in bucket 'leaks'", resp2.records.length)

        const resp3 = await client.search(target, {buckets: ['darknet'], maxresults: 2000})
        console.log("Found records in bucket 'darknet'", resp3.records.length)

    } catch (err) {
        console.error('\nFatal error while running ix.js:');
        console.error(err);
        process.exit(1);
    }
})();
