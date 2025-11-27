---
title: Intelx.io - Search API v0.8.0
language_tabs:
  - shell: Shell
  - http: HTTP
language_clients:
  - shell: ""
  - http: ""
toc_footers:
  - <a href="https://github.com/IntelligenceX/SDK">Software Development Kit
    (SDK) and reference documents</a>
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="intelx-io-search-api">Intelx.io - Search API v0.8.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Internal search in "buckets" (e.g. usenet, web.public, whois). 
Needs `X-Key` header authorization, or as k=[key] query parameter.
The API will return HTTP 401 Unauthorized in case the API key is invalid or not authorized. 

Base URLs:

* <a href="https://2.intelx.io">https://2.intelx.io</a>

* <a href="https://3.intelx.io">https://3.intelx.io</a>

<a href="https://intelx.io/terms-of-service">Terms of service</a>
Email: <a href="mailto:info@intelx.io">Intelligent X</a> Web: <a href="https://intelx.io/">Intelligent X</a> 
License: <a href="https://intelx.io/product">License and Price</a>

# Authentication

* API Key (ApiKeyQueryParam)
    - Parameter Name: **k**, in: query. 

* API Key (ApiKeyAuth)
    - Parameter Name: **X-Key**, in: header. 

<h1 id="intelx-io-search-api-default">Default</h1>

## Return a JSON object with the current user's API capabilities

<a id="opIdauthenticateInfo"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://2.intelx.io/authenticate/info \
  -H 'Accept: application/json' \
  -H 'X-Key: API_KEY'

```

```http
GET https://2.intelx.io/authenticate/info HTTP/1.1
Host: 2.intelx.io
Accept: application/json

```

`GET /authenticate/info`

Return a JSON object with the current user's API capabilities

> Example responses

> 200 Response

```json
{
  "added": "2025-11-04T22:45:01.1220324Z",
  "buckets": [
    "darknet",
    "dns",
    "documents.public",
    "dumpster",
    "leaks.logs",
    "leaks.private",
    "leaks.public",
    "pastes",
    "usenet",
    "web.gov.ru",
    "web.public",
    "whois"
  ],
  "bucketsh": [
    "Darknet",
    "DNS",
    "Documents » Public",
    "Dumpster",
    "Leaks » Logs",
    "Leaks » Restricted",
    "Leaks » Public",
    "Pastes",
    "Usenet",
    "Web » Government » Ukraine",
    "Web » Public",
    "Whois"
  ],
  "preview": [],
  "previewh": [],
  "redacted": [],
  "redactedh": [],
  "paths": {
    "/authenticate/info": {
      "Path": "/authenticate/info",
      "Credit": 0,
      "CreditMax": 0,
      "CreditReset": 0
    },
    "/file/preview": {
      "Path": "/file/preview",
      "Credit": 9971,
      "CreditMax": 10000,
      "CreditReset": 2
    },
    "/file/read": {
      "Path": "/file/read",
      "Credit": 998,
      "CreditMax": 1000,
      "CreditReset": 2
    },
    "/file/treeview": {
      "Path": "/file/treeview",
      "Credit": 500,
      "CreditMax": 500,
      "CreditReset": 2
    },
    "/file/view": {
      "Path": "/file/view",
      "Credit": 998,
      "CreditMax": 1000,
      "CreditReset": 2
    },
    "/intelligent/search": {
      "Path": "/intelligent/search",
      "Credit": 479,
      "CreditMax": 500,
      "CreditReset": 2
    },
    "/intelligent/search/export": {
      "Path": "/intelligent/search/export",
      "Credit": 100,
      "CreditMax": 100,
      "CreditReset": 2
    },
    "/intelligent/search/result": {
      "Path": "/intelligent/search/result",
      "Credit": 0,
      "CreditMax": 0,
      "CreditReset": 0
    },
    "/intelligent/search/statistic": {
      "Path": "/intelligent/search/statistic",
      "Credit": 0,
      "CreditMax": 0,
      "CreditReset": 0
    },
    "/intelligent/search/terminate": {
      "Path": "/intelligent/search/terminate",
      "Credit": 0,
      "CreditMax": 0,
      "CreditReset": 0
    },
    "/item/selector/list/export": {
      "Path": "/item/selector/list/export",
      "Credit": 1000,
      "CreditMax": 1000,
      "CreditReset": 2
    },
    "/item/selector/list/human": {
      "Path": "/item/selector/list/human",
      "Credit": 1000,
      "CreditMax": 1000,
      "CreditReset": 2
    },
    "/phonebook/search": {
      "Path": "/phonebook/search",
      "Credit": 100,
      "CreditMax": 100,
      "CreditReset": 2
    },
    "/phonebook/search/export": {
      "Path": "/phonebook/search/export",
      "Credit": 100,
      "CreditMax": 100,
      "CreditReset": 2
    },
    "/phonebook/search/result": {
      "Path": "/phonebook/search/result",
      "Credit": 0,
      "CreditMax": 0,
      "CreditReset": 0
    }
  },
  "searchesactive": 0,
  "maxconcurrentsearches": 10
}
```

<h3 id="return-a-json-object-with-the-current-user's-api-capabilities-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|

<h3 id="return-a-json-object-with-the-current-user's-api-capabilities-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ApiKeyAuth
</aside>

## File preview

<a id="opIdfilePreview"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://2.intelx.io/file/preview?sid=fb054e59c7eecab877b317d1f4204abbe4130c727a15ea6e2555e1ebdcd63540b54ecd3242a0a77f70a7e57a4dfc9b70712cfc80f3757beda93e3fc657b41ee7

```

```http
GET https://2.intelx.io/file/preview?sid=fb054e59c7eecab877b317d1f4204abbe4130c727a15ea6e2555e1ebdcd63540b54ecd3242a0a77f70a7e57a4dfc9b70712cfc80f3757beda93e3fc657b41ee7 HTTP/1.1
Host: 2.intelx.io

```

`GET /file/preview`

File preview

<h3 id="file-preview-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|sid|query|string|true|none|
|f|query|integer|false|Format|
|l|query|integer|false|Result limit|
|c|query|integer|false|Data type|
|m|query|integer|false|Media|
|b|query|string|false|Bucket|

#### Enumerated Values

|Parameter|Value|
|---|---|
|c|1|
|c|2|
|c|3|
|c|4|

<h3 id="file-preview-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ApiKeyQueryParam
</aside>

## Read a file's raw contents. Use this for direct data download.

<a id="opIdfileView"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://2.intelx.io/file/view?storageid=string

```

```http
GET https://2.intelx.io/file/view?storageid=string HTTP/1.1
Host: 2.intelx.io

```

`GET /file/view`

Show a file's contents based on its storageid (sid), convert to text where necessary.

<h3 id="read-a-file's-raw-contents.-use-this-for-direct-data-download.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|f|query|integer|false|format option:|
|storageid|query|string|true|Either the storage identifier or system identifier has to be specified.|
|bucket|query|string|false|- Specify the bucket to search|
|escape|query|integer|false|For text the default behavior (unless overwritten by &escape=0) is to escape HTML characters|

#### Detailed descriptions

**f**: format option:
- 0: textview of content
- 1: hex view of content
- 2: auto detect hex view or text view
- 3: picture view
- 4: not supported
- 5: html inline view (sanitized)
- 6: text view of pdf
- 7: text view of html
- 8: text view of word file

**bucket**: - Specify the bucket to search
- See list of buckets https://blog.intelx.io/2022/05/05/list-of-buckets/

**escape**: For text the default behavior (unless overwritten by &escape=0) is to escape HTML characters
for safe placement of the text in HTML.

#### Enumerated Values

|Parameter|Value|
|---|---|
|escape|0|
|escape|1|

<h3 id="read-a-file's-raw-contents.-use-this-for-direct-data-download.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Data as payload according to the type|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid Input|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|item was not found|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ApiKeyQueryParam
</aside>

## servers__intelligent_search

> Code samples

```shell
# You can also use wget
curl -X SERVERS https://2.intelx.io/intelligent/search

```

```http
SERVERS https://2.intelx.io/intelligent/search HTTP/1.1
Host: 2.intelx.io

```

`SERVERS /intelligent/search`

<h3 id="servers__intelligent_search-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Initialize an intelligent search and return the ID of the task/search for further processing.

<a id="opIdintelligentSearch"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://2.intelx.io/intelligent/search?term=info%40intelx.io&maxresults=100&timeout=30&datefrom=2020-01-01%2000%3A00%3A00&dateto=2020-02-02%2023%3A59%3A59&sort=4&media=0 \
  -H 'Accept: application/json' \
  -H 'X-Key: API_KEY'

```

```http
POST https://2.intelx.io/intelligent/search?term=info%40intelx.io&maxresults=100&timeout=30&datefrom=2020-01-01%2000%3A00%3A00&dateto=2020-02-02%2023%3A59%3A59&sort=4&media=0 HTTP/1.1
Host: 2.intelx.io
Accept: application/json

```

`POST /intelligent/search`

Initialize an intelligent search and return the ID of the task/search for further processing.         

<h3 id="initialize-an-intelligent-search-and-return-the-id-of-the-task/search-for-further-processing.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|term|query|string|true|The term must be a strong selector. These selector types are currently supported:|
|maxresults|query|integer|true|- Tells how many results to query maximum per bucket.|
|buckets|query|string|false|- Specify the buckets to search|
|timeout|query|integer|true|- Set a timeout value for the search. If omitted or set to 0, the default is used. |
|datefrom|query|string|true|- Set a starting date to begin the search from.|
|dateto|query|string|true|- Set an ending date to finish the search from.|
|sort|query|integer|true|- Define the way to sort search results.|
|media|query|integer|true|- Define the type of media to search for.|
|lookuplevel|query|integer|false|lookuplevel|
|terminate|query|array[string]|false|Optional: ID of previous search to terminate to save system resources.|

#### Detailed descriptions

**term**: The term must be a strong selector. These selector types are currently supported:
  - Email address
  - Domain, including wildcards like *.example.com
  - URL
  - IPv4 & IPv6
  - CIDRv4 & CIDRv6
  - Phone Number
  - Bitcoin Address
  - MAC Address
  - IPFS Hash
  - UUID
  - Storage ID
  - System ID
  - Simhash
  - Credit card number
  - IBAN
Soft selectors (generic terms) are not supported!

**maxresults**: - Tells how many results to query maximum per bucket.

**buckets**: - Specify the buckets to search
- Example: buckets=[]
- Example: buckets=['pastes', 'darknet.i2p']
- See list of buckets https://blog.intelx.io/2022/05/05/list-of-buckets/

**timeout**: - Set a timeout value for the search. If omitted or set to 0, the default is used. 

**datefrom**: - Set a starting date to begin the search from.
- Example: 2020-01-01 00:00:00
- Example: 2020-01-01 12:00:00

**dateto**: - Set an ending date to finish the search from.
- Example: 2020-02-02 23:59:59
- Example: 2020-02-02 00:00:00

**sort**: - Define the way to sort search results.
- 0: No sorting.
- 1: X-Score ASC. Least relevant items first.
- 2: X-Score DESC. Most relevant items first.
- 3: Date ASC. Oldest items first.
- 4: Date DESC. Newest items first.

**media**: - Define the type of media to search for.
- 0: Not set. (All media types)
- 1: Paste document
- 2: Paste User
- 3: Forum
- 4: Forum Board
- 5: Forum Thread
- 6: Forum Post
- 7: Forum User
- 8: Screenshot of a Website
- 9: HTML copy of a website.
- 10: Invalid, do not use.
- 11: Invalid, do not use.
- 12: Invalid, do not use.
- 13: Tweet
- 14: URL, high-level item having HTML copies as linked sub-items
- 15: PDF document
- 16: Word document
- 17: Excel document
- 18: Powerpoint document
- 19: Picture
- 20: Audio file
- 21: Video file
- 22: Container files including ZIP, RAR, TAR and others
- 23: HTML file
- 24: Text file

**lookuplevel**: lookuplevel

> Example responses

> 200 Response

```json
{
  "status": 0,
  "id": "61202067-543e-4e6a-8c23-11f9b8f008cf"
}
```

<h3 id="initialize-an-intelligent-search-and-return-the-id-of-the-task/search-for-further-processing.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success search|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid data|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid api token; not authorized for buckets|None|
|402|[Payment Required](https://tools.ietf.org/html/rfc7231#section-6.5.2)|if no credits available|None|

<h3 id="initialize-an-intelligent-search-and-return-the-id-of-the-task/search-for-further-processing.-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|integer|false|none|Result status|
|» id|string|false|none|none|

#### Links

**LiveSearchResult** => <a href="#opIdliveSearchResult">liveSearchResult</a>

|Parameter|Expression|
|---|---|
|id|$response.body#/id|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ApiKeyAuth
</aside>

## Export intelligent search

<a id="opIdintelligent/search/export"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://2.intelx.io/intelligent/search/export?id=61202067-543e-4e6a-8c23-11f9b8f008cf

```

```http
GET https://2.intelx.io/intelligent/search/export?id=61202067-543e-4e6a-8c23-11f9b8f008cf HTTP/1.1
Host: 2.intelx.io

```

`GET /intelligent/search/export`

<h3 id="export-intelligent-search-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|query|string|true|Search id (e.g. "61202067-543e-4e6a-8c23-11f9b8f008cf")|
|l|query|integer|false|Result limit|
|f|query|integer|false|Format|

<h3 id="export-intelligent-search-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|item was not found|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ApiKeyQueryParam
</aside>

## Fetch intelligent search result

<a id="opIdintelligentSearchResult"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://2.intelx.io/intelligent/search/result?id=61202067-543e-4e6a-8c23-11f9b8f008cf&media=0 \
  -H 'Accept: application/json'

```

```http
GET https://2.intelx.io/intelligent/search/result?id=61202067-543e-4e6a-8c23-11f9b8f008cf&media=0 HTTP/1.1
Host: 2.intelx.io
Accept: application/json

```

`GET /intelligent/search/result`

<h3 id="fetch-intelligent-search-result-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|query|string|true|Search id (e.g. "61202067-543e-4e6a-8c23-11f9b8f008cf")|
|limit|query|integer|false|Result limit|
|media|query|integer|true|- Define the type of media to search for.|
|statistics|query|integer|false|Add statistics|
|previewlines|query|integer|false|Preview lines count|
|bucket|query|string|false|- Specify the bucket to search|
|dateFrom|query|string(date-time)|false|Date from of the result in `YYYY-mm-dd HH:ii:ss` format. (Not RFC3339)|
|dateTo|query|string(date-time)|false|Date to of the result in `YYYY-mm-dd HH:ii:ss` format. (Not RFC3339)|
|reset|query|integer|false|Reset previous searches|

#### Detailed descriptions

**media**: - Define the type of media to search for.
- 0: Not set. (All media types)
- 1: Paste document
- 2: Paste User
- 3: Forum
- 4: Forum Board
- 5: Forum Thread
- 6: Forum Post
- 7: Forum User
- 8: Screenshot of a Website
- 9: HTML copy of a website.
- 10: Invalid, do not use.
- 11: Invalid, do not use.
- 12: Invalid, do not use.
- 13: Tweet
- 14: URL, high-level item having HTML copies as linked sub-items
- 15: PDF document
- 16: Word document
- 17: Excel document
- 18: Powerpoint document
- 19: Picture
- 20: Audio file
- 21: Video file
- 22: Container files including ZIP, RAR, TAR and others
- 23: HTML file
- 24: Text file

**bucket**: - Specify the bucket to search
- See list of buckets https://blog.intelx.io/2022/05/05/list-of-buckets/

#### Enumerated Values

|Parameter|Value|
|---|---|
|reset|0|
|reset|1|

> Example responses

> 200 Response

```json
{
  "records": [
    {
      "systemid": "45fdc0d2-2550-4e66-8447-a21268d60b5a",
      "storageid": "string",
      "instore": true,
      "size": 0,
      "accesslevel": 0,
      "type": 0,
      "media": 0,
      "added": "2019-08-24T14:15:22Z",
      "date": "2019-08-24T14:15:22Z",
      "name": "string",
      "description": "string",
      "xscore": 100,
      "simhash": 0,
      "bucket": "string",
      "tags": [
        {
          "class": 0,
          "value": "string"
        }
      ],
      "relations": [
        {
          "target": "65a17d54-9c67-4477-8b80-d3f97e165aa5",
          "relation": 0
        }
      ],
      "accesslevelh": "string",
      "mediah": "string",
      "simhashh": "string",
      "typeh": "string",
      "tagsh": [
        {
          "class": 0,
          "classh": "string",
          "value": "string",
          "valueh": "string"
        }
      ],
      "randomid": "b2890775-4beb-4d72-9035-427f789d4e63",
      "bucketh": "string",
      "group": "string",
      "indexfile": "string"
    }
  ],
  "status": 0
}
```

<h3 id="fetch-intelligent-search-result-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Intelligent search result page. The client is expected to poll this
endpoint repeatedly and interpret the status code:

  0 = Success with results (continue polling, more results available)
  1 = No more results available (this response might still have results)
  2 = Search ID not found
  3 = No results yet available, keep trying
  4 = Error|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid input data|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Not authorized. Verify the API key.|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Search ID not found|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal API error|None|

<h3 id="fetch-intelligent-search-result-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» records|[allOf]|false|none|Result records in this page|

*allOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[Item](#schemaitem)|false|none|Generic item meta-data, as used for search results.|
|»»» systemid|string(uuid)|true|none|System identifier uniquely identifying the item|
|»»» storageid|string|false|none|Storage identifier, empty if not stored/available|
|»»» instore|boolean|false|none|Whether the data of the item is in store and the storageid is valid|
|»»» size|integer(int64)|false|none|Size in bytes of the item data|
|»»» accesslevel|integer|false|none|Native access level of the item|
|»»» type|integer|false|none|Low-level content type|
|»»» media|integer|false|none|High-level media type|
|»»» added|string(date-time)|false|none|When the item was added to the system|
|»»» date|string(date-time)|false|none|When the item was discovered or created|
|»»» name|string|false|none|Name or title|
|»»» description|string|false|none|Full description, text only|
|»»» xscore|integer|false|none|X-Score, ranking its relevancy, 0–100|
|»»» simhash|integer(int64)|false|none|Simhash of the item data|
|»»» bucket|string|false|none|Bucket identifier|
|»»» tags|[[Tag](#schematag)]|false|none|Meta-data tags helping in classification of the item data|
|»»»» class|integer(int32)|true|none|Tag class|
|»»»» value|string|true|none|Tag value|
|»»» relations|[[Relationship](#schemarelationship)]|false|none|Related items|
|»»»» target|string(uuid)|true|none|Target item system ID|
|»»»» relation|integer|true|none|Relation type (see server implementation)|

*and*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|object|false|none|Search result record, extends Item with human-readable fields.|
|»»» accesslevelh|string|false|none|Human friendly access level info|
|»»» mediah|string|false|none|Human friendly media type info|
|»»» simhashh|string|false|none|Human friendly simhash|
|»»» typeh|string|false|none|Human friendly content type info|
|»»» tagsh|[[PanelSearchResultTag](#schemapanelsearchresulttag)]|false|none|Human friendly tags|
|»»»» class|integer(int32)|false|none|Tag class|
|»»»» classh|string|false|none|Human friendly tag class|
|»»»» value|string|false|none|Tag value|
|»»»» valueh|string|false|none|Human friendly tag value|
|»»» randomid|string(uuid)|false|none|Random ID|
|»»» bucketh|string|false|none|Human friendly bucket name|
|»»» group|string|false|none|File group|
|»»» indexfile|string|false|none|Index file ID|

*continued*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|integer|true|none|Status of the search result:<br>  0 = Success with results (continue polling)<br>  1 = No more results available<br>  2 = Search ID not found<br>  3 = No results yet available, keep trying<br>  4 = Error|

#### Enumerated Values

|Property|Value|
|---|---|
|status|0|
|status|1|
|status|2|
|status|3|
|status|4|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ApiKeyQueryParam
</aside>

## Intelligent search statistics

<a id="opIdintelligentSearchStatistics"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://2.intelx.io/intelligent/search/statistic?id=61202067-543e-4e6a-8c23-11f9b8f008cf

```

```http
GET https://2.intelx.io/intelligent/search/statistic?id=61202067-543e-4e6a-8c23-11f9b8f008cf HTTP/1.1
Host: 2.intelx.io

```

`GET /intelligent/search/statistic`

<h3 id="intelligent-search-statistics-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|query|string|true|Search id (e.g. "61202067-543e-4e6a-8c23-11f9b8f008cf")|

<h3 id="intelligent-search-statistics-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ApiKeyQueryParam
</aside>

## Terminate previous search

<a id="opIdintelligentSearchTerminate"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://2.intelx.io/intelligent/search/terminate?id=61202067-543e-4e6a-8c23-11f9b8f008cf

```

```http
GET https://2.intelx.io/intelligent/search/terminate?id=61202067-543e-4e6a-8c23-11f9b8f008cf HTTP/1.1
Host: 2.intelx.io

```

`GET /intelligent/search/terminate`

<h3 id="terminate-previous-search-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|query|string|true|Search id (e.g. "61202067-543e-4e6a-8c23-11f9b8f008cf")|

<h3 id="terminate-previous-search-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ApiKeyQueryParam
</aside>

## Lists all selectors for an item

<a id="opIditemSelectorList"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://2.intelx.io/item/selector/list?id=61202067-543e-4e6a-8c23-11f9b8f008cf \
  -H 'X-Key: API_KEY'

```

```http
GET https://2.intelx.io/item/selector/list?id=61202067-543e-4e6a-8c23-11f9b8f008cf HTTP/1.1
Host: 2.intelx.io

```

`GET /item/selector/list`

lists all selectors for an item from the first selector service that responds.

<h3 id="lists-all-selectors-for-an-item-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|query|string|true|Search id (e.g. "61202067-543e-4e6a-8c23-11f9b8f008cf")|

<h3 id="lists-all-selectors-for-an-item-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success search|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|if invalid input id|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|item not found|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ApiKeyAuth
</aside>

## Lists all selectors for an item with human translation

<a id="opIdselectorListHumanReadable"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://2.intelx.io/item/selector/list/human?id=61202067-543e-4e6a-8c23-11f9b8f008cf

```

```http
GET https://2.intelx.io/item/selector/list/human?id=61202067-543e-4e6a-8c23-11f9b8f008cf HTTP/1.1
Host: 2.intelx.io

```

`GET /item/selector/list/human`

Lists all selectors for an item from the first selector service that responds with human translation.

<h3 id="lists-all-selectors-for-an-item-with-human-translation-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|query|string|true|Search id (e.g. "61202067-543e-4e6a-8c23-11f9b8f008cf")|
|bucket|query|string|false|- Specify the bucket to search|

#### Detailed descriptions

**bucket**: - Specify the bucket to search
- See list of buckets https://blog.intelx.io/2022/05/05/list-of-buckets/

<h3 id="lists-all-selectors-for-an-item-with-human-translation-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|with JSON structure SelectorLink|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|if invalid input id|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|item not found|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ApiKeyQueryParam
</aside>

## Exports all selectors for an item

<a id="opIditemSelectorListExport"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://2.intelx.io/item/selector/list/export?id=61202067-543e-4e6a-8c23-11f9b8f008cf

```

```http
GET https://2.intelx.io/item/selector/list/export?id=61202067-543e-4e6a-8c23-11f9b8f008cf HTTP/1.1
Host: 2.intelx.io

```

`GET /item/selector/list/export`

Exports all selectors for an item from the first selector service that responds with human translation as CSV.
CSV header: Item System ID, Selector, Selector Type, Selector Type Human
Filename:   "Selectors [System ID].csv"

<h3 id="exports-all-selectors-for-an-item-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|query|string|true|Search id (e.g. "61202067-543e-4e6a-8c23-11f9b8f008cf")|

<h3 id="exports-all-selectors-for-an-item-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success, with data, Content-Disposition set|None|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Download with content-disposition but item not available. This prevents redirection of the user to error page when providing a direct download link.|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid input. Returned if the encoding is invalid or a required parameter is missing.|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized Authenticate: Access not authorized. 
This may be due missing permission for API call or to selected buckets.|None|
|402|[Payment Required](https://tools.ietf.org/html/rfc7231#section-6.5.2)|Payment Required Authenticate: No credits available.|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found Item or identifier not found.|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ApiKeyQueryParam
</aside>

## Phonebook search

<a id="opIdphonebookSearch"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://2.intelx.io/phonebook/search?term=info%40intelx.io&target=0&maxresults=100&timeout=30&media=0 \
  -H 'X-Key: API_KEY'

```

```http
POST https://2.intelx.io/phonebook/search?term=info%40intelx.io&target=0&maxresults=100&timeout=30&media=0 HTTP/1.1
Host: 2.intelx.io

```

`POST /phonebook/search`

<h3 id="phonebook-search-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|term|query|string|true|none|
|target|query|integer|true|none|
|buckets|query|string|false|- Specify the buckets to search|
|maxresults|query|integer|true|- Tells how many results to query maximum per bucket.|
|timeout|query|integer|true|- Set a timeout value for the search. If omitted or set to 0, the default is used. |
|media|query|integer|true|- Define the type of media to search for.|
|terminate|query|array[string]|false|Optional: ID of previous search to terminate to save system resources.|

#### Detailed descriptions

**buckets**: - Specify the buckets to search
- Example: buckets=[]
- Example: buckets=['pastes', 'darknet.i2p']
- See list of buckets https://blog.intelx.io/2022/05/05/list-of-buckets/

**maxresults**: - Tells how many results to query maximum per bucket.

**timeout**: - Set a timeout value for the search. If omitted or set to 0, the default is used. 

**media**: - Define the type of media to search for.
- 0: Not set. (All media types)
- 1: Paste document
- 2: Paste User
- 3: Forum
- 4: Forum Board
- 5: Forum Thread
- 6: Forum Post
- 7: Forum User
- 8: Screenshot of a Website
- 9: HTML copy of a website.
- 10: Invalid, do not use.
- 11: Invalid, do not use.
- 12: Invalid, do not use.
- 13: Tweet
- 14: URL, high-level item having HTML copies as linked sub-items
- 15: PDF document
- 16: Word document
- 17: Excel document
- 18: Powerpoint document
- 19: Picture
- 20: Audio file
- 21: Video file
- 22: Container files including ZIP, RAR, TAR and others
- 23: HTML file
- 24: Text file

#### Enumerated Values

|Parameter|Value|
|---|---|
|target|0|
|target|1|
|target|2|
|target|3|

<h3 id="phonebook-search-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ApiKeyAuth
</aside>

## Export

<a id="opIdphonebookSearchExport"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://2.intelx.io/phonebook/search/export?id=61202067-543e-4e6a-8c23-11f9b8f008cf

```

```http
GET https://2.intelx.io/phonebook/search/export?id=61202067-543e-4e6a-8c23-11f9b8f008cf HTTP/1.1
Host: 2.intelx.io

```

`GET /phonebook/search/export`

<h3 id="export-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|query|string|true|Search id (e.g. "61202067-543e-4e6a-8c23-11f9b8f008cf")|
|l|query|integer|false|Result limit|

<h3 id="export-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ApiKeyQueryParam
</aside>

## Fetch phonebook search result

<a id="opIdphonebookSearchResult"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://2.intelx.io/phonebook/search/result?id=61202067-543e-4e6a-8c23-11f9b8f008cf

```

```http
GET https://2.intelx.io/phonebook/search/result?id=61202067-543e-4e6a-8c23-11f9b8f008cf HTTP/1.1
Host: 2.intelx.io

```

`GET /phonebook/search/result`

<h3 id="fetch-phonebook-search-result-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|query|string|true|Search id (e.g. "61202067-543e-4e6a-8c23-11f9b8f008cf")|
|l|query|integer|false|Result limit|

<h3 id="fetch-phonebook-search-result-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ApiKeyQueryParam
</aside>

## Get item meta-data

<a id="opIdapiItemGet"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://2.intelx.io/api/item/get?id=61202067-543e-4e6a-8c23-11f9b8f008cf

```

```http
GET https://2.intelx.io/api/item/get?id=61202067-543e-4e6a-8c23-11f9b8f008cf HTTP/1.1
Host: 2.intelx.io

```

`GET /api/item/get`

<h3 id="get-item-meta-data-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|query|string|true|Search id (e.g. "61202067-543e-4e6a-8c23-11f9b8f008cf")|

<h3 id="get-item-meta-data-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ApiKeyQueryParam
</aside>

## Get item meta-data with human translation

<a id="opIdapiItemGetHumanReadable"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://2.intelx.io/api/item/get/human?id=61202067-543e-4e6a-8c23-11f9b8f008cf

```

```http
GET https://2.intelx.io/api/item/get/human?id=61202067-543e-4e6a-8c23-11f9b8f008cf HTTP/1.1
Host: 2.intelx.io

```

`GET /api/item/get/human`

<h3 id="get-item-meta-data-with-human-translation-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|query|string|true|Search id (e.g. "61202067-543e-4e6a-8c23-11f9b8f008cf")|

<h3 id="get-item-meta-data-with-human-translation-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ApiKeyQueryParam
</aside>

## Internal live search

<a id="opIdliveSearch"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://2.intelx.io/live/search/internal?selector=info%40intelx.io \
  -H 'Accept: application/json' \
  -H 'X-Key: API_KEY'

```

```http
GET https://2.intelx.io/live/search/internal?selector=info%40intelx.io HTTP/1.1
Host: 2.intelx.io
Accept: application/json

```

`GET /live/search/internal`

Initiates the search; will return status and search Id on success.
Limit means max amount of records per bucket to return. Default 10.
- Selector: Must be an email address, domain, social security number (US based), or credit card number. 
- Limit: In some cases, the API might return more results than specified in limit. If an upper hard limit is required, it must be enforced on the client side. 
- Bucket: Optional filter for searching only in the target bucket. See Appendix 1 for list. 
- In case a user makes a new search and the previous one shall be discarded; its search ID shall be specified in the “terminate” parameter to save system resources. Searches may consume Gigabytes of data, therefore any searches that are no longer required shall be terminated. Searches can also be manually terminated via the /live/search/terminate function. 
- Dates: From/to dates may be used as filter. Note that item’s dates are set to when the original data was published if available, or otherwise when it was indexed. This means that newly indexed items are often backdated. 

<h3 id="internal-live-search-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|selector|query|string|true|Selector to search for|
|bucket|query|string|false|- Specify the bucket to search|
|skipinvalid|query|boolean|false|Specify to skip invalid entries (recommended). Default false.|
|limit|query|integer|false|Result limit|
|analyze|query|boolean|false|Default false.|
|datefrom|query|string(date-time)|false|Date from of the result in `YYYY-mm-dd HH:ii:ss` format. (Not RFC3339)|
|dateto|query|string(date-time)|false|Date to of the result in `YYYY-mm-dd HH:ii:ss` format. (Not RFC3339)|
|terminate|query|array[string]|false|Optional: ID of previous search to terminate to save system resources.|

#### Detailed descriptions

**bucket**: - Specify the bucket to search
- See list of buckets https://blog.intelx.io/2022/05/05/list-of-buckets/

> Example responses

> 200 Response

```json
{
  "status": 0,
  "id": "61202067-543e-4e6a-8c23-11f9b8f008cf"
}
```

<h3 id="internal-live-search-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success search|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid input|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid api token|None|

<h3 id="internal-live-search-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|integer|true|none|Result status|
|» id|string|true|none|none|

#### Links

**LiveSearchResult** => <a href="#opIdliveSearchResult">liveSearchResult</a>

|Parameter|Expression|
|---|---|
|id|$response.body#/id|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ApiKeyAuth
</aside>

## Terminating search

<a id="opIdliveSearchTerminate"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://2.intelx.io/live/search/terminate?id=61202067-543e-4e6a-8c23-11f9b8f008cf \
  -H 'X-Key: API_KEY'

```

```http
GET https://2.intelx.io/live/search/terminate?id=61202067-543e-4e6a-8c23-11f9b8f008cf HTTP/1.1
Host: 2.intelx.io

```

`GET /live/search/terminate`

To terminate an active search or export, use this function. Terminating a search that is no longer needed saves system resources. 
Since searches may read and process Gigabytes of data, it is highly appreciated if users terminate searches that are no longer needed. 

Terminating a search that is already terminated has no effect. 

<h3 id="terminating-search-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|query|string|true|Search id (e.g. "61202067-543e-4e6a-8c23-11f9b8f008cf")|

<h3 id="terminating-search-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success with no content|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid input|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ApiKeyAuth
</aside>

## Fetch results from internal live search

<a id="opIdaccountsCsv"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://2.intelx.io/accounts/csv?selector=info%40intelx.io \
  -H 'X-Key: API_KEY'

```

```http
GET https://2.intelx.io/accounts/csv?selector=info%40intelx.io HTTP/1.1
Host: 2.intelx.io

```

`GET /accounts/csv`

This is the API used by the “Export Leaked Accounts” tab of the Identity Portal. It only supports domains and email addresses as input.         

The response is the same as for /live/search/internal, returning a status and the search job ID. In case a user makes a new export and the previous one shall be discarded; 
its search ID shall be specified in the “terminate” parameter to save system resources. Searches may consume Gigabytes of data, therefore any searches that are no longer 
required shall be terminated. Searches can also be manually terminated via the /live/search/terminate function. 

<h3 id="fetch-results-from-internal-live-search-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|selector|query|string|true|Search term|
|bucket|query|string|false|- Specify the bucket to search|
|limit|query|integer|false|Result limit|
|datefrom|query|string(date-time)|false|Date from of the result in `YYYY-mm-dd HH:ii:ss` format. (Not RFC3339)|
|dateto|query|string(date-time)|false|Date to of the result in `YYYY-mm-dd HH:ii:ss` format. (Not RFC3339)|
|terminate|query|array[string]|false|Optional: ID of previous search to terminate to save system resources.|

#### Detailed descriptions

**bucket**: - Specify the bucket to search
- See list of buckets https://blog.intelx.io/2022/05/05/list-of-buckets/

<h3 id="fetch-results-from-internal-live-search-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success with JSON LiveSearchResponse|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid input|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ApiKeyAuth
</aside>

## servers__accounts_1

> Code samples

```shell
# You can also use wget
curl -X SERVERS https://2.intelx.io/accounts/1

```

```http
SERVERS https://2.intelx.io/accounts/1 HTTP/1.1
Host: 2.intelx.io

```

`SERVERS /accounts/1`

<h3 id="servers__accounts_1-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Synchronous Export Leaked Accounts

<a id="opIdaccounts1"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://2.intelx.io/accounts/1?selector=info%40intelx.io&timeout=30 \
  -H 'X-Key: API_KEY'

```

```http
GET https://2.intelx.io/accounts/1?selector=info%40intelx.io&timeout=30 HTTP/1.1
Host: 2.intelx.io

```

`GET /accounts/1`

Use this function to query leaked accounts and return them immediately. 

Note: You should use the asynchronous function /accounts/csv as this one might miss results that are not available within the given timeout. 
Searching for leaked accounts may take minutes, especially when searching for domains that have thousands of results. Internally the API
must fetch the entire data for each individual result which often results internally in Gigabytes of traffic and potentially causes delays. 

The default timeout is 10 minutes. The client must make sure to allow for such high HTTP timeouts on the client side. The timeout must not be higher than 1 hour, which is the HTTP server write timeout. 

<h3 id="synchronous-export-leaked-accounts-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|selector|query|string|true|Search term|
|bucket|query|string|false|- Specify the bucket to search|
|limit|query|integer|false|Result limit|
|timeout|query|integer|true|- Set a timeout value for the search. If omitted or set to 0, the default is used. |
|datefrom|query|string(date-time)|false|Date from of the result in `YYYY-mm-dd HH:ii:ss` format. (Not RFC3339)|
|dateto|query|string(date-time)|false|Date to of the result in `YYYY-mm-dd HH:ii:ss` format. (Not RFC3339)|
|terminate|query|array[string]|false|Optional: ID of previous search to terminate to save system resources.|

#### Detailed descriptions

**bucket**: - Specify the bucket to search
- See list of buckets https://blog.intelx.io/2022/05/05/list-of-buckets/

**timeout**: - Set a timeout value for the search. If omitted or set to 0, the default is used. 

<h3 id="synchronous-export-leaked-accounts-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|JSON array of CSVRecord|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid input|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ApiKeyAuth
</aside>

# Schemas

<h2 id="tocS_Tag">Tag</h2>
<!-- backwards compatibility -->
<a id="schematag"></a>
<a id="schema_Tag"></a>
<a id="tocStag"></a>
<a id="tocstag"></a>

```json
{
  "class": 0,
  "value": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|class|integer(int32)|true|none|Tag class|
|value|string|true|none|Tag value|

<h2 id="tocS_Relationship">Relationship</h2>
<!-- backwards compatibility -->
<a id="schemarelationship"></a>
<a id="schema_Relationship"></a>
<a id="tocSrelationship"></a>
<a id="tocsrelationship"></a>

```json
{
  "target": "65a17d54-9c67-4477-8b80-d3f97e165aa5",
  "relation": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|target|string(uuid)|true|none|Target item system ID|
|relation|integer|true|none|Relation type (see server implementation)|

<h2 id="tocS_Item">Item</h2>
<!-- backwards compatibility -->
<a id="schemaitem"></a>
<a id="schema_Item"></a>
<a id="tocSitem"></a>
<a id="tocsitem"></a>

```json
{
  "systemid": "45fdc0d2-2550-4e66-8447-a21268d60b5a",
  "storageid": "string",
  "instore": true,
  "size": 0,
  "accesslevel": 0,
  "type": 0,
  "media": 0,
  "added": "2019-08-24T14:15:22Z",
  "date": "2019-08-24T14:15:22Z",
  "name": "string",
  "description": "string",
  "xscore": 100,
  "simhash": 0,
  "bucket": "string",
  "tags": [
    {
      "class": 0,
      "value": "string"
    }
  ],
  "relations": [
    {
      "target": "65a17d54-9c67-4477-8b80-d3f97e165aa5",
      "relation": 0
    }
  ]
}

```

Generic item meta-data, as used for search results.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|systemid|string(uuid)|true|none|System identifier uniquely identifying the item|
|storageid|string|false|none|Storage identifier, empty if not stored/available|
|instore|boolean|false|none|Whether the data of the item is in store and the storageid is valid|
|size|integer(int64)|false|none|Size in bytes of the item data|
|accesslevel|integer|false|none|Native access level of the item|
|type|integer|false|none|Low-level content type|
|media|integer|false|none|High-level media type|
|added|string(date-time)|false|none|When the item was added to the system|
|date|string(date-time)|false|none|When the item was discovered or created|
|name|string|false|none|Name or title|
|description|string|false|none|Full description, text only|
|xscore|integer|false|none|X-Score, ranking its relevancy, 0–100|
|simhash|integer(int64)|false|none|Simhash of the item data|
|bucket|string|false|none|Bucket identifier|
|tags|[[Tag](#schematag)]|false|none|Meta-data tags helping in classification of the item data|
|relations|[[Relationship](#schemarelationship)]|false|none|Related items|

<h2 id="tocS_PanelSearchResultTag">PanelSearchResultTag</h2>
<!-- backwards compatibility -->
<a id="schemapanelsearchresulttag"></a>
<a id="schema_PanelSearchResultTag"></a>
<a id="tocSpanelsearchresulttag"></a>
<a id="tocspanelsearchresulttag"></a>

```json
{
  "class": 0,
  "classh": "string",
  "value": "string",
  "valueh": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|class|integer(int32)|false|none|Tag class|
|classh|string|false|none|Human friendly tag class|
|value|string|false|none|Tag value|
|valueh|string|false|none|Human friendly tag value|

<h2 id="tocS_SearchResult">SearchResult</h2>
<!-- backwards compatibility -->
<a id="schemasearchresult"></a>
<a id="schema_SearchResult"></a>
<a id="tocSsearchresult"></a>
<a id="tocssearchresult"></a>

```json
{
  "systemid": "45fdc0d2-2550-4e66-8447-a21268d60b5a",
  "storageid": "string",
  "instore": true,
  "size": 0,
  "accesslevel": 0,
  "type": 0,
  "media": 0,
  "added": "2019-08-24T14:15:22Z",
  "date": "2019-08-24T14:15:22Z",
  "name": "string",
  "description": "string",
  "xscore": 100,
  "simhash": 0,
  "bucket": "string",
  "tags": [
    {
      "class": 0,
      "value": "string"
    }
  ],
  "relations": [
    {
      "target": "65a17d54-9c67-4477-8b80-d3f97e165aa5",
      "relation": 0
    }
  ],
  "accesslevelh": "string",
  "mediah": "string",
  "simhashh": "string",
  "typeh": "string",
  "tagsh": [
    {
      "class": 0,
      "classh": "string",
      "value": "string",
      "valueh": "string"
    }
  ],
  "randomid": "b2890775-4beb-4d72-9035-427f789d4e63",
  "bucketh": "string",
  "group": "string",
  "indexfile": "string"
}

```

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Item](#schemaitem)|false|none|Generic item meta-data, as used for search results.|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|Search result record, extends Item with human-readable fields.|
|» accesslevelh|string|false|none|Human friendly access level info|
|» mediah|string|false|none|Human friendly media type info|
|» simhashh|string|false|none|Human friendly simhash|
|» typeh|string|false|none|Human friendly content type info|
|» tagsh|[[PanelSearchResultTag](#schemapanelsearchresulttag)]|false|none|Human friendly tags|
|» randomid|string(uuid)|false|none|Random ID|
|» bucketh|string|false|none|Human friendly bucket name|
|» group|string|false|none|File group|
|» indexfile|string|false|none|Index file ID|

