<script>
    import Header from '$lib/components/Header.svelte';
    import { onMount } from 'svelte';
    
    let copyrightYear = new Date().getFullYear();
    
    // This will run for every page
    onMount(() => {
        // Any global initialization can go here
    });
</script>

<Header />

<main>
    <slot />
</main>

<!-- Global Footer -->
<footer class="global-footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-section">
                <h3>Fire Temp Mail</h3>
                <p>Secure temporary email service to protect your privacy and avoid spam.</p>
            </div>
            
            <div class="footer-section">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/email-generator">Email Generator</a></li>
                    <li><a href="/blog">Blog</a></li>
                    <li><a href="/faq">FAQ</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h4>Legal</h4>
                <ul>
                    <li><a href="/privacy-policy">Privacy Policy</a></li>
                    <li><a href="/terms">Terms of Service</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                </ul>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>Copyright © {copyrightYear} Fire Temp Mail. All rights reserved.</p>
        </div>
    </div>
</footer>

<style>
    main {
        min-height: calc(100vh - 200px);
        padding: 1rem 0;
    }
    
    .global-footer {
        background: #2c3e50;
        color: white;
        padding: 2rem 0 1rem;
        margin-top: auto;
    }
    
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
    }
    
    .footer-content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin-bottom: 2rem;
    }
    
    .footer-section h3,
    .footer-section h4 {
        margin-bottom: 1rem;
        color: white;
    }
    
    .footer-section ul {
        list-style: none;
        padding: 0;
    }
    
    .footer-section li {
        margin-bottom: 0.5rem;
    }
    
    .footer-section a {
        color: #ccc;
        text-decoration: none;
        transition: color 0.2s;
    }
    
    .footer-section a:hover {
        color: white;
    }
    
    .footer-bottom {
        border-top: 1px solid #4a6572;
        padding-top: 1rem;
        text-align: center;
        color: #ccc;
    }
    
    @media (max-width: 768px) {
        .footer-content {
            grid-template-columns: 1fr;
            text-align: center;
        }
    }
</style>