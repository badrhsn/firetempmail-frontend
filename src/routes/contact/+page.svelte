<script>
    let copyrightYear = new Date().getFullYear();
</script>

<svelte:head>
    <title>Contact Us - Fire Temp Mail</title>
    <meta name="description" content="Get in touch with Fire Temp Mail. Contact our support, business, or report abuse via email. We're here to help!">
    <meta name="keywords" content="contact, support, email, Fire Temp Mail, temp mail, report abuse, business inquiry">
    <meta name="author" content="Fire Temp Mail">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Open Graph / Social sharing -->
    <meta property="og:title" content="Contact Us - Fire Temp Mail">
    <meta property="og:description" content="Get in touch with Fire Temp Mail. Contact our support, business, or report abuse via email.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://firetempmail.com/contact">
    <meta property="og:image" content="https://firetempmail.com/og-image.png">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Contact Us - Fire Temp Mail">
    <meta name="twitter:description" content="Get in touch with Fire Temp Mail. Contact our support, business, or report abuse via email.">
    <meta name="twitter:image" content="https://firetempmail.com/og-image.png">

    <!-- Canonical URL -->
    <link rel="canonical" href="https://firetempmail.com/contact">
</svelte:head>


<section class="py-4 py-xl-5">
    <div class="container" style="max-width: 800px;">
        <div class="text-center p-4 p-lg-5">
            <!-- Header -->
            <h1 class="text-start" style="font-family: 'Inter Tight', sans-serif;font-weight: 600;margin-bottom: 16px;">
                <span style="font-weight: normal !important; color: rgb(255, 255, 255);">📮&nbsp;</span>
                Contact Us
            </h1>
            
            <div class="text-start">
                <h2>Get in Touch</h2>
                <p>We'd love to hear from you! Here's how you can reach us:</p>
                
                <h3>Email Support</h3>
                <p>For general inquiries and support: <a href="mailto:support@firetempmail.com">support@firetempmail.com</a></p>
                
                <h3>Business Inquiries</h3>
                <p>For business and partnership opportunities: <a href="mailto:business@firetempmail.com">business@firetempmail.com</a></p>
                
                <h3>Report Abuse</h3>
                <p>To report abuse or illegal activities: <a href="mailto:abuse@firetempmail.com">abuse@firetempmail.com</a></p>
                
                <h3>Response Time</h3>
                <p>We typically respond to all emails within 24-48 hours during business days.</p>
            </div>
        </div>

        <!-- Footer -->
               <div class="text-center p-4 p-lg-5">
            <p class="footer-links">
                <span class="float-end">
                    <a href="/">Home</a>&nbsp;&nbsp;
                    <a href="/10minutemail">10 Minute Mail</a>&nbsp;&nbsp;
                    <a href="/blog">Blog</a>&nbsp;&nbsp;
                    <a href="/privacy-policy">Privacy</a>&nbsp;&nbsp;
                    <a href="/terms">Terms</a>&nbsp;&nbsp;
                    <a href="/faq">FAQ</a>&nbsp;&nbsp;
                    <a href="/contact">Contact</a>
                </span>
            </p>
            <p class="copyright">
                Copyright © {copyrightYear}
            </p>
        </div>
    </div>
</section>

<style>
    /* Toast Notifications */
    .toast-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 350px;
    }
    
    .toast {
        background: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: flex-start;
        animation: slideIn 0.3s ease-out;
        max-width: 100%;
    }
    
    .toast-success {
        border-left: 4px solid var(--bs-success);
    }
    
    .toast-error {
        border-left: 4px solid var(--bs-danger);
    }
    
    .toast-info {
        border-left: 4px solid var(--bs-info);
    }
    
    .toast-icon {
        margin-right: 0.75rem;
        flex-shrink: 0;
    }
    
    .toast-success .toast-icon {
        color: var(--bs-success);
    }
    
    .toast-error .toast-icon {
        color: var(--bs-danger);
    }
    
    .toast-info .toast-icon {
        color: var(--bs-info);
    }
    
    .toast-content {
        flex: 1;
        min-width: 0;
    }
    
    .toast-content h4 {
        margin: 0 0 0.25rem 0;
        font-size: 0.9rem;
        color: var(--bs-dark);
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .toast-content p {
        margin: 0;
        font-size: 0.8rem;
        color: var(--bs-secondary);
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .toast-close {
        background: none;
        border: none;
        padding: 0;
        margin-left: 0.5rem;
        cursor: pointer;
        color: var(--bs-secondary);
        flex-shrink: 0;
    }
    
    /* Modal */
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10001;
        padding: 20px;
    }
    
    .modal {
        background: white;
        border-radius: 16px;
        width: 100%;
        max-width: 500px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        overflow: hidden;
    }
    
    .modal-header {
        padding: 24px 24px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .modal-header h3 {
        margin: 0;
        font-size: 1.5rem;
    }
    
    .modal-close {
        background: none;
        border: none;
        padding: 4px;
        cursor: pointer;
        color: var(--bs-secondary);
    }
    
    .modal-body {
        padding: 24px;
    }
    
    .modal-body p {
        margin-bottom: 16px;
    }
    
    .modal-input {
        width: 100%;
        padding: 12px;
        border: 2px solid rgb(215,215,215);
        border-radius: 8px;
        font-size: 16px;
    }
    
    .modal-footer {
        padding: 0 24px 24px;
        display: flex;
        justify-content: flex-end;
        gap: 12px;
    }
    
    .btn {
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
        border: none;
        font-size: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .btn-primary {
        background: rgb(33,37,41);
        color: white;
    }
    
    .btn-secondary {
        background: #f8f9fa;
        color: #212529;
        border: 1px solid #dee2e6;
    }
    
    .btn-danger {
        background: #dc3545;
        color: white;
    }
    
    .btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    
    /* Away Banner */
    .away-banner {
        background: var(--bs-red);
        padding: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        color: white;
    }
    
    /* Container */
    .container {
        max-width: 800px;
        margin: 0 auto;
    }
    
    /* Header */
    h1 {
        font-family: 'Inter Tight', sans-serif;
        font-weight: 600;
        margin-bottom: 16px;
        text-align: left;
    }
    
    h1 span {
        font-weight: normal !important;
        color: rgb(255, 255, 255);
    }
    
    .lead {
        text-align: left;
        margin-bottom: 32px;
        font-size: 20px;
    }
    
    /* Email Address Container */
    .email-address-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-top: 32px;
        margin-bottom: 16px;
    }
    
    .email-display {
        padding: 8px 30px;
        border: 2px solid rgb(215,215,215);
        border-radius: 16px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: white;
    }
    
    .email-display p {
        margin-bottom: 0;
        font-size: 20px;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
    }
    
    .btn-copy {
        margin-left: 12px;
        background: transparent;
        border: none;
        padding: 4px 8px;
        color: var(--bs-primary);
        cursor: pointer;
    }
    
    .email-action-buttons {
        display: flex;
        gap: 12px;
        justify-content: center;
        flex-wrap: wrap;
    }
    
    /* Loading and Status Indicators */
    .loading-indicator, .refresh-stopped {
        padding: 32px;
        margin-bottom: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
    }
    
    .loading-indicator img {
        width: 32px;
        height: 32px;
    }
    
    .refresh-stopped svg {
        color: var(--bs-red);
    }
    
    .loading-indicator span, .refresh-stopped span {
        font-weight: 500;
        font-size: 20px;
    }
    
    /* Spinner animation */
    .spinner {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    /* Email Detail View */
    .email-detail {
        border: 2px solid rgb(215,215,215);
        border-radius: 16px;
        margin-bottom: 32px;
        overflow: hidden;
    }
    
    .email-header {
        padding: 24px;
        border-bottom: 1px solid rgb(215,215,215);
    }
    
    .email-actions {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 16px;
    }
    
    .btn-back {
        background: transparent;
        border: none;
        padding: 4px 8px;
        cursor: pointer;
        color: var(--bs-primary);
        display: flex;
        align-items: center;
        font-size: 14px;
    }
    
    .action-buttons {
        display: flex;
        gap: 8px;
    }
    
    .btn-action {
        padding: 4px 8px;
        border-radius: 8px;
        background: transparent;
        border: 1px solid rgb(215,215,215);
        cursor: pointer;
    }
    
    .btn-delete {
        color: var(--bs-red);
    }
    
    .email-detail h2 {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 8px;
    }
    
    .email-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .sender {
        display: flex;
        align-items: center;
        font-weight: 500;
    }
    
    .sender svg {
        margin-right: 8px;
        color: rgb(255,221,51);
    }
    
    .email-date {
        color: var(--bs-secondary);
        font-size: 14px;
    }
    
    .email-body {
        padding: 24px;
        overflow-y: auto;
        max-height: 400px;
        word-break: break-word;
    }
    
    /* Empty Inbox */
    .empty-inbox {
        padding: 32px;
        border-radius: 16px;
        margin-bottom: 32px;
        border: 2px dashed rgb(215,215,215);
        text-align: center;
    }
    
    .empty-inbox svg {
        color: rgb(215,215,215);
        margin-bottom: 16px;
    }
    
    .empty-inbox p:first-of-type {
        font-size: 20px;
        margin-top: 16px;
        font-weight: 500;
        color: #6c757d;
    }
    
    .empty-inbox p:last-of-type {
        color: #6c757d;
    }
    
    /* Email List */
    .email-list-container {
        border: 2px solid rgb(215,215,215);
        border-radius: 16px;
        margin-bottom: 32px;
        overflow: hidden;
    }
    
    .list-header {
        padding: 16px;
        background: #f8f9fa;
        border-bottom: 1px solid rgb(215,215,215);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .list-header h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
    }
    
    .btn-refresh {
        background: transparent;
        border: 1px solid rgb(215,215,215);
        border-radius: 8px;
        padding: 4px 12px;
        cursor: pointer;
        display: flex;
        align-items: center;
        font-size: 14px;
        gap: 6px;
    }
    
    .email-items {
        max-height: 500px;
        overflow-y: auto;
    }
    
    .email-item {
        padding: 16px;
        border-bottom: 1px solid rgb(240,240,240);
        cursor: pointer;
        transition: background-color 0.2s;
        display: flex;
        align-items: flex-start;
    }
    
    .email-item:hover {
        background-color: #f8f9fa;
    }
    
    .email-item.unread {
        background-color: rgba(13, 110, 253, 0.05);
    }
    
    .email-item.unread:hover {
        background-color: rgba(13, 110, 253, 0.08);
    }
    
    .email-avatar {
        flex-shrink: 0;
        margin-right: 12px;
        position: relative;
    }
    
    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #e9ecef;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        color: #6c757d;
    }
    
    .unread-indicator {
        position: absolute;
        top: -2px;
        right: -2px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--bs-primary);
        border: 2px solid white;
    }
    
    .email-content {
        flex: 1;
        min-width: 0;
    }
    
    .email-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 4px;
    }
    
    .email-sender {
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 12px;
    }
    
    .email-item.unread .email-sender {
        font-weight: 700;
        color: var(--bs-dark);
    }
    
    .email-date {
        color: var(--bs-secondary);
        font-size: 12px;
        flex-shrink: 0;
    }
    
    .email-subject {
        font-weight: 600;
        margin: 0 0 4px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
    .email-item.unread .email-subject {
        font-weight: 700;
        color: var(--bs-dark);
    }
    
    .email-preview {
        color: var(--bs-secondary);
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
    }
    
    /* Description */
    h2 {
        font-family: 'Inter Tight', sans-serif;
        font-weight: 600;
        margin-bottom: 16px;
        text-align: center;
    }
    
    .description {
        margin-bottom: 32px;
        font-size: 20px;
        text-align: center;
    }
    
    /* Footer */
    .stats {
        margin-bottom: 32px;
        font-size: 16px;
        text-align: left;
    }
    
    .count {
        color: rgb(255,255,255);
        background: rgb(33,37,41);
        border-radius: 10px;
        padding: 4px 12px;
        font-size: 14px;
        margin-right: 2px;
        margin-left: 2px;
        font-family: monospace;
    }
    
    .footer-links {
        margin-bottom: 4px;
        font-size: 16px;
        text-align: left;
    }
    
    .float-end {
        float: right;
    }
    
    .copyright {
        margin-bottom: 4px;
        font-size: 16px;
        text-align: left;
    }
    
    /* Animations */
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes scaleIn {
        from { 
            opacity: 0;
            transform: scale(0.9);
        }
        to { 
            opacity: 1;
            transform: scale(1);
        }
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
        .email-address-container {
            flex-direction: column;
            align-items: stretch;
        }
        
        .email-display {
            width: 100%;
            margin-right: 0;
            min-width: unset;
        }
        
        .email-action-buttons {
            flex-direction: column;
        }
        
        .btn {
            min-width: 100%;
            justify-content: center;
        }
        
        .email-items {
            max-height: 300px;
        }
        
        .modal-backdrop {
            padding: 10px;
        }
        
        .modal {
            width: 95%;
        }
        
        .float-end {
            float: none;
            display: block;
            text-align: center;
            margin-top: 16px;
        }
        
        .footer-links {
            text-align: center;
        }
        
        .email-item {
            padding: 12px;
        }
        
        .avatar {
            width: 32px;
            height: 32px;
        }
        
        .email-sender {
            font-size: 14px;
        }
        
        .email-date {
            font-size: 11px;
        }
        
        .email-subject {
            font-size: 14px;
        }
        
        .email-preview {
            font-size: 12px;
        }
    }
</style>