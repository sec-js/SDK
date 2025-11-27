from intelx import intelx
from dotenv import load_dotenv
import os

load_dotenv()
INTELX_KEY = os.getenv("INTELX_KEY")

intelx = intelx(INTELX_KEY)
result = intelx.search('riseup.net')

# grab file contents of first search result
contents = intelx.FILE_VIEW(result['records'][0]['type'], result['records'][0]['media'], result['records'][0]['storageid'], result['records'][0]['bucket'])

print(contents)
