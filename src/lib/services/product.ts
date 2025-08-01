import { apiClient } from "../client/api-client"
import { Product } from "../types/product";

export const productService = {
    async getAll() {
        return apiClient.get<Product[]>('/products');
    },

    async getById(id: string | number): Promise<Product> {
        return apiClient.get<Product>(`/products/${id}`);
    },

    async getCategories(): Promise<string[]> {
        return apiClient.get<string[]>('/products/categories');
    },

    async getByCategory(category: string): Promise<Product[]> {
        return apiClient.get<Product[]>(`/products/category/${category}`);
    },

    async create(productData: Omit<Product, 'id' | 'rating'>): Promise<Product> {
        return apiClient.post<Product>('/products', productData);
    },
}