#!/usr/bin/env python3
"""
Replace hardcoded English text in all 12 product pages with $_() i18n calls.
Handles both common email UI strings and page-specific SEO content.
"""
import os, re

BASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'src/routes')

# Map of page directory name -> translation key prefix
PAGE_MAP = {
    'email-generator': 'emailGeneratorPage',
    'temp-gmail': 'tempGmailPage',
    'burner-email': 'burnerEmailPage',
    'edu-email-generator': 'eduEmailPage',
    'best-temp-mail': 'bestTempMailPage',
    'gmail-generator': 'gmailGeneratorPage',
    'temporary-gmail': 'temporaryGmailPage',
    'temp-mail-edu': 'tempMailEduPage',
    '10minutemail': 'tenMinuteMailPage',
    'temporary-email-generator': 'temporaryEmailGenPage',
    'fire-mail': 'fireMailPage',
    'gmailnator-alternative': 'gmailnatorPage',
}

# Common UI string replacements (apply to ALL pages)
# Format: (old_string, new_string)
COMMON_REPLACEMENTS = [
    # Button labels
    ('                        Generate New\n', '                        {$_(\'email.generateNew\')}\n'),
    ('                        Change Domain\n', '                        {$_(\'email.changeDomain\')}\n'),
    ('                        Refresh Page\n', '                        {$_(\'email.refreshPage\')}\n'),
    ('                        Custom Alias\n', '                        {$_(\'email.useCustomAlias2\')}\n'),
    # Generate Custom Email button
    ('                        Generate Custom Email\n', '                        {$_(\'email.generateCustomEmail\')}\n'),
    ('                    Generate Custom Email\n', '                    {$_(\'email.generateCustomEmail\')}\n'),
    # Loading states
    ('                    <span>Waiting for incoming emails</span>\n', '                    <span>{$_(\'email.waitingForEmails\')}</span>\n'),
    ('                    <span>Automatic refresh stopped</span>\n', '                    <span>{$_(\'email.refreshStopped\')}</span>\n'),
    # Empty inbox
    ('                        <p>Your inbox is empty</p>\n', '                        <p>{$_(\'email.inboxEmpty\')}</p>\n'),
    # Copy to clipboard title
    ('title="Copy to clipboard"', 'title={$_(\'email.copyToClipboard\')}'),
    # title attributes
    ('title="Change domain"', 'title={$_(\'email.changeDomain\')}'),
    ('title="Refresh page"', 'title={$_(\'email.refreshPage\')}'),
    ('title="Use custom alias"', 'title={$_(\'email.useCustomAlias2\')}'),
]

# Page-specific H1 replacements (unique per page)
H1_MAP = {
    'email-generator': {
        'old_h1': 'Fire Temp Mail – Your Free Temporary Disposable Email Generator',
        'old_lead': 'Instantly generate a disposable Email Generator address. Keep your real email address private and your inbox clean from unwanted messages and spam.',
    },
    'temp-gmail': {
        'old_h1': None,  # Will be found by pattern
        'old_lead': None,
    },
}

def process_common_replacements(content):
    """Apply common UI string replacements."""
    count = 0
    for old, new in COMMON_REPLACEMENTS:
        if old in content:
            content = content.replace(old, new, 1)
            count += 1
    return content, count

def replace_h1_and_lead(content, page_key):
    """Replace the H1 and lead paragraph with $_() calls."""
    # Pattern: Find h1 content between <h1> tags (with span emoji prefix)
    # Replace the text after the emoji span
    h1_pattern = r'(<h1>\s*<span>[^<]+</span>\s*)([^<\n]+(?:\n[^<\n]+)*?)(\s*</h1>)'
    
    def h1_repl(m):
        return m.group(1) + '{$_(\'' + page_key + '.h1\')}' + m.group(3)
    
    content, n = re.subn(h1_pattern, h1_repl, content, count=1)
    
    # Replace lead paragraph
    lead_pattern = r'(<p class="lead">\s*)([^<]+(?:\n\s+[^<]+)*)(\s*</p>)'
    
    def lead_repl(m):
        return m.group(1) + '{$_(\'' + page_key + '.lead\')}' + m.group(3)
    
    content, n2 = re.subn(lead_pattern, lead_repl, content, count=1)
    
    return content

def process_file(page_dir, page_key):
    """Process a single product page file."""
    filepath = os.path.join(BASE, page_dir, '+page.svelte')
    if not os.path.exists(filepath):
        print(f'  SKIP: {filepath} not found')
        return
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    original = content
    
    # 1. Apply common UI replacements
    content, common_count = process_common_replacements(content)
    
    # 2. Replace H1 and lead
    content = replace_h1_and_lead(content, page_key)
    
    # 3. Check if $_ import exists, add if not
    if "import { _ } from 'svelte-i18n'" not in content and 'import { _ } from "svelte-i18n"' not in content:
        # Add import after first import
        content = content.replace("import { onMount } from \"svelte\";", 
                                  "import { onMount } from \"svelte\";\n    import { _ } from 'svelte-i18n';", 1)
    
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f'  Updated: {page_dir} ({common_count} common replacements + H1/lead)')
    else:
        print(f'  No changes: {page_dir}')

# Process all pages
print('Processing product pages...\n')
for page_dir, page_key in PAGE_MAP.items():
    process_file(page_dir, page_key)

print('\nDone!')
