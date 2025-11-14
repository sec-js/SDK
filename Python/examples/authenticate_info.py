from intelx import intelx
from dotenv import load_dotenv
import os

load_dotenv()
INTELX_KEY = os.getenv("INTELX_KEY")

intelx = intelx(INTELX_KEY)

if __name__ == '__main__':
    _ = intelx.GET_CAPABILITIES()
    print(repr(_))
