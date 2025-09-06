import { writable } from "svelte/store"
import { browser } from "$app/environment"
import { generate } from "random-words";

// Email type: 'custom' or 'gmail'
export const emailType = writable(
    browser && localStorage.getItem("emailType") || 'custom'
);
emailType.subscribe((val) => {
    if (browser) {
        localStorage.setItem("emailType", val);
    }
});

// Gmail base addresses pool
export const gmailBases = [
    'firetempmail1@gmail.com',
    'firetempmail2@gmail.com',
    'firetempmail3@gmail.com',
    'firetempmail4@gmail.com',
    'firetempmail5@gmail.com',
    'firetempmail6@gmail.com',
    'firetempmail7@gmail.com',
    'firetempmail8@gmail.com',
    'firetempmail9@gmail.com',
    'firetempmail10@gmail.com'
];

// Store for generated Gmail alias
export const generatedGmail = writable(
    browser && localStorage.getItem("generatedGmail") || ''
);
generatedGmail.subscribe((val) => {
    if (browser) {
        localStorage.setItem("generatedGmail", val);
    }
});

// Function to generate Gmail alias
export function generateGmailAlias() {
    const base = gmailBases[Math.floor(Math.random() * gmailBases.length)];
    const alias = generate(1)[0] + Math.floor(Math.random() * 1000);
    let username = base.split('@')[0];
    if (username.length > 4) {
        const pos = Math.floor(Math.random() * (username.length - 1)) + 1;
        username = username.slice(0, pos) + '.' + username.slice(pos);
    }
    const gmailAlias = `${username}+${alias}@gmail.com`;
    generatedGmail.set(gmailAlias);
    return gmailAlias;
}

// ...existing code for custom email domains and receivingEmail...