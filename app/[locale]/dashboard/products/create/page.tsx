"use client";

import { ProductForm, ProductFormType } from "@/components/product/productForm";

export default function CreateProductPage() {
  return (
    <ProductForm
      title="Create New Product"
      description="Fill in the details below to add a new product to your inventory."
      type={ProductFormType.CREATE}
    />
  );
}