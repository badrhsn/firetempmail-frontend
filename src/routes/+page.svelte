<script>
    import { onMount } from "svelte";
    import { receivingEmail, emails, stats, selectedEmail } from '$lib/stores/emailStore';
    import { toasts, isCopying, reloadActive, reloadCounter, viewMode } from '$lib/stores/uiStore';
    import { loadEmails } from '$lib/utils/api';
    import { generateEmail } from '$lib/utils/emailHelpers';
    import { showToast } from '$lib/stores/uiStore';
    
    import ToastContainer from '$lib/components/ui/Toast/ToastContainer.svelte';
    import EmailList from '$lib/components/ui/EmailList/EmailList.svelte';
    import EmailDetail from '$lib/components/ui/EmailDetail/EmailDetail.svelte';
    import Header from '$lib/components/ui/Header.svelte';
    import Footer from '$lib/components/ui/Footer.svelte';
    
    let copyrightYear = new Date().getFullYear();
    const stopReloadOn = 20;
    
    let intervalID;
    
    onMount(async function () {
        await loadInitialEmails();
        
        // automatic refresh every 20 seconds
        intervalID = setInterval(timedReload, 20000);
        
        return () => {
            if (intervalID) clearInterval(intervalID);
        };
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
            
            // Sort emails by date (newest first)
            emails.update(emails => {
                return emails.sort((a, b) => new Date(b.date) - new Date(a.date));
            });
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    }
    
    async function timedReload() {
        if ($reloadCounter >= stopReloadOn) {
            reloadActive.set(false);
            clearInterval(intervalID);
        }
        await loadEmailsData();
        reloadCounter.update(n => n + 1);
    }
    
    async function manualReload() {
        await loadEmailsData();
        showToast("Info", "Emails refreshed", "info");
    }
</script>

<ToastContainer />

<!-- Away Banner -->
{#if !$reloadActive}
    <div style="background: var(--bs-red);padding: 16px;">
        <p class="text-center" style="margin-bottom: 0px;color: rgba(255,255,255,0.8);font-weight: 500;">
            <span style="font-weight: 600;color: rgb(255,255,255);">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" style="font-size: 20px;margin-top: -4px;margin-right: 8px;">
                    <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                Are you still there?
            </span> 
            Please reload the page to re-enable automatic refresh.
        </p>
    </div>
{/if}

<svelte:head>
    <title>Fire Temp Mail - Temporary Email Service</title>
</svelte:head>

<section class="py-4 py-xl-5">
    <div class="container" style="max-width: 800px;">
        <div class="text-center p-4 p-lg-5">
            <Header />
            
            {#if $reloadActive}
                <!-- Loading Indicator -->
                <div style="padding: 32px;margin-bottom: 32px;">
                    <img src="/assets/img/ring-resize.svg?h=2f4014e589baa9dfda8b268abeba3c2b" alt="Loading" style="width: 32px;height: 32px;margin-top: -8px;margin-right: 16px;">
                    <span style="font-weight: 500;font-size: 20px;">Waiting for incoming emails</span>
                </div>
            {:else}
                <!-- Automatic refresh stopped -->
                <div style="padding: 32px;margin-bottom: 32px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" style="font-size: 32px;margin-top: -6px;margin-right: 16px;color: var(--bs-red);">
                        <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <span style="font-weight: 500;font-size: 20px;">Automatic refresh stopped</span>
                </div>
            {/if}

            {#if $viewMode === 'detail'}
                <EmailDetail />
            {:else}
                <EmailList {manualReload} />
            {/if}
        </div>

        <Footer {copyrightYear} {stats} />
    </div>
</section>