import { notFound } from "next/navigation";
import { ProductForm } from "@/components/organisms/Forms/ProductForm";
import { ProductFormType } from "@/components/organisms/Forms/formType/productFormType";
import { ProductService, Product } from "@/lib/service/product";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const product = await ProductService.getOne(id);

  if (!product) {
    notFound();
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
