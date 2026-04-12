<script>
    import { invalidateAll } from '$app/navigation';

    export let data;

    let posts = data.posts || [];
    let total = data.total || 0;

    // Form state
    let form = {
        title: '',
        slug: '',
        platform: '',
        category: 'Guides',
        excerpt: '',
        content: '',
        meta_title: '',
        meta_description: '',
        lang: 'en',
        published: 1
    };

    let editing = false;
    let message = '';
    let messageType = '';
    let loading = false;

    // Categories
    const categories = ['Guides', 'Privacy', 'Tools', 'Streaming', 'Social', 'Gaming', 'Tech', 'Finance', 'Shopping'];
    const languages = ['en', 'fr', 'ar', 'es'];

    // Stats
    $: publishedCount = posts.filter(p => p.published === 1).length;
    $: draftCount = posts.filter(p => p.published === 0).length;
    $: platforms = [...new Set(posts.map(p => p.platform).filter(Boolean))];

    // Auto-generate slug from title
    $: if (!editing) {
        const base = form.title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
        form.slug = form.platform
            ? `temp-email-for-${base}`
            : base;
    }

    function getToken() {
        const match = document.cookie.match(/(?:^|;\s*)admin_token=([^;]*)/);
        return match ? decodeURIComponent(match[1]) : '';
    }

    function showMessage(text, type = 'success') {
        message = text;
        messageType = type;
        setTimeout(() => { message = ''; }, 4000);
    }

    async function refreshPosts() {
        await invalidateAll();
        posts = data.posts || [];
        total = data.total || 0;
    }

    async function handleSubmit() {
        if (!form.title || !form.slug) {
            showMessage('Title and slug are required', 'error');
            return;
        }

        loading = true;
        const token = getToken();
        const endpoint = editing ? '/api/admin/update-post' : '/api/admin/create-post';
        const method = editing ? 'PUT' : 'POST';

        const body = {
            ...form,
            meta_title: form.meta_title || form.title,
            meta_description: form.meta_description || form.excerpt
        };

        try {
            const res = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });

            const result = await res.json();

            if (res.ok) {
                showMessage(editing ? 'Post updated!' : 'Post created!');
                resetForm();
                await refreshPosts();
            } else {
                showMessage(result.error || 'Something went wrong', 'error');
            }
        } catch (err) {
            showMessage('Network error', 'error');
        }
        loading = false;
    }

    async function handleDelete(slug) {
        if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;

        const token = getToken();
        try {
            const res = await fetch('/api/admin/delete-post', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ slug })
            });

            const result = await res.json();
            if (res.ok) {
                showMessage(`Deleted: ${slug}`);
                await refreshPosts();
            } else {
                showMessage(result.error || 'Delete failed', 'error');
            }
        } catch {
            showMessage('Network error', 'error');
        }
    }

    function handleEdit(post) {
        editing = true;
        form = {
            title: post.title || '',
            slug: post.slug || '',
            platform: post.platform || '',
            category: post.category || 'Guides',
            excerpt: '',
            content: '',
            meta_title: '',
            meta_description: '',
            lang: post.lang || 'en',
            published: post.published ?? 1
        };
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function resetForm() {
        editing = false;
        form = {
            title: '',
            slug: '',
            platform: '',
            category: 'Guides',
            excerpt: '',
            content: '',
            meta_title: '',
            meta_description: '',
            lang: 'en',
            published: 1
        };
    }

    function formatDate(d) {
        if (!d) return '—';
        return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
</script>

<svelte:head>
    <title>Admin Dashboard | Fire Temp Mail</title>
    <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="admin">
    <header>
        <h1>🔥 PSEO Admin Dashboard</h1>
        <span class="badge">{total} posts</span>
    </header>

    <!-- Message -->
    {#if message}
        <div class="msg" class:error={messageType === 'error'} class:success={messageType === 'success'}>
            {message}
        </div>
    {/if}

    <!-- Stats -->
    <div class="stats">
        <div class="stat-card">
            <div class="stat-num">{total}</div>
            <div class="stat-label">Total Posts</div>
        </div>
        <div class="stat-card">
            <div class="stat-num">{platforms.length}</div>
            <div class="stat-label">Platforms</div>
        </div>
        <div class="stat-card">
            <div class="stat-num">{publishedCount}</div>
            <div class="stat-label">Published</div>
        </div>
        <div class="stat-card">
            <div class="stat-num">{draftCount}</div>
            <div class="stat-label">Drafts</div>
        </div>
    </div>

    <!-- Create / Edit Form -->
    <section class="form-section">
        <h2>{editing ? '✏️ Edit Post' : '➕ Create New Post'}</h2>
        {#if editing}
            <button class="btn-cancel" on:click={resetForm}>Cancel Edit</button>
        {/if}

        <form on:submit|preventDefault={handleSubmit}>
            <div class="row">
                <div class="field">
                    <label for="title">Title *</label>
                    <input id="title" type="text" bind:value={form.title} placeholder="How to Use Temp Email for Netflix" required />
                </div>
                <div class="field">
                    <label for="slug">Slug *</label>
                    <input id="slug" type="text" bind:value={form.slug} placeholder="temp-email-for-netflix" required />
                </div>
            </div>

            <div class="row">
                <div class="field">
                    <label for="platform">Platform</label>
                    <input id="platform" type="text" bind:value={form.platform} placeholder="netflix, spotify, etc." />
                </div>
                <div class="field">
                    <label for="category">Category</label>
                    <select id="category" bind:value={form.category}>
                        {#each categories as cat}
                            <option value={cat}>{cat}</option>
                        {/each}
                    </select>
                </div>
            </div>

            <div class="field">
                <label for="excerpt">Excerpt</label>
                <textarea id="excerpt" bind:value={form.excerpt} rows="2" placeholder="Brief description for SEO..."></textarea>
            </div>

            <div class="field">
                <label for="content">Content (HTML)</label>
                <textarea id="content" bind:value={form.content} rows="12" placeholder="<h2>Why Use Temp Email for...</h2><p>...</p>"></textarea>
            </div>

            <div class="row">
                <div class="field">
                    <label for="meta_title">Meta Title</label>
                    <input id="meta_title" type="text" bind:value={form.meta_title} placeholder="Defaults to title" />
                </div>
                <div class="field">
                    <label for="meta_description">Meta Description</label>
                    <textarea id="meta_description" bind:value={form.meta_description} rows="2" placeholder="Defaults to excerpt"></textarea>
                </div>
            </div>

            <div class="row">
                <div class="field">
                    <label for="lang">Language</label>
                    <select id="lang" bind:value={form.lang}>
                        {#each languages as l}
                            <option value={l}>{l}</option>
                        {/each}
                    </select>
                </div>
                <div class="field toggle-field">
                    <label for="published">Published</label>
                    <label class="toggle">
                        <input type="checkbox" id="published" checked={form.published === 1} on:change={(e) => form.published = e.target.checked ? 1 : 0} />
                        <span class="slider"></span>
                    </label>
                    <span class="toggle-label">{form.published ? 'Published' : 'Draft'}</span>
                </div>
            </div>

            <button type="submit" class="btn-submit" disabled={loading}>
                {loading ? 'Saving...' : editing ? 'Update Post' : 'Create Post'}
            </button>
        </form>
    </section>

    <!-- Posts Table -->
    <section class="table-section">
        <h2>📋 All Posts ({posts.length})</h2>
        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Platform</th>
                        <th>Category</th>
                        <th>Lang</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {#each posts as post}
                        <tr>
                            <td class="title-cell">
                                <a href="/blog/{post.slug}" target="_blank">{post.title}</a>
                            </td>
                            <td>{post.platform || '—'}</td>
                            <td>{post.category || '—'}</td>
                            <td>{post.lang || 'en'}</td>
                            <td class="date-cell">{formatDate(post.created_at)}</td>
                            <td>
                                {#if post.published === 1}
                                    <span class="badge-pub">Live</span>
                                {:else}
                                    <span class="badge-draft">Draft</span>
                                {/if}
                            </td>
                            <td class="actions-cell">
                                <button class="btn-edit" on:click={() => handleEdit(post)}>Edit</button>
                                <button class="btn-del" on:click={() => handleDelete(post.slug)}>Delete</button>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </section>
</div>

<style>
    .admin {
        min-height: 100vh;
        background: #0f0f0f;
        color: #e0e0e0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        padding: 24px;
        max-width: 1200px;
        margin: 0 auto;
    }
    header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 24px;
    }
    h1 { color: #fff; font-size: 1.6rem; margin: 0; }
    h2 { color: #fff; font-size: 1.2rem; margin: 0 0 16px; }
    .badge {
        background: #ff6b35;
        color: #fff;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 600;
    }

    /* Message */
    .msg {
        padding: 12px 16px;
        border-radius: 8px;
        margin-bottom: 20px;
        font-size: 0.9rem;
    }
    .msg.success { background: #1a3a1a; border: 1px solid #4caf50; color: #8fdf8f; }
    .msg.error { background: #3a1520; border: 1px solid #ff4444; color: #ff8888; }

    /* Stats */
    .stats {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
        margin-bottom: 32px;
    }
    .stat-card {
        background: #1a1a2e;
        border: 1px solid #2a2a4a;
        border-radius: 10px;
        padding: 20px;
        text-align: center;
    }
    .stat-num { font-size: 2rem; font-weight: 700; color: #ff6b35; }
    .stat-label { font-size: 0.85rem; color: #888; margin-top: 4px; }

    /* Form */
    .form-section {
        background: #1a1a2e;
        border: 1px solid #2a2a4a;
        border-radius: 10px;
        padding: 24px;
        margin-bottom: 32px;
    }
    .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
    }
    .field {
        margin-bottom: 16px;
    }
    .field label {
        display: block;
        color: #aaa;
        font-size: 0.8rem;
        margin-bottom: 4px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    input[type="text"], select, textarea {
        width: 100%;
        padding: 10px 12px;
        background: #0f0f1a;
        border: 1px solid #333;
        border-radius: 6px;
        color: #fff;
        font-size: 0.95rem;
        font-family: inherit;
        box-sizing: border-box;
    }
    input:focus, select:focus, textarea:focus {
        outline: none;
        border-color: #ff6b35;
    }
    textarea { resize: vertical; }
    select { cursor: pointer; }

    /* Toggle */
    .toggle-field { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
    .toggle-field > label:first-child { flex-basis: 100%; }
    .toggle { position: relative; display: inline-block; width: 44px; height: 24px; }
    .toggle input { opacity: 0; width: 0; height: 0; }
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0; left: 0; right: 0; bottom: 0;
        background: #333;
        border-radius: 24px;
        transition: 0.3s;
    }
    .slider::before {
        content: '';
        position: absolute;
        height: 18px; width: 18px;
        left: 3px; bottom: 3px;
        background: #fff;
        border-radius: 50%;
        transition: 0.3s;
    }
    .toggle input:checked + .slider { background: #ff6b35; }
    .toggle input:checked + .slider::before { transform: translateX(20px); }
    .toggle-label { color: #aaa; font-size: 0.85rem; }

    /* Buttons */
    .btn-submit {
        width: 100%;
        padding: 12px;
        background: #ff6b35;
        color: #fff;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        margin-top: 8px;
    }
    .btn-submit:hover { background: #e55a2b; }
    .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-cancel {
        background: none;
        border: 1px solid #555;
        color: #aaa;
        padding: 6px 14px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.85rem;
        margin-bottom: 16px;
    }
    .btn-cancel:hover { border-color: #ff6b35; color: #ff6b35; }

    /* Table */
    .table-section {
        background: #1a1a2e;
        border: 1px solid #2a2a4a;
        border-radius: 10px;
        padding: 24px;
    }
    .table-wrap { overflow-x: auto; }
    table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.9rem;
    }
    th {
        text-align: left;
        padding: 10px 12px;
        border-bottom: 2px solid #2a2a4a;
        color: #888;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    td {
        padding: 10px 12px;
        border-bottom: 1px solid #1f1f3a;
    }
    .title-cell { max-width: 280px; }
    .title-cell a { color: #7cb3ff; text-decoration: none; }
    .title-cell a:hover { text-decoration: underline; }
    .date-cell { white-space: nowrap; color: #888; }
    .badge-pub {
        background: #1a3a1a;
        color: #4caf50;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 600;
    }
    .badge-draft {
        background: #3a3a1a;
        color: #ffaa00;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 600;
    }
    .actions-cell { white-space: nowrap; }
    .btn-edit, .btn-del {
        padding: 4px 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.8rem;
        font-weight: 500;
        margin-right: 4px;
    }
    .btn-edit { background: #2a3a5a; color: #7cb3ff; }
    .btn-edit:hover { background: #3a4a6a; }
    .btn-del { background: #3a1520; color: #ff6b6b; }
    .btn-del:hover { background: #4a2530; }

    @media (max-width: 768px) {
        .stats { grid-template-columns: repeat(2, 1fr); }
        .row { grid-template-columns: 1fr; }
    }
</style>
