<script>
  import { allBanners, setBanner, activateById } from '$lib/stores/banners';
  import { onMount } from 'svelte';

  let banners = [];
  let newBanner = { position: 'top', title: '', content: '', size: '', isActive: true };

  const unsubscribe = allBanners.subscribe(v => (banners = v));

  onMount(() => {
    return () => unsubscribe();
  });

  function addBanner() {
    const id = Date.now();
    allBanners.update(list => [...list, { id, ...newBanner }]);
    if (newBanner.isActive) setBanner(newBanner.position, newBanner.content);
    newBanner = { position: 'top', title: '', content: '', size: '', isActive: true };
  }

  function activate(b) {
    activateById(b.id);
  }
</script>

<div class="admin-page">
  <h1>Banner Management</h1>

  <section class="banner-form">
    <h2>Add New Banner</h2>
    <label>Position
      <select bind:value={newBanner.position}>
        <option value="top">Top (728x90)</option>
      </select>
    </label>

    <label>Title
      <input type="text" bind:value={newBanner.title} />
    </label>

    <label>Size
      <input type="text" bind:value={newBanner.size} placeholder="728x90" />
    </label>

    <label>HTML Content
      <textarea bind:value={newBanner.content} rows="8"></textarea>
    </label>

    <label>
      <input type="checkbox" bind:checked={newBanner.isActive} /> Active
    </label>

    <button on:click={addBanner}>Add Banner</button>
  </section>

  <section class="banner-list">
    <h2>Existing Banners</h2>
    {#each banners as b}
      <div class="banner-item">
        <h3>{b.title} — {b.position}</h3>
        <div class="preview">{@html b.content}</div>
        <div class="actions">
          <button on:click={() => activate(b)}>Activate</button>
        </div>
      </div>
    {/each}
  </section>
</div>

<style>
  .admin-page { padding: 1rem; }
  .banner-form { margin-bottom: 1.5rem; }
  .banner-form label { display: block; margin-bottom: .5rem; }
  .banner-list .banner-item { border: 1px solid #eee; padding: .5rem; margin-bottom: .75rem; }
  .preview { max-width: 400px; overflow: auto; }
</style>
