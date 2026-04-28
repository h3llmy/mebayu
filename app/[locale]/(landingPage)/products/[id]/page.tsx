import { ProductGallery } from "@/components/molecules/ProductGallery";
import { ProductBreadcrumb } from "@/components/molecules/Breadcrumb";
import { ProductInfo } from "@/components/organisms/ProductInfo";
import { RelatedProducts } from "@/components/organisms/RelatedProducts";
import { ProductService } from "@/lib/service/product";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const product = await ProductService.getOne(id);

  if (!product) return notFound();

  return (
    <section className="bg-[#f8f7f4] min-h-screen py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <ProductBreadcrumb productName={product.translations?.[0]?.name || "Product"} />

        <div className="grid lg:grid-cols-2 gap-16">

          {/* LEFT - Images */}
          <ProductGallery 
            images={product.images?.map((image) => image.url)} 
            name={product.translations?.[0]?.name || "Product Image"} 
          />

          {/* RIGHT - Info */}
          <ProductInfo product={product} />
        </div>

        {/* Extra Section */}
        <RelatedProducts />

      </div>
    </section>
  );
}
