import { ProductGallery } from "@/components/card";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
    const { id } = await params;
    const t = await getTranslations("Pages.ProductDetail");

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
        <div className="mb-10 text-sm text-gray-500">
          <Link href="/products" className="hover:text-[#507c59]">
            {t("Products")}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#2D2D2A]">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">

          {/* LEFT - Images */}
          <ProductGallery images={product.images} name={product.name} />


          {/* RIGHT - Info */}
          <div className="flex flex-col">

            <h1 className="text-3xl md:text-4xl font-light tracking-wide text-[#2D2D2A]">
              {product.name}
            </h1>

            <p className="mt-4 text-2xl font-medium text-[#507c59]">
              {product.price}
            </p>

            {/* Tags */}
            <div className="flex gap-4 mt-6 text-xs uppercase tracking-widest text-gray-500">
              <span className="border border-gray-300 px-3 py-1">
                {product.category}
              </span>
              <span className="border border-gray-300 px-3 py-1">
                {product.material}
              </span>
            </div>

            {/* Description */}
            <div className="mt-10">
              <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-4">
                {t("Description")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4">

              <a
                href={`https://wa.me/62817085750446?text=Hello, I'm interested in ${product.name}`}
                target="_blank"
                className="px-8 py-3 bg-[#507c59] text-white text-sm tracking-widest uppercase text-center hover:bg-[#466e4e] transition"
              >
                {t("Order")}
              </a>

              <Link
                href="/products"
                className="px-8 py-3 border border-[#507c59] text-[#507c59] text-sm tracking-widest uppercase text-center hover:bg-[#507c59] hover:text-white transition"
              >
                {t("BackToProducts")}
              </Link>

            </div>

          </div>
        </div>

        {/* Extra Section */}
        <div className="mt-24 border-t border-gray-200 pt-16 text-center">
          <h3 className="text-2xl font-light text-[#2D2D2A] mb-6">
            {t("YouMayAlsoLike")}
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <Link key={item} href={`../${item}`} className="group">
                <div className="relative w-full aspect-[3/4] bg-white overflow-hidden">
                  <Image
                    src="/hero-1.png"
                    alt="Related"
                    fill
                    className="object-cover group-hover:scale-105 transition"
                  />
                </div>
                <p className="mt-4 text-sm text-[#2D2D2A]">
                  Leather Bag {item}
                </p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
