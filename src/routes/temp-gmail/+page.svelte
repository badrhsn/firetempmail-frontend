<script>
// @ts-nocheck
    import { onMount } from "svelte";
    import { generate } from "random-words";
    import { _ } from 'svelte-i18n';
    import { 
        receivingEmail, 
        availableDomains, 
        selectedDomain, 
        updateEmailDomain,
        generateNewRandomEmail,
        gmailAccounts,
        getNextGmailAccount
    } from "../../lib/stores";
    import Navigation from '$lib/components/Navigation.svelte';
    import { getPopularArticles } from '$lib/data/blogPosts';
    import { browser } from '$app/environment';
    
    // These will reactively update when the stores change
    let address;
    let currentDomain;
    let availableGmailAccounts = $gmailAccounts;
    
    // Email type selection with safe localStorage access
    let emailType = 'domain';
    
    const url = "https://mail.firetempmail.com";
    
    let copyrightYear = new Date().getFullYear();
    let emails = [];
    let stats = {};
    let toasts = [];
    let isCopying = false;
    let selectedEmail = null;
    let viewMode = 'list';

    let stopReloadOn = 10;
    let reloadCounter = 0;
    let reloadActive = true;
    let isTabVisible = true;
    let lastEmailCount = 0;
    let intervalID;
    let unreadEmails = new Set();

    let showForwardModal = false;
    let forwardToEmail = '';
    let emailToForward = null;
    let isLoading = false;
    
    let customAlias = '';
    let showCustomAliasInput = false;
    let aliasError = '';
    
    let showDomainSelector = false;

    onMount(function () {
        // Safely get email type from localStorage
        if (browser) {
            try {
                const savedType = localStorage.getItem("emailType");
                if (savedType) {
                    emailType = savedType;
                }
            } catch (e) {
                console.error("Error accessing localStorage:", e);
            }
        }
        
        if (address === null) {
            generateEmail(false);
        }

        document.addEventListener('visibilitychange', handleVisibilityChange);
        startPolling();
    });
    
    // Generate email based on selected type
    async function generateEmail(reload, useCustomAlias = false) {
        let fullAddress;
        
        if (emailType === 'gmail' || emailType === 'googlemail') {
            // Generate Gmail-style alias
            fullAddress = getNextGmailAccount(emailType);
            receivingEmail.set(fullAddress);
            
            if (reload) {
                window.location.reload();
            }
            return;
        }
        
        // Domain-based generation
        if (useCustomAlias && customAlias) {
            if (!isValidAlias(customAlias)) {
                showToast("Error", "Alias can only contain letters, numbers, and hyphens", "error");
                return;
            }
            
            fullAddress = customAlias + "@" + currentDomain;
        } else {
            let words = generate(1);
            fullAddress = words[0] + Math.floor(Math.random() * 1000) + "@" + currentDomain;
        }
        
        receivingEmail.set(fullAddress);

        if (reload) {
            window.location.reload();
        } else {
            customAlias = '';
            showCustomAliasInput = false;
        }
    }
    
    // Handle email type change with safe localStorage access
    function handleEmailTypeChange(newType) {
        emailType = newType;
        
        if (browser) {
            try {
                localStorage.setItem("emailType", newType);
            } catch (e) {
                console.error("Error saving to localStorage:", e);
            }
        }
        
        generateEmail(true);
    }
    
    // Gmail normalization: keep dots, only lowercase and keep alias
function normalizeGmailAddress(address) {
    const [local, domain] = address.split("@");
    if (!domain || domain.toLowerCase() !== "gmail.com")
        return address.toLowerCase();
    const [base, alias] = local.split("+");
    return alias
        ? `${base}+${alias}@gmail.com`
        : `${base}@gmail.com`;
}

    async function loadEmails() {
        isLoading = true;
        try {
            if (!address) return;
            // Use address directly for API call (no normalization)
            const response = await fetch(`${url}/mail/get?address=${encodeURIComponent(address)}`);
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
    
    // Make address and currentDomain reactive to store changes
    $: address = $receivingEmail;
    $: currentDomain = $selectedDomain;

    // Watch for address changes and reload emails
    $: if (address) {
        loadEmails();
    }

    function markAsRead(email) {
        if (!email) return;
        const emailKey = email.recipient + "-" + email.suffix;
        unreadEmails.delete(emailKey);
        viewEmail(email);
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
    
    // Force UI update
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

    async function deleteEmail(email) {
        if (!email || !email.recipient || !email.suffix) return;
        
        if (confirm("Do you really want to permanently delete this email?")) {
            try {
                let emailKey = email.recipient + "-" + email.suffix;
                const response = await fetch(`${url}/mail/delete?key=${emailKey}`);
                const data = await response.json();
                
                if (data.code === 200) {
                    emails = emails.filter(e => e && e.recipient + "-" + e.suffix !== emailKey);
                    unreadEmails.delete(emailKey);
                    
                    if (stats.count) {
                        stats.count = Math.max(0, parseInt(stats.count) - 1).toString();
                    }
                    
                    if (selectedEmail && selectedEmail.recipient + "-" + selectedEmail.suffix === emailKey) {
                        selectedEmail = null;
                        viewMode = 'list';
                    }
                    
                    showToast("Success", "Email deleted successfully.", "success");
                } else {
                    showToast("Error", `Failed to delete email: ${data.msg}`, "error");
                }
            } catch (error) {
                console.error("Delete error:", error);
                showToast("Error", "Failed to delete email. Please try again.", "error");
            }
        }
    }

    function deleteEmailAddress() {
        if (confirm("Are you sure you want to delete this email address? All messages will be lost.")) {
            emails = [];
            unreadEmails.clear();
            stats = {};
            generateEmail(true);
            showToast("Success", "New email address generated", "success");
        }
    }

    function openForwardModal(email) {
        emailToForward = email;
        forwardToEmail = '';
        showForwardModal = true;
    }

    async function forwardEmail(email) {
        if (!email || !email.recipient || !email.suffix) return;
        
        let emailKey = email.recipient + "-" + email.suffix;
        let forwardTo = prompt("Please enter the email address you want to forward this email to:", "");

        if (forwardTo === null || forwardTo === "") {
            showToast("Error", "No email address entered.", "error");
            return;
        }

        try {
            const response = await fetch(`${url}/mail/forward`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ key: emailKey, forward: forwardTo }),
            });
            
            const data = await response.json();
            if (data.code === 200) {
                showToast("Success", "Email forwarded successfully!", "success");
            } else {
                showToast("Error", `Failed to forward email: ${data.msg}`, "error");
            }
        } catch (error) {
            console.error("Forward error:", error);
            showToast("Error", "Failed to forward email. Please try again.", "error");
        }
    }

    async function copyToClipboard() {
        if (!address) return;
        
        isCopying = true;
        try {
            await navigator.clipboard.writeText(address);
            showToast("Success", "Email address copied to clipboard!", "success");
        } catch (error) {
            console.error("Copy failed:", error);
            showToast("Error", "Failed to copy to clipboard.", "error");
        } finally {
            setTimeout(() => { isCopying = false; }, 1000);
        }
    }

    function showToast(title, message, type = "info") {
        const id = Date.now();
        toasts = [...toasts, { id, title, message, type }];
        
        setTimeout(() => {
            toasts = toasts.filter(toast => toast.id !== id);
        }, type === "success" ? 3000 : 5000);
    }

    function removeToast(id) {
        toasts = toasts.filter(toast => toast.id !== id);
    }

    function viewEmail(email) {
        selectedEmail = email;
        viewMode = 'detail';
        
        if (email) {
            const emailKey = email.recipient + "-" + email.suffix;
            unreadEmails.delete(emailKey);
        }
    }

    function formatDate(dateString) {
        if (!dateString) return 'Unknown date';
        
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (diffDays === 1) {
            return 'Yesterday';
        } else if (diffDays < 7) {
            return date.toLocaleDateString([], { weekday: 'short' });
        } else {
            return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
        }
    }

    function getEmailPreview(content) {
        if (!content) return 'No content';
        
        const text = content.replace(/<[^>]*>/g, '');
        return text.length > 100 ? text.substring(0, 100) + '...' : text;
    }

    function isUnread(email) {
        if (!email || !email.recipient || !email.suffix) return false;
        return unreadEmails.has(email.recipient + "-" + email.suffix);
    }


        let showCryptoModal = false;
    
    function openCryptoModal() {
        showCryptoModal = true;
    }
    
    function closeCryptoModal() {
        showCryptoModal = false;
    }

    function handleVisibilityChange() {
        isTabVisible = !document.hidden;
        if (isTabVisible) { loadEmails(); clearInterval(intervalID); startPolling(); }
        else clearInterval(intervalID);
    }

    function startPolling() {
        if (intervalID) clearInterval(intervalID);
        intervalID = setInterval(timedReload, 60000);
    }
</script>
<svelte:head>
    <title>Temp Gmail Generator - Create Disposable Gmail Addresses Instantly | Fire Temp Mail</title>
    <meta name="description" content="Instantly generate temporary Gmail addresses with our advanced Gmailnator alternative. Create disposable emails that work everywhere for signups, verifications & spam protection.">
    <meta name="keywords" content="temp gmail, temporary gmail, gmailnator, emailnator, gmail generator, gmail nator, gmailinator, temp mail gmail, 10 minute gmail, disposable gmail, fake gmail, Fire Temp Mail">
    <meta name="author" content="Fire Temp Mail">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://firetempmail.com/temp-gmail">
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Fire Temp Mail",
  "url": "https://firetempmail.com/temp-gmail",
  "description": "Generate temporary Gmail addresses instantly with Fire Temp Mail – a fast, secure, and free disposable email generator for privacy-conscious users.",
  "applicationCategory": "Utility",
  "operatingSystem": "Web",
  "browserRequirements": "Requires JavaScript and an internet connection.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "2564",
    "bestRating": "5",
    "worstRating": "1"
  },
  "creator": {
    "@type": "Organization",
    "name": "Fire Temp Mail",
    "url": "https://firetempmail.com"
  }
}
    </script>
</svelte:head>
<!-- Toast Notifications -->
<div class="toast-container">
    {#each toasts as toast (toast.id)}
        <div class="toast toast-{toast.type}">
            <div class="toast-icon">
                {#if toast.type === 'success'}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                {:else if toast.type === 'error'}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                {/if}
            </div>
            
            <div class="toast-content">
                <h4>{toast.title}</h4>
                <p>{toast.message}</p>
            </div>
            
            <button on:click={() => removeToast(toast.id)} class="toast-close">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    {/each}
</div>

<!-- Forward Email Modal -->
{#if showForwardModal}
<div class="modal-backdrop" on:click={() => showForwardModal = false}>
    <div class="modal" on:click|stopPropagation>
        <div class="modal-header">
            <h3>Forward Email</h3>
            <button on:click={() => showForwardModal = false} class="modal-close">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
        
        <div class="modal-body">
            <p>Enter the email address to forward this message to:</p>
            
            <input 
                type="email" 
                bind:value={forwardToEmail}
                placeholder="recipient@example.com"
                class="modal-input"
            />
        </div>
        
        <div class="modal-footer">
            <button 
                on:click={() => { showForwardModal = false; emailToForward = null; }}
                class="btn btn-secondary"
            >
                Cancel
            </button>
            <button 
                on:click={forwardEmail}
                class="btn btn-primary"
            >
                Forward Email
            </button>
        </div>
    </div>
</div>
{/if}

<!-- Away Banner -->
{#if !reloadActive}
    <div class="away-banner">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Are you still there? Please reload the page to re-enable automatic refresh.</span>
    </div>
{/if}

<section class="py-4 py-xl-5">
    <div class="container">
        <div class="text-center p-4 p-lg-5">
            <!-- Header -->
            <h1>
                <span>📮&nbsp;</span>
                Temp Gmail - Create Temporary Gmail Addresses
            </h1>
            <p class="lead">
                Instantly generate disposable Gmail addresses that look and function like real Gmail accounts. Protect your personal inbox from spam and unwanted messages.
            </p>
            
            <!-- Email Address with Copy Button -->
            <div class="email-address-container">
                <div class="email-display">
                    <p>{address}</p>
                    <button 
                        on:click={copyToClipboard} 
                        class="btn-copy"
                        title="Copy to clipboard"
                    >
                        {#if isCopying}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        {:else}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M8 16H6C4.89543 16 4 15.1046 4 14V6C4 4.89543 4.89543 4 6 4H14C15.1046 4 16 4.89543 16 6V8M14 20H18C19.1046 20 20 19.1046 20 18V14C20 12.8954 19.1046 12 18 12H14C12.8954 12 12 12.8954 12 14V18C12 19.1046 12.8954 20 14 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        {/if}
                    </button>
                </div>
                
                <!-- Radio Button Selector -->
                <div class="email-type-selector">
                    <div class="radio-group">
                        <label class="radio-option {emailType === 'domain' ? 'selected' : ''}">
                            <input 
                                type="radio" 
                                name="email-type" 
                                value="domain" 
                                checked={emailType === 'domain'}
                                on:change={() => handleEmailTypeChange('domain')}
                            >
                            <span class="radio-label">Domain</span>
                        </label>
                        
                        <label class="radio-option {emailType === 'gmail' ? 'selected' : ''}">
                            <input 
                                type="radio" 
                                name="email-type" 
                                value="gmail" 
                                checked={emailType === 'gmail'}
                                on:change={() => handleEmailTypeChange('gmail')}
                            >
                            <span class="radio-label">Gmail</span>
                        </label>
                        
                        <label class="radio-option {emailType === 'googlemail' ? 'selected' : ''}">
                            <input 
                                type="radio" 
                                name="email-type" 
                                value="googlemail" 
                                checked={emailType === 'googlemail'}
                                on:change={() => handleEmailTypeChange('googlemail')}
                            >
                            <span class="radio-label">GoogleMail</span>
                        </label>
                    </div>
                </div>
                
                <div class="email-action-buttons">
                    <button class="btn btn-primary" type="button" on:click={() => generateEmail(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M4 4V9H4.58152M19.9381 11C19.446 7.05369 16.0796 4 12 4C8.64262 4 5.76829 6.06817 4.58152 9M4.58152 9H9M20 20V15H19.4185M19.4185 15C18.2317 17.9318 15.3574 20 12 20C7.92038 20 4.55399 16.9463 4.06189 13M19.4185 15H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Generate New
                    </button>
                    
                    {#if emailType === 'domain'}
                    <button class="btn btn-secondary" on:click={toggleCustomAlias} title="Use custom alias">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M12 6V12M12 12L16 16M12 12L8 16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Custom Alias
                    </button>
                    
                    <button class="btn btn-secondary" on:click={toggleDomainSelector} title="Change domain">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 12H16M12 8V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Change Domain
                    </button>
                    {/if}
                    
                    <button class="btn btn-secondary" on:click={manualReload} title="Refresh page">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M4 4V9H4.58152M19.9381 11C19.446 7.05369 16.0796 4 12 4C8.64262 4 5.76829 6.06817 4.58152 9M4.58152 9H9M20 20V15H19.4185M19.4185 15C18.2317 17.9318 15.3574 20 12 20C7.92038 20 4.55399 16.9463 4.06189 13M19.4185 15H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Refresh Page
                    </button>
                </div>

                <!-- Domain Selector Dropdown (only shown for domain type) -->
                {#if showDomainSelector && emailType === 'domain'}
                <div class="domain-dropdown-container">
                    <div class="domain-dropdown" role="listbox" aria-label="Select email domain">
                        {#each availableDomains as domain}
                            <button
                                type="button"
                                class="domain-option {currentDomain === domain ? 'active' : ''}"
                                role="option"
                                aria-selected={currentDomain === domain}
                                on:click={() => selectDomain(domain)}
                                on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), selectDomain(domain))}
                            >
                                <span class="domain-name">@{domain}</span>
                                {#if currentDomain === domain}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                        <path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <span class="visually-hidden">(selected)</span>
                                {/if}
                            </button>
                        {/each}
                    </div>
                </div>
                {/if}
            
                {#if showCustomAliasInput && emailType === 'domain'}
                <div class="custom-alias-container">
                    <div class="alias-input-group">
                        <input 
                            type="text" 
                            bind:value={customAlias}
                            placeholder="Enter your custom alias"
                            class="alias-input"
                        />
                        <span class="domain-suffix">@{currentDomain}</span>
                    </div>
                    {#if aliasError}
                        <div class="alias-error">{aliasError}</div>
                    {/if}
                    <button 
                        class="btn btn-primary" 
                        on:click={() => generateEmail(true, true)}
                        disabled={!customAlias}
                    >
                        Generate Custom Email
                    </button>
                </div>
                {/if}
            </div>
            
            {#if reloadActive && !isLoading}
                <!-- Loading Indicator -->
                <div class="loading-indicator">
                    <img src="/assets/img/ring-resize.svg?h=2f4014e589baa9dfda8b268abeba3c2b" alt="Loading">
                    <span>Waiting for incoming emails</span>
                </div>
            {:else if !reloadActive}
                <!-- Automatic refresh stopped -->
                <div class="refresh-stopped">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Automatic refresh stopped</span>
                </div>
            {/if}

            {#if viewMode === 'detail' && selectedEmail}
                <!-- Email Detail View -->
                                <div style="border: 2px solid rgb(215,215,215);border-radius: 16px;margin-bottom: 32px;overflow: hidden;">
                    <!-- Email Header -->
                    <div style="padding: 24px; border-bottom: 1px solid rgb(215,215,215);">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                            <button on:click={() => { viewMode = 'list'; selectedEmail = null; }} style="
                                background: transparent;
                                border: none;
                                padding: 4px 8px;
                                cursor: pointer;
                                color: var(--bs-primary);
                                display: flex;
                                align-items: center;
                                font-size: 14px;
                            ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" style="margin-right: 8px;">
                                    <path d="M19 12H5M5 12L11 18M5 12L11 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                Back to inbox
                            </button>
                            
                            <div style="display: flex; gap: 8px;">
                                <button class="btn btn-primary" type="button" on:click={() => forwardEmail(selectedEmail)} style="padding: 4px 8px; border-radius: 8px; background: transparent; border: 1px solid rgb(215,215,215); color: var(--bs-dark);">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M3 10H13C17.4183 10 21 13.5817 21 18V20M3 10L9 16M3 10L9 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                                
                                <button class="btn btn-primary" type="button" on:click={() => deleteEmail(selectedEmail)} style="padding: 4px 8px; border-radius: 8px; background: transparent; border: 1px solid rgb(215,215,215); color: var(--bs-red);">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        
                        <h2 style="font-size: 24px; font-weight: 600; margin-bottom: 8px;">
                            {selectedEmail.subject || '(No Subject)'}
                        </h2>
                        
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div style="display: flex; align-items: center;">
                                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="20" viewBox="0 0 24 24" width="20" fill="currentColor" style="margin-right: 8px; color: rgb(255,221,51);">
                                    <g><rect fill="none" height="24" width="24"></rect></g>
                                    <g><g><path d="M12,2C6.47,2,2,6.47,2,12s4.47,10,10,10s10-4.47,10-10S17.53,2,12,2z"></path></g></g>
                                </svg>
                                <span style="font-weight: 500;">{selectedEmail.sender || 'Unknown Sender'}</span>
                            </div>
                            
                            <span style="color: var(--bs-secondary); font-size: 14px;">
                                {selectedEmail.date ? new Date(selectedEmail.date).toLocaleString() : 'Unknown date'}
                            </span>
                        </div>
                    </div>
                    
                    <!-- Email Body -->
                    <div style="padding: 24px; overflow: auto; max-width: 100%; min-height: 200px;">
                        {@html selectedEmail["content-html"] 
    || selectedEmail["content-plain-formatted"] 
    || selectedEmail["content-plain"] 
    || 'No content available'}

                    </div>
                </div>
            {:else}
                <!-- Email List View -->
                {#if emails.length === 0}
                    <!-- Empty State -->
                    <div class="empty-inbox">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                        <p>Your inbox is empty</p>
                        <p>Emails sent to your temporary address will appear here</p>
                    </div>
                {:else}
                    <!-- Email List -->
                    <div class="email-list-container">
                        <!-- List Header -->
                        <div class="list-header">
                            <h3>Inbox ({emails.length})</h3>
                            <button on:click={manualReload} class="btn-refresh">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M4 4V9H4.58152M19.9381 11C19.446 7.05369 16.0796 4 12 4C8.64262 4 5.76829 6.06817 4.58152 9M4.58152 9H9M20 20V15H19.4185M19.4185 15C18.2317 17.9318 15.3574 20 12 20C7.92038 20 4.55399 16.9463 4.06189 13M19.4185 15H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                Refresh
                            </button>
                        </div>
                        
                        <!-- Email Items -->
                        <div class="email-items">
                            {#each emails as email (email.recipient + '-' + email.suffix)}
                                {#if email && email.sender && email.recipient}
                                    <div 
                                        on:click={() => markAsRead(email)}
                                        on:keypress={(e) => e.key === 'Enter' || e.key === ' ' ? markAsRead(email) : null}
                                        role="button"
                                        tabindex="0"
                                        class:unread={isUnread(email)}
                                        class="email-item"
                                    >
                                        <div class="email-avatar">
                                            <div class="avatar">
                                                {email.sender ? email.sender.charAt(0).toUpperCase() : '?'}
                                            </div>
                                            {#if isUnread(email)}
                                                <div class="unread-indicator"></div>
                                            {/if}
                                        </div>
                                        
                                        <div class="email-content">
                                            <div class="email-header">
                                                <span class="email-sender">{email.sender || 'Unknown Sender'}</span>
                                                <span class="email-date">{formatDate(email.date)}</span>
                                            </div>
                                            
                                            <p class="email-subject">{email.subject || '(No Subject)'}</p>
                                            
                                            <p class="email-preview">
                                                {getEmailPreview(email["content-html"] || email["content-text"])}
                                            </p>
                                        </div>
                                    </div>
                                {/if}
                            {/each}
                        </div>
                    </div>
                {/if}
            {/if}

            <h2>Temporary Gmail Generator - Create Disposable Gmail Addresses Instantly</h2>
<p class="description">
    Our advanced Gmail Generator creates temporary Gmail addresses that function exactly like real Gmail accounts. Perfect for signing up for services, accessing limited-time content, or protecting your primary inbox from spam—without any commitment.
</p>

<!-- SEO article: Gmail-like generator (optimized content) -->
<section aria-labelledby="gmailnator-alternative" class="seo-article">
    <h2 id="gmailnator-alternative">The Ultimate Gmailnator Alternative: Instant Disposable Gmail Addresses</h2>
    <p>
        Tired of inbox clutter from endless notifications, promotions, and spam? Fire Temp Mail offers a superior solution with instant, disposable Gmail-style addresses that work exactly like real Gmail accounts. Unlike other temporary email services, our addresses are undetectable by major platforms including Facebook, Google, Twitter, and Amazon.
    </p>
    <p>
        Generate a working Gmail address in seconds—no registration, no personal details, and no risk of being flagged or banned. Keep your primary inbox clean and focused on what truly matters while maintaining complete privacy and security.
    </p>

    <h2>Why Choose Our Temporary Gmail Generator?</h2>
    <p>
        In today's digital world, your email is constantly exposed to data breaches, spam lists, and marketing campaigns. Sharing your primary Gmail everywhere increases security risks and inbox clutter. Our temporary Gmail generator provides the perfect solution:
    </p>
    
    <h3>Superior to Gmailnator and Emailnator</h3>
    <p>
        While services like Gmailnator and Emailnator offer temporary emails, many platforms have learned to detect and block them. Our generator creates authentic-looking Gmail addresses that bypass these restrictions, giving you reliable access to any service that requires email verification.
    </p>

    <h3>Complete Privacy Protection</h3>
    <p>
        Every time you use your real email address online, you expose personal information to potential data breaches. Our temporary Gmail addresses shield your identity and primary inbox from unwanted exposure, keeping your personal information secure.
    </p>

    <h3>Instant 10-Minute Gmail Addresses</h3>
    <p>
        Need a quick email for verification? Our generator provides immediate temporary Gmail addresses that last exactly as long as you need them—perfect for those "10-minute mail" situations without the limitations of other services.
    </p>

    <h2>How Does Our Temporary Gmail Generator Work?</h2>
    <p>
        Unlike traditional disposable email services, our system creates authentic Gmail-style addresses with full functionality:
    </p>
    
    <h3>Real Gmail Address Structure</h3>
    <p>
        Our generator produces addresses that follow standard Gmail formatting conventions, including proper domain structure and authentication protocols that pass even the most stringent verification systems.
    </p>

    <h3>Instant Inbox Access</h3>
    <p>
        Once generated, your temporary Gmail address immediately begins receiving messages. Access your inbox through our secure platform to view verification emails, signup confirmations, or any other correspondence.
    </p>

    <h3>No Registration Required</h3>
    <p>
        Unlike Gmailnator alternatives that might require account creation, our service is completely anonymous. Generate and use temporary Gmail addresses without providing any personal information.
    </p>

    <h2>Key Advantages of Our Disposable Gmail Service</h2>
    <ul>
        <li><strong>Undetectable by Platforms</strong> - Unlike many temp mail services, our addresses work seamlessly with Facebook, Google, Twitter, Amazon, and other major platforms that typically block disposable emails.</li>
        <li><strong>Customizable Address Options</strong> - Create custom aliases using plus-tagging and dot variations to organize your sign-ups and filter messages efficiently.</li>
        <li><strong>Instant Generation</strong> - One-click address creation with immediate functionality—no waiting, no setup required.</li>
        <li><strong>Complete Anonymity</strong> - No registration, no personal data collection, and no tracking of your activity.</li>
        <li><strong>Spam Protection</strong> - Shield your primary inbox from marketing emails, newsletters, and potential spam campaigns.</li>
        <li><strong>Security Enhancement</strong> - Reduce your exposure to data breaches and phishing attempts by using temporary addresses for questionable sites.</li>
    </ul>

    <h2>Perfect Solution for Multiple Use Cases</h2>
    <p>
        Our temporary Gmail generator serves various needs beyond basic email verification:
    </p>
    
    <h3>Website Testing & Development</h3>
    <p>
        Developers and QA testers can generate multiple temporary Gmail addresses to test registration flows, email templates, and notification systems without cluttering personal inboxes.
    </p>

    <h3>Limited-Time Offers & Trials</h3>
    <p>
        Sign up for free trials, one-time discounts, or temporary access to content without worrying about cancellation reminders or ongoing marketing emails.
    </p>

    <h3>Online Shopping & E-commerce</h3>
    <p>
        Make online purchases without exposing your primary email to retail marketing campaigns and potential data breaches from less secure shopping platforms.
    </p>

    <h2>How We Compare to Gmailnator and Other Alternatives</h2>
    <p>
        While services like Gmailnator, Emailnator, and Gmailinator offer similar concepts, our temporary Gmail generator provides distinct advantages:
    </p>
    
    <ul>
        <li><strong>Superior Deliverability</strong> - Our addresses have higher success rates with platforms that typically block disposable emails</li>
        <li><strong>Enhanced Privacy</strong> - We don't store or log your email content, unlike some alternatives</li>
        <li><strong>Better User Experience</strong> - Clean, intuitive interface with faster generation and retrieval</li>
        <li><strong>Longer Accessibility</strong> - Extended inbox availability compared to standard 10-minute mail services</li>
        <li><strong>Mobile Optimization</strong> - Fully responsive design that works perfectly on all devices</li>
    </ul>

    <h2>Start Protecting Your Primary Gmail Today</h2>
    <p>
        Don't risk your privacy and inbox cleanliness with questionable temporary email services. Our advanced Gmail generator provides reliable, undetectable temporary addresses that work where others fail. Experience the freedom of signing up for services without consequences—generate your first temporary Gmail address now!
    </p>
</section>
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
                .email-type-selector {
                    margin: 1rem 0;
                }
                
                .radio-group {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    flex-wrap: wrap;
                }
                
                .radio-option {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    padding: 0.5rem 1rem;
                    border: 2px solid #e9ecef;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                }
                
                .radio-option:hover {
                    border-color: var(--bs-primary);
                }
                
                .radio-option.selected {
                    border-color: var(--bs-primary);
                    background-color: rgba(var(--bs-primary-rgb), 0.1);
                }
                
                .radio-option input[type="radio"] {
                    margin-right: 0.5rem;
                }
                
                .radio-option.selected .radio-label {
                    color: var(--bs-primary);
                    font-weight: 600;
                }
                
                .radio-label {
                    font-weight: 500;
                }
                
                /* Style the radio buttons */
                input[type="radio"] {
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    border: 2px solid #ccc;
                    border-radius: 50%;
                    outline: none;
                    cursor: pointer;
                    position: relative;
                }
                
                input[type="radio"]:checked {
                    border-color: var(--bs-primary);
                }
                
                input[type="radio"]:checked::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 8px;
                    height: 8px;
                    background-color: var(--bs-primary);
                    border-radius: 50%;
                }
/* Domain Selector Dropdown */
.domain-dropdown-container {
    position: relative;
    width: 100%;
    margin-top: 16px;
}

.domain-dropdown {
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    overflow: hidden;
    animation: dropdownSlideIn 0.2s ease-out;
}

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

.domain-option {
    padding: 12px 16px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
}

.domain-option:last-child {
    border-bottom: none;
}

.domain-option:hover {
    background-color: #f8f9fa;
}

.domain-option.active {
    background-color: #e9ecef;
    font-weight: 600;
}

.domain-name {
    font-weight: 500;
    color: #212529;
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

.alias-input-group {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
}

.alias-input {
    flex: 1;
    padding: 10px 12px;
    border: 2px solid #ddd;
    border-radius: 6px 0 0 6px;
    font-size: 16px;
}

.domain-suffix {
    padding: 10px 12px;
    background-color: #eee;
    border: 2px solid #ddd;
    border-left: none;
    border-radius: 0 6px 6px 0;
    font-size: 16px;
}

.alias-error {
    color: #dc3545;
    margin-bottom: 12px;
    font-size: 14px;
}

@media (max-width: 768px) {
    .alias-input-group {
        flex-direction: column;
    }
    
    .alias-input {
        border-radius: 6px;
        margin-bottom: 8px;
        width: 100%;
    }
    
    .domain-suffix {
        border-radius: 6px;
        border: 2px solid #ddd;
        width: 100%;
        text-align: center;
    }
}
    .seo-content-section {
        background: linear-gradient(to bottom, #f8f9fa, #ffffff);
        border-radius: 12px;
        margin: 3rem 0;
        padding: 2rem 0;
    }
    
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
    }
    
    .section-title {
        font-family: 'Inter Tight', sans-serif;
        font-weight: 600;
        margin-bottom: 2rem;
        text-align: center;
        color: #2c3e50;
    }
    
    .seo-rich-content {
        line-height: 1.8;
        color: #2c3e50;
        max-width: 800px;
        margin: 0 auto;
    }
    
    .seo-rich-content h3 {
        font-size: 1.5rem;
        margin: 2rem 0 1rem 0;
        color: #007bff;
        font-weight: 600;
    }
    
    .seo-rich-content h4 {
        font-size: 1.2rem;
        margin: 1.5rem 0 0.5rem 0;
        color: #2c3e50;
        font-weight: 600;
    }
    
    .seo-rich-content p {
        margin-bottom: 1.2rem;
    }
    
    .feature-list {
        margin-bottom: 1.5rem;
    }
    
    .feature-item {
        padding: 0.5rem 0;
        display: flex;
        align-items: flex-start;
    }
    
    .feature-icon {
        color: #007bff;
        font-weight: bold;
        margin-right: 0.5rem;
        flex-shrink: 0;
    }
    
    .use-cases {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        margin: 2rem 0;
    }
    
    .use-case {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        transition: transform 0.2s;
    }
    
    .use-case:hover {
        transform: translateY(-5px);
    }
    
    .conclusion-box {
        background: #e8f4fd;
        padding: 2rem;
        border-radius: 8px;
        border-left: 4px solid #007bff;
        margin: 2rem 0;
    }
    
    @media (max-width: 768px) {
        .use-cases {
            grid-template-columns: 1fr;
        }
        
        .seo-rich-content h3 {
            font-size: 1.3rem;
        }
    }
    
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
        border-left: 4px solid var(--bs-info);
        animation: slideIn 0.3s ease-out;
        max-width: 100%;
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

.email-text {
    margin-bottom: 0px;
    font-size: 20px;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.copy-btn {
    margin-left: 12px;
    background: transparent;
    border: none;
    padding: 4px 8px;
    color: var(--bs-primary);
}

.regenerate-btn {
    padding: 8px 30px;
    border-radius: 16px;
    border-width: 2px;
    border-color: rgb(33,37,41);
    background: rgb(33,37,41);
    font-weight: 500;
    height: 50px;
    font-size: 20px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
}

.btn-blog {
    padding: 8px 30px;
    border-radius: 16px;
    border-width: 2px;
    border-color: rgb(33,37,41);
    background: rgb(33,37,41);
    font-weight: 500;
    height: 50px;
    font-size: 20px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
}

.regenerate-btn svg {
    font-size: 24px;
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
    
    .regenerate-btn {
        min-width: 220px;
        margin-bottom: 0;
    }
}

/* Mobile styles - stacked layout */
@media (max-width: 1199px) {
    .email-text {
        white-space: normal;
        text-overflow: clip;
        word-break: break-all;
    }
}

.copy-btn:hover,
.regenerate-btn:hover {
    opacity: 0.8;
}
/* Mobile styles for toast */
@media (max-width: 768px) {
    .toast-container {
        top: 10px;
        right: 10px;
        left: 10px;
        max-width: none;
    }
}
/* Mobile styles for email list */
@media (max-width: 768px) {
    .email-item {
        padding: 12px;
    }
    
    .email-avatar {
        width: 32px;
        height: 32px;
        font-size: 14px;
        margin-right: 8px;
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

    /* New SEO/Features section */
.seo-section {
  margin: 2.5rem 0;
}
.section-heading {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(220px,1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}
.feature-card {
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 1rem;
  transition: transform .15s ease, box-shadow .15s ease;
}
.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.06);
}
.feature-card-icon {
  width: 40px; height: 40px;
  display: grid; place-items: center;
  border-radius: 10px;
  background: #f1f3f5;
  color: #0d6efd;
  margin-bottom: .75rem;
}
.feature-card h3 {
  font-size: 1rem;
  margin: 0 0 .25rem 0;
  font-weight: 600;
}
.feature-card p {
  margin: 0;
  color: #6c757d;
  font-size: .95rem;
  line-height: 1.5;
}

.two-col {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(260px,1fr));
  gap: 1.25rem;
}
.two-col h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: .5rem;
}
.pros-list {
  padding-left: 1.1rem;
  margin: .5rem 0 0 0;
  color: #2c3e50;
}
.pros-list li { margin: .25rem 0; }

.usecase-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .75rem;
}
@media (max-width: 480px) {
  .usecase-grid { grid-template-columns: 1fr; }
}
.usecase-item {
  background: #f8f9fa;
  border: 1px solid #eef2f6;
  border-radius: 10px;
  padding: .75rem;
}
.usecase-item strong { display:block; margin-bottom:.25rem; }
.usecase-item p { margin:0; color:#6c757d; font-size:.95rem; }
</style>