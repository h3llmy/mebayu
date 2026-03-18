import { api } from "@/lib/apiFetch/apiFetch";
import { Material } from "./materialModel";
import { PaginationRequest, PaginationResponse } from "@/types";

export class MaterialService {
    static async getAll(params: PaginationRequest): Promise<PaginationResponse<Material>> {
        const response = await api.get<PaginationResponse<Material>>("/v1/product-materials", { params });
        return response.data;
    }

    static async getOne(id: string): Promise<Material> {
        const response = await api.get<{ data: Material }>(`/v1/product-materials/${id}`);
        return response.data.data;
    }

    static async create(data: { name: string }): Promise<Material> {
        const response = await api.post<Material>(`/v1/product-materials`, data);
        return response.data;
    }

    static async update(id: string, data: { name: string }): Promise<Material> {
        const response = await api.put<Material>(`/v1/product-materials/${id}`, data);
        return response.data;
    }

    static async delete(id: string): Promise<void> {
        await api.delete(`/v1/product-materials/${id}`);
    }
}