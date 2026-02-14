
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CategoryForm } from "@/components/product/categoryForm";

export default function CreateCategoryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    console.log("Creating category:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
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
