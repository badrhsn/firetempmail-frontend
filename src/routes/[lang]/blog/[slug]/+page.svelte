<script>
  import Page from '../../../blog/[slug]/+page.svelte';
  export let data;
</script>

<svelte:head>
    <meta name="robots" content="noindex, follow" />
</svelte:head>

<Page {data} />
