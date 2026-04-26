<script>
    import { _ } from 'svelte-i18n';
    import Hreflang from '$lib/components/Hreflang.svelte';
import Breadcrumb from '$lib/components/Breadcrumb.svelte';
    export let data;
    let copyrightYear = new Date().getFullYear();
</script>

<Hreflang path="/privacy-policy" />
<svelte:head>
    <title>{$_('privacy.metaTitle')}</title>
    <meta name="description" content={$_('privacy.metaDescription')}>
    <meta name="robots" content="index, follow">
    <link rel="canonical" href={data?.seo?.canonical || 'https://firetempmail.com/privacy-policy'} />
    <meta property="og:title" content={$_('privacy.metaTitle')} />
    <meta property="og:description" content={$_('privacy.metaDescription')} />
    <meta property="og:url" content="https://firetempmail.com/privacy-policy" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Fire Temp Mail" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:image" content="https://firetempmail.com/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={$_('privacy.metaTitle')} />
    <meta name="twitter:description" content={$_('privacy.metaDescription')} />
    <meta name="twitter:image" content="https://firetempmail.com/og-image.png" />
    <meta name="twitter:site" content="@firetempmail" />
    <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
    {@html '<script type="application/ld+json">' + JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://firetempmail.com/" },
        { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://firetempmail.com/privacy-policy" }
      ]
    }) + '</script>'}
</svelte:head>
<div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <Breadcrumb items={[{name: "Home", href: "/"}, {name: "Privacy Policy", href: "/privacy-policy"}]} />
</div>

<section class="py-4 py-xl-5">
    <div class="container" style="max-width: 1000px;">
        <div class="p-4 p-lg-5">
            <h1 class="text-start mb-4">{$_('privacy.title')}</h1>
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
                <p class="text-muted"><small>© {copyrightYear} Fire Temp Mail</small></p>
            </div>
        </div>
    </div>
</section>

<style>
    .container { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif; line-height: 1.6; color: #333; }
    h1 { font-size: 2.5rem; font-weight: 700; margin-bottom: 1.5rem; color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
    h2 { font-size: 1.8rem; font-weight: 600; margin: 2rem 0 1rem 0; color: #2c3e50; padding-top: 10px; }
    h3 { font-size: 1.3rem; font-weight: 600; margin: 1.5rem 0 0.5rem 0; color: #34495e; }
    p { margin-bottom: 1rem; line-height: 1.6; }
    ul { margin-left: 1.5rem; margin-bottom: 1rem; list-style: disc; }
    li { margin-bottom: 0.5rem; line-height: 1.5; }
    strong { color: #2c3e50; }
    hr { border: 0; height: 1px; background: linear-gradient(to right, transparent, #3498db, transparent); margin: 2rem 0; }
    a { color: #3498db; text-decoration: none; }
    a:hover { text-decoration: underline; }
    @media (max-width: 768px) {
        h1 { font-size: 2rem; }
        h2 { font-size: 1.5rem; }
        h3 { font-size: 1.2rem; }
        .container { padding: 15px; }
    }
</style>
