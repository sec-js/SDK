from intelx import intelx
from dotenv import load_dotenv
import os

load_dotenv()
INTELX_KEY = os.getenv("INTELX_KEY")
INTELX_BASE_URL = os.getenv("INTELX_BASE_URL")


intelx = intelx(INTELX_KEY, INTELX_BASE_URL)

if __name__ == '__main__':
    _ = intelx.GET_CAPABILITIES()
    print(_)
