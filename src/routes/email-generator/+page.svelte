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

    // forward modal state
    let showForwardModal = false;
    let forwardTo = '';
    
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
    
    async function generateEmail(reload) {
        let words = generate(2)
        receivingEmail.set(words[0] + "." + words[1] + Math.floor(Math.random() * 1000) + "@firetempmail.com")

        if (reload) {
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
                    emails = emails.filter(e => e && e.recipient + "-" + e.suffix !== emailKey);
                    if (stats.count) stats.count = Math.max(0, parseInt(stats.count) - 1).toString();
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

    async function forwardEmailAction(email) {
        if (!email || !email.recipient || !email.suffix) return;
        if (!forwardTo) {
            showToast("Error", "Please enter an email address to forward to.", "error");
            return;
        }

        try {
            let emailKey = email.recipient + "-" + email.suffix;
            const response = await fetch(`${url}/mail/forward`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ key: emailKey, forward: forwardTo }),
            });
            const data = await response.json();
            if (data.code === 200) {
                showToast("Success", `Email forwarded to ${forwardTo}!`, "success");
                showForwardModal = false;
                forwardTo = '';
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
        setTimeout(() => { toasts = toasts.filter(toast => toast.id !== id); }, type === "success" ? 3000 : 5000);
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
        if (diffDays === 0) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return date.toLocaleDateString([], { weekday: 'short' });
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }

    function getEmailPreview(content) {
        if (!content) return 'No content';
        const text = content.replace(/<[^>]*>/g, '');
        return text.length > 100 ? text.substring(0, 100) + '...' : text;
    }

    const intervalID = setInterval(timedReload, 20000); 
</script>

<!-- Forward Modal -->
{#if showForwardModal}
<div class="modal-backdrop">
    <div class="modal-content">
        <h4>Forward Email</h4>
        <input type="email" placeholder="Recipient email" bind:value={forwardTo} />
        <div style="display:flex; gap:8px; justify-content:flex-end; margin-top:8px;">
            <button on:click={() => { showForwardModal = false; forwardTo=''; }}>Cancel</button>
            <button on:click={() => forwardEmailAction(selectedEmail)}>Forward</button>
        </div>
    </div>
</div>
{/if}

<!-- Email List -->
{#if emails.length === 0}
    <div class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M21 12v9H3v-9M12 3l9 9H3L12 3z"/>
        </svg>
        <p>No emails yet! Your inbox is lonely 😄</p>
    </div>
{:else}
    <div class="email-list">
        {#each emails as email (email.recipient + '-' + email.suffix)}
            {#if email && email.sender && email.recipient}
                <div on:click={() => viewEmail(email)} 
                     class="email-item {email.unread ? 'unread' : ''}">
                    <div>
                        <span class="sender">{email.sender || 'Unknown Sender'}</span>
                        <span class="date">{formatDate(email.date)}</span>
                    </div>
                    <div>
                        <p class="subject">{email.subject || '(No Subject)'}</p>
                        <p class="preview">{getEmailPreview(email["content-html"] || email["content-text"])}</p>
                    </div>
                </div>
            {/if}
        {/each}
    </div>
{/if}

<style>
.email-item {
    padding: 12px;
    border-bottom: 1px solid #e0e0e0;
    cursor: pointer;
}
.email-item:hover {
    background: #f8f9fa;
}
.email-item.unread .sender,
.email-item.unread .subject {
    font-weight: bold;
    background: rgba(255, 255, 0, 0.05);
}
.empty-state {
    text-align: center;
    padding: 48px;
    color: #6c757d;
}
.modal-backdrop {
    position: fixed;
    top:0; left:0; right:0; bottom:0;
    background: rgba(0,0,0,0.3);
    display:flex; justify-content:center; align-items:center;
    z-index: 10001;
}
.modal-content {
    background:white;
    padding:24px;
    border-radius:12px;
    width: 300px;
    display:flex; flex-direction:column;
}
.modal-content input {
    padding: 8px;
    border-radius:6px;
    border:1px solid #ccc;
    width:100%;
}
.modal-content button {
    padding:6px 12px;
    border-radius:6px;
    border:none;
    cursor:pointer;
}
.modal-content button:first-child { background:#ccc; color:white; }
.modal-content button:last-child { background:#28a745; color:white; }
</style>
