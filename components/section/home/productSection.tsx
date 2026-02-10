import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FadeIn } from "@/components/ui/fade-in";
import { ProductCard } from "@/components/card";

export const ProductSection = () => {
  const t = useTranslations("Pages.Home.Products");

  // Replace later with real data
  const products = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    name: `Leather Bag ${i + 1}`,
    price: "Rp 1.250.000",
    image: "/hero-1.png",
    description: "Handmade in Bali",
  }));

  return (
    <section
      id="products"
      className="bg-[#f8f7f4] py-28 px-6"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <FadeIn direction="up" delay={0.2} duration={0.8}>
            <h2 className="text-4xl md:text-5xl font-medium tracking-wide text-[#2D2D2A]">
              {t("title")}
            </h2>
            <div className="w-16 h-[2px] bg-[#507c59] mx-auto mt-6" />
            <p className="mt-6 text-gray-500 max-w-xl mx-auto text-lg">
              {t("description")}
            </p>
          </FadeIn>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product, index) => (
            <FadeIn
              key={product.id}
              direction="up"
              delay={0.1 * (index % 4)}
              duration={0.6}
            >
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>

        {/* Show More */}
        <div className="mt-20 flex justify-center">
          <FadeIn direction="up" delay={0.2} duration={0.6}>
            <Link
              href="/products"
              className="group relative px-10 py-3 border border-[#507c59] text-[#507c59] uppercase tracking-widest text-sm transition duration-300 hover:bg-[#507c59] hover:text-white"
            >
              {t("showMore")}
              <span className="absolute left-1/2 -bottom-2 w-0 h-[1px] bg-[#507c59] transition-all duration-300 group-hover:w-full group-hover:left-0" />
            </Link>
          </FadeIn>
        </div>

      </div>
    </section>
  );
};
