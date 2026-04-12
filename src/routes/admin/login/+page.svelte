<script>
    export let form;
</script>

<svelte:head>
    <title>Admin Login | Fire Temp Mail</title>
    <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="login-page">
    <div class="login-card">
        <h1>🔒 Admin Login</h1>
        <p>Enter your API secret to access the dashboard.</p>

        {#if form?.error}
            <div class="error">{form.error}</div>
        {/if}

        <form method="POST">
            <label for="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter API secret"
                required
                autocomplete="current-password"
            />
            <button type="submit">Sign In</button>
        </form>
    </div>
</div>

<style>
    .login-page {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #0f0f0f;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
    .login-card {
        background: #1a1a2e;
        border: 1px solid #2a2a4a;
        border-radius: 12px;
        padding: 40px;
        width: 100%;
        max-width: 400px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    }
    h1 {
        color: #fff;
        font-size: 1.5rem;
        margin: 0 0 8px;
    }
    p {
        color: #888;
        margin: 0 0 24px;
        font-size: 0.9rem;
    }
    label {
        display: block;
        color: #aaa;
        font-size: 0.85rem;
        margin-bottom: 6px;
    }
    input {
        width: 100%;
        padding: 12px 14px;
        background: #0f0f1a;
        border: 1px solid #333;
        border-radius: 8px;
        color: #fff;
        font-size: 1rem;
        margin-bottom: 20px;
        box-sizing: border-box;
    }
    input:focus {
        outline: none;
        border-color: #ff6b35;
    }
    button {
        width: 100%;
        padding: 12px;
        background: #ff6b35;
        color: #fff;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
    }
    button:hover {
        background: #e55a2b;
    }
    .error {
        background: #3a1520;
        border: 1px solid #ff4444;
        color: #ff6b6b;
        padding: 10px 14px;
        border-radius: 8px;
        margin-bottom: 16px;
        font-size: 0.9rem;
    }
</style>
