import { Language } from "../language";

export interface CategoryTranslation {
    category_id: string;
    language_id: string;
    language: Language;
    name: string;
}

export interface Category {
    id: string;
    translations: CategoryTranslation[];
    created_at: string;
    updated_at: string;
}