#!/usr/bin/env python3
import json

def get_leaf_keys(obj, prefix=''):
    keys = []
    for k, v in obj.items():
        path = f'{prefix}.{k}' if prefix else k
        if isinstance(v, dict):
            keys.extend(get_leaf_keys(v, path))
        else:
            keys.append(path)
    return keys

en = json.load(open('src/lib/i18n/locales/en.json'))
zh = json.load(open('src/lib/i18n/locales/zh.json'))

en_keys = set(get_leaf_keys(en))
zh_keys = set(get_leaf_keys(zh))
missing = sorted(en_keys - zh_keys)
print(f'ZH missing {len(missing)} keys total')

# Categorize 
page_prefixes = ['emailGeneratorPage', 'tempGmailPage', 'burnerEmailPage', 'eduEmailPage', 
    'bestTempMailPage', 'gmailGeneratorPage', 'temporaryGmailPage', 'tempMailEduPage', 
    'tenMinuteMailPage', 'temporaryEmailGenPage', 'fireMailPage', 'gmailnatorPage', 'about']

common_email_keys = {'email.generateNew','email.changeDomain','email.refreshPage',
    'email.generateCustomEmail','email.waitingForEmails','email.refreshStopped',
    'email.inboxEmpty','email.domain','email.gmail','email.googlemail',
    'email.copyToClipboard','email.useCustomAlias2','email.changeDomain2',
    'email.refreshPage2','email.scenario','email.solution','email.challenge',
    'email.testingWorkflow','email.testScenarios','email.perfectFor',
    'email.important','email.neverUse'}

page_keys = [k for k in missing if any(k.startswith(p) for p in page_prefixes)]
email_keys = [k for k in missing if k in common_email_keys]  
extra = [k for k in missing if k not in page_keys and k not in email_keys]

print(f'\nPage-specific keys: {len(page_keys)}')
print(f'Common email UI keys: {len(email_keys)}')
print(f'Extra base keys (ZH-specific gaps): {len(extra)}')
print('\n--- Extra base keys ---')
for k in extra:
    print(k)
