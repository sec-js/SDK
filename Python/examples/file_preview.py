from intelx import intelx
from dotenv import load_dotenv
import os

load_dotenv()
INTELX_KEY = os.getenv("INTELX_KEY")
INTELX_BASE_URL = os.getenv("INTELX_BASE_URL")
intelx = intelx(INTELX_KEY, INTELX_BASE_URL)

search = intelx.search("riseup.net", maxresults=5)
first = search["records"][0]

ctype = 1          # content type
mediatype = first["media"]
sid = first["storageid"]
bucket = first["bucket"]

preview = intelx.FILE_PREVIEW(
    ctype=ctype,
    mediatype=mediatype,
    format=0,      # 0 = text
    sid=sid,
    bucket=bucket,
    e=0,
    lines=20
)

print(preview)
