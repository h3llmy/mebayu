export interface PaginationRequest {
    page: number;
    limit: number;
    search?: string;
    sort?: string;
    dir?: "asc" | "desc";
}