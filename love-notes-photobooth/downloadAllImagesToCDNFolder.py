import requests

from pathlib import Path

Path("CDN/").mkdir(parents=True, exist_ok=True)

with open('links.txt') as f:
    all_lines = list(f.readlines())
    for i, link in enumerate(all_lines):
        print(i, link)
        r = requests.get(link, allow_redirects=True)
        open('CDN/%d.png' % (i), 'wb').write(r.content)

    print('--------------------')
    print()
    print('%d total images' % (len(all_lines)))
