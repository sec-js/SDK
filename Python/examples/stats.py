from intelx import intelx
from dotenv import load_dotenv
import os

load_dotenv()
INTELX_KEY = os.getenv("INTELX_KEY")

intelx = intelx(INTELX_KEY)

search = intelx.search(
  'riseup.net',
  maxresults=1000,
)

stats = intelx.stats(search)
print(stats)
