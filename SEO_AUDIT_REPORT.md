# Comprehensive SEO Source Code Audit Report

**Site:** firetempmail.com  
**Framework:** SvelteKit  
**Audit Date:** February 23, 2026  
**Languages Supported:** en (default), es, de, fr, pt, ar, ru, zh

---

## 1. `app.html` — Global Head & Shell

### Present
| Element | Value |
|---|---|
| `charset` | `utf-8` ✅ |
| `viewport` | `width=device-width, initial-scale=1.0, shrink-to-fit=no` ✅ |
| `theme-color` | `#ff6b35` ✅ |
| `favicon .ico` | `/favicon.ico` ✅ (file exists in `/static/`) |
| `apple-touch-icon` | `/favicon.png` 180×180 ✅ (file exists) |
| Google Analytics | `G-V7Y8WEB63T` ✅ |
| Google AdSense | `ca-pub-5990181789401140` ✅ |
| Font preload | bunny.net Inter + Inter Tight with `display=swap` ✅ |
| Bootstrap CSS | async loaded via `media="print"` trick ✅ |

### Issues
| Issue | Severity | Detail |
|---|---|---|
| **Hard-coded `lang="en"` in `<html>`** | ⚠️ Medium | The attribute is `lang="en"` in static HTML. It IS dynamically replaced by `hooks.server.js` via `transformPageChunk`, which is correct server-side — but the hard-coded fallback means any pure-client navigation or build artifact could show `lang="en"` even for non-English pages. |
| **Header nav links are not localized at page template level** | ⚠️ Medium | Nav links in the static HTML header (`/email-generator`, `/temp-gmail`, etc.) are all English root paths. They are patched client-side via a `<script>` block that prefixes the lang segment. This means: (a) on first paint before JS runs, links point to English routes; (b) search engine crawlers may not execute the script, so they could follow un-prefixed links from localized pages. |
| **No `<meta name="robots">` at global level** | ℹ️ Low | Individual pages set this per-page (correct approach), but there's no global fallback. |
| **Missing `og-image` preload** | ℹ️ Low | No `<link rel="preload">` for the OG image. Not needed for SEO but could speed up social sharing previews. |

---

## 2. `hooks.server.js` — Language Detection & `lang` Attribute

### Present
- ✅ `Accept-Language` header parsing for auto-redirect on first visit to `/`
- ✅ Dynamic `lang` attribute replacement: `html.replace('lang="en"', \`lang="${lang}"\`)`
- ✅ Cookie-based persistence (`lang` cookie, 1-year expiry)
- ✅ 302 redirect to `/{preferred}` for non-English first-time visitors

### Issues
| Issue | Severity | Detail |
|---|---|---|
| **302 redirect instead of no redirect** | ⚠️ Medium | Using 302 (temporary) redirect for language detection is acceptable per Google's guidance, but the redirect only fires on `/` — inner pages are NOT redirected. This is correct behavior. |
| **`lang` param fallback** | ℹ️ Low | `const lang = event.params?.lang \|\| defaultLocale;` — on non-`[lang]` routes, `event.params.lang` won't exist, so it correctly defaults to `'en'`. This works but could theoretically mis-set lang if a non-lang route param were named `lang`. No actual issue found currently. |

---

## 3. Homepage (`/` — `+page.svelte`)

### SEO Elements Present
| Element | Value | Status |
|---|---|---|
| `<title>` | `'Fire Temp Mail \| Free Disposable Temporary Email Generator'` | ✅ |
| `meta description` | `'Free temporary email generator — create disposable Gmail-style addresses instantly...'` | ✅ |
| `meta robots` | `index, follow` | ✅ |
| `canonical` | `https://firetempmail.com` | ✅ |
| `sitemap link` | `/sitemap.xml` | ✅ |
| `og:title` | `'Fire Temp Mail \| Free Disposable Temporary Email Generator'` | ✅ |
| `og:description` | ✅ | ✅ |
| `og:url` | `https://firetempmail.com` | ✅ |
| `og:type` | `website` | ✅ |
| `og:site_name` | `Fire Temp Mail` | ✅ |
| `og:locale` | `en_US` | ✅ |
| `og:image` | `https://firetempmail.com/og-image.png` | ✅ (file exists) |
| `og:image:width` | `1200` | ✅ |
| `og:image:height` | `630` | ✅ |
| `twitter:card` | `summary_large_image` | ✅ |
| `twitter:title` | ✅ | ✅ |
| `twitter:description` | ✅ | ✅ |
| `twitter:image` | `https://firetempmail.com/og-image.png` | ✅ |
| `twitter:site` | `@firetempmail` | ✅ |
| H1 tag | `{$_('home.title')}` (i18n translated) | ✅ Single H1 |
| Hreflang | `<Hreflang path="/" />` | ✅ |
| SSR | `ssr = true; prerender = false` | ✅ |

### Structured Data (JSON-LD)
| Schema | Status |
|---|---|
| `WebSite` with `SearchAction` | ✅ |
| `Organization` with logo & sameAs | ✅ |
| `WebApplication` with free Offer | ✅ |

### Issues
| Issue | Severity | Detail |
|---|---|---|
| **No BreadcrumbList schema on homepage** | ℹ️ Low | Homepage is the top level; some sites add a single-item breadcrumb but it's optional. |
| **No Breadcrumb component on homepage** | ℹ️ Low | Product pages and blog pages include `<Breadcrumb>` — homepage does not. Acceptable. |
| **Internal links only go to `/blog/` paths** | ⚠️ Medium | The homepage body only links to blog posts and `/blog`. There are **NO internal links to product pages** (temp-gmail, email-generator, burner-email, etc.) in the `+page.svelte` body content. Product pages are only linked from the header nav and footer. This reduces internal link equity distribution to product pages. |
| **`og:locale` is always `en_US`** | ⚠️ Medium | The OG locale is hardcoded. On `/es/`, `/de/`, etc., the canonical pages re-use the same `+page.svelte`, which would emit `og:locale = en_US` regardless of language. This should be dynamic per locale (e.g., `es_ES`, `de_DE`). |
| **Canonical URL doesn't trail with `/`** | ℹ️ Low | `https://firetempmail.com` vs `https://firetempmail.com/` — minor, but should be consistent with actual served URL. |
| **`SearchAction` target** | ℹ️ Low | `"target": "https://firetempmail.com/blog?q={search_term_string}"` — verify that `/blog?q=` actually supports search functionality. |

---

## 4. Sitemap (`sitemap.xml/+server.ts`)

### Present
- ✅ XML declaration with `xmlns:xhtml` for hreflang
- ✅ 20 static pages defined
- ✅ Blog posts dynamically included via `getAllPosts()`
- ✅ `lastmod` = today's date for static pages; post.date for blog posts
- ✅ `changefreq` values: daily (high-priority), weekly (product pages), monthly (legal pages)
- ✅ `priority` values: 1.0 (homepage) → 0.4 (advertising)
- ✅ All 8 languages generated per page (en, es, de, fr, pt, ar, ru, zh)
- ✅ `x-default` hreflang pointing to English version
- ✅ Non-English priorities reduced by 0.9× factor
- ✅ `Cache-Control: max-age=3600`

### Total URL Count
- **Static pages:** 20 paths × 8 languages = **160 URLs**
- **Blog posts:** N posts × 8 languages = **N×8 URLs**
- **Total:** 160 + (N×8) URLs

### Route Coverage Analysis
| Route | In Sitemap? |
|---|---|
| `/` (homepage) | ✅ |
| `/temp-gmail` | ✅ |
| `/email-generator` | ✅ |
| `/edu-email-generator` | ✅ |
| `/burner-email` | ✅ |
| `/best-temp-mail` | ✅ |
| `/10minutemail` | ✅ |
| `/temp-mail-edu` | ✅ |
| `/temporary-gmail` | ✅ |
| `/temporary-email-generator` | ✅ |
| `/fire-mail` | ✅ |
| `/gmailnator-alternative` | ✅ |
| `/gmail-generator` | ✅ |
| `/blog` | ✅ |
| `/blog/[slug]` | ✅ (dynamic) |
| `/faq` | ✅ |
| `/about` | ✅ |
| `/contact` | ✅ |
| `/privacy-policy` | ✅ |
| `/terms` | ✅ |
| `/advertising` | ✅ |
| `/admin` | ❌ Excluded (correct — blocked in robots.txt too) |
| `/sitemap.xml` | ❌ Excluded (correct — sitemaps shouldn't self-reference) |

### Issues
| Issue | Severity | Detail |
|---|---|---|
| **`lastmod` always set to today** | ⚠️ Medium | Static page `lastmod` is `today` every time the sitemap is generated. This means Google sees the date change daily even if page content hasn't changed. Per Google's guidelines, `lastmod` should reflect the actual date of last meaningful content update. |
| **All 20 pages × 8 languages generates `xhtml:link` attributes inside each `<url>` which is correct** | ✅ | Proper implementation. |

---

## 5. Product Pages

### 5A. `/temp-gmail`
| Element | Status |
|---|---|
| `<title>` | ✅ `'Temp Gmail Create Disposable Gmail Addresses Instantly'` |
| `meta description` | ✅ |
| `meta robots` | ✅ `index, follow` |
| `canonical` | ✅ `https://firetempmail.com/temp-gmail` |
| `og:*` (all tags) | ✅ Complete (title, desc, url, type, site_name, locale, image, width, height) |
| `twitter:*` | ✅ Complete |
| Hreflang | ✅ `<Hreflang path="/temp-gmail" />` |
| Breadcrumb component | ✅ `Home > Temp Gmail` |
| BreadcrumbList schema | ✅ |
| WebApplication schema | ✅ |
| H1 | ✅ Single `{$_('tempGmailPage.h1')}` |
| `og:image` | ✅ `https://firetempmail.com/og-image.png` (consistent) |
| `og:locale` | ⚠️ Hardcoded `en_US` |

**Issues:**
- Title tag is missing the `|` separator: `'Temp Gmail Create Disposable...'` → should be `'Temp Gmail | Create Disposable...'`
- `meta name="author"` is set (`Fire Temp Mail`) — inconsistent with other pages that don't set it
- `og:locale` hardcoded `en_US` even on localized versions

---

### 5B. `/10minutemail`
| Element | Status |
|---|---|
| `<title>` | ✅ `'10 Minute Mail - Fire Temp Mail'` |
| `meta description` | ✅ |
| `meta robots` | ✅ |
| `canonical` | ✅ `https://firetempmail.com/10minutemail` |
| `og:*` | ✅ Complete |
| `twitter:*` | ✅ Complete |
| Hreflang | ✅ |
| Breadcrumb component | ✅ |
| BreadcrumbList schema | ✅ (inside `@graph`) |
| WebApplication schema | ✅ (inside `@graph`) |
| H1 | ✅ Single |
| `og:locale` | ⚠️ Hardcoded `en_US` |

**Issues:**
- `meta name="author"` is set here but not on all pages (inconsistency)

---

### 5C. `/email-generator`
| Element | Status |
|---|---|
| `<title>` | ✅ `'Email Generator - Fire Temp Mail \| Free Temporary Email Service'` |
| `meta description` | ✅ |
| `meta robots` | ✅ |
| `canonical` | ✅ |
| `og:*` | ✅ Complete |
| `twitter:*` | ✅ Complete |
| Hreflang | ✅ |
| Breadcrumb component | ✅ |
| BreadcrumbList schema | ✅ |
| WebApplication schema | ✅ |
| H1 | ✅ Single |
| `og:locale` | ⚠️ Hardcoded `en_US` |

**No additional issues.**

---

### 5D. `/burner-email`
| Element | Status |
|---|---|
| `<title>` | ✅ `'Burner Email \| Free Temporary Disposable Inbox'` |
| `meta description` | ✅ |
| `meta robots` | ✅ |
| `canonical` | ✅ |
| `og:*` | ✅ Complete |
| `twitter:*` | ✅ Complete |
| Hreflang | ✅ |
| Breadcrumb component | ✅ |
| BreadcrumbList schema | ✅ |
| WebApplication schema | ✅ |
| FAQPage schema | ✅ (5 Q&As) |
| H1 | ✅ Single |

**No additional issues beyond `og:locale`.**

---

## 6. Blog Pages

### 6A. Blog Index (`/blog`)
| Element | Status |
|---|---|
| `<title>` | ✅ `'Blog - Fire Temp Mail \| Email Privacy & Security Insights'` |
| `meta description` | ✅ |
| `meta robots` | ✅ |
| `canonical` | ✅ `https://firetempmail.com/blog` |
| `og:*` | ✅ Complete |
| `twitter:*` | ✅ Complete |
| Hreflang | ✅ |
| Breadcrumb component | ✅ `Home > Blog` |
| CollectionPage schema | ✅ |
| BreadcrumbList schema | ✅ |
| Pagination `rel="prev"` / `rel="next"` | ✅ |
| H1 | ✅ `<h1>Blog</h1>` |

**Issues:**
- `og:locale` hardcoded `en_US`

---

### 6B. Blog Post Template (`/blog/[slug]`)
| Element | Status |
|---|---|
| `<title>` | ✅ `{post.title} - Fire Temp Mail Blog` |
| `meta description` | ✅ `{post.excerpt}` |
| `meta robots` | ✅ |
| `canonical` | ✅ `https://firetempmail.com/blog/{post.slug}` |
| `og:*` | ✅ Complete (type: `article`) |
| `og:locale` | ⚠️ Hardcoded `en_US` |
| `twitter:*` | ✅ Complete |
| `article:published_time` | ✅ `{post.date}` |
| `article:author` | ✅ `Fire Temp Mail Team` |
| `article:section` | ✅ `{post.category}` |
| Hreflang | ✅ (conditional: only when `post` exists) |
| BlogPosting schema | ✅ (with headline, description, datePublished, dateModified, author, publisher, wordCount) |
| BreadcrumbList schema | ✅ `Home > Blog > {post.title}` |
| HTML breadcrumb nav | ✅ (inline styled, separate from Breadcrumb component) |
| H1 | ✅ `{post.title}` |
| Related Articles | ✅ Same-category filtering |
| Social Share buttons | ✅ Facebook, Twitter, LinkedIn |

**Issues:**
| Issue | Severity | Detail |
|---|---|---|
| **`dateModified` = `datePublished`** | ⚠️ Medium | `"dateModified": post.date` is always the same as `datePublished`. If posts are updated, this should track the update date. |
| **No `article:modified_time`** | ⚠️ Medium | Missing OG modified time meta tag. |
| **Inline breadcrumb instead of reusing `<Breadcrumb>` component** | ℹ️ Low | Blog post uses a hand-coded `<nav>` instead of the shared Breadcrumb component. Works but duplication. |
| **Blog post links are not localized** | ⚠️ Medium | Related post links use `/blog/{related.slug}` without language prefix. On `/es/blog/post-slug`, the related links would go to `/blog/other-slug` (English). Same issue for "Back to Blog" link. |

---

## 7. Content Pages

### 7A. `/about`
| Element | Status |
|---|---|
| `<title>` | ✅ `{$_('about.metaTitle')}` (i18n) |
| `meta description` | ✅ `{$_('about.metaDescription')}` (i18n) |
| `meta robots` | ✅ |
| `canonical` | ✅ `https://firetempmail.com/about` |
| `og:*` | ✅ Complete |
| `twitter:*` | ✅ Complete |
| Hreflang | ✅ |
| Breadcrumb component | ✅ |
| BreadcrumbList schema | ✅ |
| H1 | ✅ `{$_('about.title')}` |

**Issues:**
| Issue | Severity | Detail |
|---|---|---|
| **Canonical is hardcoded to English** | 🔴 High | `href="https://firetempmail.com/about"` — on `/es/about`, the canonical still points to the English version. For localized pages, the canonical should be the self-referencing localized URL (or this is correct IF you treat English as the canonical and the localized pages as alternates, but typically each localized page should be self-canonical). |
| **`og:url` hardcoded English** | ⚠️ Medium | Same issue — `og:url` is `https://firetempmail.com/about` on every language. |
| **`og:locale` hardcoded `en_US`** | ⚠️ Medium | Should be dynamic per locale. |
| **No Organization/AboutPage schema** | ℹ️ Low | Could add `AboutPage` schema type. |

---

### 7B. `/faq`
| Element | Status |
|---|---|
| `<title>` | ✅ |
| `meta description` | ✅ |
| `meta robots` | ✅ |
| `canonical` | ✅ (dynamic via `data?.seo?.canonical`) |
| `og:*` | ✅ Complete |
| `twitter:*` | ✅ Complete |
| Hreflang | ✅ |
| Breadcrumb component | ✅ |
| BreadcrumbList schema | ✅ |
| FAQPage schema | ✅ (generated dynamically in `onMount`) |
| Microdata `itemscope/itemprop` | ✅ (on FAQ items in HTML) |
| H1 | ✅ |

**Issues:**
| Issue | Severity | Detail |
|---|---|---|
| **FAQ JSON-LD generated in `onMount`** | 🔴 High | The `faqJsonLd` variable is set in `onMount()`, which runs client-side only. **Google won't see this schema** since Googlebot primarily uses the SSR-rendered HTML. The FAQPage JSON-LD needs to be generated server-side (either via `+page.server.js` or as a static script in `<svelte:head>`). |
| **No visible `<script type="application/ld+json">` for FAQ in svelte:head** | 🔴 High | The `<svelte:head>` has a comment `<!-- JSON-LD structured data for FAQ SEO -->` but no actual script tag outputting the faqJsonLd. The structured data exists only in microdata format on the HTML elements, which IS valid, but the JSON-LD was clearly intended and is missing. |
| **`og:locale` hardcoded** | ⚠️ Medium | Same global issue. |

---

## 8. Breadcrumb Component (`Breadcrumb.svelte`)

### Present
- ✅ Semantic `<nav aria-label="Breadcrumb">` 
- ✅ Ordered list `<ol>` structure
- ✅ `aria-current="page"` on current item
- ✅ Clean styling with `/` separator

### Issues
| Issue | Severity | Detail |
|---|---|---|
| **No BreadcrumbList JSON-LD inside component** | ℹ️ Info | The component only renders the visual breadcrumb. The JSON-LD `BreadcrumbList` schema is added separately in each page's `<svelte:head>`. This works but means schema and UI breadcrumbs could get out of sync. Consider generating the schema from the same `items` prop. |
| **Breadcrumb links are not localized** | ⚠️ Medium | `items` are passed with hardcoded hrefs like `{name: "Home", href: "/"}`. On localized pages (e.g., `/es/temp-gmail`), the breadcrumb "Home" link goes to `/` instead of `/es`. |

---

## 9. Footer (`Footer.svelte`)

### Present
- ✅ 3 link columns: Product (5 links), Resources (3 links), Legal (3 links)
- ✅ Links use `localePath()` for i18n — **properly localized** ✅
- ✅ Product links: temp-gmail, email-generator, edu-email-generator, burner-email, best-temp-mail
- ✅ Resource links: about, blog, faq
- ✅ Legal links: privacy-policy, terms, contact
- ✅ Brand section with description

### Issues
| Issue | Severity | Detail |
|---|---|---|
| **Missing links to some product pages** | ℹ️ Low | Footer doesn't link to: `10minutemail`, `temporary-gmail`, `temporary-email-generator`, `fire-mail`, `gmailnator-alternative`, `gmail-generator`, `temp-mail-edu`. These pages exist in sitemap but have no footer link — they rely solely on header nav and sitemap for discovery. |
| **Some link texts are not translated** | ⚠️ Medium | "Temp Gmail", "EDU Email Generator", "Burner Email", "Best Temp Mail", "About Us" are hardcoded English strings, not using `$_()` i18n translations. Other links like Blog, FAQ do use `$_()`. |
| **No Organization schema in footer** | ℹ️ Low | Some sites add Organization schema in the footer. This is already on the homepage, so low priority. |

---

## 10. `robots.txt`

### Present
```
User-agent: *
Disallow: /admin/
Sitemap: https://firetempmail.com/sitemap.xml
```

### Issues
| Issue | Severity | Detail |
|---|---|---|
| **Minimal but functional** | ✅ | Only blocks `/admin/` which is correct. |
| **No crawl-delay** | ℹ️ Info | No `Crawl-delay` directive. Not needed for most sites. |
| **No separate rules for specific bots** | ℹ️ Info | No separate `User-agent: Googlebot` rules. Fine for now. |

---

## 11. Layout Files

### 11A. `+layout.svelte` (Root)
- ✅ Loads i18n, Footer, LanguageSelector
- ✅ Shows loading screen while i18n initializes
- ✅ SSR enabled globally via `+layout.js`

### 11B. `[lang]/+layout.svelte`
- ✅ Sets `locale` from `data.lang` or `$page.params.lang`
- ✅ Persists language preference in `localStorage`

### 11C. `[lang]/+layout.server.js`
- ✅ Validates language code via `isSupported()`
- ✅ Returns 404 for invalid language codes
- ✅ Returns 404 if `lang === defaultLocale` (prevents `/en/` duplicating `/`)

### Issues
| Issue | Severity | Detail |
|---|---|---|
| **No global error page SEO** | ℹ️ Low | Consider adding `noindex` to error/404 pages. |

---

## 12. Hreflang Implementation (`Hreflang.svelte`)

### Present
- ✅ Generates `<link rel="alternate" hreflang="{lang}">` for all 8 languages
- ✅ Includes `hreflang="x-default"` pointing to English version
- ✅ Uses `localePath()` for correct URL construction
- ✅ Used consistently across all audited pages

### Issues
| Issue | Severity | Detail |
|---|---|---|
| **x-default URL inconsistency** | ℹ️ Low | `x-default` is `{siteUrl}{path === '/' ? '' : path}` — for homepage it's `https://firetempmail.com` (no trailing slash), but for other pages it's `https://firetempmail.com/blog` etc. This is fine. |
| **Hreflang on localized pages may self-reference incorrectly** | ⚠️ Medium | On `/es/temp-gmail`, the Hreflang component is called with `path="/temp-gmail"`. The English alternate would be `https://firetempmail.com/temp-gmail` and Spanish would be `https://firetempmail.com/es/temp-gmail`. This is correct. ✅ |

---

## Cross-Cutting Issues Summary

### 🔴 Critical Issues

1. **FAQ page JSON-LD generated client-side only** — Google won't see the FAQPage structured data since it's created in `onMount()`. Must be server-rendered.

2. **Canonical/OG URLs hardcoded to English on some pages** — `/about` has `canonical="https://firetempmail.com/about"` hardcoded, meaning localized versions (e.g., `/es/about`) point canonical to English. Some pages use dynamic `data?.seo?.canonical` (good), but `/about` does not. Need to audit all pages for this pattern.

### ⚠️ Medium Issues

3. **`og:locale` hardcoded `en_US` on ALL pages** — Every audited page has `<meta property="og:locale" content="en_US" />` regardless of language. Should be dynamic: `es_ES`, `de_DE`, `fr_FR`, `pt_PT`, `ar_SA`, `ru_RU`, `zh_CN`.

4. **Header nav links patched client-side for i18n** — In `app.html`, header/mobile nav links are hardcoded English paths and fixed via JavaScript. If bots don't execute JS, they see English-only links on all language pages.

5. **Blog internal links not localized** — Blog post pages link to `/blog`, `/blog/{slug}`, `/about` without language prefix. On localized pages this creates cross-language linking.

6. **Breadcrumb links not localized** — Breadcrumb `items` use hardcoded `/` for Home and `/page-name` without language prefix.

7. **Homepage lacks internal links to product pages** — Only links to blog content. Product pages should be cross-linked from homepage content.

8. **Sitemap `lastmod` always today** — `lastmod` should reflect actual content update dates.

9. **Some footer link texts not translated** — 5 out of 11 footer links use hardcoded English text.

10. **`meta name="author"` inconsistency** — Set on some product pages (temp-gmail, 10minutemail) but not on others.

11. **`dateModified` = `datePublished`** in BlogPosting schema — Should track actual update dates.

### ℹ️ Low Priority / Informational

12. Title tag formatting inconsistency across pages (some use `|`, some use `-`, some use `–`).

13. Blog post page uses inline breadcrumb HTML instead of the shared Breadcrumb component.

14. Homepage canonical is `https://firetempmail.com` (no trailing slash) — ensure server doesn't redirect to trailing-slash version.

15. Several product pages not linked from footer (10minutemail, gmail-generator, etc.) — these rely on sitemap-only discovery.

16. No `article:modified_time` OpenGraph tag on blog posts.

---

## OG Image Consistency Check

| Page | `og:image` Value | Consistent? |
|---|---|---|
| Homepage | `https://firetempmail.com/og-image.png` | ✅ |
| `/temp-gmail` | `https://firetempmail.com/og-image.png` | ✅ |
| `/10minutemail` | `https://firetempmail.com/og-image.png` | ✅ |
| `/email-generator` | `https://firetempmail.com/og-image.png` | ✅ |
| `/burner-email` | `https://firetempmail.com/og-image.png` | ✅ |
| `/blog` | `https://firetempmail.com/og-image.png` | ✅ |
| `/blog/[slug]` | `https://firetempmail.com/og-image.png` | ✅ |
| `/about` | `https://firetempmail.com/og-image.png` | ✅ |
| `/faq` | `https://firetempmail.com/og-image.png` | ✅ |

**Result:** All pages use the same OG image. This is consistent but also means social shares for different pages all look the same. Consider page-specific OG images for blog posts.

---

## Schema Markup Validation Summary

| Page | Schema Types | Valid JSON-LD? |
|---|---|---|
| Homepage | WebSite, Organization, WebApplication | ✅ Valid (static JSON in `<script>`) |
| `/temp-gmail` | WebApplication, BreadcrumbList | ✅ Valid (static JSON in `<script>`) |
| `/10minutemail` | WebApplication, BreadcrumbList (via `@graph`) | ✅ Valid (dynamic `JSON.stringify`) |
| `/email-generator` | WebApplication, BreadcrumbList | ✅ Valid (dynamic `JSON.stringify`) |
| `/burner-email` | WebApplication, FAQPage, BreadcrumbList | ✅ Valid (mix of static + dynamic) |
| `/blog` | CollectionPage, BreadcrumbList | ✅ Valid (static JSON) |
| `/blog/[slug]` | BlogPosting, BreadcrumbList | ✅ Valid (dynamic `JSON.stringify`) |
| `/about` | BreadcrumbList | ✅ Valid |
| `/faq` | BreadcrumbList | ✅ Valid; ❌ FAQPage (client-side only, not in SSR output) |

---

## Recommendations (Priority Order)

1. **Fix FAQ JSON-LD** — Move FAQ structured data generation to `+page.server.js` or render it as a static/SSR-friendly `<script>` tag in `<svelte:head>`.

2. **Dynamize canonical/og:url for localized pages** — Use `data?.seo?.canonical` pattern (already used on some pages) across all pages, ensuring localized pages self-reference.

3. **Dynamize `og:locale`** — Pass current locale from layout data and map to proper OG locale values.

4. **Localize breadcrumb links** — Use `localePath()` for breadcrumb `items` hrefs.

5. **Localize blog internal links** — Use `localePath()` for "Back to Blog", related post links, and author links.

6. **Add product page links to homepage body** — Create a "Services" or "Tools" section with links to all product pages.

7. **Use real `lastmod` dates** — Track content update dates and use those in the sitemap instead of `new Date()`.

8. **Translate remaining footer link texts** — Use `$_()` for all footer links.

9. **Consider page-specific OG images** — Especially for blog posts.

10. **Standardize title tag formatting** — Pick either `|` or `-` as separator and use consistently.
