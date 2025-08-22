<script>
// @ts-nocheck
    import { onMount } from "svelte";
    import { generate } from "random-words";
    import { receivingEmail } from "../lib/stores";
    
    let address = $receivingEmail;
    const url = "https://post.firetempmail.com";
    
    let copyrightYear = new Date().getFullYear();
    let emails = [];
    let stats = {};
    let toasts = [];
    let isCopying = false;

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
                Fire Temp Mail Your Temporary Email Address
            </h1>
            <p class="text-start" style="margin-bottom: 32px;font-size: 20px;">
Forget about spam, advertising mailings, hacking and attacking robots. Keep your real mailbox clean and secure. Temp Mail provides temporary, secure, anonymous, free, disposable email address.
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

            {#if emails.length === 0}
                <!-- Incoming Emails -->
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
                <!--sse-->
                {#each emails as email (email.recipient + '-' + email.suffix)}
                    {#if email && email.sender && email.recipient}
                        <!-- Email Template -->
                        <div style="padding: 32px;border: 2px solid rgb(215,215,215);border-radius: 16px;margin-bottom: 32px;overflow: hidden;">
                            <div class="d-xl-flex justify-content-xl-start align-items-xl-center" style="margin-bottom: 22px;height: 56px;">
                                <div class="text-start flex-grow-1" style="padding-bottom: 16px;border-bottom: 2px solid rgb(215,215,215);position: relative;display: inline;overflow: hidden;">
                                    <p style="font-size: 20px;margin-bottom: 0px;width: 100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;position: relative;padding-right: 100px;">
                                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="1em" viewBox="0 0 24 24" width="1em" fill="currentColor" style="margin-top: -4px;margin-right: 8px;color: rgb(255,221,51);">
                                            <g><rect fill="none" height="24" width="24"></rect></g>
                                            <g><g><path d="M12,2C6.47,2,2,6.47,2,12s4.47,10,10,10s10-4.47,10-10S17.53,2,12,2z"></path></g></g>
                                        </svg>
                                        {email.sender || 'Unknown Sender'}
                                        
                                        <span style="top: 0;right: 0;position: absolute;width: 100px;">
                                            <!-- Forward -->
                                            <button class="btn btn-primary" type="button" on:click={() => forwardEmail(email)} style="padding: 4px;border-style: none;background: rgba(255,255,255,0);">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" style="font-size: 24px;margin-top: -4px;color: rgb(33,37,41);">
                                                    <path d="M3 10H13C17.4183 10 21 13.5817 21 18V20M3 10L9 16M3 10L9 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </button>
                                            
                                            <!-- Info -->
                                            <button class="btn btn-primary" type="button" style="padding: 4px;border-style: none;background: rgba(255,255,255,0);">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" style="font-size: 24px;margin-top: -4px;color: rgb(33,37,41);">
                                                    <path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </button>
                                            
                                            <!-- Delete -->
                                            <button class="btn btn-primary" type="button" on:click={() => deleteEmail(email)} style="padding: 4px;border-style: none;background: rgba(255,255,255,0);">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" style="font-size: 24px;margin-top: -4px;color: var(--bs-red);">
                                                    <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </button>
                                        </span>
                                    </p>
                                    <p style="font-size: 20px;font-weight: 600;margin-bottom: 0px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                                        {email.subject || '(No Subject)'}
                                    </p>
                                </div>
                            </div>
                            <div style="margin-top: 32px; overflow: auto; max-width: 100%;">
                                {@html email["content-html"] || 'No content available'}
                            </div>
                        </div>
                    {/if}
                {/each}
                <!--/sse-->
            {/if}
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
                Made with lots of 🥨 in Germany
                <span class="float-end">
                    <a href="https://berrysauce.me/privacy" target="_blank" style="color: inherit;">Privacy</a>&nbsp;&nbsp;
                    <a href="https://berrysauce.me/terms" target="_blank" style="color: inherit;">Terms</a>&nbsp;&nbsp;
                    <a href="https://github.com/berrysauce/justatemp/blob/main/LICENSE" target="_blank" style="color: inherit;">License</a>&nbsp;&nbsp;
                    <a href="mailto:hey@firetempmail.com" style="color: inherit;">Contact</a>
                </span>
            </p>
            <p class="text-start" style="margin-bottom: 4px;font-size: 16px;">
                Copyright © {copyrightYear} berrysauce
            </p>
        </div>
    </div>
</section>

<style>
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
</style>