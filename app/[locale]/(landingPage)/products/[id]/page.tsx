import { ProductGallery } from "@/components/card";
import { ProductBreadcrumb, ProductInfo, RelatedProducts } from "@/components/product-detail";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
    const { id } = await params;

  // 🔥 Mock product (replace with DB later)
  const product = {
    id,
    name: `Leather Bag ${id}`,
    price: "Rp 1.250.000",
    material: "Full Grain Leather",
    category: "Bags",
    description:
      "Handcrafted leather bag made in Bali. Designed for durability and timeless elegance. Each piece is carefully crafted using premium materials.",
    images: ["/hero-1.png", "/hero-2.png"]
  };

  if (!product) return notFound();

  return (
    <section className="bg-[#f8f7f4] min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <ProductBreadcrumb productName={product.name} />

        <div className="grid lg:grid-cols-2 gap-16">

          {/* LEFT - Images */}
          <ProductGallery images={product.images} name={product.name} />

          {/* RIGHT - Info */}
          <ProductInfo product={product} />
        </div>

        {/* Extra Section */}
        <RelatedProducts />

      </div>
    </section>
  );
}
