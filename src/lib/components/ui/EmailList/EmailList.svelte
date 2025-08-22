<script>
    import { emails, selectedEmail, viewMode } from '$lib/stores/emailStore';
    import { formatDate, getEmailPreview } from '$lib/utils/emailHelpers';
    
    function handleEmailClick(email) {
        selectedEmail.set(email);
        viewMode.set('detail');
    }
</script>

<div class="email-list-container">
    <div class="list-header">
        <h3>Inbox ({$emails.length})</h3>
        <button on:click={manualReload} class="refresh-btn">
            <!-- Refresh icon -->
            Refresh
        </button>
    </div>
    
    <div class="email-items">
        {#each $emails as email (email.recipient + '-' + email.suffix)}
            {#if email && email.sender && email.recipient}
                <div on:click={() => handleEmailClick(email)} class="email-item">
                    <!-- Email item content -->
                </div>
            {/if}
        {/each}
    </div>
</div>