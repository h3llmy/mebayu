export interface MaterialTranslation {
    material_id: string;
    language_id: string;
    name: string;
}

export interface Material {
    id: string;
    name: string;
    translations: MaterialTranslation[];
    created_at: string;
    updated_at: string;
}