import { Language } from "@/lib/service/language";

export function getTranslation<
    T extends { language_id: string }
>(translations: T[] | undefined, languages: Language[], localeCode: string): T | undefined {
    if (!translations || translations.length === 0) return undefined;
    if (!languages || languages.length === 0) return translations[0];

    // Find the language ID for the current locale code ('en', 'id')
    const language = languages.find(lang => lang.code === localeCode);
    
    if (language) {
        const found = translations.find(t => t.language_id === language.id);
        if (found) return found;
    }

    // Fallback: return the first available translation
    return translations[0];
}
