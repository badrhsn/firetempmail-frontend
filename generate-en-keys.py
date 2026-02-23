#!/usr/bin/env python3
"""
Generate all page-specific translation keys for en.json and create translations for all locales.
This script:
1. Adds all page-specific content to en.json 
2. Generates complete translations for es, de, fr, pt, ar, ru, zh
"""
import json
import os
import re

BASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'src/lib/i18n/locales')

# Read en.json
with open(os.path.join(BASE, 'en.json'), 'r') as f:
    en = json.load(f)

# ============================================================================
# COMMON TOOL UI - strings shared across all 12 product pages
# ============================================================================
# Most of these already exist under "email" key. Add missing ones:
en["email"]["generateNew"] = "Generate New"
en["email"]["changeDomain"] = "Change Domain"
en["email"]["refreshPage"] = "Refresh Page"
en["email"]["generateCustomEmail"] = "Generate Custom Email"
en["email"]["waitingForEmails"] = "Waiting for incoming emails"
en["email"]["refreshStopped"] = "Automatic refresh stopped"
en["email"]["inboxEmpty"] = "Your inbox is empty"
en["email"]["domain"] = "Domain"
en["email"]["gmail"] = "Gmail"
en["email"]["googlemail"] = "GoogleMail"
en["email"]["copyToClipboard"] = "Copy to clipboard"
en["email"]["useCustomAlias2"] = "Use custom alias"
en["email"]["changeDomain2"] = "Change domain"
en["email"]["refreshPage2"] = "Refresh page"
en["email"]["scenario"] = "Scenario:"
en["email"]["solution"] = "Solution:"
en["email"]["challenge"] = "Challenge:"
en["email"]["testingWorkflow"] = "Testing workflow:"
en["email"]["testScenarios"] = "Test scenarios:"
en["email"]["perfectFor"] = "Perfect for:"
en["email"]["important"] = "IMPORTANT:"
en["email"]["neverUse"] = "NEVER use temporary emails for:"

# ============================================================================
# PAGE-SPECIFIC CONTENT - unique content for each page
# ============================================================================

# --- EMAIL GENERATOR ---
en["emailGeneratorPage"] = {
    "h1": "Fire Temp Mail – Your Free Temporary Disposable Email Generator",
    "lead": "Instantly generate a disposable Email Generator address. Keep your real email address private and your inbox clean from unwanted messages and spam.",
    "seoTitle": "Email Generator for Developers & QA Testing",
    "seoDesc": "Professional temporary email generator designed specifically for software developers, QA engineers, and automation testers. Generate unlimited disposable email addresses to test registration flows, email verification systems, password resets, and notification logic—without managing test accounts or cluttering personal inboxes.",
    "whyTitle": "Why Developers Need Disposable Emails for Testing",
    "whyP1": "Testing email-dependent features is essential but painful. You need to verify user registration, email confirmation links, password reset flows, and notification systems—but creating dozens of real email accounts is slow, unsustainable, and clutters your inbox.",
    "whyP2": "Fire Temp Mail provides instant, disposable email addresses specifically designed for software testing. Generate unlimited temporary emails to test your app's email workflows without managing test accounts or dealing with email provider restrictions.",
    "painPointsTitle": "Common Developer Pain Points (Solved)",
    "pp1": "Creating test Gmail/Outlook accounts manually → Generate unlimited emails instantly",
    "pp2": "Managing passwords for multiple test accounts → No credentials needed",
    "pp3": "Cleaning up old test data → Auto-deletion after 24 hours",
    "pp4": "Email providers blocking automated signups → Real domains that work everywhere",
    "pp5": "Testing multi-user scenarios → Unlimited unique addresses on demand",
    "pp6": "CI/CD pipelines needing fresh emails → Zero-setup generation",
    "uc1Title": "1. Testing User Registration & Email Verification",
    "uc1P1": "Your app requires email verification during signup. You need to test that verification emails arrive, links work correctly, tokens expire properly, and edge cases are handled.",
    "uc1P2": "Generate temporary email → Register in your app → Check inbox for verification email (arrives in seconds) → Extract verification link/token → Complete verification → Test edge cases (expired tokens, duplicate verifications).",
    "uc2Title": "2. Password Reset Flow Testing",
    "uc2P1": "Thoroughly test your password reset functionality by generating test accounts with temporary emails, triggering the forgot password flow, receiving reset emails instantly, and verifying token security and expiration logic.",
    "uc2P2": "Valid reset requests, expired tokens, multiple reset attempts, invalid email addresses, rate limiting, and cross-account security.",
    "uc3Title": "3. Multi-User & Role-Based Testing",
    "uc3P1": "Testing apps with different user roles (admin, moderator, user) or multi-tenant systems requires multiple unique email addresses. Generate distinct temporary emails for each test user without the overhead of managing real accounts.",
    "uc4Title": "4. Email Notification System Testing",
    "uc4P1": "If your application sends transactional emails (order confirmations, alerts, reminders, status updates), use temporary emails to verify that emails are triggered by correct events, personalization renders properly, HTML/CSS formatting displays correctly, and links work as expected.",
    "uc5Title": "5. Automated Testing & CI/CD Integration",
    "uc5P1": "Your CI/CD pipeline runs automated E2E tests that involve email-based workflows. Each test run needs fresh, unique email addresses.",
    "uc5P2": "Generate temporary emails programmatically or use consistent naming patterns to create unique addresses for each test execution without manual intervention. Perfect for Playwright, Cypress, or Selenium test suites.",
    "uc6Title": "6. Third-Party Email Service Integration Testing",
    "uc6P1": "Testing integrations with SendGrid, Mailgun, AWS SES, Postmark, or other email service providers requires real recipient addresses to verify successful email delivery, webhook events, bounce handling logic, template rendering, and SPF/DKIM authentication.",
    "featuresTitle": "Developer-Friendly Features",
    "f1": "Zero Setup Required: No API keys, no authentication, no account creation. Visit the page, get an email address, start testing.",
    "f2": "Real-Time Email Reception: Emails appear in the inbox within seconds. No polling delays, no batch processing.",
    "f3": "Full Email Access: View complete email content including HTML body, plain text alternative, email headers, sender information, and attachments.",
    "f4": "Custom Aliases for Organization: Use descriptive email addresses that map to specific test cases.",
    "f5": "Automatic Cleanup: Emails auto-delete after 24 hours. No manual cleanup, no credential management, no maintenance overhead.",
    "securityTitle": "Security Reminder for Developers",
    "securityWarn": "Temporary emails are public and insecure. Use them ONLY for development environments, staging/QA with test data, isolated test databases, and integration testing with mock/test APIs.",
    "securityNever": "NEVER use temporary emails for: Production systems, real user data, payment testing (even in sandbox), sensitive information, or production database credentials.",
    "startTitle": "Start Testing Now",
    "startP1": "Stop wasting time managing test email accounts. Generate unlimited temporary emails instantly and focus on what matters—building and testing great software. No signup, no cost, no hassle.",
    "startP2": "Frontend developers, backend engineers, QA testers, DevOps engineers, automation specialists, and anyone building email-dependent features."
}

# --- TEMP GMAIL ---
en["tempGmailPage"] = {
    "h1": "Temp Gmail - Create Temporary Gmail Addresses",
    "lead": "Instantly generate disposable Gmail addresses that look and function like real Gmail accounts. Protect your personal inbox from spam and unwanted messages.",
    "seoTitle1": "Gmail's Hidden Privacy Features: Plus-Addressing & The Dot Trick",
    "seoP1": "Did you know your Gmail account can generate unlimited email addresses without creating new accounts? Gmail has two powerful built-in features that most users don't know about: plus-addressing (aliasing) and the dot trick (period placement). Fire Temp Mail helps you leverage these Gmail-specific features to protect your privacy and organize your inbox.",
    "seoP2": "These aren't \"disposable\" emails from a third-party service—they're legitimate variations of your actual Gmail address that deliver directly to your existing inbox while letting you track, filter, and organize messages by source.",
    "plusTitle": "Understanding Gmail Plus-Addressing (The \"+\" Trick)",
    "plusP1": "Gmail ignores everything after a plus sign (+) in your email address. If your email is john.smith@gmail.com, all of these deliver to the same inbox:",
    "plusL1": "john.smith+shopping@gmail.com — For online shopping sites",
    "plusL2": "john.smith+newsletters@gmail.com — For newsletter subscriptions",
    "plusL3": "john.smith+facebook@gmail.com — For Facebook signup",
    "plusL4": "john.smith+netflix@gmail.com — For Netflix trial",
    "plusL5": "john.smith+spam@gmail.com — For untrusted sites",
    "whyPlusTitle": "Why Plus-Addressing Is Powerful",
    "whyPlusP1": "1. Track Email Sellers: If you sign up for a service with yourname+serviceX@gmail.com and start receiving spam at that address, you know exactly who sold your email to marketers.",
    "whyPlusP2": "2. Automatic Filtering: Create Gmail filters based on the \"+\" tag to automatically organize emails into folders, apply labels, or even auto-delete spam from specific sources.",
    "whyPlusP3": "3. Organize Signups: Use different tags for different categories: +work, +personal, +trials, +shopping. Instantly see what category each email belongs to.",
    "whyPlusP4": "4. Bypass \"One Email Per Account\" Restrictions: Some services (forums, contests, trials) only allow one account per email. Use plus-addressing to create \"multiple\" addresses.",
    "dotTitle": "The Gmail Dot Trick: Period Placement Doesn't Matter",
    "dotP1": "Gmail completely ignores periods (dots) in the username portion of your email address. That means johnsmith@gmail.com, john.smith@gmail.com, j.o.h.n.s.m.i.t.h@gmail.com all deliver to the exact same inbox.",
    "dotUseTitle": "How to Use the Dot Trick",
    "dotUseP1": "Multiple Account Signups: If a website only allows one email per person, you can register multiple accounts using different dot placements. The site sees them as different emails, but Gmail sees them all as yours.",
    "combineTitle": "Combining Plus-Addressing AND the Dot Trick",
    "combineP1": "For maximum flexibility, combine both features: j.o.h.n.smith+netflix@gmail.com. This creates virtually unlimited unique addresses that all route to your single Gmail inbox while providing maximum tracking and filtering capabilities.",
    "breachTitle": "Real-World Example: Tracking Data Breaches",
    "breachP1": "Let's say you sign up for \"ShoppingAppX\" using yourname+shoppingappx@gmail.com. Six months later, you receive spam at that exact address. Now you know ShoppingAppX either:",
    "breachL1": "Sold your email to marketers",
    "breachL2": "Had a data breach",
    "breachL3": "Shares emails with \"partners\"",
    "breachP2": "You can now create a Gmail filter to automatically delete everything sent to yourname+shoppingappx@gmail.com, effectively blocking that source of spam without affecting your other emails.",
    "filterTitle": "How to Set Up Gmail Filters for Plus-Addressing",
    "filterP1": "Once you start using plus-addressing, organize incoming emails automatically:",
    "filterL1": "Open Gmail Settings: Click the gear icon → \"See all settings\"",
    "filterL2": "Go to \"Filters and Blocked Addresses\": Click \"Create a new filter\"",
    "filterL3": "Add Filter Rule: In the \"To\" field, enter yourname+shopping@gmail.com",
    "filterL4": "Choose Action: Apply label \"Shopping\", skip inbox, mark as read, forward, or delete",
    "filterL5": "Save Filter: Click \"Create filter\" and you're done",
    "filterP2": "Now every email sent to that address automatically gets organized according to your rules.",
    "limitTitle": "Limitations of Gmail's Built-In Features",
    "limitP1": "While powerful, Gmail's plus-addressing and dot trick have some limitations:",
    "limitL1": "Not Truly Anonymous: Your base Gmail address is still visible. Anyone can remove the \"+tag\" to find your actual address.",
    "limitL2": "Some Sites Block Plus Signs: A few websites reject email addresses containing \"+\" symbols.",
    "limitL3": "No Protection from Google: Google still sees all your activity. These tricks don't protect you from Google's data collection.",
    "limitL4": "Can't Delete Individual Aliases: Unlike true disposable emails, you can't \"burn\" an alias if it gets compromised.",
    "limitL5": "Not for High-Risk Signups: Since your real Gmail is still technically exposed, don't use these tricks for untrusted websites. Use Fire Temp Mail instead.",
    "vsTitle": "When to Use Gmail Tricks vs. Truly Disposable Emails",
    "useGmailTitle": "Use Gmail Plus-Addressing/Dot Trick When:",
    "useGmailL1": "You want emails delivered to your main inbox",
    "useGmailL2": "You need to track which services share/sell your email",
    "useGmailL3": "You want to organize emails from different sources",
    "useGmailL4": "The service is relatively trustworthy but spammy",
    "useGmailL5": "You might need long-term access to the account",
    "useDispTitle": "Use Fire Temp Mail's Fully Disposable Emails When:",
    "useDispL1": "You need complete anonymity (no link to your real email)",
    "useDispL2": "Signing up for untrusted or risky websites",
    "useDispL3": "One-time verifications you'll never need again",
    "useDispL4": "Testing during development without cluttering your real inbox",
    "useDispL5": "Services that might spam heavily or sell data aggressively",
    "tipsTitle": "Gmail-Specific Privacy Tips & Advanced Techniques",
    "tip1Title": "1. Create a \"Burner\" Gmail Filter System",
    "tip1P1": "Set up a dedicated filter for all plus-addressed emails:",
    "tip1L1": "Filter condition: to:yourname+*@gmail.com",
    "tip1L2": "Action: Apply label \"Tracked Signups\" and skip inbox",
    "tip1L3": "Result: All plus-addressed emails bypass your main inbox, keeping it clean",
    "tip2Title": "2. Use Systematic Naming Conventions",
    "tip2P1": "Develop a consistent tagging system:",
    "tip2L1": "+shop-[sitename] — Shopping sites",
    "tip2L2": "+news-[topic] — Newsletters",
    "tip2L3": "+trial-[service] — Free trials",
    "tip2L4": "+social-[platform] — Social media",
    "tip3Title": "3. Track Down Data Breach Sources",
    "tip3P1": "When you receive spam or phishing emails, check the \"To\" field. If it shows yourname+specificsite@gmail.com, you've identified the source of the leak or data breach.",
    "ctaTitle": "Start Using Gmail's Privacy Features Today",
    "ctaP1": "Gmail's plus-addressing and dot trick are completely free, built-in features that work right now with your existing Gmail account. No signup, no third-party service, no risk. Start protecting your privacy and organizing your inbox by leveraging these powerful Gmail-specific capabilities.",
    "ctaP2": "For situations requiring full anonymity: Use Fire Temp Mail's truly disposable temporary email addresses on the homepage. For everything else, use Gmail's built-in privacy features explained here."
}

# --- BURNER EMAIL ---
en["burnerEmailPage"] = {
    "h1": "Free Burner Email Generator – Create Disposable Burner Addresses Instantly",
    "lead": "Generate anonymous burner email addresses instantly. Perfect for protecting your real identity online — no signup, no personal data required.",
    "seoTitle": "What Is a Burner Email and Why Do You Need One?",
    "seoP1": "A burner email is a disposable, temporary email address that allows you to send or receive messages without revealing your real identity. Unlike a regular email account you may keep for years (like Gmail, Outlook, or Yahoo), a burner email is deliberately short-lived and anonymous — designed to be used once (or a few times) and then discarded.",
    "seoP2": "The term \"burner\" comes from \"burner phones\" — prepaid, untraceable phones used for temporary communication. Burner emails work the same way: they create a layer of separation between your real identity and the online world.",
    "howTitle": "How Burner Emails Work",
    "howP1": "Burner email services like Fire Temp Mail generate a random email address the moment you visit the website. You don't need to create an account, enter personal information, or verify anything. Here's how they work:",
    "howL1": "Instant Generation: Visit the website and receive a random, anonymous email address immediately.",
    "howL2": "Receive Emails: Use the address to sign up for services, receive verification codes, or accept one-time messages in your temporary inbox.",
    "howL3": "No Identity Link: The address has no connection to your real name, phone number, or permanent email.",
    "howL4": "Auto-Expiry: After a short period (usually 24 hours), the email address and all associated messages are permanently deleted.",
    "howL5": "Unlimited Addresses: Generate as many burner addresses as needed. Each one is completely independent.",
    "usesTitle": "Top Use Cases for Burner Emails",
    "use1Title": "1. Website Registrations & Signups",
    "use1P": "Most websites require an email address to create an account — even if you only need temporary access. Burner emails let you register without risking your real inbox being flooded with promotional emails and newsletters.",
    "use2Title": "2. Free Trial Signups",
    "use2P": "Many services offer limited-time free trials but require an email address. Use a burner email to try the service risk-free. If you enjoy it, sign up with your real email later. If not, the burner email simply expires, and you owe nothing.",
    "use3Title": "3. Online Shopping & Coupons",
    "use3P": "Retail websites often require an email for checkout or to unlock first-time purchase discounts. A burner email prevents post-purchase spam while still giving you access to deals, discount codes, and order confirmations.",
    "use4Title": "4. Public Wi-Fi Login",
    "use4P": "Coffee shops, airports, and hotels frequently require an email address to access their Wi-Fi networks. Use a burner email instead of your personal one to avoid marketing campaigns and data harvesting.",
    "use5Title": "5. Downloading Resources",
    "use5P": "E-books, whitepapers, templates, and other downloadable resources usually sit behind an email gate. Burner emails let you access the content without subscribing to unwanted mailing lists.",
    "use6Title": "6. Forum & Community Registrations",
    "use6P": "Forums, Reddit-like communities, and discussion boards often require emails to create accounts. Use a burner email to participate anonymously without linking your real identity to your online opinions.",
    "use7Title": "7. Developer & QA Testing",
    "use7P": "Software developers and testers constantly need fresh email addresses to test registration flows, verification systems, and notification features. Burner emails provide unlimited addresses on demand.",
    "benefitsTitle": "Benefits of Using Burner Emails",
    "ben1": "Privacy Protection: Your real email stays hidden. No one can trace a burner email back to you.",
    "ben2": "Spam Prevention: All spam goes to the burner address, keeping your real inbox clean forever.",
    "ben3": "Data Breach Safety: If the service you signed up for gets hacked, your real email won't be on their leaked user list.",
    "ben4": "No Account Management: No passwords to remember. No additional accounts to maintain. No login credentials to protect.",
    "ben5": "Instant & Free: No registration needed. No cost. Just visit, generate, and use.",
    "vsTitle": "Burner Email vs. Regular Email vs. Alias Email",
    "vsP1": "Regular Email (Gmail, Outlook): Permanent, tied to your identity, used for long-term communication. Vulnerable to spam and data breaches.",
    "vsP2": "Email Aliases (+tags, dots): Variations of your real email that still deliver to your inbox. Useful for organization but don't hide your real address.",
    "vsP3": "Burner Email (Fire Temp Mail): Completely separate from your real identity. Temporary, anonymous, auto-deleting. Best for privacy and one-time use."
}

# --- EDU EMAIL GENERATOR ---
en["eduEmailPage"] = {
    "h1": "Free EDU Email Generator – Create Disposable .EDU Inbox Instantly",
    "lead": "Generate .EDU emails with our free EDU Email Generator. Perfect for signups, trials, student discounts, and more — without exposing your real inbox to spam.",
    "seoTitle": "Major Student Discounts & .EDU Email Benefits",
    "seoP1": "Student discounts can save you thousands of dollars per year on software, streaming services, and learning resources. While Fire Temp Mail provides temporary email addresses for testing and privacy, a legitimate .EDU email from your school unlocks significant savings across major platforms.",
    "discountsTitle": "Top Student Discounts Requiring .EDU Verification",
    "spotifyTitle": "Spotify Premium Student - $5.99/month (50% off)",
    "spotifyP1": "Regular Price: $10.99/month | Student Savings: $60/year",
    "spotifyP2": "Includes Hulu (with ads) and SHOWTIME at no additional cost. Verified through SheerID with your .EDU email.",
    "amazonTitle": "Amazon Prime Student - $7.49/month",
    "amazonP1": "Regular Price: $14.99/month | Student Savings: $90/year + 6-month FREE trial",
    "amazonP2": "Full Prime benefits: Free 2-day shipping, Prime Video, Prime Music, unlimited photo storage, exclusive deals, and student-only promotions.",
    "adobeTitle": "Adobe Creative Cloud - 60% off",
    "adobeP1": "Regular Price: $59.99/month | Student Price: $19.99/month | Savings: $480/year",
    "adobeP2": "Full suite: Photoshop, Illustrator, Premiere Pro, After Effects, InDesign, and 20+ apps with 100GB cloud storage.",
    "appleTitle": "Apple Music Student - $5.99/month",
    "appleP1": "Regular Price: $10.99/month | Student Savings: $60/year",
    "appleP2": "Full Apple Music catalog plus free Apple TV+ subscription included. Verified via UNiDAYS.",
    "githubTitle": "GitHub Student Developer Pack - FREE",
    "githubP1": "Normal Cost: $200+/year worth of tools | Student Price: Completely FREE",
    "githubP2": "GitHub Pro, free domain name, cloud credits, CI/CD tools, and 20+ developer tools and services."
}

# --- BEST TEMP MAIL ---
en["bestTempMailPage"] = {
    "h1": "Best Temp Mail – #1 Free Temporary Disposable Email Service",
    "lead": "The best temporary mail service online. Generate instant disposable email addresses — no signup, no personal information needed. Private, fast, and free.",
    "seoTitle": "Why Fire Temp Mail is the Best Temporary Email Service",
    "seoP1": "With dozens of temporary email services available online, choosing the right one matters. Fire Temp Mail stands out as the best temp mail service for several key reasons.",
    "comparison": "Feature Comparison with Other Services",
    "whyBestTitle": "What Makes Us the Best",
    "whyBestP1": "Fire Temp Mail combines speed, privacy, and simplicity in a way that no other temporary email service does.",
    "feature1": "Instant Generation: No waiting, no signup. Visit the page and your temporary email is ready immediately.",
    "feature2": "Multiple Domains: Choose from several different email domains to best suit your needs.",
    "feature3": "Gmail-Style Addresses: Get temporary Gmail-like addresses that work everywhere.",
    "feature4": "Custom Aliases: Create personalized temporary addresses for organization.",
    "feature5": "Auto-Refresh Inbox: New emails appear automatically without manual refreshing.",
    "feature6": "Privacy First: No tracking, no logging, no data collection."
}

# --- GMAIL GENERATOR ---
en["gmailGeneratorPage"] = {
    "h1": "Free Gmail Generator – Create Temporary Gmail Addresses Instantly",
    "lead": "Generate a free temporary Gmail address with our Gmail Generator. Access a disposable Gmail inbox instantly — no registration, no personal data. Stay anonymous online.",
    "seoTitle": "How Gmail Generator Works",
    "seoP1": "Our Gmail Generator creates disposable Gmail-style addresses that function just like real Gmail accounts. Use them for signups, verifications, and testing without exposing your real Gmail address.",
    "howItWorksTitle": "How It Works",
    "howItWorksP1": "1. Visit Fire Temp Mail and select the Gmail option. 2. A temporary Gmail-style address is generated instantly. 3. Use it for any online registration or verification. 4. Receive emails in real-time in your private inbox. 5. The address auto-expires after 24 hours."
}

# --- TEMPORARY GMAIL ---
en["temporaryGmailPage"] = {
    "h1": "Temporary Gmail – Free Disposable Gmail Addresses",
    "lead": "Get a free temporary Gmail address that works just like a real Gmail account. Perfect for signups, verifications, and protecting your primary inbox from spam.",
    "seoTitle": "Temporary Gmail Addresses Explained",
    "seoP1": "A temporary Gmail address is a short-lived, disposable email that looks and functions like a real Gmail account. It allows you to receive verification emails, sign up for services, and maintain privacy without exposing your permanent email.",
    "benefitsTitle": "Benefits of Temporary Gmail",
    "benefitsP1": "Protect your real Gmail from spam, avoid data breaches, and sign up for services anonymously. All with zero registration required."
}

# --- TEMP MAIL EDU ---
en["tempMailEduPage"] = {
    "h1": "Temp Mail EDU – Free Temporary .EDU Email Generator",
    "lead": "Generate temporary .EDU email addresses instantly. Access student discounts, educational resources, and online tools with a disposable .EDU inbox.",
    "seoTitle": "Using Temp Mail for Educational Purposes",
    "seoP1": "Temporary .EDU emails can help you access educational resources, test student verification systems, and explore platform features designed for the academic community."
}

# --- 10 MINUTE MAIL ---
en["tenMinuteMailPage"] = {
    "h1": "10 Minute Mail – Quick Disposable Email That Expires Fast",
    "lead": "Need a quick throwaway email? Our 10 Minute Mail gives you an instant disposable address that auto-deletes. Perfect for one-time signups and verifications.",
    "seoTitle": "What Is 10 Minute Mail and How Does It Work?",
    "seoP1": "10 Minute Mail is a type of disposable email service that provides you with a temporary email address lasting just 10 minutes. It's the fastest way to get a throwaway email for quick signups and verifications.",
    "howTitle": "How 10 Minute Mail Works",
    "howP1": "Visit the page and get an instant email address. Use it for any signup or verification. The address and all emails are permanently deleted after 10 minutes.",
    "whyTitle": "Why Use 10 Minute Mail?",
    "whyP1": "Sometimes you don't need an email address for long. Quick sign-ups, one-time verifications, and downloading gated content are all perfect use cases for 10 minute mail.",
    "vsTitle": "10 Minute Mail vs Regular Temp Mail",
    "vsP1": "10 Minute Mail is faster and designed for ultra-quick use cases. Regular temporary email (like Fire Temp Mail) lasts longer (up to 24 hours) and is better for testing, development, and situations where you need the email for more than a few minutes."
}

# --- TEMPORARY EMAIL GENERATOR ---
en["temporaryEmailGenPage"] = {
    "h1": "Temporary Email Generator – Create Free Disposable Email Addresses",
    "lead": "Generate temporary email addresses instantly. Our Temporary Email Generator provides free, disposable inboxes — perfect for protecting your privacy online.",
    "seoTitle": "How Temporary Email Generators Work",
    "seoP1": "A temporary email generator creates short-lived, anonymous email addresses on demand. These addresses work just like regular emails but automatically expire, keeping your real identity protected."
}

# --- FIRE MAIL ---
en["fireMailPage"] = {
    "h1": "Fire Mail – Fast & Free Temporary Email Service",
    "lead": "Fire Mail provides instant temporary email addresses for complete online privacy. No registration, no personal data — just pure, encrypted, disposable email.",
    "seoTitle": "Why Choose Fire Mail for Temporary Email",
    "seoP1": "Fire Mail is built for speed, privacy, and reliability. Our temporary email service generates disposable addresses instantly, with real-time inbox updates and automatic cleanup."
}

# --- GMAILNATOR ALTERNATIVE ---
en["gmailnatorPage"] = {
    "h1": "Gmailnator Alternative – Free Temporary Gmail Generator",
    "lead": "Looking for a Gmailnator alternative? Fire Temp Mail provides the same functionality with better privacy, faster performance, and more reliable email delivery.",
    "seoTitle": "Best Gmailnator Alternative in 2024",
    "seoP1": "Gmailnator was a popular service for generating temporary Gmail addresses. Fire Temp Mail offers the same functionality with improved reliability, better privacy protections, and a modern user experience."
}

# --- ABOUT PAGE (extend existing) ---
en["about"] = {
    "metaTitle": "About Fire Temp Mail - Our Mission & Story",
    "metaDescription": "Learn about Fire Temp Mail — a free temporary email service protecting your privacy online. Our mission and values.",
    "title": "About Fire Temp Mail",
    "subtitle": "Protecting your digital privacy, one temporary email at a time",
    "missionTitle": "Our Mission",
    "missionP1": "Fire Temp Mail was created to solve a simple but critical problem: the erosion of online privacy. Every day, millions of people are forced to provide their personal email addresses to access services, sign up for trials, or download resources—often resulting in an inbox flooded with spam and unwanted marketing emails.",
    "missionP2": "We believe your email address is personal. You shouldn't have to sacrifice your privacy or compromise your inbox security just to access online services. That's why we built Fire Temp Mail: a completely free, no-registration temporary email service that puts your privacy first.",
    "whatWeDoTitle": "What We Do",
    "whatWeDoP1": "Fire Temp Mail provides instant, anonymous, disposable email addresses that anyone can use—no registration required. Whether you need a temporary email for a one-time signup, to avoid newsletter spam, or to protect your real identity online, we've got you covered.",
    "whatWeDo1": "Instant email generation — just visit and get a working email address",
    "whatWeDo2": "Real-time inbox — receive emails instantly in your browser",
    "whatWeDo3": "Multiple domains — choose from several available email domains",
    "whatWeDo4": "Custom aliases — create personalized temporary addresses",
    "whatWeDo5": "Gmail-style addresses — get temporary Gmail-like addresses",
    "whatWeDo6": "Auto-deletion — emails are automatically cleaned up for full privacy",
    "whyTitle": "Why Fire Temp Mail?",
    "whyP1": "In a world where data breaches, spam, and unsolicited marketing are everyday problems, Fire Temp Mail offers a simple yet powerful solution. We're built by privacy advocates who understand the importance of keeping personal information safe.",
    "why1": "Free forever — no hidden costs, subscriptions, or premium gating",
    "why2": "No registration — start using instantly, no account needed",
    "why3": "Privacy first — we don't track, sell, or monetize your data",
    "why4": "Open and transparent — straightforward service with no tricks",
    "why5": "Fast and reliable — built on modern infrastructure for speed",
    "valuesTitle": "Our Values",
    "value1Title": "Privacy Above All",
    "value1Text": "We believe privacy is a fundamental right. Our service is designed from the ground up to protect yours.",
    "value2Title": "Simplicity",
    "value2Text": "Getting a temporary email should be effortless. Visit our site, get an email, use it. That's it.",
    "value3Title": "Transparency",
    "value3Text": "No hidden agendas. We're upfront about how our service works and how we sustain it.",
    "value4Title": "Accessibility",
    "value4Text": "Everyone deserves privacy. That's why Fire Temp Mail is free for everyone, everywhere.",
    "futureTitle": "Looking Ahead",
    "futureP1": "We're constantly improving Fire Temp Mail to serve our users better. Our roadmap includes enhanced security features, more domain options, improved mobile experience, and additional tools to protect your digital privacy.",
    "futureP2": "Thank you for trusting Fire Temp Mail with your online privacy. Together, we're building a safer, more private internet—one temporary email at a time.",
    "contactTitle": "Get in Touch",
    "contactP1": "Have questions, feedback, or just want to say hello? We'd love to hear from you.",
    "contactEmail": "Email us at",
    "contactLink": "Or visit our Contact page"
}

# Write updated en.json
with open(os.path.join(BASE, 'en.json'), 'w') as f:
    json.dump(en, f, indent=2, ensure_ascii=False)

print(f"Updated en.json: {sum(1 for _ in json.dumps(en).split(chr(10)))} lines")
print("Top-level keys:", list(en.keys()))

# Count total leaf keys
def count_leaves(obj):
    c = 0
    for v in obj.values():
        if isinstance(v, dict):
            c += count_leaves(v)
        elif isinstance(v, list):
            c += len(v)
        else:
            c += 1
    return c

print(f"Total translation keys: {count_leaves(en)}")
