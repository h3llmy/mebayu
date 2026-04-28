import { PaginationRequest, PaginationResponse } from "@/types";
import { api } from "../../apiFetch/apiFetch";
import { Product } from "./productModel";
import { CreateProductDto, UpdateProductDto } from "./dto";

export class ProductService {
    static async getAllPagination(params: PaginationRequest): Promise<PaginationResponse<Product>> {
        try {
            const filteredParams = Object.fromEntries(
                Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "")
            );
            const response = await api.get<PaginationResponse<Product>>("/v1/products", {
                params: filteredParams,
            });
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async create(data: CreateProductDto): Promise<Product> {
        const response = await api.post<Product>("/v1/products", data);
        return response.data;
    }

    static async update(id: string, data: UpdateProductDto, skipLocale = false): Promise<Product> {
        const response = await api.put<Product>(`/v1/products/${id}`, data, {
            headers: skipLocale ? { "x-skip-locale": "true" } : {},
        });
        return response.data;
    }


    static async getOne(id: string, skipLocale = false): Promise<Product | null> {
        try {
            const response = await api.get<{ data: Product }>(`/v1/products/${id}`, {
                headers: skipLocale ? { "x-skip-locale": "true" } : {},
            });
            return response.data.data;
        } catch (error: any) {
            return null;
        }
    }

    static async delete(id: string): Promise<void> {
        await api.delete(`/v1/products/${id}`);
    }
}