import { notFound } from "next/navigation";
import { ProductForm, ProductFormType } from "@/components/product/productForm";
import { ProductService } from "@/lib/service/product";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let product;

  try {
    product = await ProductService.getOne(id);
  } catch (error: any) {
    // if your service throws 404 or not found error
    if (error?.status === 404) {
      notFound();
    }

    // rethrow other unexpected errors
    throw error;
  }

  return (
    <ProductForm
      // initialData={product}
      type={ProductFormType.EDIT}
      title="Edit Product"
      description={`Editing ${product.name}`}
    />
  );
}