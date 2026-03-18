"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FadeIn } from "@/components/ui/fade-in";
import { ProductCard } from "@/components/card";
import { ChevronRight } from "lucide-react";

export const ProductSection = () => {
  const t = useTranslations("Pages.Home.Products");

  // Replace later with real data
  const products = Array.from({ length: 4 }).map((_, i) => ({
    id: i + 1,
    name: i % 2 === 0 ? `The Mebayu Tote ${i + 1}` : `Bali Canvas Bag ${i + 1}`,
    price: "Rp 1.250.000",
    image: i % 2 === 0 ? "/leather-hero.png" : "/leather-collection.png",
    description: "Handcrafted in Bali • Limited Edition",
  }));

  return (
    <section
      id="products"
      className="bg-white py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header with high-end aesthetic */}
        <div className="grid md:grid-cols-2 items-end gap-10 mb-24 border-b border-black/5 pb-10">
          <FadeIn direction="up">
            <span className="block text-[#507c59] tracking-[0.4em] uppercase text-xs font-semibold mb-6">
                Featured collection
            </span>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-[#2D2D2A]">
              {t("title")}
            </h2>
          </FadeIn>
          
          <FadeIn direction="up" delay={0.2} className="flex justify-start md:justify-end">
            <p className="mt-6 text-gray-500 max-w-sm text-lg font-light leading-relaxed">
              {t("description")}
            </p>
          </FadeIn>
        </div>

        {/* Grid with better spacing and visual balance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {products.map((product, index) => (
            <FadeIn
              key={product.id}
              direction="up"
              delay={0.1 * index}
              duration={0.6}
            >
              <div className="relative group p-4 border border-transparent hover:border-black/5 rounded-xl transition-all duration-300">
                <ProductCard product={product} />
              </div>
            </FadeIn>
          ))}
        </div>

        {/* View All Button with premium interactions */}
        <div className="mt-28 flex justify-center">
          <FadeIn direction="up" delay={0.2}>
            <Link
              href="/products"
              className="group flex items-center gap-4 px-12 py-5 bg-[#2D2D2A] text-white tracking-[0.25em] uppercase text-xs font-semibold hover:bg-[#507c59] transition-all duration-500 rounded-full"
            >
              {t("showMore")}
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-[#507c59] transition-all duration-500">
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          </FadeIn>
        </div>

      </div>
    </section>
  );
};
