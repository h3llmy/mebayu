import { Language } from "../language/languageService";

export interface FoundationTranslation {
    foundation_id: string;
    language_id: string;
    language?: Language;
    name: string;
}

export interface Foundation {
    id: string;
    translations: FoundationTranslation[];
    created_at: string;
    updated_at: string;
}
