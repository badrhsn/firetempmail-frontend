<script>
    import { _ } from 'svelte-i18n';
    let copyrightYear = new Date().getFullYear();
</script>

<svelte:head>
    <title>{$_('privacy.metaTitle')}</title>
    <meta name="description" content={$_('privacy.metaDescription')}>
    <meta name="robots" content="index, follow">
        <link rel="canonical" href="https://firetempmail.com/privacy-policy" />

</svelte:head>

<section class="py-4 py-xl-5">
    <div class="container" style="max-width: 800px;">
        <div class="text-center p-4 p-lg-5">
            <h1 class="text-start" style="font-family: 'Inter Tight', sans-serif;font-weight: 600;margin-bottom: 16px;">
                <span style="font-weight: normal !important; color: rgb(255, 255, 255);">📮&nbsp;</span>
                {$_('privacy.title')}
            </h1>
            
            <div class="text-start">
                <h2>{$_('privacy.introduction.title')}</h2>
                <p>
                    {@html $_('privacy.introduction.text')}
                </p>

                <h3>{$_('privacy.infoCollect.title')}</h3>
                <p>{$_('privacy.infoCollect.intro')}</p>
                <ul>
                    {#each $_('privacy.infoCollect.items') as item}
                        <li>{item}</li>
                    {/each}
                </ul>

                <h3>{$_('privacy.infoUse.title')}</h3>
                <p>{$_('privacy.infoUse.intro')}</p>
                <ul>
                    {#each $_('privacy.infoUse.items') as item}
                        <li>{item}</li>
                    {/each}
                </ul>

                <h3>{$_('privacy.dataRetention.title')}</h3>
                <p>
                    {$_('privacy.dataRetention.text')}
                </p>

                <h3>{$_('privacy.cookies.title')}</h3>
                <p>
                    {$_('privacy.cookies.intro')}
                </p>
                <ul>
                    {#each $_('privacy.cookies.items') as item}
                        <li>{item}</li>
                    {/each}
                </ul>
                <p>
                    {$_('privacy.cookies.note')}
                </p>

                <h3>{$_('privacy.thirdParty.title')}</h3>
                <p>
                    {$_('privacy.thirdParty.text')}
                </p>

                <h3>{$_('privacy.ads.title')}</h3>
                <p>
                    {$_('privacy.ads.text')}
                </p>

                <h3>{$_('privacy.security.title')}</h3>
                <p>
                    {$_('privacy.security.text')}
                </p>

                <h3>{$_('privacy.children.title')}</h3>
                <p>
                    {$_('privacy.children.text')}
                </p>

                <h3>{$_('privacy.userRights.title')}</h3>
                <p>
                    {$_('privacy.userRights.text')}
                </p>

                <h3>{$_('privacy.international.title')}</h3>
                <p>
                    {$_('privacy.international.text')}
                </p>

                <h3>{$_('privacy.changes.title')}</h3>
                <p>
                    {$_('privacy.changes.text')}
                </p>

                <h3>{$_('privacy.contact.title')}</h3>
                <p>
                    {$_('privacy.contact.text')}<br/>
                    {$_('privacy.contact.email')}
                </p>
            </div>
        </div>
    </div>
</section>

<style>
           /* Footer Styles */
        .footer {
            background-color: #22242b;
            color: #a7a7aa;
            padding: 40px 0 20px;
        }
        .footer a {
            color: #a7a7aa;
            text-decoration: none;
            transition: color 0.3s;
        }
        .footer a:hover {
            color: #3498db;
        }
        .footer-title {
            font-weight: 700;
            margin-bottom: 20px;
            font-size: 1.3rem;
            color: #a7a7aa;
        }
        .footer-links {
            list-style: none;
            padding: 0;
            line-height: 2.2;
        }
        .footer-links li {
            margin-bottom: 8px;
        }
        .divider {
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            margin: 30px 0 20px;
        }
        .donation-section {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
        }
        .donation-options {
            display: flex;
            justify-content: center;
            margin-top: 15px;
        }
        .kofi-qr {
            text-align: center;
            margin-top: 15px;
        }
        .kofi-qr img {
            max-width: 150px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .kofi-text {
            font-size: 0.9rem;
            margin-top: 10px;
        }
        .copyright {
            font-size: 0.9rem;
            opacity: 0.8;
        }
        .social-icons {
            font-size: 1.5rem;
            margin-top: 15px;
        }
        .social-icons a {
            margin-right: 15px;
        }
        .counter {
            color: rgb(255,255,255);
            background: rgb(33,37,41);
            border-radius: 10px;
            padding: 4px 12px;
            font-size: 14px;
            margin: 0 2px;
            font-family: monospace;
        }
    h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: var(--bs-dark);
    }
    
    h3 {
        font-size: 1.5rem;
        margin: 1.5rem 0 0.5rem 0;
        color: var(--bs-dark);
    }
    
    p, li {
        margin-bottom: 1rem;
        line-height: 1.6;
    }
    
    ul {
        margin-left: 1.5rem;
        list-style: disc;
    }
</style>
