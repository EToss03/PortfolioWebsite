import sys
from pathlib import Path


output = Path(sys.argv[1])
title = sys.argv[2]
template_path = Path(sys.argv[3])
content_path = Path(sys.argv[4])

template = template_path.read_text(encoding="utf-8")
content = content_path.read_text(encoding="utf-8")
document = template.replace("{{title}}", title).replace("{{content}}", content)
document = "\n".join(line.rstrip() for line in document.splitlines()) + "\n"
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text(document, encoding="utf-8")
