const HttpResult = require('./HttpResult');

class IntelXClient {
  /**
   * @param {Object} options
   * @param {string} options.apiKey - API key value for X-Key header
   * @param {string} [options.baseUrl] - Optional base URL, defaults to core API (2.intelx.io)
   */
  constructor({ apiKey, baseUrl = 'https://2.intelx.io' }) {
    if (!apiKey) {
      throw new Error('IntelXClient: apiKey is required');
    }

    this.apiKey = apiKey;
    this.baseUrl = baseUrl.replace(/\/+$/, '');
  }

  /**
   * Internal helper to perform HTTP requests and return HttpResult.
   *
   * @param {string} path - Endpoint path, e.g. "/authenticate/info"
   * @param {Object} [options]
   * @param {string} [options.method="GET"]
   * @param {Object} [options.headers]
   * @param {Object} [options.query] - Query params as key-value map
   * @param {*} [options.body] - Request body (will be JSON-stringified if plain object)
   * @returns {Promise<HttpResult>}
   */
  async _request(path, { method = 'GET', headers = {}, query, body } = {}) {
    if (typeof fetch !== 'function') {
      throw new Error(
        'Global fetch is not available. Use Node.js 18+ or add a fetch polyfill (e.g. node-fetch).'
      );
    }

    const url = new URL(this.baseUrl + path);

    // Append query parameters if provided
    if (query && typeof query === 'object') {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const reqHeaders = {
      'X-Key': this.apiKey,
      Accept: 'application/json',
      ...headers
    };

    let bodyToSend = body;

    // Automatically stringify plain objects as JSON when not already a string
    const isPlainObject =
      body &&
      typeof body === 'object' &&
      !(body instanceof Buffer) &&
      !(body instanceof ArrayBuffer) &&
      !(typeof FormData !== 'undefined' && body instanceof FormData);

    if (isPlainObject) {
      // Default to JSON if no explicit Content-Type set
      if (!reqHeaders['Content-Type']) {
        reqHeaders['Content-Type'] = 'application/json';
      }

      if (
        typeof reqHeaders['Content-Type'] === 'string' &&
        reqHeaders['Content-Type'].includes('application/json')
      ) {
        bodyToSend = JSON.stringify(body);
      }
    }

    const res = await fetch(url.toString(), {
      method,
      headers: reqHeaders,
      body: bodyToSend
    });

    // Convert headers to a plain object
    const plainHeaders = {};
    res.headers.forEach((value, key) => {
      plainHeaders[key] = value;
    });

    const contentType = res.headers.get('content-type') || '';
    let data;

    try {
      if (contentType.includes('application/json')) {
        data = await res.json();
      } else {
        data = await res.text();
      }
    } catch (e) {
      // If body parsing fails, keep data undefined
      data = undefined;
    }

    return new HttpResult({
      status: res.status,
      headers: plainHeaders,
      data,
      url: url.toString(),
      method
    });
  }

  /**
   * Calls GET /authenticate/info.
   * Returns HttpResult with parsed JSON in .data.
   *
   * NOTE: This endpoint usually lives on https://3.intelx.io,
   * so you may want to create another client instance with baseUrl "https://3.intelx.io".
   *
   * @returns {Promise<HttpResult>}
   */
  async authenticateInfo() {
    return this._request('/authenticate/info', { method: 'GET' });
  }

  /**
   * Calls POST /intelligent/search.
   *
   * IMPORTANT:
   * Parameters are sent as JSON body, NOT as query string,
   * to mirror the official Go SDK behaviour.
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
   * @returns {Promise<HttpResult>}
   */
  async intelligentSearch(body) {
    return this._request('/intelligent/search', {
      method: 'POST',
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
   * @returns {Promise<HttpResult>}
   */
  async intelligentSearchResult(params) {
    return this._request('/intelligent/search/result', {
      method: 'GET',
      query: params
    });
  }

  /**
   * Calls GET /intelligent/search/terminate to terminate a search job.
   *
   * @param {Object} params
   * @param {string} params.id - Search ID to terminate.
   * @returns {Promise<HttpResult>}
   */
  async intelligentSearchTerminate(params) {
    return this._request('/intelligent/search/terminate', {
      method: 'GET',
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
   * @returns {Promise<HttpResult>}
   */
  async filePreview(params) {
    return this._request('/file/preview', {
      method: 'GET',
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
   * @returns {Promise<HttpResult>}
   */
  async fileRead(params) {
    return this._request('/file/read', {
      method: 'GET',
      query: params
    });
  }
}

module.exports = IntelXClient;
