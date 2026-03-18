import { notFound } from "next/navigation";
import { ProductForm } from "@/components/form/productForm";
import { ProductFormType } from "@/components/form/formType/productFormType";
import { ProductService, Product } from "@/lib/service/product";

export default async function DetailProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  let product: Product;

  try {
    product = await ProductService.getOne(id);
  } catch (error: unknown) {
    const err = error as { status?: number; response?: { status?: number } };
    if (err?.status === 404 || err?.response?.status === 404) {
      notFound();
    }
    throw error;
  }

  return (
    <ProductForm
      initialData={product}
      formType={ProductFormType.DETAIL}
      title="Product Details"
      description={`Viewing details for ${product.name}`}
    />
  );
}
