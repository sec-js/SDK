/**
 * @param {string} apiKey - API key value for X-Key header or k= query param
 * @param {Object} options
 * @param {string} [options.baseUrl] - Optional base URL, defaults to core API (2.intelx.io)
 */
class IntelXClient {
    constructor(apiKey, baseUrl = 'https://2.intelx.io', userAgent = 'IX-JavaScript/0.1') {
        if (!apiKey) {
            throw new Error('IntelXClient: apiKey is required')
        }

        this.apiKey = apiKey
        this.baseUrl = baseUrl
        this.userAgent = userAgent
        this.headers = {'X-Key': this.apiKey, 'User-Agent': this.userAgent}
        this.timeout = 30000
        this.apiRateLimit = 1000
    }

    /**
     * GET request, similar to Python _get().
     *
     * @param {string} url - Request URL or path (will be prefixed with baseUrl if relative).
     * @param {Object} options - Optional config (params, headers, timeout, ...fetchOptions).
     */
    async _get(
        url,
        {
            params = null,
            headers = null,
            timeout = null,
            // any extra fetch options, e.g. credentials, mode, cache, etc.
            ...fetchOptions
        } = {}
    ) {
        headers = { ...(this.headers || {}), ...(headers || {}), };
        timeout ??= this.timeout;

        url = this._buildUrl(url, params || {})

        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        try {
            return await fetch(url, {
                method: 'GET',
                headers: headers,
                signal: controller.signal,
                ...fetchOptions,
            });
        } finally {
            clearTimeout(id);
        }
    }

    /**
     * POST request, params are sent as JSON body.
     *
     * @param {string} url - Request URL or path (will be prefixed with baseUrl if relative).
     * @param {Object} options - Optional config (params, headers, timeout, ...fetchOptions).
     */
    async _post(
        url,
        {
            params = null,
            headers = null,
            timeout = null,
            // any extra fetch options, e.g. credentials, mode, cache, etc.
            ...fetchOptions
        } = {}
    ) {
        // merge default headers with provided ones
        headers = { ...(this.headers || {}), ...(headers || {}) };

        // use default timeout if not provided
        timeout ??= this.timeout;

        // build URL without params in query (params go into body)
        url = this._buildUrl(url);

        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout)

        // params are serialized as JSON body (or null if nothing)
        const body = params != null ? JSON.stringify(params) : null

        try {
            return await fetch(url, {
                method: 'POST',
                headers: headers,
                body: body,
                signal: controller.signal,
                ...fetchOptions,
            });

        } catch (e) {
            console.error(e)
            throw e
        } finally {
            clearTimeout(id)
        }
    }


    /**
     * Build full URL and append query parameters.
     */
    _buildUrl(url, params) {
        const u = new URL(url, this.baseUrl);

        if (typeof params !== 'undefined') {
            Object.entries(params).forEach(([key, value]) => {
                if (value === undefined || value === null) return;
                u.searchParams.append(key, String(value));
            });
        }

        return u.toString();
    }

    /**
     * Intelligent search
     *
     * @param {string} term - Search term.
     * @param {Object} options - Optional parameters.
     * @param {number} [options.maxresults=100]
     * @param {Array}  [options.buckets=[]]
     * @param {number} [options.timeout=5]
     * @param {string} [options.datefrom=""]
     * @param {string} [options.dateto=""]
     * @param {number} [options.sort=4]
     * @param {number} [options.media=0]
     * @param {Array}  [options.terminate=[]]
     *
     * @returns {Promise<number|string>} - status (1) or id or HTTP status code.
     */
    async intelSearchId(
        term,
        {
            maxresults = 100,
            buckets = [],
            timeout = 5,
            datefrom = "",
            dateto = "",
            sort = 4,
            media = 0,
            terminate = [],
        } = {}
    ) {
        const p = {
            term: term,
            buckets: buckets,
            lookuplevel: 0,
            maxresults: maxresults,
            timeout: timeout,
            datefrom: datefrom,
            dateto: dateto,
            sort: sort,
            media: media,
            terminate: terminate,
        };

        if (this.apiRateLimit) {
            await new Promise(resolve => setTimeout(resolve, this.apiRateLimit));
        }

        const r = await this._post('/intelligent/search', {
            params: p,
        });

        if (r.status === 200) {
            const data = await r.json();
            if (data.status === 1) {
                return data.status;
            }
            return data.id;
        } else {
            return r.status;
        }
    }

    /**
     * High-level search wrapper
     *
     * @param {string} term - Search term.
     * @param {Object} options - Optional parameters.
     * @param {number} [options.maxresults=100]
     * @param {Array}  [options.buckets=[]]
     * @param {number} [options.timeout=5]
     * @param {string} [options.datefrom=""]
     * @param {string} [options.dateto=""]
     * @param {number} [options.sort=4]
     * @param {number} [options.media=0]
     * @param {Array}  [options.terminate=[]]
     *
     * @returns {Promise<{records: Array}>}
     */
    async search(
        term,
        {
            maxresults = 100,
            buckets = [],
            timeout = 5,
            datefrom = "",
            dateto = "",
            sort = 4,
            media = 0,
            terminate = [],
        } = {}
    ) {
        const results = [];
        let done = false;
        let remaining = maxresults;

        // Start intelligent search
        const searchId = await this.intelSearchId(term, {
            maxresults: remaining,
            buckets,
            timeout,
            datefrom,
            dateto,
            sort,
            media,
            terminate,
        });

        this.handleSearchId(searchId)

        // Poll until done
        while (!done) {
            await new Promise(resolve => setTimeout(resolve, this.apiRateLimit));

            // Fetch next chunk of results
            const r = await this.searchResult(searchId, remaining);

            const records = r.records || [];
            for (const rec of records) {
                results.push(rec);
            }

            remaining -= records.length;

            // status 1 or 2 or no more results allowed
            if (r.status === 1 || r.status === 2 || remaining <= 0) {
                if (remaining <= 0) {
                    await this.terminateSearch(searchId);
                }
                done = true;
            }
        }

        return { records: results };
    }

    /**
     * @throws Error
     */
    handleSearchId(searchId) {
        if (typeof searchId === 'number') {
            const message = `Search failed with status ${searchId}`
            switch (searchId) {
                case 400:
                    throw new Error(`${message} (Bad Request)`);
                case 401:
                    throw new Error(`${message} (Unauthorized – invalid or missing apiKey)`);
                case 403:
                    throw new Error(`${message} (Forbidden – insufficient permissions)`);
                case 404:
                    throw new Error(`${message} (Item not found)`);
                case 500:
                    throw new Error(`${message} (Internal server error)`);
                default:
                    throw new Error(message);
            }
        }
        if (searchId === '00000000-0000-0000-0000-000000000000') {
            throw new Error('Empty Search Id (Item not found)');
        }
    }


    /**
     * Terminate a previously initialized search based on its UUID.
     *
     * @param {string} uuid - Search ID (UUID).
     * @returns {Promise<boolean|number>} - true on success, or HTTP status code on error.
     */
    async terminateSearch(uuid) {
        await new Promise(resolve => setTimeout(resolve, this.apiRateLimit));

        const params = { id: uuid };

        const r = await this._get('/intelligent/search/terminate', {
            params,
        });

        if (r.status === 200) {
            return true;
        } else {
            return r.status;
        }
    }

    /**
     * Get intelligent search result by ID.
     *
     * @param {string} id    - Search ID.
     * @param {number} limit - Max number of results to return.
     * @returns {Promise<Object|number>} - Parsed JSON on success, or HTTP status code on error.
     */
    async searchResult(id, limit) {
        if (this.apiRateLimit) {
            await new Promise(resolve => setTimeout(resolve, this.apiRateLimit));
        }

        const params = {
            id,
            limit,
        };

        const r = await this._get('/intelligent/search/result', {
            params,
        });

        if (r.status === 200) {
            return await r.json();
        } else {
            return r.status;
        }
    }

    /**
     * Calls GET /authenticate/info.
     *
     * @returns {Promise}
     */
    async authenticateInfo() {
        return this._get('/authenticate/info');
    }

    /**
     * Calls GET /file/preview.
     * Returns a text preview (up to ~1000 characters).
     *
     * @param {Object} params
     * @param {string} params.sid - System ID.
     * @param {string} [params.f] - File ID.
     * @param {string} [params.l] - Limit.
     * @param {string} [params.c] - Charset.
     * @param {number} [params.m] - Media type.
     * @param {string} [params.b] - Bucket.
     * @returns {Promise}
     */
    async filePreview(params) {
        params['k'] = this.apiKey
        return this._get('/file/preview', {params: params});
    }

    /**
     * Calls GET /file/read.
     * Returns raw file data (application/octet-stream).
     *
     * @param {Object} params
     * @param {number} params.type - Read type.
     * @param {string} params.storageid - Storage ID.
     * @param {string} [params.bucket] - Bucket.
     * @returns {Promise}
     */
    async fileRead(params) {
        return this._get('/file/read', {
            query: params
        });
    }
}

module.exports = IntelXClient;
