"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductForm } from "@/components/product/productForm";
import { fetchProductById, type Product } from "@/lib/mockApi";
import { useRouter } from "@/i18n/routing";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError("Product not found");
      } finally {
        setIsLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    // Simulate API call
    console.log("Updating product:", { id, ...data });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    router.push("/dashboard/products");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-500 animate-pulse">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <button
            onClick={() => router.push("/dashboard/products")}
            className="text-blue-600 hover:underline font-medium"
          >
            Go back to products
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProductForm
      initialData={product}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      title="Edit Product"
      description={`Editing ${product?.name}`}
    />
  );
}