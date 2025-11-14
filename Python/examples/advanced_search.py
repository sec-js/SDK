from intelx import intelx
from dotenv import load_dotenv
import os

load_dotenv()
INTELX_KEY = os.getenv("INTELX_KEY")

intelx = intelx(INTELX_KEY)
target = 'riseup.net'


def get_pastes(target):
    search = intelx.search(target, buckets=['pastes'], maxresults=2000)
    record_count = len(search['records'])
    print(f"Found {record_count} records for {target} in bucket 'pastes'")


def get_leaks(target):
    search = intelx.search(target, buckets=['leaks.public', 'leaks.private'], maxresults=2000)
    record_count = len(search['records'])
    print(f"Found {record_count} records for {target} in bucket 'leaks'")


def get_darknet(target):
    search = intelx.search(target, buckets=['darknet'], maxresults=2000)
    record_count = len(search['records'])
    print(f"Found {record_count} records for {target} in bucket 'darknet'")


if __name__ == '__main__':
    get_leaks(target)
    get_pastes(target)
    get_darknet(target)
