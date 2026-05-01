import { api } from "@/lib/apiFetch/apiFetch";
import { Material } from "./materialModel";
import { PaginationRequest, PaginationResponse } from "@/types";

export class MaterialService {
    static async getAll(params: PaginationRequest): Promise<PaginationResponse<Material>> {
        const response = await api.get<PaginationResponse<Material>>("/v1/product-materials", { params });
        return response.data;
    }

    static async getOne(id: string, skipLocale = false): Promise<Material> {
        const response = await api.get<{ data: Material }>(`/v1/product-materials/${id}`, {
            headers: skipLocale ? { "x-skip-locale": "true" } : {},
        });
        return response.data.data;
    }

    static async create(data: { translations: { language_code: string; name: string }[] }): Promise<Material> {
        const response = await api.post<Material>(`/v1/product-materials`, data);
        return response.data;
    }

    static async update(id: string, data: { translations: { language_code: string; name: string }[] }, skipLocale = false): Promise<Material> {
        const response = await api.put<Material>(`/v1/product-materials/${id}`, data, {
            headers: skipLocale ? { "x-skip-locale": "true" } : {},
        });
        return response.data;
    }

    static async delete(id: string): Promise<void> {
        await api.delete(`/v1/product-materials/${id}`);
    }
}