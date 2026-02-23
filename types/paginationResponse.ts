export interface PaginationResponse<T> {
    data: T[];
    total_data: number;
    total_pages: number;
    current_page: number;
    page_size: number;
}