from intelx import intelx
from dotenv import load_dotenv
import os

load_dotenv()
INTELX_KEY = os.getenv("INTELX_KEY")
INTELX_BASE_URL = os.getenv("INTELX_BASE_URL")


intelx = intelx(INTELX_KEY, INTELX_BASE_URL)
search = intelx.search('riseup.net')

# save the first search result file as "file.contents"
intelx.FILE_READ(search['records'][0]['systemid'], 0, search['records'][0]['bucket'], "file1.bin")
