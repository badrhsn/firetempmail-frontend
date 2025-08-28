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
export const defaultDomain = 'firetempmail.com';

// Store for selected domain
export const selectedDomain = writable(
    browser && localStorage.getItem("selectedDomain") || defaultDomain
);

selectedDomain.subscribe((val) => {
    if (browser) return (localStorage.selectedDomain = val);
});

// Generate a random email address
function generateRandomEmail(domain = defaultDomain) {
    let words = generate({ exactly: 1, maxLength: 5 });
    return words[0] + Math.floor(Math.random() * 1000) + "@" + domain;
}

// Get the current domain from local storage or use default
const currentDomain = browser ? localStorage.getItem("selectedDomain") || defaultDomain : defaultDomain;

// Generate initial email with current domain
let alt = generateRandomEmail(currentDomain);

// Make the email address a store
export const receivingEmail = writable(browser && localStorage.getItem("receivingEmail") || alt);

receivingEmail.subscribe((val) => {
    if (browser) return (localStorage.receivingEmail = val);
});

// Function to update email with new domain
export function updateEmailDomain(newDomain) {
    if (browser) {
        receivingEmail.update(currentEmail => {
            if (currentEmail && currentEmail.includes('@')) {
                const alias = currentEmail.split('@')[0];
                return alias + '@' + newDomain;
            }
            return generateRandomEmail(newDomain);
        });
        selectedDomain.set(newDomain);
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