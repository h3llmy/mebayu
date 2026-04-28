export interface UpdateProductTranslationDto {
    language_id: string;
    name?: string;
    description?: string;
}

export interface UpdateProductDto {
    category_ids?: string[];
    foundation_ids?: string[];
    image_urls?: string[];
    material_ids?: string[];
    price?: number;
    status?: string;
    translations?: UpdateProductTranslationDto[];
}
