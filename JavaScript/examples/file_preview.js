const IntelXClient = require('../lib/IntelXClient');

(async () => {
    const apiKey = "00000000-0000-0000-0000-000000000000"

    const client = new IntelXClient(apiKey)

    try {
        const search = await client.search("riseup.net", { maxresults: 5 })
        const first = search["records"][0]

        const params = {
            c: 1,                     // content type
            m: first["media"],        // mediatype,
            f: 0,                     // format, 0 = text
            sid: first["storageid"],
            b: first["bucket"],
            e: 0,
            l: 20,                    // preview lines,
        }

        const resp = await client.filePreview(params)
        if (resp.status === 200) {
            console.log('File preview is ready here: ', resp.url)
        } else {
            console.error(resp)
        }
    } catch (err) {
        console.error('\nFatal error while running ix.js:');
        console.error(err);
        process.exit(1);
    }
})();
