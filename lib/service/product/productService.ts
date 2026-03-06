import { PaginationRequest, PaginationResponse } from "@/types";
import { api } from "../../apiFetch/apiFetch";
import { Product } from "./productModel";

export class ProductService {
    static async getAllPagination(params: PaginationRequest): Promise<PaginationResponse<Product>> {
        const response = await api.get<PaginationResponse<Product>>("/v1/products", {
            params,
        });
        return response.data;
    }

    static async getOne(id: string): Promise<Product> {
        try {
            const response = await api.get<Product>(`/v1/products/${id}`);
            return response.data;
        } catch (error: unknown) {
            console.log((error as { response?: { data?: unknown } })?.response?.data);
            throw error;
        }
    }
}