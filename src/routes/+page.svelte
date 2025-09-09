<script>
// @ts-nocheck
    import { onMount } from "svelte";
    import { generate } from "random-words";
    import { 
        receivingEmail, 
        availableDomains, 
        selectedDomain, 
        updateEmailDomain
    } from "../lib/stores";
    import Navigation from '$lib/components/Navigation.svelte';
    import { getPopularArticles } from '$lib/data/blogPosts';
    
    // These will reactively update when the stores change
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
            stats = data.stats;
            
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
        
        // This will automatically update the address reactive variable
        receivingEmail.set(alias + "@" + currentDomain);

        if (reload) {
            window.location.reload();
        } else {
            customAlias = '';
            showCustomAliasInput = false;
        }
    }
    
    function isValidAlias(alias) {
        const aliasRegex = /^[a-zA-Z0-9-+]+$/;
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
    
    async function manualReload() {
        await loadEmails();
        //window.location.reload();
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

    const intervalID = setInterval(timedReload, 20000);  
</script>
<svelte:head>
    <title>Fire Temp Mail | Free Disposable Temporary Email Generator</title>
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="Fire Temp Mail provides free disposable temporary email addresses to protect your privacy, block spam, and stay anonymous online. Instantly generate a secure temp email inbox today.">
    <meta name="keywords" content="free, temporary, email, disposable, mail, email address">
    <link rel="canonical" href="https://firetempmail.com">
    <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml">
    
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

<!-- Away Banner -->
{#if !reloadActive}
    <div class="away-banner">
        <p class="text-center">
            <span class="banner-icon-text">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                    <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Are you still there?
            </span>
            Please reload the page to re-enable automatic refresh.
        </p>
    </div>
{/if}

<section class="py-4 py-xl-5">
    <div class="container">
        <div class="text-center p-4 p-lg-5">
            <!-- Header -->
            <h1>
                <span>📮&nbsp;</span>
                Fire Temp Mail – Your Free Temporary Disposable Email Generator
            </h1>
            <p class="lead">
                Instantly generate a disposable Email Generator address. Keep your real email address private and your inbox clean from unwanted messages and spam.
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
                
                <div class="email-action-buttons">
    <button class="btn btn-primary" type="button" on:click={() => generateEmail(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 4V9H4.58152M19.9381 11C19.446 7.05369 16.0796 4 12 4C8.64262 4 5.76829 6.06817 4.58152 9M4.58152 9H9M20 20V15H19.4185M19.4185 15C18.2317 17.9318 15.3574 20 12 20C7.92038 20 4.55399 16.9463 4.06189 13M19.4185 15H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Random Alias
    </button>
    
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
    
    <button class="btn btn-secondary" on:click={manualReload} title="Refresh page">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 4V9H4.58152M19.9381 11C19.446 7.05369 16.0796 4 12 4C8.64262 4 5.76829 6.06817 4.58152 9M4.58152 9H9M20 20V15H19.4185M19.4185 15C18.2317 17.9318 15.3574 20 12 20C7.92038 20 4.55399 16.9463 4.06189 13M19.4185 15H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Refresh Page
    </button>
</div>

<!-- Domain Selector Dropdown -->
{#if showDomainSelector}
    <div class="domain-dropdown-container">
        <div class="domain-dropdown">
            {#each availableDomains as domain}
                <div 
                    class="domain-option {currentDomain === domain ? 'active' : ''}" 
                    on:click={() => selectDomain(domain)}
                >
                    <span class="domain-name">@{domain}</span>
                    {#if currentDomain === domain}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
{/if}
            
            {#if showCustomAliasInput}
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

            <h2
                class="text-center"
                style="font-family: 'Inter Tight', sans-serif;font-weight: 600;margin-bottom: 16px;"
            >
                What is Disposable Temporary E-mail?
            </h2>
            <p class="text-center" style="margin-bottom: 32px;font-size: 18px;">
                A <strong>disposable email address</strong> is a free
                <strong>temporary email service</strong>
                that creates a short-term inbox for receiving emails. Often
                called <em>tempmail</em>, <em>10minmail</em>,
                <em>throwaway email</em>, or <em>burner mail</em>, it helps you
                <strong>avoid spam</strong>
                and protect your <strong>primary email</strong>. Instead of
                exposing your real <strong>email accounts</strong>, you can rely
                on Fire Temp Mail to keep your <strong>personal inbox</strong> safe,
                private, and spam-free.
            </p>
            <!-- Add this after the "What is Disposable Temporary E-mail?" section -->

            <!-- Popular Articles Section -->
            <div
                style="margin: 3rem 0; padding: 2rem 0; border-top: 1px solid #eee; border-bottom: 1px solid #eee;"
            >
                <h2
                    class="text-center"
                    style="font-family: 'Inter Tight', sans-serif; font-weight: 600; margin-bottom: 2rem;"
                >
                    Popular Articles from Our Blog
                </h2>

                <div
                    style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;"
                >
                    {#each getPopularArticles() as article}
                        <div
                            style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; transition: transform 0.2s;"
                        >
                            <div
                                style="display: flex; align-items: center; margin-bottom: 0.75rem;"
                            >
                                <span
                                    style="background: #e9ecef; padding: 0.2rem 0.6rem; border-radius: 12px; font-size: 0.7rem; font-weight: 500;"
                                >
                                    {article.category}
                                </span>
                                <span style="margin: 0 0.5rem; color: #6c757d;"
                                    >•</span
                                >
                                <span style="color: #6c757d; font-size: 0.8rem;"
                                    >{article.readTime}</span
                                >
                            </div>

                            <h3
                                style="font-size: 1.2rem; margin-bottom: 0.75rem; font-weight: 600;"
                            >
                                <a
                                    href="/blog/{article.slug}"
                                    style="color: inherit; text-decoration: none;"
                                >
                                    {article.title}
                                </a>
                            </h3>

                            <p
                                style="color: #6c757d; margin-bottom: 1rem; font-size: 0.9rem;"
                            >
                                {article.excerpt}
                            </p>
                        </div>
                    {/each}
                </div>

                <div style="text-align: center; margin-top: 2rem;">
                    <a href="/blog" class="btn btn-blog"> Visit Our Blog </a>
                </div>
            </div>

            <!-- Add this after the Popular Articles section on your main page -->

            <div class="seo-content-section">
                <div class="container">
                    <h2 class="section-title">
                        The Technology Behind Disposable Email Addresses
                    </h2>

                    <div class="seo-rich-content">
                        <p>
                            In today's digital world, email addresses have
                            become our online passports—essential for work
                            communication, business connections, social
                            interactions, and accessing services. Nearly all
                            applications and online services require an email
                            address for registration, as do loyalty programs,
                            contests, and special offers.
                        </p>

                        <h3>What Are Disposable Email Addresses?</h3>
                        <p>
                            Disposable Email Addresses (DEAs) provide an
                            innovative solution for maintaining online privacy
                            while accessing digital services. These temporary
                            addresses allow you to:
                        </p>

                        <div class="feature-list">
                            <div class="feature-item">
                                <span class="feature-icon">→</span>
                                <span
                                    >Register for services without revealing
                                    your primary email</span
                                >
                            </div>
                            <div class="feature-item">
                                <span class="feature-icon">→</span>
                                <span
                                    >Protect your identity from data breaches
                                    and spam lists</span
                                >
                            </div>
                            <div class="feature-item">
                                <span class="feature-icon">→</span>
                                <span
                                    >Maintain control over your digital
                                    footprint</span
                                >
                            </div>
                            <div class="feature-item">
                                <span class="feature-icon">→</span>
                                <span
                                    >Automatically expire after a set period</span
                                >
                            </div>
                        </div>

                        <p>
                            When a disposable address is compromised or begins
                            receiving unwanted emails, you can simply retire it
                            without affecting your primary communication
                            channels.
                        </p>

                        <h3>Practical Uses for Temporary Email Addresses</h3>

                        <div class="use-cases">
                            <div class="use-case">
                                <h4>Extended Free Trials</h4>
                                <p>
                                    Many streaming services like Netflix, Hulu,
                                    and Amazon Prime offer limited-time trials.
                                    With disposable emails, you can extend your
                                    trial periods while maintaining access to
                                    these services.
                                </p>
                            </div>

                            <div class="use-case">
                                <h4>Retail Offers Without Spam</h4>
                                <p>
                                    Stores frequently request email addresses
                                    for special offers, which often leads to
                                    promotional spam. Temporary emails let you
                                    access these benefits without cluttering
                                    your primary inbox.
                                </p>
                            </div>

                            <div class="use-case">
                                <h4>Application Testing</h4>
                                <p>
                                    Developers can create multiple test accounts
                                    using disposable emails to thoroughly
                                    evaluate their applications before public
                                    release.
                                </p>
                            </div>

                            <div class="use-case">
                                <h4>Multiple Account Management</h4>
                                <p>
                                    When services require separate accounts for
                                    different purposes (like managing multiple
                                    social media profiles), disposable emails
                                    provide the necessary separation without
                                    creating permanent new accounts.
                                </p>
                            </div>

                            <div class="use-case">
                                <h4>Spam Prevention</h4>
                                <p>
                                    Using temporary emails for forums,
                                    discussion groups, and web forms
                                    significantly reduces spam in your primary
                                    inbox.
                                </p>
                            </div>
                        </div>

                        <h3>Choosing the Right Disposable Email Service</h3>
                        <p>The best temporary email providers offer:</p>

                        <div class="feature-list">
                            <div class="feature-item">
                                <span class="feature-icon">→</span>
                                <span
                                    >Instant email generation with a single
                                    click</span
                                >
                            </div>
                            <div class="feature-item">
                                <span class="feature-icon">→</span>
                                <span
                                    >No registration requirements or personal
                                    information collection</span
                                >
                            </div>
                            <div class="feature-item">
                                <span class="feature-icon">→</span>
                                <span>Complete anonymity for users</span>
                            </div>
                            <div class="feature-item">
                                <span class="feature-icon">→</span>
                                <span>Unlimited email address creation</span>
                            </div>
                            <div class="feature-item">
                                <span class="feature-icon">→</span>
                                <span>Temporary inbox functionality</span>
                            </div>
                            <div class="feature-item">
                                <span class="feature-icon">→</span>
                                <span>User-friendly interface</span>
                            </div>
                            <div class="feature-item">
                                <span class="feature-icon">→</span>
                                <span>Customizable address options</span>
                            </div>
                        </div>

                        <h3>
                            How to Use Disposable Email Addresses Effectively
                        </h3>
                        <p>
                            While some users create secondary accounts with
                            traditional providers like Gmail, this approach
                            requires managing multiple inboxes. Professional
                            disposable email services like Fire Temp Mail offer
                            a more efficient solution by providing temporary
                            addresses that forward to your primary email while
                            maintaining complete separation.
                        </p>

                        <p>
                            The advanced functionality allows you to filter
                            messages—sending suspicious emails directly to trash
                            while delivering important communications to your
                            main inbox. If an address becomes compromised, you
                            can simply disable it without affecting your other
                            accounts.
                        </p>

                        <div class="conclusion-box">
                            <h4>Conclusion: Enhance Your Online Privacy</h4>
                            <p>
                                Implementing a disposable email system is an
                                effective strategy for participating in online
                                forums, chat rooms, file-sharing services, and
                                bulletin boards while protecting your primary
                                identity. By using temporary addresses from Fire
                                Temp Mail, you ensure your personal information
                                remains secure and your inbox stays free from
                                unwanted spam.
                            </p>

                            <p>
                                Take control of your digital privacy today with
                                our secure, anonymous temporary email service
                                designed to keep your online activities separate
                                from your personal communication channels.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </div>

        <!-- Footer -->
        <div class="text-center p-4 p-lg-5">
            <p class="text-start" style="margin-bottom: 32px;font-size: 16px;">
                We've received&nbsp;
                <span
                    class="font-monospace"
                    style="color: rgb(255,255,255);background: rgb(33,37,41);border-radius: 10px;padding: 4px 12px;font-size: 14px;margin-right: 2px;margin-left: 2px;"
                >
                    {stats.count}
                </span>
                &nbsp;emails so far.
            </p>
            <p class="text-start" style="margin-bottom: 4px;font-size: 16px;">
                <span class="float-end">
                    <a href="/email-generator" style="color: inherit;"
                        >Email Generator</a
                    >&nbsp;&nbsp;
                    <a href="/temp-mail-edu" style="color: inherit;"
                        >Temp Mail EDU</a
                    >&nbsp;&nbsp;
                    <a href="/10minutemail" style="color: inherit;"
                        >10 Minute Mail</a
                    >&nbsp;&nbsp;
                    <a href="/blog" style="color: inherit;">Blog</a>&nbsp;&nbsp;
                    <a href="/privacy-policy" style="color: inherit;">Privacy</a
                    >&nbsp;&nbsp;
                    <a href="/terms" style="color: inherit;">Terms</a
                    >&nbsp;&nbsp;
                    <a href="/faq" style="color: inherit;">FAQ</a>&nbsp;&nbsp;
                    <a href="/contact" style="color: inherit;">Contact</a>
                </span>
            </p>
            <p class="text-start" style="margin-bottom: 4px;font-size: 16px;">
                Copyright © {copyrightYear}
            </p>
        </div>
    </div>
</section>

<style>

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
</style>
