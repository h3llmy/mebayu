export interface PaginationRequest {
    page: number;
    limit: number;
    search?: string;
    sort?: string;
    sort_order?: "Asc" | "Desc";
}