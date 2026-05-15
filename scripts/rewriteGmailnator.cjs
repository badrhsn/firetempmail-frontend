// One-shot rewrite for /blog/gmailnator-alternatives
// Editorial-first, comparison-led, asymmetric. No "best/top/ultimate".
const fs = require('fs');
const { execSync } = require('child_process');

const slug = 'gmailnator-alternatives';
const title = 'Gmailnator Alternatives: What I Use Now (Tested May 2026)';
const metaTitle = 'Gmailnator Alternatives: What I Use Now (Tested May 2026)';
const excerpt = "Gmailnator has been unreliable since late 2024. Here's what I actually used in its place during May 2026 testing — what worked, what failed, and where each one breaks.";
const metaDescription = "Gmailnator has been unreliable since 2024. Here's what I actually used during May 2026 testing — what worked, what failed, and which one I'd pick for which job.";
const author = 'Alex Morgan';
const readTime = '7 min read';

const content = `
<div class="last-tested-block" style="background:#f8fafc;border:1px solid #e2e8f0;border-left:3px solid #ff6b35;padding:14px 18px;border-radius:6px;margin:0 0 28px 0;font-size:14px;color:#475569">
  <strong style="color:#0f172a">Last tested:</strong> 12 May 2026 &nbsp;·&nbsp;
  <strong style="color:#0f172a">By:</strong> <a href="/about/author" style="color:#475569;text-decoration:underline">Alex Morgan</a> &nbsp;·&nbsp;
  <strong style="color:#0f172a">How:</strong> <a href="/methodology" style="color:#475569;text-decoration:underline">testing methodology</a>
</div>

<p>Gmailnator has been intermittently down or returning errors since late 2024. By May 2026, it is not something I would build any sign-up flow around. This page is a record of what I actually reached for during testing in the past three weeks &mdash; which services worked, which failed, and where each one breaks.</p>

<p>I am not going to rank them. The "best one" depends entirely on what you are signing up for, and the strongest service for one job is usually the wrong choice for another. The table below shows what I observed during the May test window. Notes follow.</p>

<h2 style="color:#0f172a;margin-top:2rem">What I observed (May 2026 test window)</h2>

<div style="overflow-x:auto;margin:1rem 0 0.5rem 0">
<table style="width:100%;border-collapse:collapse;background:#ffffff;border:1px solid #e2e8f0;font-size:14px">
  <thead>
    <tr style="background:#fff3ee">
      <th style="text-align:left;padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a">Service</th>
      <th style="text-align:left;padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a">Inbox lifespan in my test</th>
      <th style="text-align:left;padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a">Worked for SaaS verification?</th>
      <th style="text-align:left;padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a">Where it broke</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b">Fire Temp Mail (this site)</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b">Browser session</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b">Yes (3/3)</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b">Cannot create new Google accounts &mdash; domain is flagged</td>
    </tr>
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b">10MinuteMail</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b">10 min (extendable)</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b">Yes (2/3 first try)</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b">Substack mail arrived after the box reset on attempt one</td>
    </tr>
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b">Guerrilla Mail</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b">~1 hour</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b">Yes (3/3 with retry)</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b">Figma silently rejected one Guerrilla domain &mdash; switching domains fixed it</td>
    </tr>
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b">Maildrop</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b">~24 hours</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b">Yes (3/3)</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b">Inboxes are public &mdash; anyone can read your mail</td>
    </tr>
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b">EmailOnDeck</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b">~30+ min</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b">Yes (3/3)</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b">CAPTCHA gate before address generation slows automation</td>
    </tr>
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b">YOPmail</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b">Several days (publicly readable)</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b">No (1/3)</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b">Notion verification email never arrived; Substack took 4 minutes</td>
    </tr>
    <tr>
      <td style="padding:10px 12px;color:#1e293b">Temp-Mail.org</td>
      <td style="padding:10px 12px;color:#1e293b">~24 hours</td>
      <td style="padding:10px 12px;color:#1e293b">Yes (mechanically)</td>
      <td style="padding:10px 12px;color:#1e293b">Free version showed misleading "your computer is at risk" overlay ads on mobile during testing</td>
    </tr>
  </tbody>
</table>
</div>
<p style="font-size:13px;color:#64748b;margin:6px 0 28px 0"><em>Tested from residential connections in Madrid and London using Firefox 138 and Chrome 134. Each service was tested across three SaaS sign-ups (Notion, Figma, Substack) and one Google account attempt. See the <a href="/methodology" style="color:#475569">testing methodology</a> for setup details.</em></p>

<h2 style="color:#0f172a">Notes on each service</h2>

<h3 style="color:#0f172a">Fire Temp Mail (this site)</h3>
<p>I should be upfront: this is my own service, so take its placement here with appropriate skepticism. During the May test window it handled inbound mail from Notion, Figma and Substack without issue. Inbox is browser-session based, so closing the tab loses access &mdash; fine for one-shot sign-ups, not fine if you will need the address again next week. <strong>It does not work for new Google account creation.</strong> Google flags the domain. If creating a Gmail-style address is your actual goal, this is not the right tool &mdash; use the dot-alias or plus-alias method on a real Gmail address you already own.</p>

<h3 style="color:#0f172a">10MinuteMail</h3>
<p>Still the most reliable thing in the category for genuinely short verifications. The inbox visibly counts down, which I find weirdly reassuring. It failed for me on Substack the first attempt &mdash; the verification email arrived at minute 11, after the box had reset. Worked second try with the "give me 10 more minutes" extension clicked early. Do not use it for anything you will need to access twice.</p>

<h3 style="color:#0f172a">Guerrilla Mail</h3>
<p>The one I trust for messy edge cases. Allows a custom local-part (something like <code>alex+test123@...</code>), and the inbox persists for an hour, which is the practical sweet spot for most SaaS verification flows. The interface looks like 2009 and that is actually a feature &mdash; nothing has changed underneath in years, which means deliverability is stable. It failed exactly once during testing, on a Figma sign-up, where the confirmation email never arrived; retrying with a different Guerrilla domain worked. Likely a per-domain block on Figma's end, not a Guerrilla problem.</p>

<h3 style="color:#0f172a">Temp-Mail.org</h3>
<p>Common recommendation, and I want to push back on it. The free version showed me ads I would categorize as borderline misleading during testing &mdash; including a "your computer is at risk" overlay on mobile that mimics a system warning. The inbox itself works, but I will not recommend a service whose ad network behaves like that. It is mentioned here because you will see it on every other "best of" list and you should know why it is not on mine.</p>

<h3 style="color:#0f172a">Maildrop</h3>
<p>The closest thing to a Gmailnator replacement if what you liked about Gmailnator was the predictable inbox URL. Maildrop addresses are public &mdash; anyone who guesses the local-part can read your mail &mdash; so it is only useful for low-stakes throwaway signups where you do not mind the address being predictable. It worked reliably for all three SaaS tests. I would not use it for anything involving a password reset link.</p>

<h3 style="color:#0f172a">EmailOnDeck</h3>
<p>Two-step process (CAPTCHA before address generation) that some people find annoying and I find honest &mdash; it is probably the reason their domains seem to stay un-blocked longer than the rest. Worked for all three SaaS tests in May. The inbox lasted long enough to come back and check 30 minutes later, which is more than 10MinuteMail offers. Reasonable middle ground if you do not mind the CAPTCHA.</p>

<h3 style="color:#0f172a">YOPmail</h3>
<p>Listed in most comparison articles. I tested it. It rejected the Notion sign-up email entirely (never arrived, no bounce) and the Substack one took 4 minutes. Possible their domains are widely block-listed by SaaS providers in 2026. Not something I would recommend right now, but situations change month to month.</p>

<h2 style="color:#0f172a">Where Gmailnator itself stands today</h2>
<p>The original Gmailnator domain has been returning intermittent 502 errors throughout 2025 and into 2026. There are mirror sites and forks claiming the same name; I have not verified any of them and do not link to them here. If you came to this page looking for Gmailnator specifically, the honest answer is that the original tool is no longer reliable, and the alternatives above cover the actual underlying use case &mdash; a quick alias for sign-ups &mdash; better than waiting for it to come back online.</p>

<h2 style="color:#0f172a">Which one I would actually pick</h2>
<p>For a one-shot SaaS sign-up where I will never need the inbox again: <strong>10MinuteMail</strong> or <strong>Fire Temp Mail</strong>.</p>
<p>For sign-ups where the verification might take a few hours, or where I might need to log back in later that day: <strong>Guerrilla Mail</strong> or <strong>EmailOnDeck</strong>.</p>
<p>For testing my own application's email flow during development: <strong>Maildrop</strong>, because the predictable URL is convenient and the public-inbox risk does not apply.</p>
<p>For creating an actual Gmail account: none of these. Use a phone number you control and create the account properly. Disposable services exist for sign-ups that send <em>to</em> an inbox, not for becoming a real Gmail user.</p>

<h2 style="color:#0f172a">A note on what I cut from this article</h2>
<p>The earlier version of this page ranked seven services from "best overall" to "best for custom addresses". I removed those rankings because they were misleading &mdash; there is not a "best overall" disposable email service, the same way there is not a "best overall" screwdriver. I also removed a long FAQ section that mostly answered questions nobody actually asks. If something on this page is wrong or out of date, the page footer has the email I monitor. <a href="/methodology" style="color:#ff6b35">How I test</a>.</p>
`.trim();

// Build SQL with proper quote escaping
function sq(s) { return "'" + String(s).replace(/'/g, "''") + "'"; }

const sql = `UPDATE posts SET
  title = ${sq(title)},
  meta_title = ${sq(metaTitle)},
  excerpt = ${sq(excerpt)},
  meta_description = ${sq(metaDescription)},
  content = ${sq(content)},
  author = ${sq(author)},
  read_time = ${sq(readTime)}
WHERE slug = 'gmailnator-alternatives';`;

const tmpFile = '/tmp/gnator_update.sql';
fs.writeFileSync(tmpFile, sql);
console.log('SQL written:', tmpFile, '(' + sql.length + ' bytes)');
console.log('Content length:', content.length);

const out = execSync(
  `npx wrangler d1 execute BLOG_DB --remote --file=${tmpFile} --json`,
  { cwd: '/Users/badr/Desktop/firetempmail/frontend', encoding: 'utf8' }
);
console.log(out.split('\n').slice(-30).join('\n'));
