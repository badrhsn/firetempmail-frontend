<script>
    import { toasts } from '$lib/stores/uiStore';
    import Toast from './Toast.svelte';
</script>

<div class="toast-container">
    {#each $toasts as toast (toast.id)}
        <Toast {toast} />
    {/each}
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
</style>