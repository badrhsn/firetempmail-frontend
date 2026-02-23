#!/usr/bin/env python3
"""Check what extra keys AR/RU/ZH are missing beyond page-specific ones."""
import json
en = json.load(open('src/lib/i18n/locales/en.json'))
ar = json.load(open('src/lib/i18n/locales/ar.json'))
zh = json.load(open('src/lib/i18n/locales/zh.json'))

def get_leaves(obj, prefix=''):
    leaves = {}
    for k, v in obj.items():
        key = f'{prefix}.{k}' if prefix else k
        if isinstance(v, dict): leaves.update(get_leaves(v, key))
        else: leaves[key] = v
    return leaves

en_l = get_leaves(en)
ar_l = get_leaves(ar)
zh_l = get_leaves(zh)

ar_missing = sorted(set(en_l.keys()) - set(ar_l.keys()))
zh_missing = sorted(set(en_l.keys()) - set(zh_l.keys()))

print(f"AR missing: {len(ar_missing)} keys total")
print(f"ZH missing: {len(zh_missing)} keys total")

# Show keys missing from AR that are in base categories (not page-specific)
page_prefixes = ('emailGeneratorPage', 'tempGmailPage', 'burnerEmailPage', 'eduEmailPage', 
    'bestTempMailPage', 'gmailGeneratorPage', 'temporaryGmailPage', 'tempMailEduPage',
    'tenMinuteMailPage', 'temporaryEmailGenPage', 'fireMailPage', 'gmailnatorPage', 'about.')
    
ar_extra = [k for k in ar_missing if not any(k.startswith(p) for p in page_prefixes)]
print(f"\nAR extra (non-page) missing: {len(ar_extra)}")
for k in ar_extra:
    val = en_l[k]
    if isinstance(val, str) and len(val) > 60:
        val = val[:60] + '...'
    print(f"  {k}: {repr(val)}")

zh_extra = [k for k in zh_missing if not any(k.startswith(p) for p in page_prefixes)]
print(f"\nZH extra (non-page) missing: {len(zh_extra)}")
for k in zh_extra:
    val = en_l[k]
    if isinstance(val, str) and len(val) > 60:
        val = val[:60] + '...'
    print(f"  {k}: {repr(val)}")
