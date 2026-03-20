import { api } from "@/lib/apiFetch/apiFetch";
import { Foundation } from "./foundationModel";
import { PaginationRequest, PaginationResponse } from "@/types";

export class FoundationService {
    static async getAll(params: PaginationRequest): Promise<PaginationResponse<Foundation>> {
        const response = await api.get<PaginationResponse<Foundation>>("/v1/product-foundations", { params });
        return response.data;
    }

    static async getOne(id: string): Promise<Foundation> {
        const response = await api.get<{ data: Foundation }>(`/v1/product-foundations/${id}`);
        return response.data.data;
    }

    static async create(data: { name: string }): Promise<Foundation> {
        const response = await api.post<Foundation>(`/v1/product-foundations`, data);
        return response.data;
    }

    static async update(id: string, data: { name: string }): Promise<Foundation> {
        const response = await api.put<Foundation>(`/v1/product-foundations/${id}`, data);
        return response.data;
    }

    static async delete(id: string): Promise<void> {
        await api.delete(`/v1/product-foundations/${id}`);
    }
}
