export interface CategoryTranslation {
    category_id: string;
    language_id: string;
    name: string;
}

export interface Category {
    id: string;
    name: string;
    translations: CategoryTranslation[];
    created_at: string;
    updated_at: string;
}