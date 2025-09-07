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

// Store for selected domain with safe localStorage access
export const selectedDomain = writable(defaultDomain);

if (browser) {
    try {
        const savedDomain = localStorage.getItem("selectedDomain");
        if (savedDomain) {
            selectedDomain.set(savedDomain);
        }
    } catch (e) {
        console.error("Error accessing localStorage:", e);
    }
    
    selectedDomain.subscribe((val) => {
        try {
            localStorage.setItem("selectedDomain", val);
        } catch (e) {
            console.error("Error saving to localStorage:", e);
        }
    });
}

// Multiple Gmail accounts for better scalability
export const gmailAccounts = writable([
    { base: 'kourichkhalid', domain: 'gmail.com', lastUsed: 0 },
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

// Make the email address a store with safe localStorage access
export const receivingEmail = writable(generateRandomEmail(defaultDomain));

if (browser) {
    try {
        const savedEmail = localStorage.getItem("receivingEmail");
        if (savedEmail) {
            receivingEmail.set(savedEmail);
        }
    } catch (e) {
        console.error("Error accessing localStorage:", e);
    }
    
    receivingEmail.subscribe((val) => {
        try {
            localStorage.setItem("receivingEmail", val);
        } catch (e) {
            console.error("Error saving to localStorage:", e);
        }
    });
}

// Function to update email with new domain
export function updateEmailDomain(newDomain) {
    receivingEmail.update(currentEmail => {
        if (currentEmail && currentEmail.includes('@')) {
            const alias = currentEmail.split('@')[0];
            return alias + '@' + newDomain;
        }
        return generateRandomEmail(newDomain);
    });
    
    selectedDomain.set(newDomain);
}

// Function to generate completely new random email
export function generateNewRandomEmail() {
    selectedDomain.update(currentDomain => {
        const newEmail = generateRandomEmail(currentDomain);
        receivingEmail.set(newEmail);
        return currentDomain;
    });
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