import { writable } from 'svelte/store';

export const toasts = writable([]);
export const viewMode = writable('list'); // 'list' or 'detail'
export const isCopying = writable(false);
export const reloadActive = writable(true);
export const reloadCounter = writable(0);