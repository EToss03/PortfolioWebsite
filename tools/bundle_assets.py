import sys
from pathlib import Path


output = Path(sys.argv[1])
sources = [Path(source) for source in sys.argv[2:]]
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text(
    "".join(source.read_text(encoding="utf-8") for source in sources),
    encoding="utf-8",
)
