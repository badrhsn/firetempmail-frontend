/**
 * PSEO Template Generator
 * Generates a complete blog post object for a given platform.
 */

/**
 * @param {Object} params
 * @param {string} params.platform
 * @param {string} params.category
 * @param {boolean} params.blocks_temp_mail
 * @param {string} params.reason
 * @param {"easy"|"medium"|"hard"} params.difficulty
 * @returns {Object} Complete post object ready for D1 insertion
 */
export function generatePseoPost({ platform, category, blocks_temp_mail, reason, difficulty }) {
    const slug = `temp-email-for-${platform.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
    const title = `Temp Email for ${platform} — Free & Instant`;
    const metaTitle = `Temp Email for ${platform} | FireTempMail`;
    const excerpt = `Learn how to use a temporary email for ${platform} to ${reason}. Free, instant, no signup required.`;
    const metaDescription = `Use a free temp email for ${platform} to ${reason}. Instant disposable email — no signup needed.`.slice(0, 160);

    const difficultyLabel = {
        easy: 'very straightforward',
        medium: 'possible with the right approach',
        hard: 'challenging but doable with some workarounds'
    }[difficulty];

    const blocksSection = blocks_temp_mail
        ? `<h2>Does ${platform} Block Temp Emails?</h2>
        <p>Yes, <strong>${platform}</strong> has been known to block some disposable email domains. Many popular temp mail providers are on their blocklist, which means you might see an error like "This email address is not allowed" during signup.</p>
        <p>However, <strong>FireTempMail</strong> regularly rotates its email domains to stay ahead of these blocks. Here's what you can do:</p>
        <ul>
            <li>Try different email addresses from FireTempMail — some domains work better than others</li>
            <li>Use the email quickly before ${platform} updates their blocklist</li>
            <li>If one address gets rejected, generate a new one instantly</li>
        </ul>
        <p>The difficulty level for using temp email with ${platform} is <strong>${difficulty}</strong> — it's ${difficultyLabel}.</p>`
        : `<h2>Does ${platform} Block Temp Emails?</h2>
        <p>Good news — <strong>${platform}</strong> does not actively block temporary email addresses. This means you can easily use a disposable email from FireTempMail to sign up without any issues.</p>
        <p>The difficulty level is <strong>${difficulty}</strong> — it's ${difficultyLabel}. Most users complete the signup process in under 2 minutes.</p>`;

    const content = `
        <p>Looking for a <strong>temp email for ${platform}</strong>? Whether you want to ${reason} or simply keep your inbox clean, a temporary email address is the perfect solution. In this guide, we'll show you exactly how to use <a href="/">FireTempMail</a> with ${platform} — step by step.</p>

        <h2>Why Use a Temporary Email for ${platform}?</h2>
        <p>There are several reasons why people use disposable email addresses for ${platform}:</p>
        <ul>
            <li><strong>Privacy protection</strong> — Keep your real email hidden from ${platform}'s marketing</li>
            <li><strong>Avoid spam</strong> — ${platform} sends frequent newsletters and promotional emails</li>
            <li><strong>${reason.charAt(0).toUpperCase() + reason.slice(1)}</strong> — The main reason users choose temp email for ${platform}</li>
            <li><strong>Quick signup</strong> — No need to create a dedicated email account</li>
            <li><strong>Zero commitment</strong> — Test ${platform} without giving away personal info</li>
        </ul>

        ${blocksSection}

        <h2>How to Use FireTempMail for ${platform}</h2>
        <p>Follow these simple steps to get started:</p>
        <ol>
            <li><strong>Step 1:</strong> Go to <a href="/">firetempmail.com</a> and you'll instantly get a temporary email address</li>
            <li><strong>Step 2:</strong> Copy your temporary email address with one click</li>
            <li><strong>Step 3:</strong> Go to the <strong>${platform}</strong> signup page and start the registration</li>
            <li><strong>Step 4:</strong> Paste your temp email address in the email field</li>
            <li><strong>Step 5:</strong> Come back to <a href="/">firetempmail.com</a> and check your inbox for the verification code</li>
        </ol>
        <p>That's it! Your ${platform} account is ready to use.</p>

        <a href="/" class="cta-button">Get Your Free Temp Email Now</a>

        <h2>Tips for Using Temp Email with ${platform}</h2>
        <ul>
            <li><strong>Act fast</strong> — Temporary emails expire, so complete your signup quickly</li>
            <li><strong>Save your credentials</strong> — Once signed up, remember your ${platform} password since you won't have access to the temp email later</li>
            ${blocks_temp_mail ? `<li><strong>Try multiple addresses</strong> — If ${platform} blocks one, generate a fresh address instantly</li>` : `<li><strong>One address per account</strong> — Use a unique temp email for each ${platform} account</li>`}
            <li><strong>Use for trials</strong> — Perfect for testing ${platform}'s premium features before committing</li>
            <li><strong>Stay anonymous</strong> — Great for ${category.toLowerCase()}-related signups where you want privacy</li>
        </ul>

        <h2>Frequently Asked Questions</h2>

        <h3>Is it legal to use a temp email for ${platform}?</h3>
        <p>Yes, using a temporary email address is completely legal. You're simply choosing which email address to use for registration. However, always follow ${platform}'s terms of service.</p>

        <h3>Will my ${platform} account get banned for using a temp email?</h3>
        <p>${blocks_temp_mail
            ? `${platform} may flag accounts created with known disposable email domains. To reduce risk, complete your profile setup immediately and use the account normally. FireTempMail's rotating domains help minimize detection.`
            : `No, ${platform} does not typically ban accounts created with temporary emails. Once your account is verified, it functions like any other account.`
        }</p>

        <h3>Can I recover my ${platform} account if I lose access?</h3>
        <p>Since temporary emails expire, you won't be able to use email recovery. We recommend adding a backup recovery method (like a phone number) to your ${platform} account right after signup, or updating your email to a permanent one if you plan to keep the account long-term.</p>
    `;

    return {
        title,
        slug,
        excerpt,
        meta_title: metaTitle,
        meta_description: metaDescription,
        read_time: '5 min read',
        category,
        platform,
        content: content.trim()
    };
}
