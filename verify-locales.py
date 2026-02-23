#!/usr/bin/env python3
import json, os

def get_leaf_keys(obj, prefix=''):
    keys = []
    for k, v in obj.items():
        path = f'{prefix}.{k}' if prefix else k
        if isinstance(v, dict):
            keys.extend(get_leaf_keys(v, path))
        else:
            keys.append(path)
    return keys

BASE = 'src/lib/i18n/locales'
en = json.load(open(os.path.join(BASE, 'en.json')))
en_keys = set(get_leaf_keys(en))
print(f'EN: {len(en_keys)} keys (master)')

for lang in ['es', 'de', 'fr', 'pt', 'ar', 'ru', 'zh']:
    loc = json.load(open(os.path.join(BASE, f'{lang}.json')))
    loc_keys = set(get_leaf_keys(loc))
    missing = en_keys - loc_keys
    extra = loc_keys - en_keys
    print(f'{lang.upper()}: {len(loc_keys)} keys | Missing: {len(missing)} | Extra: {len(extra)}')
    if missing:
        for k in sorted(missing)[:5]:
            print(f'  missing: {k}')
        if len(missing) > 5:
            print(f'  ... and {len(missing)-5} more')
