"""Reproduce the rights-reviewed Standard Ebooks chapter-1 sample.

Run manually with authenticated GitHub CLI. This is never part of CI or a bulk
import. The source revision and rights review are in docs/rights/pride-and-prejudice.md.
"""

import base64
import json
from pathlib import Path
import subprocess
import xml.etree.ElementTree as ET

REVISION = "ed94a32be3e875c0814568050c7544e03aad3ef5"
REPO = "standardebooks/jane-austen_pride-and-prejudice"
SOURCE = "src/epub/text/chapter-1.xhtml"
DESTINATION = Path("content/chapters/pride-and-prejudice/chapter-1.md")

response = subprocess.run(
    ["gh", "api", f"repos/{REPO}/contents/{SOURCE}?ref={REVISION}"],
    check=True, capture_output=True, text=True,
)
document = base64.b64decode(json.loads(response.stdout)["content"])
root = ET.fromstring(document)
namespace = "{http://www.w3.org/1999/xhtml}"
paragraphs = []
for paragraph in root.findall(f".//{namespace}section/{namespace}p"):
    text = "".join(paragraph.itertext()).strip()
    if text:
        paragraphs.append(" ".join(text.split()))
if len(paragraphs) < 10:
    raise SystemExit("Unexpected source structure; no output written")
DESTINATION.parent.mkdir(parents=True, exist_ok=True)
DESTINATION.write_text("# Chapter 1\n\n" + "\n\n".join(paragraphs) + "\n")
print(f"Imported {len(paragraphs)} paragraphs from {REPO}@{REVISION}:{SOURCE}")
