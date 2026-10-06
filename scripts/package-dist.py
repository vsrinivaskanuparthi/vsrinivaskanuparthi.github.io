from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
root = Path(__file__).resolve().parent.parent
with ZipFile(root / 'portfolio-cloudflare.zip', 'w', ZIP_DEFLATED) as archive:
    for path in sorted((root / 'dist').rglob('*')):
        if path.is_file():
            archive.write(path, path.relative_to(root / 'dist'))
print('Created portfolio-cloudflare.zip with index.html at the archive root.')
