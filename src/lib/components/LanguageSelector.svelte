<script>
    import { locale, locales } from 'svelte-i18n';
    import { languages } from '$lib/i18n';
    
    let showDropdown = false;
    
    function changeLanguage(lang) {
        locale.set(lang);
        showDropdown = false;
        // Store preference in localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('preferred-language', lang);
        }
    }
    
    function toggleDropdown() {
        showDropdown = !showDropdown;
    }
    
    // Close dropdown when clicking outside
    function handleClickOutside(event) {
        if (!event.target.closest('.language-selector')) {
            showDropdown = false;
        }
    }
    
    $: currentLang = languages.find(l => l.code === $locale) || languages[0];
</script>

<svelte:window on:click={handleClickOutside} />

<div class="language-selector">
    <button class="lang-button" on:click={toggleDropdown}>
        <span class="flag">{currentLang.flag}</span>
        <span class="lang-code">{currentLang.code.toUpperCase()}</span>
        <span class="arrow">{showDropdown ? '▲' : '▼'}</span>
    </button>
    
    {#if showDropdown}
        <div class="dropdown">
            {#each languages as lang}
                <button
                    class="dropdown-item"
                    class:active={$locale === lang.code}
                    on:click={() => changeLanguage(lang.code)}
                >
                    <span class="flag">{lang.flag}</span>
                    <span class="name">{lang.name}</span>
                </button>
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
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: #fff;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: all 0.2s;
    }

    .lang-button:hover {
        border-color: #000;
        background: #f8f8f8;
    }

    .flag {
        font-size: 1.2rem;
    }

    .lang-code {
        font-weight: 600;
        color: #000;
    }

    .arrow {
        font-size: 0.7rem;
        color: #666;
        margin-left: 0.25rem;
    }

    .dropdown {
        position: absolute;
        top: calc(100% + 0.5rem);
        right: 0;
        min-width: 200px;
        background: #fff;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

    .dropdown-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        width: 100%;
        padding: 0.75rem 1rem;
        background: none;
        border: none;
        text-align: left;
        cursor: pointer;
        transition: background 0.2s;
    }

    .dropdown-item:hover {
        background: #f8f8f8;
    }

    .dropdown-item.active {
        background: #f0f0f0;
        font-weight: 600;
    }

    .dropdown-item .name {
        color: #000;
    }

    @media (max-width: 768px) {
        .lang-button {
            padding: 0.4rem 0.8rem;
        }

        .lang-code {
            display: none;
        }

        .dropdown {
            right: auto;
            left: 0;
        }
    }
</style>
