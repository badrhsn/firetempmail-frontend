<script>
    export let toast;
    
    import { removeToast } from '$lib/stores/uiStore';
    
    // Auto-remove after delay
    import { onMount } from 'svelte';
    onMount(() => {
        const timer = setTimeout(() => {
            removeToast(toast.id);
        }, toast.type === 'success' ? 3000 : 5000);
        
        return () => clearTimeout(timer);
    });
</script>

<div class="toast toast-{toast.type}">
    <div class="toast-icon">
        <!-- SVG icons based on type -->
    </div>
    
    <div class="toast-content">
        <h4>{toast.title}</h4>
        <p>{toast.message}</p>
    </div>
    
    <button on:click={() => removeToast(toast.id)} class="toast-close">
        <!-- Close icon -->
    </button>
</div>

<style>
    /* Toast styles */
</style>