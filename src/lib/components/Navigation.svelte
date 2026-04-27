<script>
    import { _ } from 'svelte-i18n';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { getLangFromPath, localePath } from '$lib/i18n/lang.js';

    $: currentLang = getLangFromPath($page.url.pathname);
    $: lp = (/** @type {string} */ path) => localePath(path, currentLang);

    const tools = [
        { path: '/temp-gmail',         label: 'Temp Gmail' },
        { path: '/burner-email',        label: 'Burner Email' },
        { path: '/email-generator',     label: 'Email Generator' },
        { path: '/edu-email-generator', label: 'EDU Email' },
        { path: '/best-temp-mail',      label: 'Best Temp Mail' },
    ];

    let toolsOpen = false;
    /** @type {HTMLElement | null} */
    let navEl = null;
    /** @type {HTMLButtonElement | null} */
    let toolBtnEl = null;

    $: isActive = (/** @type {string} */ path) => {
        const target = lp(path);
        return $page.url.pathname === target ||
               $page.url.pathname.startsWith(target + '/');
    };

    $: isToolPageActive = tools.some(t => isActive(t.path));

    function toggleTools() {
        toolsOpen = !toolsOpen;
    }

    /** @param {KeyboardEvent} e */
    function handleNavKeydown(e) {
        if (e.key === 'Escape' && toolsOpen) {
            toolsOpen = false;
            toolBtnEl?.focus();
        }
    }

    onMount(() => {
        /** @param {MouseEvent} e */
        function handleOutsideClick(e) {
            if (navEl && !navEl.contains(/** @type {Node} */ (e.target))) {
                toolsOpen = false;
            }
        }
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<nav class="site-navigation" bind:this={navEl} on:keydown={handleNavKeydown}>
    <a href={lp('/')} class:active={isActive('/')}>{$_('nav.home')}</a>

    <!-- Tools dropdown -->
    <div class="nav-dropdown" class:open={toolsOpen}>
        <button
            bind:this={toolBtnEl}
            class="nav-dropdown-btn"
            class:active={isToolPageActive}
            aria-haspopup="true"
            aria-expanded={toolsOpen}
            on:click={toggleTools}
        >
            Tools <span class="dropdown-caret" aria-hidden="true">▾</span>
        </button>
        <ul class="dropdown-menu" role="menu" aria-label="Tool pages">
            {#each tools as tool}
                <li role="none">
                    <a
                        href={lp(tool.path)}
                        role="menuitem"
                        class:active={isActive(tool.path)}
                        on:click={() => { toolsOpen = false; }}
                    >{tool.label}</a>
                </li>
            {/each}
        </ul>
    </div>

    <a href={lp('/privacy-policy')} class:active={isActive('/privacy-policy')}>{$_('footer.privacy')}</a>
    <a href={lp('/terms')} class:active={isActive('/terms')}>{$_('footer.terms')}</a>
    <a href={lp('/faq')} class:active={isActive('/faq')}>{$_('nav.faq')}</a>
    <a href={lp('/contact')} class:active={isActive('/contact')}>{$_('nav.contact')}</a>
    <a href={lp('/advertising')} class:active={isActive('/advertising')}>{$_('nav.advertising')}</a>
</nav>

<style>
    .site-navigation {
        margin-bottom: 2rem;
        padding: 0.75rem 1rem;
        background: #f8f9fa;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.25rem;
        flex-wrap: wrap;
    }

    /* Shared link + button style */
    .site-navigation a,
    .nav-dropdown-btn {
        color: var(--bs-dark, #212529);
        text-decoration: none;
        font-weight: 500;
        font-size: 1rem;
        font-family: inherit;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        transition: background-color 0.2s;
        background: none;
        border: none;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 0.2em;
        line-height: 1.5;
    }

    .site-navigation a:hover,
    .nav-dropdown-btn:hover,
    .nav-dropdown:hover .nav-dropdown-btn {
        background-color: #e9ecef;
        text-decoration: none;
    }

    .site-navigation a.active,
    .nav-dropdown-btn.active {
        background-color: #dee2e6;
        font-weight: 600;
    }

    /* Dropdown container */
    .nav-dropdown {
        position: relative;
    }

    .dropdown-caret {
        font-size: 0.75em;
        transition: transform 0.15s;
        display: inline-block;
    }

    .nav-dropdown.open .dropdown-caret,
    .nav-dropdown:hover .dropdown-caret {
        transform: rotate(180deg);
    }

    /* Dropdown panel — hidden by default */
    .dropdown-menu {
        display: none;
        position: absolute;
        top: calc(100% + 4px);
        left: 50%;
        transform: translateX(-50%);
        background: #fff;
        border: 1px solid #dee2e6;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        list-style: none;
        margin: 0;
        padding: 0.375rem 0;
        min-width: 180px;
        z-index: 1000;
    }

    /* Show on hover (desktop) OR when .open class is set (click / keyboard) */
    .nav-dropdown:hover .dropdown-menu,
    .nav-dropdown.open .dropdown-menu {
        display: block;
    }

    .dropdown-menu li {
        display: block;
    }

    .dropdown-menu a {
        display: block;
        padding: 0.5rem 1.25rem;
        border-radius: 0;
        white-space: nowrap;
        width: 100%;
        color: var(--bs-dark, #212529);
        font-weight: 500;
    }

    .dropdown-menu a:hover {
        background-color: #f8f9fa;
    }

    .dropdown-menu a.active {
        background-color: #dee2e6;
        font-weight: 600;
    }

    /* ── Mobile ──────────────────────────────────────── */
    @media (max-width: 640px) {
        .site-navigation {
            justify-content: flex-start;
        }

        .nav-dropdown {
            width: 100%;
        }

        .nav-dropdown-btn {
            width: 100%;
            justify-content: space-between;
        }

        /* On touch devices, :hover is unreliable — rely on .open only */
        .nav-dropdown:hover .dropdown-menu {
            display: none;
        }

        .nav-dropdown.open .dropdown-menu {
            display: block;
            position: static;
            transform: none;
            box-shadow: none;
            border-radius: 4px;
            margin: 0.25rem 0 0.25rem 1rem;
            min-width: unset;
        }
    }
</style>