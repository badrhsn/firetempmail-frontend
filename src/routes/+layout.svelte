<script>
    import Header from '$lib/components/Header.svelte';
    import '../app.css';
</script>

<Header />

<main>
    <slot />
</main>

<style>
    main {
        min-height: calc(100vh - 80px);
    }
</style>