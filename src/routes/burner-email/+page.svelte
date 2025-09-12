<script>
// @ts-nocheck
import { onMount } from "svelte";
import { generate } from "random-words";
import { 
    receivingEmail, 
    availableDomains, 
    selectedDomain, 
    updateEmailDomain
} from "../../lib/stores";
import Navigation from '$lib/components/Navigation.svelte';
import { getPopularArticles } from '$lib/data/blogPosts';

let address = $receivingEmail;
let currentDomain = $selectedDomain;

const url = "https://post.firetempmail.com";

let copyrightYear = new Date().getFullYear();
let emails = [];
let stats = {};
let toasts = [];
let isCopying = false;
let selectedEmail = null;
let viewMode = 'list';

let stopReloadOn = 20;
let reloadCounter = 0;
let reloadActive = true;

let unreadEmails = new Set();
let showForwardModal = false;
let forwardToEmail = '';
let emailToForward = null;
let isLoading = false;

let customAlias = '';
let showCustomAliasInput = false;
let aliasError = '';

let showDomainSelector = false;

onMount(async function () {
    await loadEmails();
    if (address === null) {
        generateEmail(false);
    }
});

async function loadEmails() {
    isLoading = true;
    try {
        const response = await fetch(`${url}/mail/get?address=${address}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        const newEmails = data.mails || [];
        
        newEmails.forEach(email => {
            const emailKey = email.recipient + "-" + email.suffix;
            if (!emails.some(e => e.recipient + "-" + e.suffix === emailKey)) {
                unreadEmails.add(emailKey);
            }
        });
        
        emails = newEmails;
        stats = data.stats || {};
        
        emails.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (error) {
        console.error("Failed to load emails:", error);
        showToast("Error", "Failed to load emails. Please try again.", "error");
    } finally {
        isLoading = false;
    }
}

function markAsRead(email) {
    if (!email) return;
    const emailKey = email.recipient + "-" + email.suffix;
    unreadEmails.delete(emailKey);
    viewEmail(email);
}

async function generateEmail(reload, useCustomAlias = false) {
    let alias;
    
    if (useCustomAlias && customAlias) {
        if (!isValidAlias(customAlias)) {
            showToast("Error", "Alias can only contain letters, numbers, and hyphens", "error");
            return;
        }
        alias = customAlias;
    } else {
        let words = generate(1);
        alias = words[0] + Math.floor(Math.random() * 1000);
    }
    
    receivingEmail.set(alias + "@" + currentDomain);

    if (reload) {
        window.location.reload();
    } else {
        customAlias = '';
        showCustomAliasInput = false;
    }
}

function isValidAlias(alias) {
    const aliasRegex = /^[a-zA-Z0-9-]+$/;
    return aliasRegex.test(alias);
}

function toggleCustomAlias() {
    showCustomAliasInput = !showCustomAliasInput;
    if (!showCustomAliasInput) {
        customAlias = '';
        aliasError = '';
    }
}

function toggleDomainSelector() {
    showDomainSelector = !showDomainSelector;
}

function selectDomain(domain) {
    updateEmailDomain(domain);
    showDomainSelector = false;
    address = $receivingEmail;
    currentDomain = domain;
}

function manualReload() {
    window.location.reload();
}

async function timedReload() {
    if (reloadCounter >= stopReloadOn) {
        reloadActive = false;
        clearInterval(intervalID);
    }
    await loadEmails();
    reloadCounter += 1;
}

// Other functions like deleteEmail, copyToClipboard, forwardEmail remain unchanged
const intervalID = setInterval(timedReload, 20000);
</script>

<svelte:head>
    <title>Burner Email 🔥 | Free Temporary Disposable Inbox</title>
    <meta name="description" content="Create a free burner email instantly. Get a temporary disposable inbox to protect your real email, avoid spam, and sign up anonymously." />
    <meta name="keywords" content="burner email, disposable email, temporary inbox, temp mail, free temporary email, anonymous email, spam-free inbox" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://firetempmail.com/burner-email" />

    <!-- Open Graph / Social -->
    <meta property="og:title" content="Burner Email – Free Temporary Disposable Inbox" />
    <meta property="og:description" content="Generate a free burner email instantly. Protect your inbox from spam, sign up anonymously, and get a disposable email in seconds." />
    <meta property="og:url" content="https://firetempmail.com/burner-email" />
    <meta property="og:type" content="website" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Burner Email – Free Temporary Disposable Inbox" />
    <meta name="twitter:description" content="Generate a free burner email instantly. Perfect for anonymous signups, spam protection, and temporary emails." />

    <!-- FAQ Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a Burner Email?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A burner email is a temporary, disposable email address used to protect your main inbox from spam, for anonymous signups, or quick testing."
          }
        },
        {
          "@type": "Question",
          "name": "How long does a Burner Email last?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Burner emails typically last from 10 minutes up to 1 hour, or until you manually delete them. You can always generate a new email address instantly."
          }
        },
        {
          "@type": "Question",
          "name": "Is it safe to use Burner Emails?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, burner emails are safe for temporary communications, testing, trial accounts, and avoiding spam. Do not use them for sensitive accounts like banking."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use Burner Emails for websites, apps, or social media?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely! Burner emails are ideal for signing up anonymously for apps, websites, trial accounts, or newsletters without exposing your real email address."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need to register to use a Burner Email?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No registration is needed. You can instantly generate a disposable email and start receiving emails immediately."
          }
        }
      ]
    }
    </script>
</svelte:head>


<section class="py-4 py-xl-5">
  <div class="container">
    <div class="text-center p-4 p-lg-5">
      <h1>
        🔥 Free Burner Email – Disposable Temporary Inbox Instantly
      </h1>
      <p class="lead">
        Protect your inbox and avoid spam with a <strong>burner email</strong>. Instantly generate a <strong>temporary disposable email</strong> for anonymous signups, trial accounts, or quick testing.
      </p>

      <div class="email-address-container">
        <div class="email-display">
          <p>{address}</p>
          <button on:click={copyToClipboard} class="btn-copy">
            {#if isCopying} Copying... {:else} Copy {/if}
          </button>
        </div>
        <div class="email-action-buttons">
          <button class="btn btn-primary" type="button" on:click={() => generateEmail(true)}>Random Alias</button>
          <button class="btn btn-secondary" on:click={toggleCustomAlias}>Custom Alias</button>
          <button class="btn btn-secondary" on:click={toggleDomainSelector}>Change Domain</button>
          <button class="btn btn-secondary" on:click={manualReload}>Refresh Page</button>
        </div>
      </div>

      {#if showCustomAliasInput}
      <div class="custom-alias-container">
        <input type="text" bind:value={customAlias} placeholder="Enter custom alias" />
        <span>@{currentDomain}</span>
        <button class="btn btn-primary" on:click={() => generateEmail(true, true)}>Generate Custom Email</button>
      </div>
      {/if}

      <h2>Why Use Burner Emails?</h2>
      <ul class="text-start mx-auto" style="max-width: 720px;">
        <li>🔒 Protect your real inbox from spam and phishing.</li>
        <li>📩 Receive confirmation emails, OTPs, or trial codes instantly.</li>
        <li>🕵️‍♂️ Sign up anonymously for websites, apps, or newsletters.</li>
        <li>⏳ Temporary emails auto-expire; no cleanup required.</li>
        <li>⚡ Quick and easy to generate – no registration needed.</li>
      </ul>

      <section class="mt-10 p-6 bg-gray-50 rounded-xl shadow-md">
        <h2>Frequently Asked Questions About Burner Emails</h2>
        <details><summary>What is a Burner Email?</summary><p>A temporary, disposable email used for anonymous signups, testing, or avoiding spam.</p></details>
        <details><summary>How long do Burner Emails last?</summary><p>Typically 10–60 minutes or until manually deleted. You can generate a new one anytime.</p></details>
        <details><summary>Is it safe to use Burner Emails?</summary><p>Yes, safe for testing, trials, and anonymous registrations. Avoid sensitive accounts.</p></details>
        <details><summary>Can I use Burner Emails for apps or websites?</summary><p>Yes, perfect for quick registrations, newsletters, and temporary signups.</p></details>
        <details><summary>Do I need to register?</summary><p>No registration is needed. Instantly generate a disposable email and start using it immediately.</p></details>
      </section>
    </div>
  </div>
</section>



<style>

@keyframes dropdownSlideIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Remove blue border from buttons on focus */
.btn:focus {
    outline: none;
    box-shadow: none;
}

/* Improve button hover effects */
.btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.btn:active {
    transform: translateY(0);
}

.custom-alias-container {
    margin-top: 16px;
    padding: 16px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: #f9f9f9;
}



    
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
    }

    
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
    
    .btn:hover {
        opacity: 0.8;
    }

    .email-address-container {
    margin-top: 32px;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.email-display {
    padding: 8px 30px;
    border: 2px solid rgb(215,215,215);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
    min-height: 50px;
}


/* Desktop styles - side by side layout */
@media (min-width: 1200px) {
    .email-address-container {
        flex-direction: row;
        align-items: center;
    }
    
    .email-display {
        width: 100%;
        margin-right: 16px;
        margin-bottom: 0;
    }

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
    
    .btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
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
        width: 100%;
    }

        .email-action-buttons .btn {
        flex: 1;
        min-width: 140px;
        max-width: 220px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 12px 16px;
        border-radius: 8px;
        font-weight: 500;
        font-size: 16px;
        transition: all 0.2s ease;
    }
        .email-action-buttons .btn-primary {
        background: rgb(33,37,41);
        color: white;
        border: 2px solid rgb(33,37,41);
    }

        .email-action-buttons .btn-secondary {
        background: #f8f9fa;
        color: #212529;
        border: 2px solid #dee2e6;
    }
    .email-action-buttons .btn:hover {
        opacity: 0.9;
        transform: translateY(-2px);
    }
      .email-action-buttons .btn:active {
        transform: translateY(0);
    }
       .email-action-buttons .btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }
   
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    /* Email Detail View */
    /* Description */
    h2 {
        font-family: 'Inter Tight', sans-serif;
        font-weight: 600;
        margin-bottom: 16px;
        text-align: center;
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
        @media (min-width: 769px) and (max-width: 992px) {
        .email-action-buttons {
            flex-direction: row;
        }
        
        .email-action-buttons .btn {
            min-width: 160px;
        }
    }

    @media (min-width: 993px) {
        .email-action-buttons {
            flex-direction: row;
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
            align-items: center;
        }
        
        .email-action-buttons .btn {
            width: 100%;
            max-width: 100%;
        }
        
        .btn {
            min-width: 100%;
            justify-content: center;
        }
        
       
    }
</style>