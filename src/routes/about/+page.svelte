<script>
    import { _ } from 'svelte-i18n';
    import Hreflang from '$lib/components/Hreflang.svelte';
import Breadcrumb from '$lib/components/Breadcrumb.svelte';
    
    export let data;
    
    let copyrightYear = new Date().getFullYear();
</script>

<Hreflang path="/about" />
<svelte:head>
    <title>{$_('about.metaTitle')}</title>
    <meta name="description" content={$_('about.metaDescription')}>
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://firetempmail.com/about">

    <meta property="og:title" content={$_('about.metaTitle')} />
    <meta property="og:description" content={$_('about.metaDescription')} />
    <meta property="og:url" content="https://firetempmail.com/about" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Fire Temp Mail" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:image" content="https://firetempmail.com/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={$_('about.metaTitle')} />
    <meta name="twitter:description" content={$_('about.metaDescription')} />
    <meta name="twitter:image" content="https://firetempmail.com/og-image.png" />
    <meta name="twitter:site" content="@firetempmail" />

    <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />

    {@html '<script type="application/ld+json">' + JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://firetempmail.com/" },
        { "@type": "ListItem", "position": 2, "name": "About", "item": "https://firetempmail.com/about" }
      ]
    }) + '</script>'}
</svelte:head>
<div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <Breadcrumb items={[{name: "Home", href: "/"}, {name: "About", href: "/about"}]} />
</div>

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
                    <div class="feature-icon">⚡</div>
                    <h3>{$_('about.whatWeDo1')}</h3>
                </div>
                <div class="feature-box">
                    <div class="feature-icon">📩</div>
                    <h3>{$_('about.whatWeDo2')}</h3>
                </div>
                <div class="feature-box">
                    <div class="feature-icon">🌐</div>
                    <h3>{$_('about.whatWeDo3')}</h3>
                </div>
                <div class="feature-box">
                    <div class="feature-icon">✉️</div>
                    <h3>{$_('about.whatWeDo4')}</h3>
                </div>
                <div class="feature-box">
                    <div class="feature-icon">📧</div>
                    <h3>{$_('about.whatWeDo5')}</h3>
                </div>
                <div class="feature-box">
                    <div class="feature-icon">🗑️</div>
                    <h3>{$_('about.whatWeDo6')}</h3>
                </div>
            </div>

            <h2 class="section-title mt-5">{$_('about.whyTitle')}</h2>
            <p class="mb-4">{$_('about.whyP1')}</p>
            
            <div class="use-case-section">
                <div class="use-case-item">
                    <p>✅ {$_('about.why1')}</p>
                </div>
                <div class="use-case-item">
                    <p>✅ {$_('about.why2')}</p>
                </div>
                <div class="use-case-item">
                    <p>✅ {$_('about.why3')}</p>
                </div>
                <div class="use-case-item">
                    <p>✅ {$_('about.why4')}</p>
                </div>
                <div class="use-case-item">
                    <p>✅ {$_('about.why5')}</p>
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
                <li>📧 <strong>{$_('about.contactEmail')}</strong> <a href="mailto:hello@firetempmail.com">hello@firetempmail.com</a></li>
                <li>🔗 <strong>{$_('about.contactLink')}</strong> <a href="/contact">/contact</a></li>
            </ul>

            <div class="cta-box">
                <h3>{$_('about.title')}</h3>
                <p>{$_('about.subtitle')}</p>
                <a href="/" class="btn btn-primary btn-lg">{$_('nav.home')} →</a>
            </div>
        </div>
    </div>
</section>

<style>
    .about-header { padding: 2rem 0; }
    .content-section { background: white; padding: 3rem 2rem; border-radius: 12px; line-height: 1.8; }
    .section-title { font-size: 2rem; font-weight: 700; color: #212529; margin-bottom: 1.5rem; padding-bottom: 0.5rem; border-bottom: 3px solid #007bff; display: inline-block; }
    .subsection-title { font-size: 1.4rem; font-weight: 600; color: #495057; margin-top: 2rem; margin-bottom: 1rem; }
    .feature-boxes { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin: 2rem 0; }
    .feature-box { background: #f8f9fa; padding: 2rem; border-radius: 12px; text-align: center; transition: transform 0.3s ease, box-shadow 0.3s ease; }
    .feature-box:hover { transform: translateY(-5px); box-shadow: 0 8px 20px rgba(0,0,0,0.1); }
    .feature-icon { font-size: 3rem; margin-bottom: 1rem; }
    .feature-box h3 { font-size: 1.3rem; font-weight: 600; margin-bottom: 1rem; color: #212529; }
    .feature-box p { color: #6c757d; margin: 0; line-height: 1.6; }
    .use-case-section { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 2rem 0; }
    .use-case-item { background: #e9f5ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #007bff; }
    .use-case-item p { color: #495057; margin: 0; }
    .contact-list { background: #fff8e1; padding: 1.5rem 2rem; border-radius: 8px; list-style: none; border: 2px solid #ffc107; }
    .contact-list li { margin-bottom: 1rem; color: #495057; }
    .contact-list a { color: #007bff; text-decoration: none; font-weight: 500; }
    .contact-list a:hover { text-decoration: underline; }
    .cta-box { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 3rem 2rem; border-radius: 12px; text-align: center; margin-top: 3rem; }
    .cta-box h3 { font-size: 2rem; font-weight: 700; margin-bottom: 1rem; }
    .cta-box p { font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.9; }
    .cta-box .btn { background: white; color: #667eea; padding: 1rem 2.5rem; font-weight: 600; border: none; border-radius: 8px; text-decoration: none; display: inline-block; transition: transform 0.3s ease, box-shadow 0.3s ease; }
    .cta-box .btn:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.2); }
    @media (max-width: 768px) {
        .content-section { padding: 2rem 1rem; }
        .section-title { font-size: 1.5rem; }
        .subsection-title { font-size: 1.2rem; }
        .feature-boxes { grid-template-columns: 1fr; }
        .use-case-section { grid-template-columns: 1fr; }
        .cta-box { padding: 2rem 1rem; }
        .cta-box h3 { font-size: 1.5rem; }
        .cta-box p { font-size: 1rem; }
    }
</style>
