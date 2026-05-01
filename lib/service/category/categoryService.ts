import { api } from "@/lib/apiFetch/apiFetch";
import { Category } from "./categoryModel";
import { PaginationRequest, PaginationResponse } from "@/types";

export class CategoryService {
    static async getAll(params: PaginationRequest): Promise<PaginationResponse<Category>> {
        const response = await api.get<PaginationResponse<Category>>("/v1/product-categories", { params });
        return response.data;
    }

    static async getOne(id: string, skipLocale = false): Promise<Category> {
        const response = await api.get<{ data: Category }>(`/v1/product-categories/${id}`, {
            headers: skipLocale ? { "x-skip-locale": "true" } : {},
        });
        return response.data.data;
    }

    static async create(data: { translations: { language_code: string; name: string }[] }): Promise<Category> {
        const response = await api.post<Category>(`/v1/product-categories`, data);
        return response.data;
    }

    static async update(id: string, data: { translations: { language_code: string; name: string }[] }, skipLocale = false): Promise<Category> {
        const response = await api.put<Category>(`/v1/product-categories/${id}`, data, {
            headers: skipLocale ? { "x-skip-locale": "true" } : {},
        });
        return response.data;
    }

    static async delete(id: string): Promise<void> {
        await api.delete(`/v1/product-categories/${id}`);
    }
}