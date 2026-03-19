export interface PaginationRequest {
    page: number;
    limit: number;
    search?: string;
    sort?: string;
    sort_order?: "Asc" | "Desc";
    category_id?: string;
    material_id?: string;
}