// src/stores/auth.store.ts
import { defineStore } from 'pinia';
import { authService } from '@/services';
import type { User, LoginDTO, UserDTO, UpdateUserDTO } from '@/types';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null,
        token: localStorage.getItem('token'),
        loading: false,
        error: null as string | null
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        userRole: (state) => state.user?.role,
        isAdmin: (state) => state.user?.role === 'ADMIN',
        isStaff: (state) => ['ADMIN', 'WAREHOUSE', 'SALES'].includes(state.user?.role || '')
    },

    actions: {
        async login(credentials: LoginDTO) {
            try {
                this.loading = true;
                const { token, user } = await authService.login(credentials);
                this.token = token;
                this.user = user;
                localStorage.setItem('token', token);
            } catch (error: any) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async register(userData: UserDTO) {
            try {
                this.loading = true;
                const user = await authService.register(userData);
                return user;
            } catch (error: any) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async updateProfile(data: UpdateUserDTO) {
            try {
                this.loading = true;
                const updatedUser = await authService.updateProfile(data);
                this.user = updatedUser;
            } catch (error: any) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async uploadAvatar(file: File) {
            try {
                this.loading = true;
                const avatarUrl = await authService.uploadAvatar(file);
                if (this.user) {
                    this.user.avatar = avatarUrl;
                }
                return avatarUrl;
            } catch (error: any) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async fetchUserProfile() {
            try {
                this.loading = true;
                const user = await authService.getProfile();
                this.user = user;
            } catch (error: any) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        logout() {
            this.user = null;
            this.token = null;
            localStorage.removeItem('token');
        },

        clearError() {
            this.error = null;
        }
    }
});