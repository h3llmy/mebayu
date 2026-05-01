import { Language } from "../language/languageService";

export interface MaterialTranslation {
    material_id: string;
    language_id: string;
    language?: Language;
    name: string;
}

export interface Material {
    id: string;
    translations: MaterialTranslation[];
    created_at: string;
    updated_at: string;
}