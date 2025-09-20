<script>
    let copyrightYear = new Date().getFullYear();
</script>

<svelte:head>
    <title>Advertising - Fire Temp Mail</title>
    <link rel="canonical" href="https://firetempmail.com/advertising" />
    <meta name="description" content="Explore advertising opportunities with Fire Temp Mail to reach a targeted audience." />
    
</svelte:head>

<section class="py-4 py-xl-5">
    <div class="container" style="max-width: 800px;">
        <div class="text-center p-4 p-lg-5">
            <!-- Header -->
            <h1 class="text-start" style="font-family: 'Inter Tight', sans-serif;font-weight: 600;margin-bottom: 16px;">
                <span style="font-weight: normal !important; color: rgb(255, 255, 255);">📮&nbsp;</span>
                Advertising
            </h1>
            
            <div class="text-start">
                <h2>Advertising Opportunities</h2>
                <p>Fire Temp Mail offers unique advertising opportunities to reach our growing user base.</p>
                
                <h3>Our Audience</h3>
                <p>We serve thousands of users daily who are tech-savvy, privacy-conscious, and actively engaged in online activities requiring email verification.</p>
                
                <h3>Advertising Options</h3>
                <p>We offer several advertising options including banner ads, sponsored content, and dedicated email placements.</p>
                
                <h3>Ad Policy</h3>
                <p>We maintain a strict ad policy to ensure our users have a positive experience. We don't allow intrusive pop-ups, auto-play videos with sound, or misleading advertisements.</p>
                
                <h3>Get Started</h3>
                <p>For advertising rates and availability, please contact us at <a href="mailto:ads@firetempmail.com">ads@firetempmail.com</a></p>
            </div>
        </div>

    </div>
</section>
<!-- Footer -->
<footer class="footer">
    <div class="container">
        <div class="row">
            <div class="col-md-8 mb-4 mb-md-0">
                <h5 class="footer-title">Quick Links</h5>
                <div class="row">
                    <div class="col-6">
                        <ul class="footer-links">
                            <li><a href="/email-generator">Email Generator</a></li>
                            <li><a href="/gmail-generator">Gmail Generator</a></li>
                            <li><a href="/temporary-gmail">Temporary Gmail</a></li>
                            <li><a href="/temp-gmail">Temp Gmail</a></li>
                            <li><a href="/temp-mail-edu">Temp Mail EDU</a></li>
                            <li><a href="/10minutemail">10 Minute Mail</a></li>
                        </ul>
                    </div>
                    <div class="col-6">
                        <ul class="footer-links">
                            <li><a href="/privacy-policy">Privacy Policy</a></li>
                            <li><a href="/terms">Terms of Service</a></li>
                            <li><a href="/faq">FAQ</a></li>
                            <li><a href="/contact">Contact Us</a></li>
                            <li><a href="/blog">Blog</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="col-md-4">
                <h5 class="footer-title">Support Our Service</h5>
                <div class="donation-section">
                    <p>Help us keep FireTempMail free by making a donation. Your support helps maintain and improve our service.</p>
                    
                    <div class="kofi-qr">
                        <a href="https://ko-fi.com/firetempmail" target="_blank">
                            <img src="https://storage.ko-fi.com/cdn/useruploads/N4N61LJTEP/qrcode.png?v=2668fb77-3b3b-4039-abc5-e7004afdcebe&v=2&_gl=1*1bpnkx0*_gcl_au*Mzg2NjgyMDUuMTc1ODM3MTgzOA..*_ga*Nzg1NDU0NTQ2LjE3NTgzNzE4Mzk.*_ga_M13FZ7VQ2C*czE3NTgzNzE4MzgkbzEkZzEkdDE3NTgzNzI5MTkkajYwJGwwJGgw" 
                                 alt="Support us on Ko-fi" class="img-fluid">
                        </a>
                        <p class="kofi-text">Scan to support us on Ko-fi</p>
                    </div>
                    
                    <div class="mt-3">
                        <p class="mb-0">We've received <span class="counter">{stats.count}</span> emails so far.</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="divider"></div>
        
        <div class="row align-items-center">
            <div class="col-md-6">
                <p class="copyright">© 2024 FireTempMail. All Rights Reserved.</p>
            </div>
            <div class="col-md-6 text-md-end">
                <div class="social-icons">
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-facebook"></i></a>
                    <a href="#"><i class="fab fa-github"></i></a>
                    <a href="#"><i class="fab fa-linkedin"></i></a>
                </div>
            </div>
        </div>
    </div>
</footer>

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
    
    p {
        margin-bottom: 1rem;
        line-height: 1.6;
    }
    
    a {
        color: var(--bs-primary);
        text-decoration: none;
    }
    
    a:hover {
        text-decoration: underline;
    }
</style>