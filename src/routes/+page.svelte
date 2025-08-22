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
let isCopying = false;
let reloadCounter = 0;
let reloadActive = true;
let stopReloadOn = 20;

// Notifications
let notifications = [];

function showNotification(message, type = "info", duration = 3000) {
    const id = Date.now();
    notifications = [...notifications, { id, message, type }];
    setTimeout(() => {
        notifications = notifications.filter(n => n.id !== id);
    }, duration);
}

// Forward modal
let showForwardModal = false;
let forwardEmailAddress = "";
let emailToForward = null;

function openForwardModal(email) {
    emailToForward = email;
    forwardEmailAddress = "";
    showForwardModal = true;
}

async function confirmForward() {
    if (!forwardEmailAddress) {
        showNotification("Please enter a valid email.", "error");
        return;
    }

    try {
        const response = await fetch(`${url}/mail/forward`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ key: emailToForward.recipient + "-" + emailToForward.suffix, forward: forwardEmailAddress }),
        });
        const data = await response.json();

        if (data.code === 200) {
            showNotification("Email forwarded successfully!", "success");
        } else {
            showNotification(`Failed to forward email: ${data.msg}`, "error");
        }
    } catch (error) {
        console.error("Forward error:", error);
        showNotification("Failed to forward email.", "error");
    } finally {
        showForwardModal = false;
    }
}

onMount(async () => {
    await loadEmails();
    if (!address) generateEmail(false);
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
        showNotification("Failed to load emails. Please try again.", "error");
    }
}

async function generateEmail(reload) {
    let words = generate(2);
    receivingEmail.set(words[0] + "." + words[1] + Math.floor(Math.random() * 1000) + "@firetempmail.com");
    if (reload) await loadEmails();
}

async function manualReload() { await loadEmails(); }

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
    if (!confirm("Do you really want to permanently delete this email?")) return;

    try {
        let emailKey = email.recipient + "-" + email.suffix;
        const response = await fetch(`${url}/mail/delete?key=${emailKey}`);
        const data = await response.json();

        if (data.code === 200) {
            emails = emails.filter(e => e && e.recipient + "-" + e.suffix !== emailKey);
            if (stats.count) stats.count = Math.max(0, parseInt(stats.count) - 1).toString();
            showNotification("Email deleted successfully.", "success");
        } else {
            showNotification(`Failed to delete email: ${data.msg}`, "error");
        }
    } catch (error) {
        console.error("Delete error:", error);
        showNotification("Failed to delete email. Please try again.", "error");
    }
}

async function copyToClipboard() {
    if (!address) return;
    isCopying = true;
    try {
        await navigator.clipboard.writeText(address);
        showNotification("Email address copied!", "success");
    } catch (error) {
        console.error("Copy failed:", error);
        showNotification("Failed to copy.", "error");
    } finally {
        setTimeout(() => { isCopying = false; }, 1000);
    }
}

// Automatic refresh
const intervalID = setInterval(timedReload, 20000);
</script>

<!-- Notifications -->
<div class="notification-container">
    {#each notifications as n (n.id)}
        <div class="notification {n.type}">{n.message}</div>
    {/each}
</div>

<!-- Forward Modal -->
{#if showForwardModal}
<div class="modal-backdrop" on:click={() => showForwardModal = false}>
    <div class="modal-content" on:click|stopPropagation>
        <h3>Forward Email</h3>
        <input type="email" bind:value={forwardEmailAddress} placeholder="Enter recipient email"/>
        <div class="modal-buttons">
            <button class="btn btn-primary" on:click={confirmForward}>Forward</button>
            <button class="btn btn-secondary" on:click={() => showForwardModal = false}>Cancel</button>
        </div>
    </div>
</div>
{/if}

<section class="py-4 py-xl-5">
<div class="container" style="max-width: 800px;">
    <div class="text-center p-4 p-lg-5">
        <h1 class="text-start">📮 Fire Temp Mail</h1>
        <p class="text-start">Generate a temporary email below and receive emails.</p>

        <!-- Email address -->
        <div class="email-container">
            <p class="email-address">{address}</p>
            <button on:click={copyToClipboard} class="copy-btn">
                {#if isCopying}Copied!{:else}Copy{/if}
            </button>
            <button class="btn btn-primary" on:click={() => generateEmail(true)}>Re-generate</button>
        </div>

        {#if reloadActive}
            <div class="loading">
                <img src="/assets/img/ring-resize.svg" alt="Loading" />
                <span>Waiting for incoming emails</span>
            </div>
        {:else}
            <div class="loading stopped">
                Automatic refresh stopped
            </div>
        {/if}

        <!-- Emails list -->
        {#if emails.length === 0}
            <div class="no-emails">Incoming mails will show up here</div>
        {:else}
            {#each emails as email (email.recipient + '-' + email.suffix)}
                {#if email && email.sender && email.recipient}
                    <div class="email-card">
                        <div class="email-header">
                            <div class="email-info">
                                <p>{email.sender || 'Unknown Sender'}</p>
                                <p class="email-subject">{email.subject || '(No Subject)'}</p>
                            </div>
                            <div class="email-actions">
                                <button on:click={() => openForwardModal(email)}>↩</button>
                                <button on:click={() => deleteEmail(email)}>🗑</button>
                            </div>
                        </div>
                        <div class="email-content">
                            {@html email["content-html"] || 'No content available'}
                        </div>
                    </div>
                {/if}
            {/each}
        {/if}
    </div>
</div>
</section>

<style>
/* Notifications */
.notification-container {
    position: fixed;
    top: 16px;
    right: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    z-index: 2000;
}
.notification { padding: 12px 20px; border-radius: 12px; color: white; font-weight: 500; box-shadow: 0 4px 12px rgba(0,0,0,0.15);}
.notification.success { background-color: #28a745; }
.notification.error { background-color: #dc3545; }
.notification.info { background-color: #17a2b8; }

/* Forward Modal */
.modal-backdrop { position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:1000; }
.modal-content { background:white; padding:2rem; border-radius:16px; max-width:400px; width:90%; text-align:center; }
.modal-buttons { display:flex; justify-content:space-between; margin-top:1rem; }
.modal-buttons .btn { flex: 1; margin: 0 4px; }

/* Emails */
.email-card { border:2px solid #ddd; border-radius:16px; margin-bottom:32px; padding:16px; overflow-wrap: break-word; word-break: break-word; max-width:100%; }
.email-header { display:flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; }
.email-info p { margin:0; font-weight:600; }
.email-subject { font-size:16px; color:#555; }
.email-actions button { margin-left:8px; background:transparent; border:none; cursor:pointer; font-size:16px; }
.email-content { max-width:100%; overflow-x:auto; }

/* Responsive */
.email-content img, .email-content table { max-width:100% !important; height:auto !important; }
.email-container { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:16px; }
.copy-btn { background:#17a2b8; color:white; border:none; padding:8px 12px; border-radius:8px; cursor:pointer; }

/* Loading */
.loading { display:flex; align-items:center; gap:8px; margin:32px 0; font-weight:500; }
.loading img { width:32px; height:32px; }
.loading.stopped { color:red; font-weight:600; }
.no-emails { padding:32px; border:2px dashed #ddd; border-radius:16px; text-align:center; font-size:18px; }
</style>
