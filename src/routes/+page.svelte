<script>
    import { onMount } from "svelte";
    import { receivingEmail, emails, stats, viewMode, selectedEmail } from '$lib/stores/emailStore';
    import { toasts, isCopying, reloadActive, reloadCounter } from '$lib/stores/uiStore';
    import { loadEmails } from '$lib/utils/api';
    import { generateEmail } from '$lib/utils/emailHelpers';
    import { showToast } from '$lib/stores/uiStore';
    
    import ToastContainer from '$lib/components/ui/Toast/ToastContainer.svelte';
    import EmailList from '$lib/components/ui/EmailList/EmailList.svelte';
    import EmailDetail from '$lib/components/ui/EmailDetail/EmailDetail.svelte';
    import Header from '$lib/components/ui/Header.svelte';
    
    let copyrightYear = new Date().getFullYear();
    const stopReloadOn = 20;
    
    onMount(async function () {
        await loadInitialEmails();
    });
    
    async function loadInitialEmails() {
        if ($receivingEmail === null) {
            receivingEmail.set(generateEmail());
        }
        await loadEmailsData();
    }
    
    async function loadEmailsData() {
        try {
            const data = await loadEmails($receivingEmail);
            emails.set(data.emails);
            stats.set(data.stats);
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    }
    
    // Other functions...
</script>

<ToastContainer />

<!-- Away Banner -->
{#if !$reloadActive}
    <!-- Banner content -->
{/if}

<svelte:head>
    <title>Fire Temp Mail - Temporary Email Service</title>
</svelte:head>

<Header />

<main>
    {#if $viewMode === 'detail'}
        <EmailDetail />
    {:else}
        <EmailList />
    {/if}
</main>

<Footer {copyrightYear} {stats} />