export interface PaginationResponse<T> {
    data: T[];
    total_data: number;
    total_page: number;
    page: number;
    limit: number;
}