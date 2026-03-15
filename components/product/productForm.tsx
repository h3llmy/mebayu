
"use client";

import { useState, useEffect, SubmitEvent } from "react";
import { Input, MultiSelect, ImageUpload, UploadedFile } from "@/components/input";
import { Button } from "@/components/button";
import { useRouter } from "@/i18n/routing";
import { Product } from "@/lib/service/product";
import { CategoryService } from "@/lib/service/category/categoryService";
import { MaterialService } from "@/lib/service/material/materialService";
import { useServiceSearch } from "@/hooks/useServiceSearch";

interface ProductFormProps {
  initialData?: Product;
  // onSubmit: (data: any) => Promise<void>;
  // isSubmitting: boolean;
  title: string;
  description: string;
  type: ProductFormType;
}

export enum ProductFormType {
  CREATE = "CREATE",
  EDIT = "EDIT",
}

export function ProductForm({
  initialData,
  // onSubmit,
  // isSubmitting,
  title,
  description,
}: ProductFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Omit<Product, "id">>({
    name: "",
    categories: [],
    product_materials: [],
    price: 0,
  });
  const [images, setImages] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    items: categoryOptions,
    setSearch: setCategorySearch,
    hasMore: categoryHasMore,
    isLoading: categoryLoading,
    onLoadMore: loadMoreCategories,
  } = useServiceSearch({
    fetchFn: CategoryService.getAll,
    mapFn: (c) => ({ label: c.name, value: c.id, original: c }),
  });

  const {
    items: materialOptions,
    setSearch: setMaterialSearch,
    hasMore: materialHasMore,
    isLoading: materialLoading,
    onLoadMore: loadMoreMaterials,
  } = useServiceSearch({
    fetchFn: MaterialService.getAll,
    mapFn: (m) => ({ label: m.name, value: m.id, original: m }),
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        categories: initialData.categories,
        product_materials: initialData.product_materials,
        price: initialData.price,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "price") {
      setFormData((prev) => ({ ...prev, price: Number(value) }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      console.log({ formData, images });

      // await onSubmit({ ...formData, images });
      console.log("Form Data:", formData);
      console.log("Images:", images);
    } catch (error) {
      console.error("Failed to submit product:", error);
    } finally {
      setIsSubmitting(false);
    }
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
          Back to Products
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
        <p className="text-gray-500 dark:text-gray-400">{description}</p>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
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
              required={!initialData} // Required only for new products
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 rounded-t-xl">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">General Information</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Essential details about your product.</p>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Input
                label="Product Name"
                name="name"
                placeholder="e.g. Premium Leather Bag"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <MultiSelect
              label="Categories"
              placeholder="Select Categories"
              value={formData.categories?.map(c => c.id) || []}
              onChange={(values: string[]) => {
                const newCategories = values.map(val => {
                  const selectedCategory = categoryOptions.find((c) => c.value === val)?.original;
                  const existingCategory = formData.categories.find((c) => c.id === val);
                  return selectedCategory || existingCategory || { id: val, name: "" };
                });
                setFormData(prev => ({ ...prev, categories: newCategories }));
              }}
              options={
                [
                  ...categoryOptions,
                  ...formData.categories
                    .filter((c) => !categoryOptions.find((co) => co.value === c.id))
                    .map((c) => ({ label: c.name, value: c.id }))
                ]
              }
              onSearch={setCategorySearch}
              onLoadMore={loadMoreCategories}
              hasMore={categoryHasMore}
              isLoading={categoryLoading}
              required
            />

            <MultiSelect
              label="Materials"
              placeholder="Select Materials"
              value={formData.product_materials?.map(m => m.id) || []}
              onChange={(values: string[]) => {
                const newMaterials = values.map(val => {
                  const selectedMaterial = materialOptions.find((m) => m.value === val)?.original;
                  const existingMaterial = formData.product_materials.find((m) => m.id === val);
                  return selectedMaterial || existingMaterial || { id: val, name: "" };
                });
                setFormData(prev => ({ ...prev, product_materials: newMaterials }));
              }}
              options={
                [
                  ...materialOptions,
                  ...formData.product_materials
                    .filter((m) => !materialOptions.find((mo) => mo.value === m.id))
                    .map((m) => ({ label: m.name, value: m.id }))
                ]
              }
              onSearch={setMaterialSearch}
              onLoadMore={loadMoreMaterials}
              hasMore={materialHasMore}
              isLoading={materialLoading}
              required
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 rounded-t-xl">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Pricing</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Set the value of your product.</p>
          </div>

          <div className="p-6">
            <Input
              label="Price (IDR)"
              name="price"
              type="number"
              placeholder="e.g. 1500000"
              value={formData.price}
              onChange={handleChange}
              icon={
                <span className="text-xs font-bold text-gray-400 dark:text-gray-500">Rp</span>
              }
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/products")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
          >
            {initialData ? "Update Product" : "Create Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}
