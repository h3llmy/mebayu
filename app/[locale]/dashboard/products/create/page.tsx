"use client";

import { ProductForm } from "@/components/organisms/Forms/ProductForm";
import { ProductFormType } from "@/components/organisms/Forms/formType/productFormType";

export default function CreateProductPage() {
  return (
    <ProductForm
      title="Create New Product"
      description="Fill in the details below to add a new product to your inventory."
      formType={ProductFormType.CREATE}
    />
  );
}
