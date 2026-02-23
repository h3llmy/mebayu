import { PaginationResponse } from "@/types";
import { api } from "../../apiFetch/apiFetch";
import { Product } from "./productModel";

export class ProductService {
    static async getAllPagination(params: {
        page: number;
        limit: number;
        search?: string;
        sort?: string;
        dir?: "asc" | "desc";
    }): Promise<PaginationResponse<Product>> {
        const response = await api.get<PaginationResponse<Product>>("/v1/products", {
            params,
        });
        return response.data;
    }

    static async getOne(id: string): Promise<Product> {
        const response = await api.get<Product>(`/v1/products/${id}`);
        return response.data;
    }
}