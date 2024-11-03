// src/stores/management.store.ts
import { defineStore } from 'pinia';
import { managementService } from '@/services';
import type { ManagementUser, ManagerUserDTO, Page } from '@/types';

export const useManagementStore = defineStore('management', {
    state: () => ({
        clients: [] as ManagementUser[],
        staff: [] as ManagementUser[],
        selectedUser: null as ManagementUser | null,
        pagination: {
            currentPage: 1,
            totalPages: 1,
            pageSize: 10
        },
        loading: false,
        error: null as string | null
    }),

    actions: {
        async fetchAllClients() {
            try {
                this.loading = true;
                const clients = await managementService.getAllClients();
                this.clients = clients;
            } catch (error: any) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async fetchClientsPage(page: number, pageSize: number) {
            try {
                this.loading = true;
                const response = await managementService.getClientsWithPagination(page, pageSize);
                this.clients = response.content;
                this.pagination = {
                    currentPage: page,
                    totalPages: response.totalPages,
                    pageSize
                };
            } catch (error: any) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async fetchAllStaff() {
            try {
                this.loading = true;
                const staff = await managementService.getAllStaff();
                this.staff = staff;
            } catch (error: any) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async createUser(data: ManagerUserDTO) {
            try {
                this.loading = true;
                const newUser = await managementService.createUser(data);
                if (newUser.role === 'USER') {
                    this.clients.unshift(newUser);
                } else {
                    this.staff.unshift(newUser);
                }
                return newUser;
            } catch (error: any) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async updateUser(id: number, data: ManagerUserDTO) {
            try {
                this.loading = true;
                const updatedUser = await managementService.updateUser(id, data);
                this.updateUserInList(updatedUser);
                return updatedUser;
            } catch (error: any) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        // Removed 'private' keyword as it's not supported in object literals
        updateUserInList(user: ManagementUser) {
            if (user.role === 'USER') {
                const index = this.clients.findIndex(c => c.id === user.id);
                if (index !== -1) {
                    this.clients[index] = user;
                }
            } else {
                const index = this.staff.findIndex(s => s.id === user.id);
                if (index !== -1) {
                    this.staff[index] = user;
                }
            }
        }
    }
});