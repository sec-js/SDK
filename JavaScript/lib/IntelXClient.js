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
            const response = await fetch(url, {
                method: 'GET',
                headers: headers,
                signal: controller.signal,
                ...fetchOptions,
            });

            return response;
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
    async intel_search(
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
        const searchId = await this.intel_search(term, {
            maxresults: remaining,
            buckets,
            timeout,
            datefrom,
            dateto,
            sort,
            media,
            terminate,
        });

        if (String(searchId).length <= 3) {
            const errMsg = this.get_error
                ? this.get_error(searchId)
                : `Error code: ${searchId}`;

            console.error(`[!] intelx.intel_search() Received ${errMsg}`);
            throw new Error(errMsg);
        }

        // Poll until done
        while (!done) {
            await new Promise(resolve => setTimeout(resolve, this.apiRateLimit));

            // Fetch next chunk of results
            const r = await this.intel_search_result(searchId, remaining);

            const records = r.records || [];
            for (const rec of records) {
                results.push(rec);
            }

            remaining -= records.length;

            // status 1 or 2 or no more results allowed
            if (r.status === 1 || r.status === 2 || remaining <= 0) {
                if (remaining <= 0) {
                    await this.intel_terminate_search(searchId);
                }
                done = true;
            }
        }

        return { records: results };
    }

    /**
     * Terminate a previously initialized search based on its UUID.
     *
     * @param {string} uuid - Search ID (UUID).
     * @returns {Promise<boolean|number>} - true on success, or HTTP status code on error.
     */
    async intel_terminate_search(uuid) {
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
    async intel_search_result(id, limit) {
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
     * Calls POST /intelligent/search.
     *
     * Example body (minimal):
     * {
     *   term: "riseup.net",
     *   maxresults: 100,
     *   timeout: 30,
     *   sort: 2,
     *   media: 0
     * }
     *
     * @param {Object} body - Request body for the intelligent search.
     * @returns {Promise}
     */
    async intelligentSearch(body) {
        return this._post('/intelligent/search', {
            body
        });
    }

    /**
     * Calls GET /intelligent/search/result and returns HttpResult.
     *
     * @param {Object} params
     * @param {string} params.id - Search ID returned by /intelligent/search.
     * @param {number} [params.limit] - Optional result limit.
     * @param {number} [params.media] - Optional media type filter.
     * @param {number} [params.statistics] - Add statistics.
     * @param {number} [params.previewlines] - Preview lines count.
     * @param {string} [params.onebucket] - Restrict to a specific bucket.
     * @param {string} [params.dateFrom] - Date from (YYYY-mm-dd HH:ii:ss).
     * @param {string} [params.dateTo] - Date to (YYYY-mm-dd HH:ii:ss).
     * @param {number} [params.reset] - Reset previous searches (0/1).
     * @returns {Promise}
     */
    async intelligentSearchResult(params) {
        return this._get('/intelligent/search/result', {
            query: params
        });
    }

    /**
     * Calls GET /intelligent/search/terminate to terminate a search job.
     *
     * @param {Object} params
     * @param {string} params.id - Search ID to terminate.
     * @returns {Promise}
     */
    async intelligentSearchTerminate(params) {
        return this._get('/intelligent/search/terminate', {
            query: params
        });
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
        return this._get('/file/preview', {
            query: params
        });
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
