<script>
    import { receivingEmail } from '$lib/stores/emailStore';
    import { isCopying } from '$lib/stores/uiStore';
    import { generateEmail } from '$lib/utils/emailHelpers';
    import { showToast } from '$lib/stores/uiStore';
    
    let copyrightYear = new Date().getFullYear();
    
    async function copyToClipboard() {
        if (!$receivingEmail) return;
        
        isCopying.set(true);
        try {
            await navigator.clipboard.writeText($receivingEmail);
            showToast("Success", "Email address copied to clipboard!", "success");
        } catch (error) {
            console.error("Copy failed:", error);
            showToast("Error", "Failed to copy to clipboard.", "error");
        } finally {
            setTimeout(() => { isCopying.set(false); }, 1000);
        }
    }
    
    function handleRegenerate() {
        receivingEmail.set(generateEmail());
        // use this instead of window.location.reload(); to avoid resending POST requests
        window.location = window.location.href;
    }
</script>

<header>
    <h1 class="text-start" style="font-family: 'Inter Tight', sans-serif;font-weight: 600;margin-bottom: 16px;">
        <span style="font-weight: normal !important; color: rgb(255, 255, 255);">📮&nbsp;</span>
        Fire Temp Mail
    </h1>
    <p class="text-start" style="margin-bottom: 32px;font-size: 20px;">
        Yet another temporary email generator. But this time open source, ad-free, and privacy-friendly. Generate a temporary email below and receive emails.
    </p>
    
    <!-- Email Address with Copy Button -->
    <div class="d-xl-flex justify-content-xl-center align-items-xl-center" style="margin-top: 32px;margin-bottom: 16px;">
        <div style="
            padding: 8px 30px;
            border: 2px solid rgb(215,215,215);
            border-radius: 16px;
            width: 100%;
            margin-right: 16px;
            height: 50px;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: white;
        ">
            <p class="text-truncate text-start" style="margin-bottom: 0px;font-size: 20px;flex: 1;">
                {$receivingEmail}
            </p>
            <button 
                on:click={copyToClipboard} 
                class="btn btn-sm" 
                style="
                    margin-left: 12px;
                    background: transparent;
                    border: none;
                    padding: 4px 8px;
                    color: $isCopying ? 'var(--bs-success)' : 'var(--bs-primary)';
                "
                title="Copy to clipboard"
            >
                {#if $isCopying}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M8 16H6C4.89543 16 4 15.1046 4 14V6C4 4.89543 4.89543 4 6 4H14C15.1046 4 16 4.89543 16 6V8M14 20H18C19.1046 20 20 19.1046 20 18V14C20 12.8954 19.1046 12 18 12H14C12.8954 12 12 12.8954 12 14V18C12 19.1046 12.8954 20 14 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                {/if}
            </button>
        </div>
        <button class="btn btn-primary" type="button" on:click={handleRegenerate} style="padding: 8px 30px;border-radius: 16px;border-width: 2px;border-color: rgb(33,37,41);background: rgb(33,37,41);font-weight: 500;height: 50px;font-size: 20px;min-width: 220px;margin-bottom: 16px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" style="font-size: 24px;margin-top: -4px;margin-right: 6px;">
                <path d="M4 4V9H4.58152M19.9381 11C19.446 7.05369 16.0796 4 12 4C8.64262 4 5.76829 6.06817 4.58152 9M4.58152 9H9M20 20V15H19.4185M19.4185 15C18.2317 17.9318 15.3574 20 12 20C7.92038 20 4.55399 16.9463 4.06189 13M19.4185 15H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            Re-generate
        </button>
    </div>
</header>

<style>
    .btn:hover {
        opacity: 0.8;
    }
</style>