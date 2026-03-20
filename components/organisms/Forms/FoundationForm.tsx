"use client";

import { useState, useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";
import { Foundation } from "@/lib/service/foundation/foundationModel";
import { ProductFormType } from "@/components/form/formType/productFormType";

interface FoundationFormProps {
  initialData?: Foundation;
  onSubmit: (data: { name: string }) => Promise<void>;
  isSubmitting: boolean;
  title: string;
  description: string;
  formType?: ProductFormType;
}

export function FoundationForm({
  initialData,
  onSubmit,
  isSubmitting,
  title,
  description,
  formType = ProductFormType.CREATE,
}: FoundationFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      name: formData.name,
    });
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
          Back to Foundations
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
        <p className="text-gray-500 dark:text-gray-400">{description}</p>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Foundation Details</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Essential details about your foundation.</p>
          </div>

          <div className="p-6 space-y-6">
            <Input
              label="Foundation Name"
              name="name"
              placeholder="e.g. Rigid, Soft"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={formType === ProductFormType.DETAIL}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/foundations")}
          >
            {formType === ProductFormType.DETAIL ? "Back" : "Cancel"}
          </Button>
          {formType !== ProductFormType.DETAIL && (
            <Button
              type="submit"
              isLoading={isSubmitting}
            >
              {initialData ? "Update Foundation" : "Create Foundation"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
