<script>
    import { createEventDispatcher } from 'svelte';
    
    export let address = '';
    export let emailCount = '0';
    export let isReloadActive = true;
    
    const dispatch = createEventDispatcher();
    let isCopying = false;

    async function copyToClipboard() {
        if (!address) return;
        
        isCopying = true;
        try {
            await navigator.clipboard.writeText(address);
            dispatch('showToast', {
                title: 'Success',
                message: 'Email address copied to clipboard!',
                type: 'success'
            });
        } catch (error) {
            dispatch('showToast', {
                title: 'Error', 
                message: 'Failed to copy to clipboard.',
                type: 'error'
            });
        } finally {
            setTimeout(() => { isCopying = false; }, 1000);
        }
    }

    function handleGenerateEmail() {
        dispatch('generateEmail');
    }
</script>

<div class="space-y-6">
    <!-- Header -->
    <div class="text-left space-y-4">
        <h1 class="text-4xl font-bold">
            <span class="text-4xl mr-2">📮</span>
            Fire Temp Mail - Your Temporary Email Address
        </h1>
        <p class="text-xl text-gray-600 max-w-4xl">
            Forget about spam, advertising mailings, hacking and attacking robots. 
            Keep your real mailbox clean and secure. Temp Mail provides temporary, 
            secure, anonymous, free, disposable email address.
        </p>
    </div>

    <!-- Email Address Card -->
    <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div class="flex flex-col sm:flex-row gap-4 items-center">
            <div class="flex-1 flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg bg-white min-w-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" class="text-gray-500 flex-shrink-0">
                    <path d="M4 4V9H4.58152M19.9381 11C19.446 7.05369 16.0796 4 12 4C8.64262 4 5.76829 6.06817 4.58152 9M4.58152 9H9M20 20V15H19.4185M19.4185 15C18.2317 17.9318 15.3574 20 12 20C7.92038 20 4.55399 16.9463 4.06189 13M19.4185 15H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <input
                    value={address}
                    readonly
                    class="flex-1 text-lg font-mono bg-transparent border-0 outline-none min-w-0"
                />
                <button
                    on:click={copyToClipboard}
                    class="flex-shrink-0 p-1 hover:bg-gray-100 rounded transition-colors"
                    title="Copy to clipboard"
                >
                    {#if isCopying}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" class="text-green-600">
                            <path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    {:else}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" class="text-gray-600">
                            <path d="M8 16H6C4.89543 16 4 15.1046 4 14V6C4 4.89543 4.89543 4 6 4H14C15.1046 4 16 4.89543 16 6V8M14 20H18C19.1046 20 20 19.1046 20 18V14C20 12.8954 19.1046 12 18 12H14C12.8954 12 12 12.8954 12 14V18C12 19.1046 12.8954 20 14 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    {/if}
                </button>
            </div>
            
            <button 
                on:click={handleGenerateEmail}
                class="min-w-fit px-6 py-3 text-lg bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4V9H4.58152M19.9381 11C19.446 7.05369 16.0796 4 12 4C8.64262 4 5.76829 6.06817 4.58152 9M4.58152 9H9M20 20V15H19.4185M19.4185 15C18.2317 17.9318 15.3574 20 12 20C7.92038 20 4.55399 16.9463 4.06189 13M19.4185 15H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Re-generate
            </button>
        </div>
    </div>

    <!-- Status Card -->
    <div class="border rounded-lg p-4 shadow-sm {isReloadActive ? 'border-blue-200 bg-blue-50' : 'border-red-200 bg-red-50'}">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
                {#if isReloadActive}
                    <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <span class="font-medium text-blue-800">Waiting for incoming emails</span>
                {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="text-red-600">
                        <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="font-medium text-red-800">Automatic refresh stopped</span>
                {/if}
            </div>
            
            <span class="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded-full">
                {emailCount} emails received
            </span>
        </div>
    </div>

    {#if !isReloadActive}
        <div class="border border-red-500 bg-red-100 rounded-lg p-4">
            <div class="flex items-center gap-3 text-red-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div>
                    <span class="font-semibold">Are you still there?</span>
                    <span class="ml-2">Please reload the page to re-enable automatic refresh.</span>
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    .space-y-6 > * + * {
        margin-top: 1.5rem;
    }
    
    .space-y-4 > * + * {
        margin-top: 1rem;
    }
</style>