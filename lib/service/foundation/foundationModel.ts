export interface FoundationTranslation {
    foundation_id: string;
    language_id: string;
    name: string;
}

export interface Foundation {
    id: string;
    name: string;
    translations: FoundationTranslation[];
    created_at: string;
    updated_at: string;
}
