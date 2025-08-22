<script>
    import { selectedEmail, viewMode } from '$lib/stores/emailStore';
    import { forwardEmail, deleteEmail } from '$lib/utils/api';
    import { getFullDate } from '$lib/utils/dateFormatter';
    import { showToast } from '$lib/stores/uiStore';
    
    function handleBack() {
        viewMode.set('list');
        selectedEmail.set(null);
    }
    
    async function handleForward() {
        // Forward logic
    }
    
    async function handleDelete() {
        // Delete logic
    }
</script>

{#if $selectedEmail}
    <div class="email-detail">
        <!-- Email detail content -->
    </div>
{/if}