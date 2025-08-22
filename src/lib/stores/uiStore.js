import { writable } from 'svelte/store';

export const toasts = writable([]);
export const viewMode = writable('list'); // 'list' or 'detail'
export const isCopying = writable(false);
export const reloadActive = writable(true);
export const reloadCounter = writable(0);

export function showToast(title, message, type = "info") {
    const id = Date.now();
    toasts.update(currentToasts => {
        return [...currentToasts, { id, title, message, type }];
    });
    
    // Auto-remove after delay
    setTimeout(() => {
        removeToast(id);
    }, type === "success" ? 3000 : 5000);
}

export function removeToast(id) {
    toasts.update(currentToasts => {
        return currentToasts.filter(toast => toast.id !== id);
    });
}