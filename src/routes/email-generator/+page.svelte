// @ts-nocheck
import { onMount } from "svelte";
import { generate } from "random-words";
import { receivingEmail } from "../../lib/stores";

let address = $receivingEmail;
const url = "https://post.firetempmail.com";

let copyrightYear = new Date().getFullYear();
let emails = [];
let stats = {};
let toasts = [];
let isCopying = false;
let selectedEmail = null;
let viewMode = 'list'; // 'list' or 'detail'

let forwardModalVisible = false;
let forwardRecipient = "";

// automatically stop auto-refresh after 20 refreshes
let stopReloadOn = 20;
let reloadCounter = 0;
let reloadActive = true;

onMount(async function () {
    await loadEmails();
    if (!address) {
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

        emails.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (error) {
        console.error("Failed to load emails:", error);
        showToast("Error", "Failed to load emails. Please try again.", "error");
    }
}

async function generateEmail(reload) {
    let words = generate(2);
    receivingEmail.set(words[0] + "." + words[1] + Math.floor(Math.random() * 1000) + "@firetempmail.com");

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
    if (!email) return;

    if (confirm("Do you really want to permanently delete this email?")) {
        try {
            const emailKey = email.recipient + "-" + email.suffix;
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

// Open forward modal
function openForwardModal(email) {
    selectedEmail = email;
    forwardRecipient = "";
    forwardModalVisible = true;
}

// Send forward email
async function forwardEmail() {
    if (!forwardRecipient || !selectedEmail) return;

    try {
        const response = await fetch(`${url}/mail/forward`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ key: selectedEmail.recipient + "-" + selectedEmail.suffix, forward: forwardRecipient })
        });
        const data = await response.json();
        if (data.code === 200) {
            showToast("Success", `Email forwarded to ${forwardRecipient}!`, "success");
            forwardModalVisible = false;
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
<script>
<!-- Toast Notifications -->
<div class="toast-container">
    {#each toasts as toast (toast.id)}
        <div class="toast" style="border-left-color: {toast.type === 'success' ? 'var(--bs-success)' : toast.type === 'error' ? 'var(--bs-danger)' : 'var(--bs-info)'}">
            <div>
                <h4>{toast.title}</h4>
                <p>{toast.message}</p>
            </div>
            <button on:click={() => removeToast(toast.id)}>×</button>
        </div>
    {/each}
</div>

<section class="py-4 py-xl-5">
    <div class="container" style="max-width: 800px;">
        <div class="text-center p-4 p-lg-5">
            <h1>📮 Fire Temp Mail – Your Free Temporary Email Generator</h1>
            <p>Instantly generate a disposable email address. Keep your real email private and your inbox spam-free.</p>

            <div class="d-xl-flex justify-content-center align-items-center" style="margin-top: 32px;margin-bottom: 16px;">
                <div class="email-box">
                    <p>{address}</p>
                    <button on:click={copyToClipboard}>{isCopying ? '✔' : 'Copy'}</button>
                </div>
                <button class="btn btn-primary" on:click={() => generateEmail(true)}>Re-generate</button>
            </div>

            {#if emails.length === 0}
                <div class="empty-inbox">
                    📭 No emails yet! Your inbox is empty.
                </div>
            {:else}
                <div class="email-list">
                    {#each emails as email (email.recipient + '-' + email.suffix)}
                        {#if email}
                            <div class="email-item" class:unread={!email.isRead} on:click={() => viewEmail(email)}>
                                <div>{email.sender ? email.sender.charAt(0).toUpperCase() : '?'}</div>
                                <div>
                                    <div><strong>{!email.isRead ? email.sender : email.sender}</strong> - {formatDate(email.date)}</div>
                                    <p>{email.subject || '(No Subject)'}</p>
                                    <p>{getEmailPreview(email["content-html"] || email["content-text"])}</p>
                                </div>
                            </div>
                        {/if}
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</section>

<!-- Forward Modal -->
{#if forwardModalVisible}
<div class="modal-backdrop" on:click={() => forwardModalVisible=false}></div>
<div class="modal">
    <h3>Forward Email</h3>
    <input type="email" placeholder="Recipient email" bind:value={forwardRecipient} />
    <div class="modal-actions">
        <button class="btn btn-secondary" on:click={() => forwardModalVisible=false}>Cancel</button>
        <button class="btn btn-primary" on:click={forwardEmail} disabled={!forwardRecipient}>Forward</button>
    </div>
</div>
{/if}

<style>
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
}

.email-list { display:flex; flex-direction:column; gap:12px; }
.email-item { display:flex; padding:12px; border-radius:8px; cursor:pointer; transition:background 0.2s; }
.email-item:hover { background-color:#f5f5f5; }
.email-item.unread { background-color:#f0f8ff; font-weight:600; }

.empty-inbox { padding:32px; border-radius:16px; margin-bottom:32px; border:2px dashed rgb(215,215,215); text-align:center; font-size:20px; color:var(--bs-secondary); }

.toast-container { position:fixed; bottom:20px; right:20px; display:flex; flex-direction:column; gap:10px; z-index:9999; }
.toast { display:flex; justify-content:space-between; background:white; padding:12px 16px; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.1); border-left:5px solid var(--bs-info); }
.toast h4 { margin:0 0 4px 0; font-size:14px; }
.toast p { margin:0; font-size:12px; }
.toast button { background:none; border:none; font-size:16px; cursor:pointer; }

/* Forward Modal */
.modal-backdrop { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.4); z-index:1000; }
.modal { position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:white; padding:24px; border-radius:12px; z-index:1001; width:90%; max-width:400px; box-shadow:0 8px 20px rgba(0,0,0,0.2); }
.modal input { width:100%; padding:8px; margin:12px 0; border-radius:6px; border:1px solid #ccc; }
.modal-actions { display:flex; justify-content:flex-end; gap:12px; }
</style>
