import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FadeIn } from "@/components/ui/fade-in";

export const ProductSection = () => {
  const t = useTranslations("Pages.Home.Products");

  // Replace later with real data
  const products = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    name: `Leather Bag ${i + 1}`,
    price: "Rp 1.250.000",
    image: "/hero-1.png",
    description: "Handmade in Bali",
    slug: `/products/leather-bag-${i + 1}`,
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
              <Link
                href={product.slug}
                className="group block"
              >
                {/* Image */}
                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-md bg-white shadow-sm">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition duration-500" />
                </div>

                {/* Content */}
                <div className="mt-6 space-y-2">
                  <h3 className="text-base font-medium tracking-wide text-[#2D2D2A] group-hover:text-[#507c59] transition">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {product.description}
                  </p>

                  <p className="text-sm font-semibold text-[#507c59]">
                    {product.price}
                  </p>

                  <div className="relative w-fit mt-2">
                    <span className="text-xs uppercase tracking-widest text-gray-600">
                      {t("viewDetails")}
                    </span>
                    <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#507c59] transition-all duration-300 group-hover:w-full" />
                  </div>
                </div>
              </Link>
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
