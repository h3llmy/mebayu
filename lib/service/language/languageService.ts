import { api } from "@/lib/apiFetch/apiFetch";

export interface Language {
    id: string;
    code: string;
    name: string;
    is_default: boolean;
    created_at: string;
    updated_at: string;
}

export class LanguageService {
    static async getAll(): Promise<Language[]> {
        try {
            const response = await api.get("/v1/languages");
            return response.data.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}
