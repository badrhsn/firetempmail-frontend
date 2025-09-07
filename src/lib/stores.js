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
export const defaultDomain = 'offredaily.sa.com';

// Store for selected domain
export const selectedDomain = writable(
    browser && localStorage.getItem("selectedDomain") || defaultDomain
);

selectedDomain.subscribe((val) => {
    if (browser) {
        localStorage.setItem("selectedDomain", val);
    }
});

// Multiple Gmail accounts for better scalability
export const gmailAccounts = writable([
    { base: 'firetemp', domain: 'gmail.com', lastUsed: 0 },
    { base: 'tempfire', domain: 'gmail.com', lastUsed: 0 },
    { base: 'burnermail', domain: 'gmail.com', lastUsed: 0 },
    { base: 'disposableinbox', domain: 'gmail.com', lastUsed: 0 },
    { base: 'tempinbox', domain: 'gmail.com', lastUsed: 0 },
    { base: 'mailguard', domain: 'gmail.com', lastUsed: 0 },
    { base: 'privacymail', domain: 'gmail.com', lastUsed: 0 },
    { base: 'anoninbox', domain: 'gmail.com', lastUsed: 0 },
    { base: 'shieldmail', domain: 'gmail.com', lastUsed: 0 },
    { base: 'safebox', domain: 'gmail.com', lastUsed: 0 }
]);

// Get the next available Gmail account (round-robin selection)
export function getNextGmailAccount(type = 'gmail') {
    let selectedAccount = null;
    let selectedAccountIndex = 0;
    
    gmailAccounts.update(accounts => {
        // Find the account that was used least recently
        let oldestUsage = Date.now();
        accounts.forEach((account, index) => {
            if (account.lastUsed < oldestUsage) {
                oldestUsage = account.lastUsed;
                selectedAccount = {...account};
                selectedAccountIndex = index;
            }
        });
        
        // Update the last used time for the selected account
        accounts[selectedAccountIndex].lastUsed = Date.now();
        return accounts;
    });
    
    // Generate a random string for the +alias
    const randomString = Math.random().toString(36).substring(2, 8);
    
    // Determine the domain based on type
    const domain = type === 'googlemail' ? 'googlemail.com' : 'gmail.com';
    
    // 50% chance to use +alias, 50% chance to use dots
    if (Math.random() > 0.5) {
        // Use +alias format
        return selectedAccount.base + '+' + randomString + '@' + domain;
    } else {
        // Use dots format - insert random dots in the username
        let dottedUsername = '';
        const usernameChars = selectedAccount.base.split('');
        
        usernameChars.forEach((char, index) => {
            dottedUsername += char;
            // Add a dot after each character with 50% probability, except the last one
            if (index < usernameChars.length - 1 && Math.random() > 0.5) {
                dottedUsername += '.';
            }
        });
        
        return dottedUsername + '@' + domain;
    }
}

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

// Function to add a Gmail account to the pool
export function addGmailAccount(base, domain = 'gmail.com') {
    gmailAccounts.update(accounts => {
        // Check if account already exists
        const exists = accounts.some(acc => acc.base === base && acc.domain === domain);
        if (!exists) {
            accounts.push({ base, domain, lastUsed: 0 });
        }
        return accounts;
    });
}

// Function to remove a Gmail account from the pool
export function removeGmailAccount(base, domain = 'gmail.com') {
    gmailAccounts.update(accounts => {
        return accounts.filter(acc => !(acc.base === base && acc.domain === domain));
    });
}