from intelx import intelx
from dotenv import load_dotenv
import os

load_dotenv()
INTELX_KEY = os.getenv("INTELX_KEY")

intelx = intelx(INTELX_KEY)
search = intelx.search('riseup.net')

# save the first search result file as "file.contents"
intelx.FILE_READ(search['records'][0]['systemid'], 0, search['records'][0]['bucket'], "file1.bin")
