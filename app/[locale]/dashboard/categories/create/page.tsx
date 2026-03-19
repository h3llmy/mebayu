"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { CategoryForm } from "@/components/organisms/Forms/CategoryForm";
import { CategoryService } from "@/lib/service/category/categoryService";

export default function CreateCategoryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: {
    name: string;
  }) => {
    setIsSubmitting(true);

    try {
      await CategoryService.create({ name: data.name });
    } catch (error) {
      console.error("Failed to create category:", error);
    }

    setIsSubmitting(false);
    router.push("/dashboard/categories");
  };

  return (
    <CategoryForm
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      title="Create New Category"
      description="Define a new category to organize your products."
    />
  );
}
