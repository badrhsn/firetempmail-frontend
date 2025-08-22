<script>
    import { emails, selectedEmail } from '$lib/stores/emailStore';
    import { viewMode } from '$lib/stores/uiStore';
    import { formatDate, getEmailPreview } from '$lib/utils/emailHelpers';
    
    export let manualReload;
    
    function handleEmailClick(email) {
        selectedEmail.set(email);
        viewMode.set('detail');
    }
</script>

<div class="email-list-container">
    <!-- List Header -->
    <div style="padding: 16px; background: #f8f9fa; border-bottom: 1px solid rgb(215,215,215); display: flex; justify-content: space-between; align-items: center;">
        <h3 style="margin: 0; font-size: 18px; font-weight: 600;">Inbox ({$emails.length})</h3>
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
        {#each $emails as email (email.recipient + '-' + email.suffix)}
            {#if email && email.sender && email.recipient}
                <div on:click={() => handleEmailClick(email)} style="
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

<style>
    .email-list-container {
        border: 2px solid rgb(215,215,215);
        border-radius: 16px;
        margin-bottom: 32px;
        overflow: hidden;
    }
</style>