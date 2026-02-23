#!/usr/bin/env python3
"""
Replace hardcoded content in about, terms, and privacy-policy pages with $_() i18n calls.
"""

import os

BASE = "src/routes"

# ==================== ABOUT PAGE ====================
about_page = '''<script>
    import { _ } from 'svelte-i18n';
    import Hreflang from '$lib/components/Hreflang.svelte';
    
    export let data;
    
    let copyrightYear = new Date().getFullYear();
</script>

<Hreflang path="/about" />
<svelte:head>
    <title>{$_('about.metaTitle')}</title>
    <meta name="description" content={$_('about.metaDescription')}>
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://firetempmail.com/about">

    <!-- Open Graph -->
    <meta property="og:title" content={$_('about.metaTitle')} />
    <meta property="og:description" content={$_('about.metaDescription')} />
    <meta property="og:url" content="https://firetempmail.com/about" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Fire Temp Mail" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={$_('about.metaTitle')} />
    <meta name="twitter:description" content={$_('about.metaDescription')} />

    <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />

    <!-- BreadcrumbList Schema -->
    {{'@html \\'<script type="application/ld+json">\\' + JSON.stringify({{"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://firetempmail.com/" }}, {{ "@type": "ListItem", "position": 2, "name": "About", "item": "https://firetempmail.com/about" }}]}}) + \\'</script>\\'}}
</svelte:head>

<section class="py-5">
    <div class="container" style="max-width: 900px;">
        <div class="about-header text-center mb-5">
            <h1 class="display-4 fw-bold mb-3">{$_('about.title')}</h1>
            <p class="lead text-muted">
                {$_('about.subtitle')}
            </p>
        </div>

        <div class="content-section">
            <h2 class="section-title">{$_('about.missionTitle')}</h2>
            <p class="mb-4">{$_('about.missionP1')}</p>
            <p class="mb-4">{$_('about.missionP2')}</p>

            <h2 class="section-title mt-5">{$_('about.whatWeDoTitle')}</h2>
            <p class="mb-4">{$_('about.whatWeDoP1')}</p>
            
            <div class="feature-boxes">
                <div class="feature-box">
                    <div class="feature-icon">\\u26A1</div>
                    <h3>{$_('about.whatWeDo1')}</h3>
                </div>
                
                <div class="feature-box">
                    <div class="feature-icon">\\uD83D\\uDCE9</div>
                    <h3>{$_('about.whatWeDo2')}</h3>
                </div>
                
                <div class="feature-box">
                    <div class="feature-icon">\\uD83C\\uDF10</div>
                    <h3>{$_('about.whatWeDo3')}</h3>
                </div>

                <div class="feature-box">
                    <div class="feature-icon">\\u2709\\uFE0F</div>
                    <h3>{$_('about.whatWeDo4')}</h3>
                </div>

                <div class="feature-box">
                    <div class="feature-icon">\\uD83D\\uDCE7</div>
                    <h3>{$_('about.whatWeDo5')}</h3>
                </div>

                <div class="feature-box">
                    <div class="feature-icon">\\uD83D\\uDDD1\\uFE0F</div>
                    <h3>{$_('about.whatWeDo6')}</h3>
                </div>
            </div>

            <h2 class="section-title mt-5">{$_('about.whyTitle')}</h2>
            <p class="mb-4">{$_('about.whyP1')}</p>
            
            <div class="use-case-section">
                <div class="use-case-item">
                    <p>\\u2705 {$_('about.why1')}</p>
                </div>
                <div class="use-case-item">
                    <p>\\u2705 {$_('about.why2')}</p>
                </div>
                <div class="use-case-item">
                    <p>\\u2705 {$_('about.why3')}</p>
                </div>
                <div class="use-case-item">
                    <p>\\u2705 {$_('about.why4')}</p>
                </div>
                <div class="use-case-item">
                    <p>\\u2705 {$_('about.why5')}</p>
                </div>
            </div>

            <h2 class="section-title mt-5">{$_('about.valuesTitle')}</h2>
            
            <h3 class="subsection-title">{$_('about.value1Title')}</h3>
            <p class="mb-4">{$_('about.value1Text')}</p>

            <h3 class="subsection-title">{$_('about.value2Title')}</h3>
            <p class="mb-4">{$_('about.value2Text')}</p>

            <h3 class="subsection-title">{$_('about.value3Title')}</h3>
            <p class="mb-4">{$_('about.value3Text')}</p>

            <h3 class="subsection-title">{$_('about.value4Title')}</h3>
            <p class="mb-4">{$_('about.value4Text')}</p>

            <h2 class="section-title mt-5">{$_('about.futureTitle')}</h2>
            <p class="mb-4">{$_('about.futureP1')}</p>
            <p class="mb-4">{$_('about.futureP2')}</p>

            <h2 class="section-title mt-5">{$_('about.contactTitle')}</h2>
            <p class="mb-4">{$_('about.contactP1')}</p>
            <ul class="contact-list mb-5">
                <li>\\uD83D\\uDCE7 <strong>{$_('about.contactEmail')}</strong> <a href="mailto:hello@firetempmail.com">hello@firetempmail.com</a></li>
                <li>\\uD83D\\uDD17 <strong>{$_('about.contactLink')}</strong> <a href="/contact">/contact</a></li>
            </ul>

            <div class="cta-box">
                <h3>{$_('about.title')}</h3>
                <p>{$_('about.subtitle')}</p>
                <a href="/" class="btn btn-primary btn-lg">{$_('nav.home')} \\u2192</a>
            </div>
        </div>
    </div>
</section>

<style>
    .about-header {
        padding: 2rem 0;
    }

    .content-section {
        background: white;
        padding: 3rem 2rem;
        border-radius: 12px;
        line-height: 1.8;
    }

    .section-title {
        font-size: 2rem;
        font-weight: 700;
        color: #212529;
        margin-bottom: 1.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 3px solid #007bff;
        display: inline-block;
    }

    .subsection-title {
        font-size: 1.4rem;
        font-weight: 600;
        color: #495057;
        margin-top: 2rem;
        margin-bottom: 1rem;
    }

    .feature-boxes {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin: 2rem 0;
    }

    .feature-box {
        background: #f8f9fa;
        padding: 2rem;
        border-radius: 12px;
        text-align: center;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .feature-box:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    }

    .feature-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .feature-box h3 {
        font-size: 1.3rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: #212529;
    }

    .feature-box p {
        color: #6c757d;
        margin: 0;
        line-height: 1.6;
    }

    .use-case-section {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
        margin: 2rem 0;
    }

    .use-case-item {
        background: #e9f5ff;
        padding: 1.5rem;
        border-radius: 8px;
        border-left: 4px solid #007bff;
    }

    .use-case-item p {
        color: #495057;
        margin: 0;
    }

    .contact-list {
        background: #fff8e1;
        padding: 1.5rem 2rem;
        border-radius: 8px;
        list-style: none;
        border: 2px solid #ffc107;
    }

    .contact-list li {
        margin-bottom: 1rem;
        color: #495057;
    }

    .contact-list a {
        color: #007bff;
        text-decoration: none;
        font-weight: 500;
    }

    .contact-list a:hover {
        text-decoration: underline;
    }

    .cta-box {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 3rem 2rem;
        border-radius: 12px;
        text-align: center;
        margin-top: 3rem;
    }

    .cta-box h3 {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1rem;
    }

    .cta-box p {
        font-size: 1.2rem;
        margin-bottom: 2rem;
        opacity: 0.9;
    }

    .cta-box .btn {
        background: white;
        color: #667eea;
        padding: 1rem 2.5rem;
        font-weight: 600;
        border: none;
        border-radius: 8px;
        text-decoration: none;
        display: inline-block;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .cta-box .btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    }

    @media (max-width: 768px) {
        .content-section {
            padding: 2rem 1rem;
        }

        .section-title {
            font-size: 1.5rem;
        }

        .subsection-title {
            font-size: 1.2rem;
        }

        .feature-boxes {
            grid-template-columns: 1fr;
        }

        .use-case-section {
            grid-template-columns: 1fr;
        }

        .cta-box {
            padding: 2rem 1rem;
        }

        .cta-box h3 {
            font-size: 1.5rem;
        }

        .cta-box p {
            font-size: 1rem;
        }
    }
</style>
'''

# ==================== TERMS PAGE ====================
terms_page = '''<script>
    import { _ } from 'svelte-i18n';
    import Hreflang from '$lib/components/Hreflang.svelte';
    
    export let data;
    
    let copyrightYear = new Date().getFullYear();
</script>

<Hreflang path="/terms" />
<svelte:head>
    <title>{$_('terms.metaTitle')}</title>
    <meta name="description" content={$_('terms.metaDescription')}>
    <meta name="robots" content="index, follow">
    <link rel="canonical" href={data?.seo?.canonical || 'https://firetempmail.com/terms'} />

    <!-- Open Graph -->
    <meta property="og:title" content={$_('terms.metaTitle')} />
    <meta property="og:description" content={$_('terms.metaDescription')} />
    <meta property="og:url" content="https://firetempmail.com/terms" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Fire Temp Mail" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={$_('terms.metaTitle')} />
    <meta name="twitter:description" content={$_('terms.metaDescription')} />

    <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />

    <!-- BreadcrumbList Schema -->
    {@html '<script type="application/ld+json">' + JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://firetempmail.com/" },
        { "@type": "ListItem", "position": 2, "name": "Terms of Service", "item": "https://firetempmail.com/terms" }
      ]
    }) + '</script>'}
</svelte:head>

<section class="py-4 py-xl-5">
    <div class="container" style="max-width: 1000px;">
        <div class="p-4 p-lg-5">
            <h1 class="text-start mb-4">
                {$_('terms.title')}
            </h1>
            
            <div class="text-start">

                <h2>1. {$_('terms.introduction.title')}</h2>
                <p>{$_('terms.introduction.text')}</p>

                <h2>2. {$_('terms.privacy.title')}</h2>
                <p>{@html $_('terms.privacy.text')}</p>

                <h2>3. {$_('terms.serviceDesc.title')}</h2>
                <p>{$_('terms.serviceDesc.text')}</p>

                <h2>4. {$_('terms.acceptableUse.title')}</h2>
                <p>{$_('terms.acceptableUse.intro')}</p>
                <ul>
                    <li>{$_('terms.acceptableUse.items.0')}</li>
                    <li>{$_('terms.acceptableUse.items.1')}</li>
                    <li>{$_('terms.acceptableUse.items.2')}</li>
                    <li>{$_('terms.acceptableUse.items.3')}</li>
                </ul>

                <h2>5. {$_('terms.dataStorage.title')}</h2>
                <p>{$_('terms.dataStorage.text1')}</p>
                <p>{$_('terms.dataStorage.text2')}</p>

                <h2>6. {$_('terms.premium.title')}</h2>
                <p>{$_('terms.premium.intro')}</p>
                <ul>
                    <li>{$_('terms.premium.features.0')}</li>
                    <li>{$_('terms.premium.features.1')}</li>
                    <li>{$_('terms.premium.features.2')}</li>
                    <li>{$_('terms.premium.features.3')}</li>
                    <li>{$_('terms.premium.features.4')}</li>
                </ul>
                <p>{$_('terms.premium.billing')}</p>

                <h2>7. {$_('terms.liability.title')}</h2>
                <p>{$_('terms.liability.intro')}</p>
                <ul>
                    <li>{$_('terms.liability.items.0')}</li>
                    <li>{$_('terms.liability.items.1')}</li>
                    <li>{$_('terms.liability.items.2')}</li>
                </ul>
                <p>{$_('terms.liability.disclaimer')}</p>

                <h2>8. {$_('terms.changes.title')}</h2>
                <p>{$_('terms.changes.text')}</p>

                <h2>9. {$_('terms.contact.title')}</h2>
                <p>{$_('terms.contact.text')}</p>
                <ul>
                    <li><strong>{$_('terms.contact.email')}</strong></li>
                </ul>

                <hr class="my-4">

                <p class="text-muted"><small>&copy; {copyrightYear} Fire Temp Mail</small></p>
            </div>
        </div>
    </div>
</section>

<style>
    .container {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        line-height: 1.6;
        color: #333;
    }
    
    h1 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        color: #2c3e50;
        border-bottom: 3px solid #3498db;
        padding-bottom: 10px;
    }
    
    h2 {
        font-size: 1.8rem;
        font-weight: 600;
        margin: 2rem 0 1rem 0;
        color: #2c3e50;
        padding-top: 10px;
    }
    
    h3 {
        font-size: 1.3rem;
        font-weight: 600;
        margin: 1.5rem 0 0.5rem 0;
        color: #34495e;
    }
    
    p {
        margin-bottom: 1rem;
        line-height: 1.6;
    }
    
    ul {
        margin-left: 1.5rem;
        margin-bottom: 1rem;
        list-style: disc;
    }
    
    li {
        margin-bottom: 0.5rem;
        line-height: 1.5;
    }
    
    strong {
        color: #2c3e50;
    }
    
    hr {
        border: 0;
        height: 1px;
        background: linear-gradient(to right, transparent, #3498db, transparent);
        margin: 2rem 0;
    }
    
    a {
        color: #3498db;
        text-decoration: none;
    }
    
    a:hover {
        text-decoration: underline;
    }
    
    @media (max-width: 768px) {
        h1 {
            font-size: 2rem;
        }
        
        h2 {
            font-size: 1.5rem;
        }
        
        h3 {
            font-size: 1.2rem;
        }
        
        .container {
            padding: 15px;
        }
    }
</style>
'''

# ==================== PRIVACY POLICY PAGE ====================
privacy_page = '''<script>
    import { _ } from 'svelte-i18n';
    import Hreflang from '$lib/components/Hreflang.svelte';
    
    export let data;
    
    let copyrightYear = new Date().getFullYear();
</script>

<Hreflang path="/privacy-policy" />
<svelte:head>
    <title>{$_('privacy.metaTitle')}</title>
    <meta name="description" content={$_('privacy.metaDescription')}>
    <meta name="robots" content="index, follow">
    <link rel="canonical" href={data?.seo?.canonical || 'https://firetempmail.com/privacy-policy'} />

    <!-- Open Graph -->
    <meta property="og:title" content={$_('privacy.metaTitle')} />
    <meta property="og:description" content={$_('privacy.metaDescription')} />
    <meta property="og:url" content="https://firetempmail.com/privacy-policy" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Fire Temp Mail" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={$_('privacy.metaTitle')} />
    <meta name="twitter:description" content={$_('privacy.metaDescription')} />

    <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />

    <!-- BreadcrumbList Schema -->
    {@html '<script type="application/ld+json">' + JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://firetempmail.com/" },
        { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://firetempmail.com/privacy-policy" }
      ]
    }) + '</script>'}
</svelte:head>

<section class="py-4 py-xl-5">
    <div class="container" style="max-width: 1000px;">
        <div class="p-4 p-lg-5">
            <h1 class="text-start mb-4">
                {$_('privacy.title')}
            </h1>
            
            <div class="text-start">

                <h2>1. {$_('privacy.introduction.title')}</h2>
                <p>{$_('privacy.introduction.text')}</p>

                <h2>2. {$_('privacy.infoCollect.title')}</h2>
                <p>{$_('privacy.infoCollect.intro')}</p>
                <ul>
                    <li>{$_('privacy.infoCollect.items.0')}</li>
                    <li>{$_('privacy.infoCollect.items.1')}</li>
                    <li>{$_('privacy.infoCollect.items.2')}</li>
                    <li>{$_('privacy.infoCollect.items.3')}</li>
                </ul>

                <h2>3. {$_('privacy.infoUse.title')}</h2>
                <p>{$_('privacy.infoUse.intro')}</p>
                <ul>
                    <li>{$_('privacy.infoUse.items.0')}</li>
                    <li>{$_('privacy.infoUse.items.1')}</li>
                    <li>{$_('privacy.infoUse.items.2')}</li>
                    <li>{$_('privacy.infoUse.items.3')}</li>
                </ul>

                <h2>4. {$_('privacy.dataRetention.title')}</h2>
                <p>{$_('privacy.dataRetention.text')}</p>

                <h2>5. {$_('privacy.cookies.title')}</h2>
                <p>{$_('privacy.cookies.intro')}</p>
                <ul>
                    <li>{$_('privacy.cookies.items.0')}</li>
                    <li>{$_('privacy.cookies.items.1')}</li>
                </ul>
                <p>{$_('privacy.cookies.note')}</p>

                <h2>6. {$_('privacy.thirdParty.title')}</h2>
                <p>{$_('privacy.thirdParty.text')}</p>

                <h2>7. {$_('privacy.ads.title')}</h2>
                <p>{$_('privacy.ads.text')}</p>

                <h2>8. {$_('privacy.security.title')}</h2>
                <p>{$_('privacy.security.text')}</p>

                <h2>9. {$_('privacy.children.title')}</h2>
                <p>{$_('privacy.children.text')}</p>

                <h2>10. {$_('privacy.userRights.title')}</h2>
                <p>{$_('privacy.userRights.text')}</p>

                <h2>11. {$_('privacy.international.title')}</h2>
                <p>{$_('privacy.international.text')}</p>

                <h2>12. {$_('privacy.changes.title')}</h2>
                <p>{$_('privacy.changes.text')}</p>

                <h2>13. {$_('privacy.contact.title')}</h2>
                <p>{$_('privacy.contact.text')}</p>
                <ul>
                    <li><strong>{$_('privacy.contact.email')}</strong></li>
                </ul>

                <hr class="my-4">

                <p class="text-muted"><small>&copy; {copyrightYear} Fire Temp Mail</small></p>
            </div>
        </div>
    </div>
</section>

<style>
    .container {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        line-height: 1.6;
        color: #333;
    }
    
    h1 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        color: #2c3e50;
        border-bottom: 3px solid #3498db;
        padding-bottom: 10px;
    }
    
    h2 {
        font-size: 1.8rem;
        font-weight: 600;
        margin: 2rem 0 1rem 0;
        color: #2c3e50;
        padding-top: 10px;
    }
    
    h3 {
        font-size: 1.3rem;
        font-weight: 600;
        margin: 1.5rem 0 0.5rem 0;
        color: #34495e;
    }
    
    p {
        margin-bottom: 1rem;
        line-height: 1.6;
    }
    
    ul {
        margin-left: 1.5rem;
        margin-bottom: 1rem;
        list-style: disc;
    }
    
    li {
        margin-bottom: 0.5rem;
        line-height: 1.5;
    }
    
    strong {
        color: #2c3e50;
    }
    
    hr {
        border: 0;
        height: 1px;
        background: linear-gradient(to right, transparent, #3498db, transparent);
        margin: 2rem 0;
    }
    
    a {
        color: #3498db;
        text-decoration: none;
    }
    
    a:hover {
        text-decoration: underline;
    }
    
    @media (max-width: 768px) {
        h1 {
            font-size: 2rem;
        }
        
        h2 {
            font-size: 1.5rem;
        }
        
        h3 {
            font-size: 1.2rem;
        }
        
        .container {
            padding: 15px;
        }
    }
</style>
'''

# Write the files
pages = {
    "about/+page.svelte": about_page,
    "terms/+page.svelte": terms_page,
    "privacy-policy/+page.svelte": privacy_page,
}

for path, content in pages.items():
    full_path = os.path.join(BASE, path)
    # Decode unicode escapes for emojis
    content = content.encode('utf-8').decode('unicode_escape').encode('latin-1').decode('utf-8')
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✅ Wrote {full_path}")

print("\nDone! All 3 content pages updated with $_() i18n calls.")
