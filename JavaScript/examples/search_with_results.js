const IntelXClient = require('../lib/IntelXClient');

(async () => {
    const apiKey = "00000000-0000-0000-0000-000000000000"

    const client = new IntelXClient(apiKey)

    try {
        const params = {
            maxresults: 5,
            buckets: ['leaks.public', 'pastes'],
            timeout: 5,
            datefrom: '2021-01-01 00:00:00',
            dateto: '2022-02-02 23:00:00',
            sort: 4,
            media: 0,
            terminate: [],
        }

        // Start intelligent search
        const searchId = await client.intelSearchId('riseup.net', params);

        client.handleSearchId(searchId)

        const limit = 5;
        while (true) {
            const resultPage = await client.searchResult(searchId, limit);

            console.log(
                'Status:',
                resultPage.status,
                'records:',
                resultPage.records ? resultPage.records.length : 0
            );

            console.table(resultPage.records);

            // 1 = no more, 2 = not found
            if (resultPage.status === 1 || resultPage.status === 2) {
                break;
            }
        }
    } catch (err) {
        console.error('\nFatal error while running ix.js:');
        console.error(err);
        process.exit(1);
    }
})();
