#!/usr/bin/env python3
"""Replace SEO article sections in remaining product pages with $_() i18n calls."""
import os, re

BASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'src/routes')

# Define the translated SEO section for each page using ONLY existing en.json keys
SEO_SECTIONS = {
    'gmail-generator': '''            <section aria-labelledby="gmail-gen-seo" class="seo-article" style="margin-top: 3rem; padding: 2rem; background: rgba(255,255,255,0.05); border-radius: 12px;">
                <h2 id="gmail-gen-seo">{$_('gmailGeneratorPage.seoTitle')}</h2>
                <p>{$_('gmailGeneratorPage.seoP1')}</p>

                <h3>{$_('gmailGeneratorPage.howItWorksTitle')}</h3>
                <p>{$_('gmailGeneratorPage.howItWorksP1')}</p>
            </section>''',

    'temporary-gmail': '''            <section aria-labelledby="temp-gmail-seo" class="seo-article" style="margin-top: 3rem; padding: 2rem; background: rgba(255,255,255,0.05); border-radius: 12px;">
                <h2 id="temp-gmail-seo">{$_('temporaryGmailPage.seoTitle')}</h2>
                <p>{$_('temporaryGmailPage.seoP1')}</p>

                <h3>{$_('temporaryGmailPage.benefitsTitle')}</h3>
                <p>{$_('temporaryGmailPage.benefitsP1')}</p>
            </section>''',

    'temp-mail-edu': '''            <section aria-labelledby="temp-mail-edu-seo" class="seo-article" style="margin-top: 3rem; padding: 2rem; background: rgba(255,255,255,0.05); border-radius: 12px;">
                <h2 id="temp-mail-edu-seo">{$_('tempMailEduPage.seoTitle')}</h2>
                <p>{$_('tempMailEduPage.seoP1')}</p>
            </section>''',

    '10minutemail': '''            <section aria-labelledby="ten-min-mail-seo" class="seo-article" style="margin-top: 3rem; padding: 2rem; background: rgba(255,255,255,0.05); border-radius: 12px;">
                <h2 id="ten-min-mail-seo">{$_('tenMinuteMailPage.seoTitle')}</h2>
                <p>{$_('tenMinuteMailPage.seoP1')}</p>

                <h3>{$_('tenMinuteMailPage.howTitle')}</h3>
                <p>{$_('tenMinuteMailPage.howP1')}</p>

                <h3>{$_('tenMinuteMailPage.whyTitle')}</h3>
                <p>{$_('tenMinuteMailPage.whyP1')}</p>

                <h3>{$_('tenMinuteMailPage.vsTitle')}</h3>
                <p>{$_('tenMinuteMailPage.vsP1')}</p>
            </section>''',

    'temporary-email-generator': '''            <section aria-labelledby="temp-email-gen-seo" class="seo-article" style="margin-top: 3rem; padding: 2rem; background: rgba(255,255,255,0.05); border-radius: 12px;">
                <h2 id="temp-email-gen-seo">{$_('temporaryEmailGenPage.seoTitle')}</h2>
                <p>{$_('temporaryEmailGenPage.seoP1')}</p>
            </section>''',

    'fire-mail': '''            <section aria-labelledby="fire-mail-seo" class="seo-article" style="margin-top: 3rem; padding: 2rem; background: rgba(255,255,255,0.05); border-radius: 12px;">
                <h2 id="fire-mail-seo">{$_('fireMailPage.seoTitle')}</h2>
                <p>{$_('fireMailPage.seoP1')}</p>
            </section>''',

    'gmailnator-alternative': '''            <section aria-labelledby="gmailnator-seo" class="seo-article" style="margin-top: 3rem; padding: 2rem; background: rgba(255,255,255,0.05); border-radius: 12px;">
                <h2 id="gmailnator-seo">{$_('gmailnatorPage.seoTitle')}</h2>
                <p>{$_('gmailnatorPage.seoP1')}</p>
            </section>''',
}

for page_dir, new_section in SEO_SECTIONS.items():
    filepath = os.path.join(BASE, page_dir, '+page.svelte')
    if not os.path.exists(filepath):
        print(f'SKIP: {filepath}')
        continue
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Find and replace the seo-article section
    # Pattern: <section ... class="seo-article" ...> ... </section>
    pattern = r'(<\s*section[^>]*class="seo-article"[^>]*>)(.*?)(</section>)'
    match = re.search(pattern, content, re.DOTALL)
    
    if match:
        old_section = match.group(0)
        content = content.replace(old_section, new_section, 1)
        with open(filepath, 'w') as f:
            f.write(content)
        old_lines = old_section.count('\n')
        new_lines = new_section.count('\n')
        print(f'Updated {page_dir}: replaced {old_lines} lines → {new_lines} lines')
    else:
        print(f'WARNING: No seo-article section found in {page_dir}')
