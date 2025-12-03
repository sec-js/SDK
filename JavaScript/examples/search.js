const IntelXClient = require('../lib/IntelXClient');

(async () => {
    const apiKey = "00000000-0000-0000-0000-000000000000"

    const client = new IntelXClient(apiKey)

    try {
        const resp = await client.search('riseup.net', { maxresults: 10 })
        console.log(resp)
    } catch (err) {
        console.error('\nFatal error while running ix.js:');
        console.error(err);
        process.exit(1);
    }
})();
