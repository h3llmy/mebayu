"use client";

import { ProductForm } from "@/components/form/productForm";
import { ProductFormType } from "@/components/form/formType/productFormType";

export default function CreateProductPage() {
  return (
    <ProductForm
      title="Create New Product"
      description="Fill in the details below to add a new product to your inventory."
      formType={ProductFormType.CREATE}
    />
  );
}
