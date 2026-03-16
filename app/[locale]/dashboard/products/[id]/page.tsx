import { notFound } from "next/navigation";
import { ProductForm } from "@/components/form/productForm";
import { ProductFormType } from "@/components/form/formType/productFormType";
import { ProductService, Product } from "@/lib/service/product";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  let product: Product;

  try {
    product = await ProductService.getOne(id);
    // 🔍 TEMP: inspect raw API response shape (remove after fixing)
    console.log("📦 product from API:", JSON.stringify(product, null, 2));
  } catch (error: unknown) {
    // if your service throws 404 or not found error
    const err = error as { status?: number; response?: { status?: number } };
    if (err?.status === 404 || err?.response?.status === 404) {
      notFound();
    }

    // rethrow other unexpected errors
    throw error;
  }

  return (
    <ProductForm
      initialData={product}
      formType={ProductFormType.EDIT}
      title="Edit Product"
      description={`Editing ${product.name}`}
    />
  );
}
