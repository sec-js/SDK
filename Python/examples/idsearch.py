from intelx import IdentityService
from dotenv import load_dotenv
import os

load_dotenv()
INTELX_KEY = os.getenv("INTELX_KEY")
INTELX_BASE_URL = os.getenv("INTELX_BASE_URL")

intelx = IdentityService(INTELX_KEY, INTELX_BASE_URL)
result = intelx.search('john.doe@example.com')

# grab file contents of first search result
contents = intelx.FILE_VIEW(result['records'][0]['type'], result['records'][0]['media'], result['records'][0]['storageid'], result['records'][0]['bucket'])

print(contents)