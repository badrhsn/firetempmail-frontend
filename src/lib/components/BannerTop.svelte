<script>
  import { onDestroy } from 'svelte';
  import { getBanner } from '$lib/stores/banners';
  import { emailsLoaded } from '$lib/stores';
  import { onMount } from 'svelte';

  let topBanner = null;
  const unsubscribe = getBanner.subscribe(fn => {
    if (fn) topBanner = fn('top');
  });

  let _emailsLoaded = false;
  let isMobile = false;
  let showBanner = true;
  const unsubLoaded = emailsLoaded.subscribe(v => { _emailsLoaded = v; updateIsMobile(); });

  function updateIsMobile() {
    isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
    showBanner = !isMobile || (isMobile && _emailsLoaded);
  }

  onMount(() => {
    updateIsMobile();
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(max-width: 768px)');
      const listener = () => updateIsMobile();
      mq.addEventListener?.('change', listener);
      window.addEventListener('resize', listener);
      return () => {
        mq.removeEventListener?.('change', listener);
        window.removeEventListener('resize', listener);
      };
    }
  });

  onDestroy(() => {
    unsubscribe();
    unsubLoaded();
  });
</script>

{#if topBanner && showBanner}
  <div class="top-banner-container" aria-hidden="false">
    <div class="top-banner">
      {@html topBanner}
    </div>
  </div>
{/if}

<style>
  :global(.top-banner-container) {
    width: 100%;
    padding: 8px 0;
    text-align: center;
    z-index: 900;
  }

  /* Desktop: center a fixed leaderboard width */
  :global(.top-banner) {
    overflow: hidden;
    display: inline-block;
    width: 728px;
    margin: 0 auto;
  }

  /* Constrain image height on larger screens */
  :global(.top-banner img) {
    max-height: 120px;
    height: auto;
    width: auto;
    display: block;
  }

  /* Mobile: show a rectangle-friendly banner that scales responsively */
  @media (max-width: 768px) {
    /* Make the banner a rectangle (approx 300x250) and force inner
       injected elements to occupy the full box so content is visible. */
    :global(.top-banner) {
      width: min(90%, 320px) !important;
      height: 250px !important;
      display: block !important;
      margin: 0 auto !important;
      box-sizing: border-box !important;
    }

    /* Force any wrapper, anchor, or nested element to fill the rectangle.
       Use generous selectors and !important to override inline styles from
       injected HTML. */
    :global(.top-banner), :global(.top-banner) :global(*), :global(.top-banner) :global(> *) {
      width: 100% !important;
      height: 100% !important;
      display: block !important;
      box-sizing: border-box !important;
      margin: 0 !important;
      padding: 0 !important;
      max-width: none !important;
      max-height: none !important;
    }

    /* Images should scale to fit the rectangle while preserving aspect ratio */
    :global(.top-banner img) {
      width: 100% !important;
      height: 100% !important;
      object-fit: contain !important;
    }
  }
</style>
