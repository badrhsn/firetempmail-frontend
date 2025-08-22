<script>
    import { createEventDispatcher } from 'svelte';
    
    export let emails = [];
    
    const dispatch = createEventDispatcher();
    let expandedEmail = null;

    function toggleEmail(emailKey) {
        expandedEmail = expandedEmail === emailKey ? null : emailKey;
    }

    function getEmailKey(email) {
        return `${email.recipient}-${email.suffix}`;
    }

    function handleDelete(email, event) {
        event.stopPropagation();
        dispatch('deleteEmail', email);
    }

    function handleForward(email, event) {
        event.stopPropagation();
        dispatch('forwardEmail', email);
    }
</script>

<div class="space-y-4">
    {#if emails.length === 0}
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-16 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" class="mx-auto mb-4 text-gray-400">
                <path d="M4 4V9H4.58152M19.9381 11C19.446 7.05369 16.0796 4 12 4C8.64262 4 5.76829 6.06817 4.58152 9M4.58152 9H9M20 20V15H19.4185M19.4185 15C18.2317 17.9318 15.3574 20 12 20C7.92038 20 4.55399 16.9463 4.06189 13M19.4185 15H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p class="text-xl font-medium text-gray-600">
                Incoming emails will show up here
            </p>
        </div>
    {:else}
        {#each emails as email (getEmailKey(email))}
            {#if email?.sender && email?.recipient}
                {@const emailKey = getEmailKey(email)}
                {@const isExpanded = expandedEmail === emailKey}
                
                <div class="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md bg-white">
                    <!-- Email Header -->
                    <div 
                        class="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                        on:click={() => toggleEmail(emailKey)}
                        role="button"
                        tabindex="0"
                        on:keydown={(e) => e.key === 'Enter' && toggleEmail(emailKey)}
                    >
                        <div class="flex items-center justify-between">
                            <div class="flex-1 min-w-0">
                                <!-- Sender -->
                                <div class="flex items-center gap-2 mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" class="text-gray-500">
                                        <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <span class="font-medium text-sm text-gray-900 truncate">
                                        {email.sender}
                                    </span>
                                    <span class="ml-auto bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                                        New
                                    </span>
                                </div>
                                
                                <!-- Subject -->
                                <div class="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" class="text-gray-500">
                                        <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <h3 class="text-base font-semibold truncate">
                                        {email.subject || '(No Subject)'}
                                    </h3>
                                </div>
                            </div>
                            
                            <!-- Action buttons -->
                            <div class="flex items-center gap-2 ml-4">
                                <!-- Forward button -->
                                <button
                                    class="p-1 rounded hover:bg-gray-100 transition-colors"
                                    on:click={(e) => handleForward(email, e)}
                                    title="Forward email"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" class="text-gray-600">
                                        <path d="M3 10H13C17.4183 10 21 13.5817 21 18V20M3 10L9 16M3 10L9 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                                
                                <!-- Info button -->
                                <button
                                    class="p-1 rounded hover:bg-gray-100 transition-colors"
                                    title="Email info"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" class="text-gray-600">
                                        <path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                                
                                <!-- Delete button -->
                                <button
                                    class="p-1 rounded hover:bg-red-50 transition-colors text-red-600 hover:text-red-700"
                                    on:click={(e) => handleDelete(email, e)}
                                    title="Delete email"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                                
                                <!-- Expand/collapse icon -->
                                {#if isExpanded}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" class="text-gray-500">
                                        <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                {:else}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" class="text-gray-500">
                                        <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                {/if}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Email Content (Expanded) -->
                    {#if isExpanded}
                        <div class="border-t border-gray-200"></div>
                        <div class="p-4">
                            <div class="mb-4 p-3 bg-gray-50 rounded-lg">
                                <div class="flex items-center gap-2 text-sm text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 17.5304 20.7893 18.0391 20.4142 18.4142C20.0391 18.7893 19.5304 19 19 19H5C4.46957 19 3.96086 18.7893 3.58579 18.4142C3.21071 18.0391 3 17.5304 3 17V8.5C3 7.96957 3.21071 7.46086 3.58579 7.08579C3.96086 6.71071 4.46957 6.5 5 6.5H19C19.5304 6.5 20.0391 6.71071 20.4142 7.08579C20.7893 7.46086 21 7.96957 21 8.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <span>Received just now</span>
                                </div>
                            </div>
                            
                            <div class="prose prose-sm max-w-none overflow-auto">
                                {@html email['content-html'] || '<p>No content available</p>'}
                            </div>
                        </div>
                    {/if}
                </div>
            {/if}
        {/each}
    {/if}
</div>

<style>
    .space-y-4 > * + * {
        margin-top: 1rem;
    }
</style>