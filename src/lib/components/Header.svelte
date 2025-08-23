<script>
    import { onMount } from 'svelte';
    
    let isMenuOpen = false;
    let currentPath = '/';
    
    // Navigation items
    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Email Generator', path: '/email-generator' },
        { name: 'Blog', path: '/blog' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Contact', path: '/contact' }
    ];
    
    onMount(() => {
        // Get current path for active navigation highlighting
        currentPath = window.location.pathname;
    });
    
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }
    
    function closeMenu() {
        isMenuOpen = false;
    }
</script>

<header class="header">
    <div class="header-container">
        <!-- Logo -->
        <a href="/" class="logo" aria-label="Fire Temp Mail Home">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-icon">
                <path d="M16 2C8.268 2 2 8.268 2 16C2 23.732 8.268 30 16 30C23.732 30 30 23.732 30 16C30 8.268 23.732 2 16 2Z" fill="#007bff"/>
                <path d="M22 12L16 17L10 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 14L16 19L22 14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 16L16 21L22 16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="logo-text">Fire Temp Mail</span>
        </a>
        
        <!-- Desktop Navigation -->
        <nav class="desktop-nav">
            <ul>
                {#each navItems as item}
                    <li>
                        <a 
                            href={item.path} 
                            class:active={currentPath === item.path}
                            on:click={closeMenu}
                        >
                            {item.name}
                        </a>
                    </li>
                {/each}
            </ul>
        </nav>
        
        <!-- Mobile Menu Button -->
        <button class="mobile-menu-button" on:click={toggleMenu} aria-label="Toggle menu">
            <span class={isMenuOpen ? 'hamburger open' : 'hamburger'}></span>
        </button>
    </div>
    
    <!-- Mobile Navigation -->
    {#if isMenuOpen}
        <nav class="mobile-nav">
            <ul>
                {#each navItems as item}
                    <li>
                        <a 
                            href={item.path} 
                            class:active={currentPath === item.path}
                            on:click={closeMenu}
                        >
                            {item.name}
                        </a>
                    </li>
                {/each}
            </ul>
        </nav>
    {/if}
</header>

<style>
    .header {
        background: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        position: sticky;
        top: 0;
        z-index: 1000;
    }
    
    .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        max-width: 1200px;
        margin: 0 auto;
    }
    
    .logo {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #2c3e50;
        font-weight: 700;
        font-size: 1.25rem;
    }
    
    .logo-icon {
        margin-right: 0.5rem;
    }
    
    .logo-text {
        font-family: 'Inter Tight', sans-serif;
    }
    
    .desktop-nav ul {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        gap: 2rem;
    }
    
    .desktop-nav a {
        text-decoration: none;
        color: #6c757d;
        font-weight: 500;
        padding: 0.5rem 0;
        position: relative;
        transition: color 0.2s;
    }
    
    .desktop-nav a:hover,
    .desktop-nav a.active {
        color: #007bff;
    }
    
    .desktop-nav a.active::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: #007bff;
    }
    
    .mobile-menu-button {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
    }
    
    .hamburger {
        display: block;
        width: 24px;
        height: 2px;
        background: #2c3e50;
        position: relative;
        transition: all 0.3s;
    }
    
    .hamburger::before,
    .hamburger::after {
        content: '';
        position: absolute;
        width: 24px;
        height: 2px;
        background: #2c3e50;
        left: 0;
        transition: all 0.3s;
    }
    
    .hamburger::before {
        top: -8px;
    }
    
    .hamburger::after {
        top: 8px;
    }
    
    .hamburger.open {
        background: transparent;
    }
    
    .hamburger.open::before {
        transform: rotate(45deg);
        top: 0;
    }
    
    .hamburger.open::after {
        transform: rotate(-45deg);
        top: 0;
    }
    
    .mobile-nav {
        display: none;
        background: white;
        padding: 1rem;
        border-top: 1px solid #e9ecef;
    }
    
    .mobile-nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    
    .mobile-nav li {
        margin-bottom: 1rem;
    }
    
    .mobile-nav a {
        text-decoration: none;
        color: #2c3e50;
        font-weight: 500;
        padding: 0.5rem 0;
        display: block;
    }
    
    .mobile-nav a.active {
        color: #007bff;
    }
    
    /* Responsive design */
    @media (max-width: 768px) {
        .desktop-nav {
            display: none;
        }
        
        .mobile-menu-button {
            display: block;
        }
        
        .mobile-nav {
            display: block;
        }
    }
</style>