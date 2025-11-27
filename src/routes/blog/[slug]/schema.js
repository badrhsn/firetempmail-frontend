// Schema markup generator for blog posts
export function generateBlogSchema(post, siteUrl) {
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": `${siteUrl}/assets/img/blog-default.jpg`, // Add default blog image
        "author": {
            "@type": "Organization",
            "name": "Fire Temp Mail Team"
        },
        "publisher": {
            "@type": "Organization",
            "name": "FireTempMail",
            "logo": {
                "@type": "ImageObject",
                "url": `${siteUrl}/assets/img/logo.png`
            }
        },
        "datePublished": post.date,
        "dateModified": post.date,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteUrl}/blog/${post.slug}`
        }
    };
}

export function generateFAQSchema(questions) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": questions.map(q => ({
            "@type": "Question",
            "name": q.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": q.answer
            }
        }))
    };
}

export function generateHowToSchema(steps, title) {
    return {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": title,
        "step": steps.map((step, index) => ({
            "@type": "HowToStep",
            "position": index + 1,
            "name": step.name,
            "text": step.text
        }))
    };
}
