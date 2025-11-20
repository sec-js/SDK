class HttpResult {
  /**
   * @param {Object} params
   * @param {number} params.status - HTTP status code
   * @param {Object} params.headers - Plain object with response headers
   * @param {*} params.data - Parsed response body (JSON or text)
   * @param {string} [params.url] - Request URL
   * @param {string} [params.method] - HTTP method
   */
  constructor({ status, headers, data, url, method }) {
    this.status = status;
    this.headers = headers;
    this.data = data;
    this.url = url;
    this.method = method;
  }

  /**
   * Returns true if status is in the 2xx range.
   */
  isSuccess() {
    return this.status >= 200 && this.status < 300;
  }

  /**
   * Returns header value by name (case-insensitive).
   * @param {string} name
   * @returns {string | undefined}
   */
  getHeader(name) {
    if (!name) return undefined;
    const lower = name.toLowerCase();
    return Object.entries(this.headers).find(
      ([key]) => key.toLowerCase() === lower
    )?.[1];
  }
}

module.exports = HttpResult;
