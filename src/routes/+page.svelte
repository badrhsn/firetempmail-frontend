<script>
    import { onMount } from "svelte";
    import EmailHeader from "./EmailHeader.svelte";
    import EmailList from "./EmailList.svelte";
    
    const url = "https://post.firetempmail.com";
    const stopReloadOn = 20;
    
    let address = '';
    let emails = [];
    let stats = { count: '0' };
    let reloadActive = true;
    let reloadCounter = 0;
    let toasts = [];
    let intervalId;

    // Generate random words (replace with your actual implementation)
    function generateRandomWords(count) {
        const words = ['fire', 'temp', 'mail', 'quick', 'fast', 'secure', 'private', 'anonymous'];
        const result = [];
        for (let i = 0; i < count; i++) {
            result.push(words[Math.floor(Math.random() * words.length)]);
        }
        return result;
    }

    function generateEmail(reload = false) {
        const words = generateRandomWords(2);
        address = `${words[0]}.${words[1]}${Math.floor(Math.random() * 1000)}@firetempmail.com`;
        
        if (reload) {
            window.location.reload();
        }
    }

    async function loadEmails() {
        if (!address) return;
        
        try {
            const response = await fetch(`${url}/mail/get?address=${address}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            emails = data.mails || [];
            stats = data.stats || { count: '0' };
        } catch (error) {
            console.error("Failed to load emails:", error);
            showToast("Error", "Failed to load emails. Please try again.", "error");
        }
    }

    async function timedReload() {
        if (reloadCounter >= stopReloadOn) {
            reloadActive = false;
            clearInterval(intervalId);
            return;
        }
        await loadEmails();
        reloadCounter += 1;
    }

    async function deleteEmail(email) {
        if (!email?.recipient || !email?.suffix) return;
        
        if (!confirm("Do you really want to permanently delete this email?")) {
            return;
        }

        try {
            const emailKey = `${email.recipient}-${email.suffix}`;
            const response = await fetch(`${url}/mail/delete?key=${emailKey}`);
            const data = await response.json();
            
            if (data.code === 200) {
                emails = emails.filter(e => 
                    e && `${e.recipient}-${e.suffix}` !== emailKey
                );
                
                stats = {
                    count: Math.max(0, parseInt(stats.count) - 1).toString()
                };
                
                showToast("Success", "Email deleted successfully.", "success");
            } else {
                showToast("Error", `Failed to delete email: ${data.msg}`, "error");
            }
        } catch (error) {
            console.error("Delete error:", error);
            showToast("Error", "Failed to delete email. Please try again.", "error");
        }
    }

    async function forwardEmail(email) {
        if (!email?.recipient || !email?.suffix) return;
        
        const emailKey = `${email.recipient}-${email.suffix}`;
        const forwardTo = prompt("Please enter the email address you want to forward this email to:", "");

        if (!forwardTo?.trim()) {
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

    // Event handlers
    function handleGenerateEmail() {
        generateEmail(true);
    }

    function handleDeleteEmail(event) {
        deleteEmail(event.detail);
    }

    function handleForwardEmail(event) {
        forwardEmail(event.detail);
    }

    function handleShowToast(event) {
        const { title, message, type } = event.detail;
        showToast(title, message, type);
    }

    onMount(async () => {
        if (!address) {
            generateEmail(false);
        }
        await loadEmails();
        
        // Set up automatic reload
        intervalId = setInterval(timedReload, 20000);
        
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    });
</script>

<!-- Toast Notifications -->
<div class="toast-container">
    {#each toasts as toast (toast.id)}
        <div class="toast toast-{toast.type}">
            <div class="toast-icon">
                {#if toast.type === 'success'}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" class="text-green-600">
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                {:else if toast.type === 'error'}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" class="text-red-600">
                        <path d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" class="text-blue-600">
                        <path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                {/if}
            </div>
            
            <div class="toast-content">
                <h4 class="toast-title">
                    {toast.title}
                </h4>
                <p class="toast-message">
                    {toast.message}
                </p>
            </div>
            
            <button 
                on:click={() => removeToast(toast.id)} 
                class="toast-close"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    {/each}
</div>

<div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
        <EmailHeader
            {address}
            emailCount={stats.count}
            isReloadActive={reloadActive}
            on:generateEmail={handleGenerateEmail}
            on:showToast={handleShowToast}
        />
        
        <div class="mt-8">
            <EmailList
                {emails}
                on:deleteEmail={handleDeleteEmail}
                on:forwardEmail={handleForwardEmail}
            />
        </div>
        
        <!-- Footer -->
        <footer class="mt-16 pt-8 border-t border-gray-200">
            <div class="text-sm text-gray-600 space-y-2">
                <p>
                    We've received{' '}
                    <span class="font-mono bg-gray-900 text-white px-2 py-1 rounded text-xs">
                        {stats.count}
                    </span>
                    {' '}emails so far.
                </p>
                <p>Made with lots of 🥨 in Germany</p>
                <div class="flex justify-between items-center">
                    <span>Copyright © {new Date().getFullYear()} berrysauce</span>
                    <div class="space-x-4">
                        <a href="https://berrysauce.me/privacy" target="_blank" rel="noopener noreferrer" class="hover:underline">
                            Privacy
                        </a>
                        <a href="https://berrysauce.me/terms" target="_blank" rel="noopener noreferrer" class="hover:underline">
                            Terms
                        </a>
                        <a href="https://github.com/berrysauce/justatemp/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" class="hover:underline">
                            License
                        </a>
                        <a href="mailto:hey@firetempmail.com" class="hover:underline">
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</div>

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
        animation: slideIn 0.3s ease-out;
        max-width: 100%;
        border-left: 4px solid #3b82f6;
    }
    
    .toast-success {
        border-left-color: #10b981;
    }
    
    .toast-error {
        border-left-color: #ef4444;
    }
    
    .toast-icon {
        margin-right: 0.75rem;
        flex-shrink: 0;
    }
    
    .toast-content {
        flex: 1;
        min-width: 0;
    }
    
    .toast-title {
        margin: 0 0 0.25rem 0;
        font-size: 0.9rem;
        color: #1f2937;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 600;
    }
    
    .toast-message {
        margin: 0;
        font-size: 0.8rem;
        color: #6b7280;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .toast-close {
        background: none;
        border: none;
        padding: 0;
        margin-left: 0.5rem;
        cursor: pointer;
        color: #6b7280;
        flex-shrink: 0;
    }
    
    .toast-close:hover {
        color: #374151;
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
    
    .container {
        width: 100%;
        max-width: 1024px;
    }
    
    .space-y-2 > * + * {
        margin-top: 0.5rem;
    }
    
    .space-x-4 > * + * {
        margin-left: 1rem;
    }
</style>