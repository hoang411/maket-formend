// src/types/category.ts
export interface Category {
    id: number;
    categoryName: string;
    imageUrl?: string;
}

export interface CategoryDTO {
    categoryName: string;
    imageUrl?: string;
}