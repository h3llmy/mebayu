import { PaginationRequest, PaginationResponse } from "@/types";
import { api } from "../../apiFetch/apiFetch";
import { Product } from "./productModel";
import { CreateProductDto, UpdateProductDto } from "./dto";

export class ProductService {
    static async getAllPagination(params: PaginationRequest): Promise<PaginationResponse<Product>> {
        const response = await api.get<PaginationResponse<Product>>("/v1/products", {
            params,
        });
        return response.data;
    }

    static async create(data: CreateProductDto): Promise<Product> {
        const response = await api.post<Product>("/v1/products", data);
        return response.data;
    }

    static async update(id: string, data: UpdateProductDto): Promise<Product> {
        const response = await api.put<Product>(`/v1/products/${id}`, data);
        return response.data;
    }


    static async getOne(id: string): Promise<Product | null> {
        try {
            const response = await api.get<{ data: Product }>(`/v1/products/${id}`);
            return response.data.data;
        } catch (error: any) {
            return null;
        }
    }

    static async delete(id: string): Promise<void> {
        await api.delete(`/v1/products/${id}`);
    }
}