// src/services/product.service.ts
import type {
    Product,
    ProductDTO,
    ProductListResponse,
    PaginationParams,
    ProductFilter
} from '@/types';

export const productService = {
    async getProducts(params: PaginationParams & ProductFilter): Promise<ProductListResponse> {
        return api.get('/products', { params });
    },

    async getProductById(id: number): Promise<Product> {
        return api.get(`/products/${id}`);
    },

    async createProduct(data: ProductDTO): Promise<Product> {
        return api.post('/products', data);
    },

    async updateProduct(id: number, data: ProductDTO): Promise<Product> {
        return api.put(`/products/${id}`, data);
    },

    async deleteProduct(id: number): Promise<void> {
        return api.delete(`/products/${id}`);
    },

    async uploadProductImages(productId: number, files: File[]): Promise<string[]> {
        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });
        return api.post(`/products/${productId}/images`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

    async deleteProductImage(imageId: string): Promise<void> {
        return api.delete(`/productImages/${imageId}`);
    }
};