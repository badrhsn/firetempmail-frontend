import { writable } from "svelte/store"
import { browser } from "$app/environment"
import { generate } from "random-words";

// Available domains for email generation
export const availableDomains = [
    'offredaily.sa.com', 
    'ctm.edu.pl', 
    'jobsdeforyou.sa.com',
];

// Default domain
export const defaultDomain = 'ctm.edu.pl';

// Store for selected domain
export const selectedDomain = writable(
    browser && localStorage.getItem("selectedDomain") || defaultDomain
);

selectedDomain.subscribe((val) => {
    if (browser) {
        localStorage.setItem("selectedDomain", val);
    }
});

// Generate a random email address
function generateRandomEmail(domain = defaultDomain) {
    let words = generate({ exactly: 1, maxLength: 5 });
    return words[0] + Math.floor(Math.random() * 1000) + "@" + domain;
}

// Make the email address a store
export const receivingEmail = writable(
    browser && localStorage.getItem("receivingEmail") || generateRandomEmail(
        browser && localStorage.getItem("selectedDomain") || defaultDomain
    )
);

receivingEmail.subscribe((val) => {
    if (browser) {
        localStorage.setItem("receivingEmail", val);
    }
});

// Function to update email with new domain
export function updateEmailDomain(newDomain) {
    if (browser) {
        receivingEmail.update(currentEmail => {
            if (currentEmail && currentEmail.includes('@')) {
                const alias = currentEmail.split('@')[0];
                const newEmail = alias + '@' + newDomain;
                localStorage.setItem("receivingEmail", newEmail);
                return newEmail;
            }
            const newEmail = generateRandomEmail(newDomain);
            localStorage.setItem("receivingEmail", newEmail);
            return newEmail;
        });
        
        selectedDomain.set(newDomain);
        localStorage.setItem("selectedDomain", newDomain);
    }
}

// Function to generate completely new random email
export function generateNewRandomEmail() {
    if (browser) {
        selectedDomain.update(currentDomain => {
            const newEmail = generateRandomEmail(currentDomain);
            receivingEmail.set(newEmail);
            return currentDomain;
        });
    }
}