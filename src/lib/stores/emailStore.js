import { writable } from 'svelte/store';

export const receivingEmail = writable(null);
export const emails = writable([]);
export const stats = writable({});
export const selectedEmail = writable(null);