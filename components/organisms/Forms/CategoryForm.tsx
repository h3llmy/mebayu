"use client";

import { useState, useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";
import { Category } from "@/lib/service/category/categoryModel";
import { ProductFormType } from "./formType/productFormType";
import { Language, LanguageService } from "@/lib/service/language/languageService";

interface Translation {
  language_code: string;
  name: string;
}

interface CategoryFormProps {
  initialData?: Category;
  onSubmit: (data: { translations: Translation[] }) => Promise<void>;
  isSubmitting: boolean;
  title: string;
  description: string;
  formType?: ProductFormType;
}

const LANGUAGE_LABELS: Record<string, string> = {
  en: "English",
  id: "Indonesian",
};

export function CategoryForm({
  initialData,
  onSubmit,
  isSubmitting,
  title,
  description,
  formType = ProductFormType.CREATE,
}: CategoryFormProps) {
  const router = useRouter();
  const [languages, setLanguages] = useState<Language[]>([]);
  const [activeLang, setActiveLang] = useState<string>("");
  const [translations, setTranslations] = useState<Translation[]>([]);

  useEffect(() => {
    LanguageService.getAll().then((langs) => {
      setLanguages(langs);
      if (langs.length > 0 && !activeLang) {
        setActiveLang(langs[0].code);
      }
    });
  }, []);

  useEffect(() => {
    if (languages.length > 0) {
      if (initialData?.translations) {
        const mapped = languages.map((lang) => {
          const existing = initialData.translations.find(
            (t: any) => t.language_id === lang.id || t.language_id === lang.code || t.language?.code === lang.code
          );
          return {
            language_code: lang.code,
            name: existing ? existing.name : "",
          };
        });
        setTranslations(mapped);
      } else {
        setTranslations(
          languages.map((lang) => ({ language_code: lang.code, name: "" }))
        );
      }
    }
  }, [initialData, languages]);

  const handleTranslationChange = (name: string) => {
    setTranslations((prev) =>
      prev.map((t) =>
        t.language_code === activeLang ? { ...t, name } : t
      )
    );
  };

  const activeTranslation = translations.find(
    (t) => t.language_code === activeLang
  ) || { language_code: activeLang, name: "" };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = translations.filter((t) => t.name.trim() !== "");
    await onSubmit({ translations: payload });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-4"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Categories
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
        <p className="text-gray-500 dark:text-gray-400">{description}</p>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Category Details</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Essential details about your product category.</p>
          </div>

          {/* Language Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-800 flex gap-1 px-6 pt-4">
            {languages.map((lang) => {
              const label = lang.name || LANGUAGE_LABELS[lang.code] || lang.code.toUpperCase();
              const isActive = lang.code === activeLang;
              const hasContent = translations.find(t => t.language_code === lang.code)?.name.trim() !== "";
              return (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => setActiveLang(lang.code)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${isActive
                      ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                    }`}
                >
                  {label}
                  {hasContent && (
                    <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" title="Has content" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-6 space-y-6">
            <Input
              label="Category Name"
              name="name"
              placeholder="e.g. Bags, Accessories"
              value={activeTranslation.name}
              onChange={(e) => handleTranslationChange(e.target.value)}
              required={activeLang === languages[0]?.code}
              disabled={formType === ProductFormType.DETAIL}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/categories")}
          >
            {formType === ProductFormType.DETAIL ? "Back" : "Cancel"}
          </Button>
          {formType !== ProductFormType.DETAIL && (
            <Button
              type="submit"
              isLoading={isSubmitting}
            >
              {initialData ? "Update Category" : "Create Category"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
