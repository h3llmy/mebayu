import { api } from "../apiFetch/apiFetch";

export class ProductService {
    static async getAllPagination(params: {
        page: number;
        limit: number;
        search?: string;
        sort?: string;
        dir?: "asc" | "desc";
    }) {
        const response = await api.get("/v1/products", {
            params,
        });
        return response.data;
    }
}