
"use client";

import { useState, useEffect, SubmitEvent } from "react";
import { Input, MultiSelect, ImageUpload, UploadedFile } from "@/components/input";
import { Button } from "@/components/button";
import { mockCategories } from "@/lib/mockApi";
import { useRouter } from "@/i18n/routing";
import { Product } from "@/lib/service/product";

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
          className="flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors mb-4"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </button>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-500">{description}</p>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50 rounded-t-xl">
            <h2 className="text-lg font-semibold text-gray-900">Product Media</h2>
            <p className="text-sm text-gray-500">Upload high-quality images of your product.</p>
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

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50 rounded-t-xl">
            <h2 className="text-lg font-semibold text-gray-900">General Information</h2>
            <p className="text-sm text-gray-500">Essential details about your product.</p>
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
              value={formData.categories?.map(c => c.name) || []}
              onChange={(values: string[]) => {
                const newCategories = values.map(val => {
                  const selectedCategory = mockCategories.find((c) => c.name === val);
                  return selectedCategory
                    ? { id: selectedCategory.id.toString(), name: selectedCategory.name }
                    : { id: Date.now().toString(), name: val };
                });
                setFormData(prev => ({ ...prev, categories: newCategories }));
              }}
              options={[
                { label: "Bags", value: "Bags" },
                { label: "Accessories", value: "Accessories" },
                { label: "Wallets", value: "Wallets" },
                { label: "Belts", value: "Belts" },
              ]}
              required
            />

            <MultiSelect
              label="Materials"
              placeholder="Select Materials"
              value={formData.product_materials?.map(m => m.name) || []}
              onChange={(values: string[]) => {
                const newMaterials = values.map(val => ({
                  id: val.toLowerCase().replace(/\s+/g, '-'),
                  name: val
                }));
                setFormData(prev => ({ ...prev, product_materials: newMaterials }));
              }}
              options={[
                { label: "Full Grain Leather", value: "Full Grain" },
                { label: "Veg Tan Leather", value: "Veg Tan" },
                { label: "Suede", value: "Suede" },
                { label: "Canvas", value: "Canvas" },
              ]}
              required
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50 rounded-t-xl">
            <h2 className="text-lg font-semibold text-gray-900">Pricing</h2>
            <p className="text-sm text-gray-500">Set the value of your product.</p>
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
                <span className="text-xs font-bold text-gray-400">Rp</span>
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
