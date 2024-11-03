// src/services/category.service.ts
import type { Category, CategoryDTO } from '@/types';

export const categoryService = {
    async getAllCategories(): Promise<Category[]> {
        return api.get('/categories');
    }
};