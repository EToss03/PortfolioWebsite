import shutil
import sys
from pathlib import Path


output = Path(sys.argv[1])
destination = output.parent

for asset_directory in (Path("Images"), Path("pdf files")):
    shutil.copytree(asset_directory, destination / asset_directory, dirs_exist_ok=True)

output.parent.mkdir(parents=True, exist_ok=True)
output.touch()
