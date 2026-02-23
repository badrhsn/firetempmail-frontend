<script>
    import { locale } from 'svelte-i18n';
    import { languages } from '$lib/i18n';
    import { defaultLocale, getLangFromPath, getCanonicalPath } from '$lib/i18n/lang.js';
    
    let showDropdown = false;
    
    function changeLanguage(lang) {
        showDropdown = false;
        if (typeof window === 'undefined') return;
        
        // Store preference
        localStorage.setItem('preferred-language', lang);
        
        // Update the lang cookie so hooks.server.js won't re-redirect
        document.cookie = `lang=${lang};path=/;max-age=${60*60*24*365};samesite=lax;secure`;
        
        // Get the canonical (English) path from current URL
        const currentPath = getCanonicalPath(window.location.pathname);
        
        // Build the new URL
        let newPath;
        if (lang === defaultLocale) {
            // English: go to root path (no prefix)
            newPath = currentPath || '/';
        } else {
            // Other languages: add /lang prefix
            newPath = currentPath === '/' ? `/${lang}` : `/${lang}${currentPath}`;
        }
        
        // Navigate to the new URL
        window.location.href = newPath;
    }
    
    function toggleDropdown() {
        showDropdown = !showDropdown;
    }
    
    function handleClickOutside(event) {
        if (!event.target.closest('.language-selector')) {
            showDropdown = false;
        }
    }
    
    $: currentLang = languages.find(l => l.code === $locale) || languages[0];
</script>

<svelte:window on:click={handleClickOutside} />

<div class="language-selector">
    <button class="lang-button compact" aria-label="Change language" on:click={toggleDropdown}>
        <span class="flag">{currentLang.flag}</span>
        <span class="caret">{showDropdown ? '▴' : '▾'}</span>
    </button>
    
    {#if showDropdown}
        <div class="dropdown">
            {#each languages as lang}
                <div
                    role="button"
                    tabindex="0"
                    class="dropdown-item"
                    class:active={$locale === lang.code}
                    on:click={() => changeLanguage(lang.code)}
                    on:keydown={(e) => e.key === 'Enter' && changeLanguage(lang.code)}
                >
                    <span class="flag">{lang.flag}</span>
                    <span class="name">{lang.name}</span>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .language-selector {
        position: relative;
        z-index: 1000;
    }

    .lang-button {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.25rem 0.4rem;
        background: transparent;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: opacity 0.15s;
    }

    .lang-button:hover {
        opacity: 0.9;
    }

    .lang-button.compact { padding: 0.1rem; }

    .flag {
        font-size: 1.2rem;
        line-height: 1;
        display: inline-block;
    }

    .caret {
        font-size: 0.6rem;
        color: #666;
        margin-left: 0.15rem;
        line-height: 1;
    }

    .dropdown {
        position: absolute;
        top: calc(100% + 0.25rem);
        right: 0;
        min-width: 160px;
        background: #fff;
        border: 1px solid #eaeaea;
        border-radius: 6px;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
        overflow: hidden;
        padding: 0.25rem 0;
    }

    .dropdown-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        padding: 0.4rem 0.6rem;
        background: none;
        border: none;
        text-align: left;
        cursor: pointer;
        transition: background 0.12s;
        font-size: 0.9rem;
    }

    .dropdown-item:hover {
        background: #f7f7f7;
    }

    .dropdown-item.active {
        background: #f0f0f0;
        font-weight: 600;
    }

    .dropdown-item .name {
        color: #000;
    }

    @media (max-width: 768px) {
        .dropdown {
            right: auto;
            left: 0;
        }
        .dropdown { min-width: 140px; }
        .flag { font-size: 1.1rem; }
    }
</style>
