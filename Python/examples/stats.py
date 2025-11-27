from intelx import intelx
from dotenv import load_dotenv
import os

load_dotenv()
INTELX_KEY = os.getenv("INTELX_KEY")
INTELX_BASE_URL = os.getenv("INTELX_BASE_URL")

intelx = intelx(INTELX_KEY, INTELX_BASE_URL)

search = intelx.search(
  'riseup.net',
  maxresults=1000,
)

stats = intelx.stats(search)
print(stats)
