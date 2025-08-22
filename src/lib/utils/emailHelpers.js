import { generate } from "random-words";

export function generateEmail() {
    let words = generate(2);
    return words[0] + "." + words[1] + Math.floor(Math.random() * 1000) + "@firetempmail.com";
}

export function getEmailPreview(content) {
    if (!content) return 'No content';
    
    // Remove HTML tags for text preview
    const text = content.replace(/<[^>]*>/g, '');
    
    // Return first 100 characters with ellipsis if needed
    return text.length > 100 ? text.substring(0, 100) + '...' : text;
}

// Add this function
export function formatDate(date) {
    return new Date(date).toLocaleString();
}
