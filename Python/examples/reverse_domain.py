from intelx import IdentityService
from dotenv import load_dotenv
import os

load_dotenv()
INTELX_KEY = os.getenv("INTELX_KEY")

intelx = IdentityService(INTELX_KEY)
result = intelx.reverse_domain(term='riseup.net', maxresults=10, datefrom='2022-01-01 00:00:00', dateto='2022-06-01 00:00:00')

# grab file contents of first search result

print(result)