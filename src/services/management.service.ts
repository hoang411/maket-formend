// src/services/management.service.ts
import type {
    ManagementUser,
    ManagerUserDTO,
    Page
} from '@/types';

export const managementService = {
    async getAllClients(): Promise<ManagementUser[]> {
        return api.get('/managementUser/clients');
    },

    async getClientsWithPagination(page: number, pageSize: number): Promise<Page<ManagementUser>> {
        return api.get(`/managementUser/clients/${page}/${pageSize}`);
    },

    async getAllStaff(): Promise<ManagementUser[]> {
        return api.get('/managementUser/staffs');
    },

    async getStaffWithPagination(page: number, pageSize: number): Promise<Page<ManagementUser>> {
        return api.get(`/managementUser/staffs/${page}/${pageSize}`);
    },

    async getStaffByRole(role: string): Promise<ManagementUser[]> {
        return api.get(`/managementUser/staffs/${role}`);
    },

    async getUserById(id: number): Promise<ManagementUser> {
        return api.get(`/managementUser/${id}`);
    },

    async createUser(data: ManagerUserDTO): Promise<ManagementUser> {
        return api.post('/managementUser/insert', data);
    },

    async updateUser(id: number, data: ManagerUserDTO): Promise<ManagementUser> {
        return api.put(`/managementUser/${id}`, data);
    },

    async changePassword(id: number, password: string): Promise<string> {
        return api.put(`/managementUser/changePassword/${id}`, null, {
            params: { password }
        });
    },

    async deleteUser(id: number): Promise<void> {
        return api.delete(`/managementUser/${id}`);
    }
};