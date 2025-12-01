<script>
    import { _ } from 'svelte-i18n';
    let copyrightYear = new Date().getFullYear();
</script>

<svelte:head>
    <title>{$_('terms.metaTitle')}</title>
    
    <meta name="description" content={$_('terms.metaDescription')}>
    <meta name="keywords" content="Terms of Service, temp mail, disposable email, email privacy, email security, Fire Temp Mail">
    <meta name="robots" content="index, follow">

    <!-- Canonical URL -->
    <link rel="canonical" href="https://firetempmail.com/terms" />

</svelte:head>


<section class="py-4 py-xl-5">
    <div class="container" style="max-width: 800px;">
        <div class="text-center p-4 p-lg-5">
            <!-- Header -->
            <h1 class="text-start" style="font-family: 'Inter Tight', sans-serif;font-weight: 600;margin-bottom: 16px;">
                <span style="font-weight: normal !important; color: rgb(255, 255, 255);">📮&nbsp;</span>
                {$_('terms.title')}
            </h1>
            
            <div class="text-start">
                <h2>{$_('terms.introduction.title')}</h2>
                <p>
                    {@html $_('terms.introduction.text')}
                </p>

                <h3>{$_('terms.privacy.title')}</h3>
                <p>
                    {@html $_('terms.privacy.text')}
                </p>

                <h3>{$_('terms.serviceDesc.title')}</h3>
                <p>
                    {$_('terms.serviceDesc.text')}
                </p>

                <h3>{$_('terms.acceptableUse.title')}</h3>
                <p>
                    {$_('terms.acceptableUse.intro')}
                </p>
                <ul>
                    {#each $_('terms.acceptableUse.items') as item}
                        <li>{item}</li>
                    {/each}
                </ul>

                <h3>{$_('terms.dataStorage.title')}</h3>
                <p>
                    {$_('terms.dataStorage.text1')}
                </p>
                <p>
                    {$_('terms.dataStorage.text2')}
                </p>

                <h3>{$_('terms.premium.title')}</h3>
                <p>
                    {$_('terms.premium.intro')}
                </p>
                <ul>
                    {#each $_('terms.premium.features') as feature}
                        <li>{feature}</li>
                    {/each}
                </ul>
                <p>
                    {$_('terms.premium.billing')}
                </p>

                <h3>Limitations of Liability</h3>
                <p>
                    Fire Temp Mail is provided “as is” without warranties of any kind. We do not guarantee that:
                </p>
                <ul>
                    <li>Emails will always be delivered, stored, or accessible.</li>
                    <li>Domains will remain unchanged or available indefinitely.</li>
                    <li>Messages will remain unaltered or free from malware.</li>
                </ul>
                <p>
                    You agree to hold us harmless from any damages, losses, or claims arising out of your 
                    use of the service, including loss of emails or consequences of relying on temporary addresses.
                </p>

                <h3>Changes to Terms</h3>
                <p>
                    We reserve the right to update or revise these Terms at any time. Material changes will 
                    be posted on this page with a revised “last updated” date. Continued use of the service 
                    after changes indicates acceptance of the updated Terms.
                </p>

                <h3>Contact Information</h3>
                <p>
                    If you have any questions about these Terms, please contact us at:<br/>
                    Email: support@firetempmail.com
                </p>
            </div>
        </div>
    </div>
</section>

<style>
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
