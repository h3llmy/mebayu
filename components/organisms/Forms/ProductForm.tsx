"use client";

import { useState, useEffect, SubmitEvent } from "react";
import { Input } from "../../atoms/Input";
import { MultiSelect } from "../../molecules/MultiSelect";
import { ImageUpload, UploadedFile } from "../../molecules/ImageUpload";
import { Button } from "../../atoms/Button";
import { useRouter } from "@/i18n/routing";
import { Product, ProductTranslation, ProductService } from "@/lib/service/product";
import { CategoryService } from "@/lib/service/category/categoryService";
import { MaterialService } from "@/lib/service/material/materialService";
import { FoundationService } from "@/lib/service/foundation/foundationService";
import { useServiceSearch } from "@/hooks/useServiceSearch";
import { TextAreaInput } from "../../atoms/TextArea";
import { ProductFormType } from "@/components/form/formType/productFormType";
import { Language, LanguageService } from "@/lib/service/language/languageService";

export { ProductFormType };

// Language labels for display
const LANGUAGE_LABELS: Record<string, string> = {
  en: "English",
  id: "Indonesian",
};

// Default translation shape for a new language entry
function emptyTranslation(languageId: string): ProductTranslation {
  const placeholderLanguage: Language = {
    id: languageId,
    code: languageId,
    name: LANGUAGE_LABELS[languageId] ?? languageId.toUpperCase(),
    is_default: false,
    created_at: "",
    updated_at: "",
  };
  return { product_id: "", language_id: languageId, language: placeholderLanguage, name: "", description: "" };
}

interface ProductFormData {
  translations: ProductTranslation[];
  product_categories: Product["product_categories"];
  product_materials: Product["product_materials"];
  product_foundations: Product["product_foundations"];
  price: number;
  status: string;
}

interface ProductFormProps {
  initialData?: Product;
  title: string;
  description: string;
  formType: ProductFormType;
}

export function ProductForm({
  initialData,
  title,
  description,
  formType,
}: ProductFormProps) {
  const router = useRouter();
  const isDisabled = formType === ProductFormType.DETAIL;

  // --- Languages fetched from API ---
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    LanguageService.getAll().then((langs) => {
      setLanguages(langs);
    });
  }, []);

  // Build translation list: merge API translations with all available languages
  const buildTranslations = (data: Product | undefined, langs: Language[]): ProductTranslation[] => {
    if (langs.length === 0) {
      // Fallback: return existing translations or empty placeholders
      return data?.translations?.length ? data.translations : [emptyTranslation("en"), emptyTranslation("id")];
    }
    return langs.map((lang) => {
      const existing = data?.translations?.find((t) => t.language_id === lang.code || t.language_id === lang.id);
      if (existing) return existing;
      return {
        product_id: data?.id || "",
        language_id: lang.code,
        language: lang,
        name: "",
        description: "",
      };
    });
  };

  const [formData, setFormData] = useState<ProductFormData>({
    translations: buildTranslations(initialData, []),
    product_categories: initialData?.product_categories || [],
    product_materials: initialData?.product_materials || [],
    product_foundations: initialData?.product_foundations || [],
    price: initialData?.price || 0,
    status: initialData?.status || "ACTIVE",
  });

  // Active language tab — default to the first translation's language
  const [activeLang, setActiveLang] = useState<string>(
    () => formData.translations[0]?.language_id || "en"
  );

  const [images, setImages] = useState<UploadedFile[]>(
    initialData?.images?.map((img: any) => {
      const imgUrl = typeof img === "string" ? img : img?.url || "";
      return { file_key: imgUrl, public_url: imgUrl };
    }) || []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Re-build translations when languages load or initialData changes
  useEffect(() => {
    const translations = buildTranslations(initialData, languages);
    setFormData((prev) => ({
      ...prev,
      translations,
      product_categories: initialData?.product_categories || prev.product_categories,
      product_materials: initialData?.product_materials || prev.product_materials,
      product_foundations: initialData?.product_foundations || prev.product_foundations,
      price: initialData?.price ?? prev.price,
      status: initialData?.status || prev.status,
    }));
    if (translations[0]?.language_id) {
      setActiveLang((prev) => prev || translations[0].language_id);
    }
    if (initialData?.images) {
      setImages(
        initialData.images.map((img: any) => {
          const imgUrl = typeof img === "string" ? img : img?.url || "";
          return { file_key: imgUrl, public_url: imgUrl };
        })
      );
    }
  }, [initialData, languages]);


  // --- Category search ---
  const { items: categoryOptions, setSearch: setCategorySearch, hasMore: categoryHasMore, isLoading: categoryLoading, onLoadMore: loadMoreCategories } =
    useServiceSearch({ fetchFn: CategoryService.getAll, mapFn: (c) => ({ label: c.translations?.[0]?.name || c.id, value: c.id, original: c }) });

  // --- Material search ---
  const { items: materialOptions, setSearch: setMaterialSearch, hasMore: materialHasMore, isLoading: materialLoading, onLoadMore: loadMoreMaterials } =
    useServiceSearch({ fetchFn: MaterialService.getAll, mapFn: (m) => ({ label: m.translations?.[0]?.name || m.id, value: m.id, original: m }) });

  // --- Foundation search ---
  const { items: foundationOptions, setSearch: setFoundationSearch, hasMore: foundationHasMore, isLoading: foundationLoading, onLoadMore: loadMoreFoundations } =
    useServiceSearch({ fetchFn: FoundationService.getAll, mapFn: (f) => ({ label: f.translations?.[0]?.name || f.id, value: f.id, original: f }) });

  // Get the translation object for the currently-active language tab
  const activeTranslation = formData.translations.find((t) => t.language_id === activeLang)
    ?? emptyTranslation(activeLang);

  // Update a field within the active language's translation
  const handleTranslationChange = (field: "name" | "description", value: string) => {
    setFormData((prev) => {
      const existing = prev.translations.find((t) => t.language_id === activeLang);
      if (existing) {
        return {
          ...prev,
          translations: prev.translations.map((t) =>
            t.language_id === activeLang ? { ...t, [field]: value } : t
          ),
        };
      }
      // No existing entry for this language — create one
      return {
        ...prev,
        translations: [...prev.translations, { ...emptyTranslation(activeLang), [field]: value }],
      };
    });
  };

  const handleFormSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const translationsPayload = formData.translations
        .filter((t) => t.name?.trim() || t.description?.trim())
        .map((t) => ({
          language_id: t.language_id,
          name: t.name || "",
          description: t.description || "",
        }));

      const basePayload = {
        category_ids: formData.product_categories.map((c) => c.id),
        material_ids: formData.product_materials.map((m) => m.id),
        foundation_ids: formData.product_foundations.map((f) => f.id),
        price: formData.price,
        image_urls: images.map((img) => img.public_url),
        status: formData.status,
        translations: translationsPayload,
      };

      switch (formType) {
        case ProductFormType.CREATE:
          await ProductService.create(basePayload);
          router.push("/dashboard/products");
          break;
        case ProductFormType.EDIT:
          await ProductService.update(initialData?.id || "", basePayload);
          router.push("/dashboard/products");
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Failed to submit product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-4"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
        <p className="text-gray-500 dark:text-gray-400">{description}</p>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Media */}
        <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 rounded-t-xl">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Product Media</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Upload high-quality images of your product.</p>
          </div>
          <div className="p-6">
            <ImageUpload
              label="Product Images"
              maxFiles={6}
              value={images}
              onChange={setImages}
              uploadPath="products"
              helperText="You can upload up to 6 images. The first image will be the cover."
              required={!initialData}
              disabled={isDisabled}
            />
          </div>
        </div>

        {/* Translations — per-language name & description */}
        <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 rounded-t-xl">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Translations</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Manage name and description for each language.</p>
          </div>

          {/* Language Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-800 flex gap-1 px-6 pt-4">
            {formData.translations.map((t) => {
              const label = t.language?.name ?? LANGUAGE_LABELS[t.language_id] ?? t.language_id.toUpperCase();
              const isActive = t.language_id === activeLang;
              const hasContent = t.name?.trim() !== "" || t.description?.trim() !== "";
              return (
                <button
                  key={t.language_id}
                  type="button"
                  onClick={() => setActiveLang(t.language_id)}
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

          <div className="p-6 grid grid-cols-1 gap-6">
            <Input
              label="Product Name"
              name="name"
              placeholder="e.g. Premium Leather Bag"
              value={activeTranslation.name}
              onChange={(e) => handleTranslationChange("name", e.target.value)}
              required={activeLang === (formData.translations[0]?.language_id ?? "en")}
              disabled={isDisabled}
            />
            <TextAreaInput
              label="Description"
              name="description"
              placeholder="Describe your product in detail — material, style, dimensions, etc."
              value={activeTranslation.description}
              onChange={(e) => handleTranslationChange("description", e.target.value)}
              required={activeLang === (formData.translations[0]?.language_id ?? "en")}
              disabled={isDisabled}
              rows={5}
            />
          </div>
        </div>

        {/* Relations */}
        <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 rounded-t-xl">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Classification</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Assign categories, materials, and foundations.</p>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <MultiSelect
              label="Categories"
              placeholder="Select Categories"
              value={formData.product_categories?.map((c) => c.id) || []}
              onChange={(values: string[]) => {
                const newCategories = values.map((val) => {
                  const selected = categoryOptions.find((c) => c.value === val)?.original;
                  const existing = formData.product_categories.find((c) => c.id === val);
                  return selected || existing || { id: val, translations: [], created_at: "", updated_at: "" };
                });
                setFormData((prev) => ({ ...prev, product_categories: newCategories }));
              }}
              options={[
                ...categoryOptions,
                ...(formData.product_categories || [])
                  .filter((c) => !categoryOptions.find((co) => co.value === c.id))
                  .map((c) => ({ label: c.translations?.[0]?.name || c.id, value: c.id })),
              ]}
              onSearch={setCategorySearch}
              onLoadMore={loadMoreCategories}
              hasMore={categoryHasMore}
              isLoading={categoryLoading}
              required
              disabled={isDisabled}
            />

            <MultiSelect
              label="Materials"
              placeholder="Select Materials"
              value={formData.product_materials?.map((m) => m.id) || []}
              onChange={(values: string[]) => {
                const newMaterials = values.map((val) => {
                  const selected = materialOptions.find((m) => m.value === val)?.original;
                  const existing = formData.product_materials?.find((m) => m.id === val);
                  return selected || existing || { id: val, translations: [], created_at: "", updated_at: "" };
                });
                setFormData((prev) => ({ ...prev, product_materials: newMaterials }));
              }}
              options={[
                ...materialOptions,
                ...(formData.product_materials || [])
                  .filter((m) => !materialOptions.find((mo) => mo.value === m.id))
                  .map((m) => ({ label: m.translations?.[0]?.name || m.id, value: m.id })),
              ]}
              onSearch={setMaterialSearch}
              onLoadMore={loadMoreMaterials}
              hasMore={materialHasMore}
              isLoading={materialLoading}
              required
              disabled={isDisabled}
            />

            <MultiSelect
              label="Foundations"
              placeholder="Select Foundations"
              value={formData.product_foundations?.map((f) => f.id) || []}
              onChange={(values: string[]) => {
                const newFoundations = values.map((val) => {
                  const selected = foundationOptions.find((f) => f.value === val)?.original;
                  const existing = formData.product_foundations?.find((f) => f.id === val);
                  return selected || existing || { id: val, translations: [], created_at: "", updated_at: "" };
                });
                setFormData((prev) => ({ ...prev, product_foundations: newFoundations }));
              }}
              options={[
                ...foundationOptions,
                ...(formData.product_foundations || [])
                  .filter((f) => !foundationOptions.find((fo) => fo.value === f.id))
                  .map((f) => ({ label: f.translations?.[0]?.name || f.id, value: f.id })),
              ]}
              onSearch={setFoundationSearch}
              onLoadMore={loadMoreFoundations}
              hasMore={foundationHasMore}
              isLoading={foundationLoading}
              required
              disabled={isDisabled}
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 rounded-t-xl">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Pricing</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Set the value of your product.</p>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Price (IDR)"
              name="price"
              type="number"
              placeholder="e.g. 1500000"
              value={formData.price || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, price: Number(e.target.value) }))}
              icon={<span className="text-xs font-bold text-gray-400 dark:text-gray-500">Rp</span>}
              required
              disabled={isDisabled}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
                disabled={isDisabled}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/products")}>
            {isDisabled ? "Back" : "Cancel"}
          </Button>
          {!isDisabled && (
            <Button type="submit" isLoading={isSubmitting}>
              {formType === ProductFormType.EDIT ? "Update Product" : "Create Product"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
