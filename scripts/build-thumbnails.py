"""Rebuild listing thumbnails only; historical originals remain untouched.
Requires Python + Pillow. Run from any directory: py -3.13 scripts/build-thumbnails.py
"""
import json
import subprocess
from pathlib import Path
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
query = "import {events} from './lib/museum.ts'; console.log(JSON.stringify(events.filter(e=>e.image).map(e=>({id:e.id,...e.image}))));"
result = subprocess.run(['node', '--experimental-strip-types', '--input-type=module', '-e', query], cwd=root, capture_output=True, check=True, encoding='utf-8')
items = json.loads(result.stdout)
target = root / 'public' / 'thumbnails'
target.mkdir(exist_ok=True)
manifest = {}
original_bytes = 0
thumbnail_bytes = 0
for item in items:
    original = root / 'public' / item['src'].lstrip('/')
    output = target / (item['id'] + '.webp')
    if original.suffix.lower() == '.svg':
        manifest[item['src']] = item['src']
        original_bytes += original.stat().st_size
        thumbnail_bytes += original.stat().st_size
        continue
    with Image.open(original) as image:
        image = ImageOps.exif_transpose(image)
        image.thumbnail((720, 720), Image.Resampling.LANCZOS)
        image.save(output, format='WEBP', quality=82, method=6)
    manifest[item['src']] = '/thumbnails/' + output.name
    original_bytes += original.stat().st_size
    thumbnail_bytes += output.stat().st_size
(root / 'lib' / 'image-thumbnails.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps({'images': len(items), 'originalBytes': original_bytes, 'thumbnailBytes': thumbnail_bytes}))
