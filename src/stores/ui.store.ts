// src/stores/ui.store.ts
import { defineStore } from 'pinia';

export const useUIStore = defineStore('ui', {
    state: () => ({
        sidebarOpen: true,
        darkMode: localStorage.getItem('darkMode') === 'true',
        notifications: [] as Array<{
            id: number;
            type: 'success' | 'error' | 'warning' | 'info';
            message: string;
        }>,
        loading: {
            global: false,
            requests: new Set<string>()
        }
    }),

    actions: {
        toggleSidebar() {
            this.sidebarOpen = !this.sidebarOpen;
        },

        toggleDarkMode() {
            this.darkMode = !this.darkMode;
            localStorage.setItem('darkMode', this.darkMode.toString());
            document.documentElement.classList.toggle('dark', this.darkMode);
        },

        showNotification(type: 'success' | 'error' | 'warning' | 'info', message: string) {
            const id = Date.now();
            this.notifications.push({ id, type, message });
            setTimeout(() => {
                this.removeNotification(id);
            }, 5000);
        },

        removeNotification(id: number) {
            const index = this.notifications.findIndex(n => n.id === id);
            if (index !== -1) {
                this.notifications.splice(index, 1);
            }
        },

        startLoading(requestId: string) {
            this.loading.requests.add(requestId);
            this.loading.global = true;
        },

        stopLoading(requestId: string) {
            this.loading.requests.delete(requestId);
            this.loading.global = this.loading.requests.size > 0;
        }
    }
});