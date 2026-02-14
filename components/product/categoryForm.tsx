
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input, Select } from "@/components/input";
import { Button } from "@/components/button";
import { type Category } from "@/lib/mockApi";

interface CategoryFormProps {
  initialData?: Category;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting: boolean;
  title: string;
  description: string;
}

export function CategoryForm({
  initialData,
  onSubmit,
  isSubmitting,
  title,
  description,
}: CategoryFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: "true",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        isActive: initialData.isActive ? "true" : "false",
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ 
        ...formData, 
        isActive: formData.isActive === "true" 
    });
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
          Back to Categories
        </button>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-500">{description}</p>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-semibold text-gray-900">Category Details</h2>
            <p className="text-sm text-gray-500">Essential details about your product category.</p>
          </div>
          
          <div className="p-6 space-y-6">
            <Input
              label="Category Name"
              name="name"
              placeholder="e.g. Bags, Accessories"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Description</label>
                <textarea
                    name="description"
                    rows={4}
                    placeholder="Describe what this category is for..."
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 resize-none"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>

            <Select
              label="Status"
              name="isActive"
              value={formData.isActive}
              onChange={handleChange}
              options={[
                { label: "Active", value: "true" },
                { label: "Inactive", value: "false" },
              ]}
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/categories")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
          >
            {initialData ? "Update Category" : "Create Category"}
          </Button>
        </div>
      </form>
    </div>
  );
}
