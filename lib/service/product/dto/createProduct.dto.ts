export interface CreateProductDto {
    category_ids: string[];
    description: string;
    image_urls: string[];
    material_ids: string[];
    foundation_ids: string[];
    name: string;
    price: number;
    status: string;
}