<script>
    import { onMount } from 'svelte';
    import { _ } from 'svelte-i18n';
    import { receivingEmail } from '$lib/stores';
    
    let copyrightYear = new Date().getFullYear();
    let stats = { count: '0' };
    
    // Fetch stats when component mounts
    async function fetchStats() {
        try {
            const email = $receivingEmail;
            if (!email) return;
            
            const url = 'https://mail.firetempmail.com';
            const response = await fetch(`${url}/mail/get?address=${encodeURIComponent(email)}`);
            const data = await response.json();
            
            if (data && data.stats) {
                stats = data.stats;
            }
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    }
    
    // Fetch stats on mount and when email changes
    onMount(() => {
        fetchStats();
    });
    
    $: if ($receivingEmail) {
        fetchStats();
    }
</script>

<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <!-- Brand Section -->
            <div class="footer-brand">
                <div class="footer-logo">
                    <span class="footer-logo-icon">🔥</span>
                    <span class="footer-logo-text">Fire Temp Mail</span>
                </div>
                <p class="footer-description">{$_('hero.description')}</p>
                <div class="footer-stats">
                    <span class="stat-number">{stats.count || '0'}</span> {$_('stats.emailsReceived').toLowerCase()}
                </div>
            </div>
            
            <!-- Links Grid -->
            <div class="footer-links-grid">
                <div class="footer-column">
                    <h6 class="footer-heading">{$_('footer.product')}</h6>
                    <ul class="footer-links">
                        <li><a href="/email-generator">{$_('footer.emailGenerator')}</a></li>
                        <li><a href="/gmail-generator">{$_('footer.gmailGenerator')}</a></li>
                        <li><a href="/temp-mail-edu">{$_('footer.tempMailEdu')}</a></li>
                        <li><a href="/10minutemail">{$_('footer.tenMinuteMail')}</a></li>
                    </ul>
                </div>
                
                <div class="footer-column">
                    <h6 class="footer-heading">{$_('footer.resources')}</h6>
                    <ul class="footer-links">
                        <li><a href="/blog">{$_('footer.blog')}</a></li>
                        <li><a href="/faq">{$_('footer.faq')}</a></li>
                    </ul>
                </div>
                
                <div class="footer-column">
                    <h6 class="footer-heading">{$_('footer.legal')}</h6>
                    <ul class="footer-links">
                        <li><a href="/privacy-policy">{$_('footer.privacy')}</a></li>
                        <li><a href="/terms">{$_('footer.terms')}</a></li>
                        <li><a href="/contact">{$_('footer.contact')}</a></li>
                    </ul>
                </div>
            </div>
        </div>
        
        <!-- Bottom Bar -->
        <div class="footer-bottom">
            <p class="copyright">© {copyrightYear} FireTempMail. {$_('footer.rights')}</p>
            <div class="footer-support">
                <a href="https://ko-fi.com/firetempmail" target="_blank" rel="noopener" class="support-link">
                    ☕ {$_('footer.buyCoffee')}
                </a>
            </div>
        </div>
    </div>
</footer>

<style>
    .footer {
        background: #ffffff;
        border-top: 1px solid #e2e8f0;
        padding: 60px 0 30px;
        margin-top: 80px;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 15px;
    }

    .footer-content {
        display: grid;
        grid-template-columns: 1.5fr 2fr;
        gap: 60px;
        margin-bottom: 40px;
    }

    /* Brand Section */
    .footer-brand {
        max-width: 400px;
    }

    .footer-logo {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 16px;
    }

    .footer-logo-icon {
        font-size: 24px;
    }

    .footer-logo-text {
        font-family: 'Inter Tight', sans-serif;
        font-weight: 700;
        font-size: 18px;
        color: #1a1a1a;
        letter-spacing: -0.3px;
    }

    .footer-description {
        color: #718096;
        font-size: 14px;
        line-height: 1.6;
        margin: 0 0 20px 0;
    }

    .footer-stats {
        display: inline-flex;
        align-items: center;
        background: #f7fafc;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 14px;
        color: #4a5568;
    }

    .stat-number {
        font-weight: 700;
        color: #1a1a1a;
        margin-right: 4px;
    }

    /* Links Grid */
    .footer-links-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 40px;
    }

    .footer-column {
        min-width: 0;
    }

    .footer-heading {
        font-weight: 600;
        font-size: 13px;
        color: #1a1a1a;
        margin-bottom: 16px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .footer-links {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .footer-links li {
        margin-bottom: 10px;
    }

    .footer-links a {
        color: #718096;
        text-decoration: none;
        font-size: 14px;
        transition: color 0.2s ease;
        display: inline-block;
    }

    .footer-links a:hover {
        color: #1a1a1a;
    }

    /* Bottom Bar */
    .footer-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 30px;
        border-top: 1px solid #e2e8f0;
    }

    .copyright {
        font-size: 13px;
        color: #a0aec0;
        margin: 0;
    }

    .footer-support {
        display: flex;
        gap: 20px;
        align-items: center;
    }

    .support-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        color: #1a1a1a;
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
        padding: 8px 16px;
        background: #f7fafc;
        border-radius: 8px;
        transition: all 0.2s ease;
    }

    .support-link:hover {
        background: #1a1a1a;
        color: #ffffff;
        transform: translateY(-1px);
    }

    /* Responsive */
    @media (max-width: 992px) {
        .footer-content {
            grid-template-columns: 1fr;
            gap: 40px;
        }

        .footer-links-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
        }
    }

    @media (max-width: 640px) {
        .footer {
            padding: 40px 0 20px;
        }

        .footer-content {
            gap: 30px;
        }

        .footer-links-grid {
            grid-template-columns: 1fr;
            gap: 25px;
        }

        .footer-bottom {
            flex-direction: column;
            gap: 16px;
            text-align: center;
        }

        .footer-support {
            flex-direction: column;
            gap: 12px;
        }
    }
</style>
