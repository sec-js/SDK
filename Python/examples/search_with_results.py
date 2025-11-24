from intelx import intelx
from dotenv import load_dotenv
import os

load_dotenv()
INTELX_KEY = os.getenv("INTELX_KEY")
INTELX_BASE_URL = os.getenv("INTELX_BASE_URL")

intelx = intelx(INTELX_KEY, INTELX_BASE_URL)

search_id = intelx.INTEL_SEARCH(
    term="riseup.net",
    maxresults=50,
    buckets=["leaks.public", "pastes"],
    timeout=5,
    datefrom="2021-01-01 00:00:00",
    dateto="2022-02-02 23:00:00",
    sort=4,
    media=0,
    terminate=[]
)

print("Search ID:", search_id)

# fetching records
limit = 100
while True:
    result_page = intelx.INTEL_SEARCH_RESULT(search_id, limit)
    print("Status:", result_page["status"], "records:", len(result_page["records"]))

    for rec in result_page["records"]:
        print(rec["name"], rec["bucket"])

    if result_page["status"] in (1, 2):  # 1 = no more, 2 = not found
        break