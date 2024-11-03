// src/services/auth.service.ts
import type { LoginDTO, UserDTO, LoginResponse, User, UpdateUserDTO, UpdatePasswordDTO } from '@/types';
import api from './api';

export const authService = {
    async login(data: LoginDTO): Promise<LoginResponse> {
        return api.post('/users/login', data);
    },

    async register(data: UserDTO): Promise<User> {
        return api.post('/users/register', data);
    },

    async getProfile(): Promise<User> {
        return api.get('/users/details');
    },

    async updateProfile(data: UpdateUserDTO): Promise<User> {
        return api.put('/users/details', data);
    },

    async changePassword(data: UpdatePasswordDTO): Promise<void> {
        return api.put('/users/details/change-password', data);
    },

    async uploadAvatar(file: File): Promise<string> {
        const formData = new FormData();
        formData.append('file', file);
        return api.post('/users/uploads', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }
};