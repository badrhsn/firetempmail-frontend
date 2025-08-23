<script>
// @ts-nocheck
    import { onMount } from "svelte";
    import { generate } from "random-words";
    import { receivingEmail } from "../lib/stores";
    import Navigation from '$lib/components/Navigation.svelte';
    import { getPopularArticles } from '$lib/data/blogPosts';
    let address = $receivingEmail;
    const url = "https://post.firetempmail.com";
    
    let copyrightYear = new Date().getFullYear();
    let emails = [];
    let stats = {};
    let toasts = [];
    let isCopying = false;
    let selectedEmail = null;
    let viewMode = 'list'; // 'list' or 'detail'

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
            emails = data.mails || [];
            stats = data.stats || {};
            
            // Sort emails by date (newest first)
            emails.sort((a, b) => new Date(b.date) - new Date(a.date));
        } catch (error) {
            console.error("Failed to load emails:", error);
            showToast("Error", "Failed to load emails. Please try again.", "error");
        }
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

    // automatic refresh every 20 seconds
    const intervalID = setInterval(timedReload, 20000); 
</script>

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
            Your Temporary Email Address
            </h1>
            <p class="text-center" style="margin-bottom: 32px;font-size: 20px;">
Forget about spam, advertising mailings, hacking and attacking robots. Keep your real mailbox clean and secure. Temp Mail provides temporary, secure, anonymous, free, disposable email address.
            </p>
            
<!-- Email Address with Copy Button -->
<div class="email-address-container">
    <div class="email-display">
        <p class="email-text">
            <!--sse-->{address}<!--/sse-->
        </p>
        <button 
            on:click={copyToClipboard} 
            class="copy-btn" 
            title="Copy to clipboard"
            style="color: {isCopying ? 'var(--bs-success)' : 'var(--bs-primary)'};"
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
    <button class="regenerate-btn" type="button" on:click={() => generateEmail(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none">
            <path d="M4 4V9H4.58152M19.9381 11C19.446 7.05369 16.0796 4 12 4C8.64262 4 5.76829 6.06817 4.58152 9M4.58152 9H9M20 20V15H19.4185M19.4185 15C18.2317 17.9318 15.3574 20 12 20C7.92038 20 4.55399 16.9463 4.06189 13M19.4185 15H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
                        {@html selectedEmail["content-html"] || selectedEmail["content-text"] || 'No content available'}
                    </div>
                </div>
            {:else}
                <!-- Email List View -->
                {#if emails.length === 0}
                    <!-- Empty State -->
                    <div style="padding: 32px;border-radius: 16px;margin-bottom: 32px;border: 2px dashed rgb(215,215,215) ;">
                        <p style="font-size: 20px;margin-top: 16px;font-weight: 500;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" style="font-size: 44px;margin-bottom: 16px;color: rgb(215,215,215);">
                                <path d="M3 21V17M3 17V5C3 3.89543 3.89543 3 5 3H11.5L12.5 4H21L18 10L21 16H12.5L11.5 15H5C3.89543 15 3 15.8954 3 17ZM12 3.5V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                            <br>
                            Incoming mails will show up here
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
                                    <div on:click={() => viewEmail(email)} style="
                                        padding: 16px;
                                        border-bottom: 1px solid rgb(240,240,240);
                                        cursor: pointer;
                                        transition: background-color 0.2s;
                                        display: flex;
                                        align-items: flex-start;
                                    " 
                                    on:mouseenter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'} 
                                    on:mouseleave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>

                                        <div style="flex-shrink: 0; margin-right: 12px;">
                                            <div style="width: 40px; height: 40px; border-radius: 50%; background: #e9ecef; display: flex; align-items: center; justify-content: center; font-weight: 600; color: #6c757d;">
                                                {email.sender ? email.sender.charAt(0).toUpperCase() : '?'}
                                            </div>
                                        </div>
                                        
                                        <div style="flex: 1; min-width: 0;">
                                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                                                <span style="font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-right: 12px;">
                                                    {email.sender || 'Unknown Sender'}
                                                </span>
                                                <span style="color: var(--bs-secondary); font-size: 12px; flex-shrink: 0;">
                                                    {formatDate(email.date)}
                                                </span>
                                            </div>
                                            
                                            <p style="font-weight: 600; margin: 0 0 4px 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
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

                        <h3 class="text-center" style="font-family: 'Inter Tight', sans-serif;font-weight: 600;margin-bottom: 16px;">
What is Disposable Temporary E-mail?
            </h3>
            <p class="text-center" style="margin-bottom: 32px;font-size: 20px;">
Disposable email is a free service that provides you with a temporary email address that automatically self-destructs after a set period of time. This service is often called tempmail, 10 minute mail, 10minmail, throwaway email, fake mail, fake email generator, burner mail, or trash mail. Many websites, Wi-Fi providers, forums, and blogs require users to register before accessing content, posting comments, or downloading files. Instead of exposing your real inbox to spam, you can rely on Temp-Mail, the most advanced disposable email service, to stay safe, protect your privacy, and keep unwanted messages out.        
            </p>
            <!-- Add this after the "What is Disposable Temporary E-mail?" section -->

<!-- Popular Articles Section -->
<div style="margin: 3rem 0; padding: 2rem 0; border-top: 1px solid #eee; border-bottom: 1px solid #eee;">
    <h2 class="text-center" style="font-family: 'Inter Tight', sans-serif; font-weight: 600; margin-bottom: 2rem;">
        Popular Articles from Our Blog
    </h2>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
        {#each getPopularArticles() as article}
            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; transition: transform 0.2s;">
                <div style="display: flex; align-items: center; margin-bottom: 0.75rem;">
                    <span style="background: #e9ecef; padding: 0.2rem 0.6rem; border-radius: 12px; font-size: 0.7rem; font-weight: 500;">
                        {article.category}
                    </span>
                    <span style="margin: 0 0.5rem; color: #6c757d;">•</span>
                    <span style="color: #6c757d; font-size: 0.8rem;">{article.readTime}</span>
                </div>
                
                <h3 style="font-size: 1.2rem; margin-bottom: 0.75rem; font-weight: 600;">
                    <a href="/blog/{article.slug}" style="color: inherit; text-decoration: none;">
                        {article.title}
                    </a>
                </h3>
                
                <p style="color: #6c757d; margin-bottom: 1rem; font-size: 0.9rem;">
                    {article.excerpt}
                </p>
                
                <a href="/blog/{article.slug}" style="color: #007bff; text-decoration: none; font-weight: 500; font-size: 0.9rem;">
                    Read More →
                </a>
            </div>
        {/each}
    </div>
    
    <div style="text-align: center; margin-top: 2rem;">
        <a href="/blog" class="btn btn-blog">
            Visit Our Blog
        </a>
    </div>
</div>

<!-- Add this after the Popular Articles section on your main page -->

<div class="seo-content-section" style="margin: 3rem 0; padding: 2rem 0;">
    <div class="container">
        <h2 class="text-center" style="font-family: 'Inter Tight', sans-serif; font-weight: 600; margin-bottom: 2rem;">
            The Technology Behind Disposable Email Addresses
        </h2>
        
        <div class="seo-rich-content">
            <p>In today's digital world, email addresses have become our online passports—essential for work communication, business connections, social interactions, and accessing services. Nearly all applications and online services require an email address for registration, as do loyalty programs, contests, and special offers.</p>
            
            <h3>What Are Disposable Email Addresses?</h3>
            <p>Disposable Email Addresses (DEAs) provide a innovative solution for maintaining online privacy while accessing digital services. These temporary addresses allow you to:</p>
            
            <div class="feature-list">
                <div class="feature-item">Register for services without revealing your primary email</div>
                <div class="feature-item">Protect your identity from data breaches and spam lists</div>
                <div class="feature-item">Maintain control over your digital footprint</div>
                <div class="feature-item">Automatically expire after a set period</div>
            </div>
            
            <p>When a disposable address is compromised or begins receiving unwanted emails, you can simply retire it without affecting your primary communication channels.</p>
            
            <h3>Practical Uses for Temporary Email Addresses</h3>
            
            <div class="use-cases">
                <div class="use-case">
                    <h4>Extended Free Trials</h4>
                    <p>Many streaming services like Netflix, Hulu, and Amazon Prime offer limited-time trials. With disposable emails, you can extend your trial periods while maintaining access to these services.</p>
                </div>
                
                <div class="use-case">
                    <h4>Retail Offers Without Spam</h4>
                    <p>Stores frequently request email addresses for special offers, which often leads to promotional spam. Temporary emails let you access these benefits without cluttering your primary inbox.</p>
                </div>
                
                <div class="use-case">
                    <h4>Application Testing</h4>
                    <p>Developers can create multiple test accounts using disposable emails to thoroughly evaluate their applications before public release.</p>
                </div>
                
                <div class="use-case">
                    <h4>Multiple Account Management</h4>
                    <p>When services require separate accounts for different purposes (like managing multiple social media profiles), disposable emails provide the necessary separation without creating permanent new accounts.</p>
                </div>
                
                <div class="use-case">
                    <h4>Spam Prevention</h4>
                    <p>Using temporary emails for forums, discussion groups, and web forms significantly reduces spam in your primary inbox.</p>
                </div>
            </div>
            
            <h3>Choosing the Right Disposable Email Service</h3>
            <p>The best temporary email providers offer:</p>
            
            <div class="feature-list">
                <div class="feature-item">Instant email generation with a single click</div>
                <div class="feature-item">No registration requirements or personal information collection</div>
                <div class="feature-item">Complete anonymity for users</div>
                <div class="feature-item">Unlimited email address creation</div>
                <div class="feature-item">Temporary inbox functionality</div>
                <div class="feature-item">User-friendly interface</div>
                <div class="feature-item">Customizable address options</div>
            </div>
            
            <h3>How to Use Disposable Email Addresses Effectively</h3>
            <p>While some users create secondary accounts with traditional providers like Gmail, this approach requires managing multiple inboxes. Professional disposable email services like Fire Temp Mail offer a more efficient solution by providing temporary addresses that forward to your primary email while maintaining complete separation.</p>
            
            <p>The advanced functionality allows you to filter messages—sending suspicious emails directly to trash while delivering important communications to your main inbox. If an address becomes compromised, you can simply disable it without affecting your other accounts.</p>
            
            <div class="conclusion-box">
                <h4>Conclusion: Enhance Your Online Privacy</h4>
                <p>Implementing a disposable email system is an effective strategy for participating in online forums, chat rooms, file-sharing services, and bulletin boards while protecting your primary identity. By using temporary addresses from Fire Temp Mail, you ensure your personal information remains secure and your inbox stays free from unwanted spam.</p>
                
                <p>Take control of your digital privacy today with our secure, anonymous temporary email service designed to keep your online activities separate from your personal communication channels.</p>
            </div>
        </div>
    </div>
</div>

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
                    <a href="/email-generator" style="color: inherit;">Email Generator</a>&nbsp;&nbsp;
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

    .seo-content-section {
        background: linear-gradient(to bottom, #f8f9fa, #ffffff);
        border-radius: 12px;
    }
    li{
        list-style: none;
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
        position: relative;
        padding-left: 1.5rem;
    }
    
    .feature-item:before {
        content: "•";
        color: #007bff;
        font-weight: bold;
        position: absolute;
        left: 0;
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
        
        .feature-item {
            padding-left: 1.2rem;
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
</style>