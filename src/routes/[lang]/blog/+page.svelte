<script>
  import Page from '../../blog/+page.svelte';
  export let data;
</script>

<svelte:head>
    <meta name="robots" content="noindex, follow" />
</svelte:head>

<Page {data} />
