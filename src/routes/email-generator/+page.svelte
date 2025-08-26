<script>
// @ts-nocheck
    import { onMount } from "svelte";
    import { generate } from "random-words";
    import { receivingEmail } from "../../lib/stores";
    import Navigation from '$lib/components/Navigation.svelte';

    let address = $receivingEmail;
    const url = "https://post.firetempmail.com";
    
    let copyrightYear = new Date().getFullYear();
    let emails = [];
    let stats = {};
    let toasts = [];
    let isCopying = false;
    let selectedEmail = null;
    let viewMode = 'list'; // 'list' or 'detail'
    let unreadEmails = new Set(); // Track unread emails
    let showForwardModal = false;
    let forwardToEmail = '';
    let emailToForward = null;

    // automatically stop auto-refresh after 20 refreshes
    let stopReloadOn = 20;
    let reloadCounter = 0;
    let reloadActive = true;
  
    onMount(async function () {
        await loadEmails();
        if (address === null) {
            generateEmail(false);
        }
    });
    
    async function loadEmails() {
        try {
            const response = await fetch(`${url}/mail/get?address=${address}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            const newEmails = data.mails || [];
            
            // Mark new emails as unread
            newEmails.forEach(email => {
                const emailKey = email.recipient + "-" + email.suffix;
                if (!emails.some(e => e.recipient + "-" + e.suffix === emailKey)) {
                    unreadEmails.add(emailKey);
                }
            });
            
            emails = newEmails;
            stats = data.stats || {};
            
            // Sort emails by date (newest first)
            emails.sort((a, b) => new Date(b.date) - new Date(a.date));
        } catch (error) {
            console.error("Failed to load emails:", error);
            showToast("Error", "Failed to load emails. Please try again.", "error");
        }
    }
    
    // Mark email as read when viewed
    function markAsRead(email) {
        if (!email) return;
        const emailKey = email.recipient + "-" + email.suffix;
        unreadEmails.delete(emailKey);
        viewEmail(email);
    }
    
    // @ts-ignore
    async function generateEmail(reload) {
        let words = generate(2)
        receivingEmail.set(words[0] + "." + words[1] + Math.floor(Math.random() * 1000) + "@firetempmail.com")

        if (reload) {
            // use this instead of window.location.reload(); to avoid resending POST requests
            // @ts-ignore
            window.location = window.location.href;
        }
    }
  
    async function manualReload() {
        await loadEmails();
        showToast("Info", "Emails refreshed", "info");
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
                    // Remove the deleted email from the local array
                    emails = emails.filter(e => e && e.recipient + "-" + e.suffix !== emailKey);
                    
                    // Remove from unread set if it was there
                    unreadEmails.delete(emailKey);
                    
                    // Update stats
                    if (stats.count) {
                        stats.count = Math.max(0, parseInt(stats.count) - 1).toString();
                    }
                    
                    // If we're viewing the deleted email, go back to list
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

    function openForwardModal(email) {
        emailToForward = email;
        forwardToEmail = '';
        showForwardModal = true;
    }

    async function forwardEmail() {
        if (!emailToForward || !emailToForward.recipient || !emailToForward.suffix) return;
        
        if (!forwardToEmail) {
            showToast("Error", "Please enter a valid email address.", "error");
            return;
        }

        try {
            let emailKey = emailToForward.recipient + "-" + emailToForward.suffix;
            const response = await fetch(`${url}/mail/forward`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ key: emailKey, forward: forwardToEmail }),
            });
            
            const data = await response.json();
            if (data.code === 200) {
                showToast("Success", `Email forwarded to ${forwardToEmail}!`, "success");
            } else {
                showToast("Error", `Failed to forward email: ${data.msg}`, "error");
            }
        } catch (error) {
            console.error("Forward error:", error);
            showToast("Error", "Failed to forward email. Please try again.", "error");
        } finally {
            showForwardModal = false;
            emailToForward = null;
            forwardToEmail = '';
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
        
        // Auto-remove after 3 seconds for success messages, 5 for others
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
        
        // Mark as read when viewing
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
            // Today
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (diffDays === 1) {
            // Yesterday
            return 'Yesterday';
        } else if (diffDays < 7) {
            // Within the last week
            return date.toLocaleDateString([], { weekday: 'short' });
        } else {
            // Older than a week
            return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
        }
    }

    function getEmailPreview(content) {
        if (!content) return 'No content';
        
        // Remove HTML tags for text preview
        const text = content.replace(/<[^>]*>/g, '');
        
        // Return first 100 characters with ellipsis if needed
        return text.length > 100 ? text.substring(0, 100) + '...' : text;
    }

    function isUnread(email) {
        if (!email || !email.recipient || !email.suffix) return false;
        return unreadEmails.has(email.recipient + "-" + email.suffix);
    }

    // automatic refresh every 20 seconds
    const intervalID = setInterval(timedReload, 20000); 
</script>
<svelte:head>
    <title>Email Generator - Fire Temp Mail | Free Temporary Email Service</title>
    
    <meta name="description" content="Generate a free temporary disposable email address instantly with Fire Temp Mail. Keep your real inbox safe from spam while receiving emails anonymously.">
    <meta name="keywords" content="temporary email, disposable email, temp mail, free email generator, Fire Temp Mail, anonymous email">
    <meta name="robots" content="index, follow">

    <!-- Canonical URL -->
    <link rel="canonical" href="https://firetempmail.com/email-generator" />

    <!-- Open Graph / Social Media Meta Tags -->
    <meta property="og:title" content="Email Generator - Fire Temp Mail" />
    <meta property="og:description" content="Instantly generate a disposable email address with Fire Temp Mail. Keep your real inbox private and spam-free." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://firetempmail.com/email-generator" />
</svelte:head>

<!-- Toast Notifications -->
<div class="toast-container" style="
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 350px;
">

    {#each toasts as toast (toast.id)}
        <div class="toast" style="
            background: white;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: flex-start;
            border-left: 4px solid 
                {toast.type === 'success' ? 'var(--bs-success)' : 
                 toast.type === 'error' ? 'var(--bs-danger)' : 
                 'var(--bs-info)'};
            animation: slideIn 0.3s ease-out;
            max-width: 100%;
        ">
            <div style="margin-right: 0.75rem; flex-shrink: 0;">
                {#if toast.type === 'success'}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" style="color: var(--bs-success);">
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                {:else if toast.type === 'error'}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" style="color: var(--bs-danger);">
                        <path d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" style="color: var(--bs-info);">
                        <path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                {/if}
            </div>
            
            <div style="flex: 1; min-width: 0;">
                <h4 style="margin: 0 0 0.25rem 0; font-size: 0.9rem; color: var(--bs-dark); overflow: hidden; text-overflow: ellipsis;">
                    {toast.title}
                </h4>
                <p style="margin: 0; font-size: 0.8rem; color: var(--bs-secondary); overflow: hidden; text-overflow: ellipsis;">
                    {toast.message}
                </p>
            </div>
            
            <button on:click={() => removeToast(toast.id)} style="
                background: none;
                border: none;
                padding: 0;
                margin-left: 0.5rem;
                cursor: pointer;
                color: var(--bs-secondary);
                flex-shrink: 0;
            ">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    {/each}
</div>

<!-- Forward Email Modal -->
{#if showForwardModal}
<div class="modal-backdrop" style="
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
">
    <div class="modal" style="
        background: white;
        padding: 24px;
        border-radius: 16px;
        width: 90%;
        max-width: 500px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    ">
        <h3 style="margin-top: 0; margin-bottom: 16px;">Forward Email</h3>
        
        <p style="margin-bottom: 16px;">Enter the email address to forward this message to:</p>
        
        <input 
            type="email" 
            bind:value={forwardToEmail}
            placeholder="recipient@example.com"
            style="
                width: 100%;
                padding: 12px;
                border: 2px solid rgb(215,215,215);
                border-radius: 8px;
                margin-bottom: 16px;
                font-size: 16px;
            "
        />
        
        <div style="display: flex; justify-content: flex-end; gap: 12px;">
            <button 
                on:click={() => { showForwardModal = false; emailToForward = null; }}
                style="
                    padding: 10px 20px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    background: white;
                    cursor: pointer;
                "
            >
                Cancel
            </button>
            <button 
                on:click={forwardEmail}
                style="
                    padding: 10px 20px;
                    border: none;
                    border-radius: 8px;
                    background: rgb(33,37,41);
                    color: white;
                    cursor: pointer;
                "
            >
                Forward
            </button>
        </div>
    </div>
</div>
{/if}

<!-- Away Banner -->
{#if !reloadActive}
    <div style="background: var(--bs-red);padding: 16px;">
        <p class="text-center" style="margin-bottom: 0px;color: rgba(255,255,255,0.8);font-weight: 500;">
            <span style="font-weight: 600;color: rgb(255,255,255);">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" style="font-size: 20px;margin-top: -4px;margin-right: 8px;">
                    <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                Are you still there?
            </span> 
            Please reload the page to re-enable automatic refresh.
        </p>
    </div>
{/if}

<section class="py-4 py-xl-5">
    <div class="container" style="max-width: 800px;">
        <div class="text-center p-4 p-lg-5">
            <!-- Header -->
            <h1 class="text-start" style="font-family: 'Inter Tight', sans-serif;font-weight: 600;margin-bottom: 16px;">
                <span style="font-weight: normal !important; color: rgb(255, 255, 255);">📮&nbsp;</span>
Fire Temp Mail – Your Free Temporary Disposable Email Generator
        
            </h1>
            <p class="text-start" style="margin-bottom: 32px;font-size: 20px;">
Instantly generate a disposable Email Generator address. Keep your real email address private and your inbox clean from unwanted messages and spam.
            </p>
            
            <!-- Email Address with Copy Button -->
            <div class="d-xl-flex justify-content-xl-center align-items-xl-center" style="margin-top: 32px;margin-bottom: 16px;">
                <div style="
                    padding: 8px 30px;
                    border: 2px solid rgb(215,215,215);
                    border-radius: 16px;
                    width: 100%;
                    margin-right: 16px;
                    height: 50px;
                    margin-bottom: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: white;
                ">
                    <p class="text-truncate text-start" style="margin-bottom: 0px;font-size: 20px;flex: 1;">
                        <!--sse-->{address}<!--/sse-->
                    </p>
                    <button 
                        on:click={copyToClipboard} 
                        class="btn btn-sm" 
                        style="
                            margin-left: 12px;
                            background: transparent;
                            border: none;
                            padding: 4px 8px;
                            color: {isCopying ? 'var(--bs-success)' : 'var(--bs-primary)'};
                        "
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
                <button class="btn btn-primary" type="button" on:click={() => generateEmail(true)} style="padding: 8px 30px;border-radius: 16px;border-width: 2px;border-color: rgb(33,37,41);background: rgb(33,37,41);font-weight: 500;height: 50px;font-size: 20px;min-width: 220px;margin-bottom: 16px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" style="font-size: 24px;margin-top: -4px;margin-right: 6px;">
                        <path d="M4 4V9H4.58152M19.9381 11C19.446 7.05369 16.0796 4 12 4C8.64262 4 5.76829 6.06817 4.58152 9M4.58152 9H9M20 20V15H19.4185M19.4185 15C18.2317 17.9318 15.3574 20 12 20C7.92038 20 4.55399 16.9463 4.06189 13M19.4185 15H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    Re-generate
                </button>
            </div>
            
            {#if reloadActive}
                <!-- Loading Indicator -->
                <div style="padding: 32px;margin-bottom: 32px;">
                    <img src="/assets/img/ring-resize.svg?h=2f4014e589baa9dfda8b268abeba3c2b" alt="Loading" style="width: 32px;height: 32px;margin-top: -8px;margin-right: 16px;">
                    <span style="font-weight: 500;font-size: 20px;">Waiting for incoming emails</span>
                </div>
            {:else}
                <!-- Automatic refresh stopped -->
                <div style="padding: 32px;margin-bottom: 32px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" style="font-size: 32px;margin-top: -6px;margin-right: 16px;color: var(--bs-red);">
                        <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <span style="font-weight: 500;font-size: 20px;">Automatic refresh stopped</span>
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
                                <button class="btn btn-primary" type="button" on:click={() => openForwardModal(selectedEmail)} style="padding: 4px 8px; border-radius: 8px; background: transparent; border: 1px solid rgb(215,215,215); color: var(--bs-dark);">
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
                    <div class="email-body">
                            {@html selectedEmail["content-html"] || selectedEmail["content-text"] || 'No content available'}
                    </div>
                </div>
            {:else}
                <!-- Email List View -->
                {#if emails.length === 0}
                    <!-- Empty State -->
                    <div style="padding: 32px;border-radius: 16px;margin-bottom: 32px;border: 2px dashed rgb(215,215,215) ;text-align: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="color: rgb(215,215,215); margin-bottom: 16px;">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                        <p style="font-size: 20px;margin-top: 16px;font-weight: 500;color: #6c757d;">
                            Your inbox is empty
                        </p>
                        <p style="color: #6c757d;">
                            Emails sent to your temporary address will appear here
                        </p>
                    </div>
                {:else}
                    <!-- Email List -->
                    <div style="border: 2px solid rgb(215,215,215);border-radius: 16px;margin-bottom: 32px;overflow: hidden;">
                        <!-- List Header -->
                        <div style="padding: 16px; background: #f8f9fa; border-bottom: 1px solid rgb(215,215,215); display: flex; justify-content: space-between; align-items: center;">
                            <h3 style="margin: 0; font-size: 18px; font-weight: 600;">Inbox ({emails.length})</h3>
                            <button on:click={manualReload} style="
                                background: transparent;
                                border: 1px solid rgb(215,215,215);
                                border-radius: 8px;
                                padding: 4px 12px;
                                cursor: pointer;
                                display: flex;
                                align-items: center;
                                font-size: 14px;
                            ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" style="margin-right: 6px;">
                                    <path d="M4 4V9H4.58152M19.9381 11C19.446 7.05369 16.0796 4 12 4C8.64262 4 5.76829 6.06817 4.58152 9M4.58152 9H9M20 20V15H19.4185M19.4185 15C18.2317 17.9318 15.3574 20 12 20C7.92038 20 4.55399 16.9463 4.06189 13M19.4185 15H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                Refresh
                            </button>
                        </div>
                        
                        <!-- Email Items -->
                        <div style="max-height: 500px; overflow-y: auto;">
                            {#each emails as email (email.recipient + '-' + email.suffix)}
                                {#if email && email.sender && email.recipient}
                                    <div on:click={() => markAsRead(email)} style="
                                        padding: 16px;
                                        border-bottom: 1px solid rgb(240,240,240);
                                        cursor: pointer;
                                        transition: background-color 0.2s;
                                        display: flex;
                                        align-items: flex-start;
                                        background-color: {isUnread(email) ? 'rgba(13, 110, 253, 0.05)' : 'transparent'};
                                    " 
                                    on:mouseenter={(e) => e.currentTarget.style.backgroundColor = isUnread(email) ? 'rgba(13, 110, 253, 0.08)' : '#f8f9fa'} 
                                    on:mouseleave={(e) => e.currentTarget.style.backgroundColor = isUnread(email) ? 'rgba(13, 110, 253, 0.05)' : 'transparent'}>

                                        <div style="flex-shrink: 0; margin-right: 12px; position: relative;">
                                            <div style="width: 40px; height: 40px; border-radius: 50%; background: #e9ecef; display: flex; align-items: center; justify-content: center; font-weight: 600; color: #6c757d;">
                                                {email.sender ? email.sender.charAt(0).toUpperCase() : '?'}
                                            </div>
                                            {#if isUnread(email)}
                                                <div style="
                                                    position: absolute;
                                                    top: -2px;
                                                    right: -2px;
                                                    width: 12px;
                                                    height: 12px;
                                                    border-radius: 50%;
                                                    background: var(--bs-primary);
                                                    border: 2px solid white;
                                                "></div>
                                            {/if}
                                        </div>
                                        
                                        <div style="flex: 1; min-width: 0;">
                                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                                                <span style="font-weight: {isUnread(email) ? '700' : '600'}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-right: 12px; color: {isUnread(email) ? 'var(--bs-dark)' : 'inherit'};">
                                                    {email.sender || 'Unknown Sender'}
                                                </span>
                                                <span style="color: var(--bs-secondary); font-size: 12px; flex-shrink: 0;">
                                                    {formatDate(email.date)}
                                                </span>
                                            </div>
                                            
                                            <p style="font-weight: {isUnread(email) ? '700' : '600'}; margin: 0 0 4px 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: {isUnread(email) ? 'var(--bs-dark)' : 'inherit'};">
                                                {email.subject || '(No Subject)'}
                                            </p>
                                            
                                            <p style="color: var(--bs-secondary); margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 14px;">
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

            <h1 class="text-center" style="font-family: 'Inter Tight', sans-serif;font-weight: 600;margin-bottom: 16px;">
         Email Generator 
            </h1>
            <p class="text-center" style="margin-bottom: 32px;font-size: 20px;">
Email Generator is a free temporary email generator that instantly creates a disposable email address. Your temp mail inbox works just like a real one, but it automatically expires after a certain time, keeping your personal inbox safe. Nowadays, most websites require email verification, but sharing your real address can lead to endless spam. With our instant temp mail service, you can quickly receive emails, confirm accounts, and protect your privacy with ease. Use anonymous email addresses anytime you need secure, fast, and free temporary emails.           
 </p>
        </div>

        <!-- Footer -->
        <div class="text-center p-4 p-lg-5">
            <p class="text-start" style="margin-bottom: 32px;font-size: 16px;">
                We've received&nbsp;
                <span class="font-monospace" style="color: rgb(255,255,255);background: rgb(33,37,41);border-radius: 10px;padding: 4px 12px;font-size: 14px;margin-right: 2px;margin-left: 2px;">
                    {stats.count || '0'}
                </span>
                &nbsp;emails so far.
            </p>
            <p class="text-start" style="margin-bottom: 4px;font-size: 16px;">
                <span class="float-end">
                    <a href="/" style="color: inherit;">Home</a>&nbsp;&nbsp;
                    <a href="/10minutemail" style="color: inherit;">10 Minute Mail</a>&nbsp;&nbsp;
                    <a href="/blog" style="color: inherit;">Blog</a>&nbsp;&nbsp;
                    <a href="/privacy-policy" style="color: inherit;">Privacy</a>&nbsp;&nbsp;
                    <a href="/terms" style="color: inherit;">Terms</a>&nbsp;&nbsp;
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
    .email-body {
        padding: 24px;
        overflow-y: auto;
        max-height: 400px;
        word-break: break-word;
    }

    @media (max-width: 768px) {
        .d-xl-flex {
            flex-direction: column !important;
            align-items: stretch !important;
        }

        .email-address-container {
            width: 100% !important;
            margin-right: 0 !important;
        }

        .btn-primary {
            min-width: 100% !important;
        }

        .email-list {
            max-height: 300px !important;
        }
        
        .modal {
            width: 95% !important;
            margin: 10px;
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
    
    .modal-backdrop {
        animation: fadeIn 0.2s ease-out;
    }
    
    .modal {
        animation: scaleIn 0.2s ease-out;
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
</style>