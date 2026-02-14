"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductForm } from "@/components/product/productForm";

export default function CreateProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    console.log("Creating product:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    router.push("/dashboard/products");
  };

  return (
    <ProductForm
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      title="Create New Product"
      description="Fill in the details below to add a new product to your inventory."
    />
  );
}