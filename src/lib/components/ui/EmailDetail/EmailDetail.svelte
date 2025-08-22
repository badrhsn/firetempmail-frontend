<script>
    import { selectedEmail } from '$lib/stores/emailStore';
    import { viewMode } from '$lib/stores/uiStore';
    import { forwardEmail, deleteEmail } from '$lib/utils/api';
    import { getFullDate } from '$lib/utils/dateFormatter';
    import { showToast } from '$lib/stores/uiStore';
    
    function handleBack() {
        viewMode.set('list');
        selectedEmail.set(null);
    }
    
    async function handleForward() {
        if (!$selectedEmail || !$selectedEmail.recipient || !$selectedEmail.suffix) return;
        
        let emailKey = $selectedEmail.recipient + "-" + $selectedEmail.suffix;
        let forwardTo = prompt("Please enter the email address you want to forward this email to:", "");

        if (forwardTo === null || forwardTo === "") {
            showToast("Error", "No email address entered.", "error");
            return;
        }

        try {
            const data = await forwardEmail(emailKey, forwardTo);
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
    
    async function handleDelete() {
        if (!$selectedEmail || !$selectedEmail.recipient || !$selectedEmail.suffix) return;
        
        if (confirm("Do you really want to permanently delete this email?")) {
            try {
                let emailKey = $selectedEmail.recipient + "-" + $selectedEmail.suffix;
                const data = await deleteEmail($selectedEmail);
                
                if (data.code === 200) {
                    // Remove the deleted email from the local array
                    // This will be handled by the parent component through the store
                    showToast("Success", "Email deleted successfully.", "success");
                    handleBack();
                } else {
                    showToast("Error", `Failed to delete email: ${data.msg}`, "error");
                }
            } catch (error) {
                console.error("Delete error:", error);
                showToast("Error", "Failed to delete email. Please try again.", "error");
            }
        }
    }
</script>

{#if $selectedEmail}
    <div style="border: 2px solid rgb(215,215,215);border-radius: 16px;margin-bottom: 32px;overflow: hidden;">
        <!-- Email Header -->
        <div style="padding: 24px; border-bottom: 1px solid rgb(215,215,215);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                <button on:click={handleBack} style="
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
                    <button class="btn btn-primary" type="button" on:click={handleForward} style="padding: 4px 8px; border-radius: 8px; background: transparent; border: 1px solid rgb(215,215,215); color: var(--bs-dark);">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M3 10H13C17.4183 10 21 13.5817 21 18V20M3 10L9 16M3 10L9 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    
                    <button class="btn btn-primary" type="button" on:click={handleDelete} style="padding: 4px 8px; border-radius: 8px; background: transparent; border: 1px solid rgb(215,215,215); color: var(--bs-red);">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
            
            <h2 style="font-size: 24px; font-weight: 600; margin-bottom: 8px;">
                {$selectedEmail.subject || '(No Subject)'}
            </h2>
            
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="20" viewBox="0 0 24 24" width="20" fill="currentColor" style="margin-right: 8px; color: rgb(255,221,51);">
                        <g><rect fill="none" height="24" width="24"></rect></g>
                        <g><g><path d="M12,2C6.47,2,2,6.47,2,12s4.47,10,10,10s10-4.47,10-10S17.53,2,12,2z"></path></g></g>
                    </svg>
                    <span style="font-weight: 500;">{$selectedEmail.sender || 'Unknown Sender'}</span>
                </div>
                
                <span style="color: var(--bs-secondary); font-size: 14px;">
                    {getFullDate($selectedEmail.date)}
                </span>
            </div>
        </div>
        
        <!-- Email Body -->
        <div style="padding: 24px; overflow: auto; max-width: 100%; min-height: 200px;">
            {@html $selectedEmail["content-html"] || $selectedEmail["content-text"] || 'No content available'}
        </div>
    </div>
{/if}