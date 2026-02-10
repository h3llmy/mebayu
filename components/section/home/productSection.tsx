import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FadeIn } from "@/components/ui/fade-in";

export const ProductSection = () => {
  const t = useTranslations("Pages.Home.Products");
  const products = Array.from({ length: 8 });

  return (
    <section
      id="products"
      className="bg-[#f8f7f4] py-28 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-20">
          <FadeIn direction="up" delay={0.2} duration={0.8}>
            <h2 className="text-4xl md:text-5xl font-light tracking-wide text-[#2D2D2A]">
              {t("title")}
            </h2>
            <div className="w-16 h-[1px] bg-[#507c59] mx-auto mt-6" />
            <p className="mt-6 text-gray-500 max-w-xl mx-auto">
              {t("description")}
            </p>
          </FadeIn>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((_, index) => (
            <FadeIn
              key={index}
              direction="up"
              delay={0.1 * (index % 4)} // Stagger based on column index for a wave effect
              duration={0.6}
              className="group cursor-pointer"
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm bg-white">
                <Image
                  src="/hero-1.png"
                  alt="Product"
                  fill
                  className="object-cover transition duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500" />
              </div>

              <div className="mt-6 space-y-2">
                <h3 className="text-base tracking-wide text-[#2D2D2A]">
                  Leather Bag {index + 1}
                </h3>

                <p className="text-sm text-gray-500">
                  Handmade in Bali
                </p>

                <p className="text-sm font-medium text-[#507c59]">
                  Rp 1.250.000
                </p>

                <div className="relative w-fit">
                  <span className="text-xs uppercase tracking-widest text-gray-600">
                    {t("viewDetails")}
                  </span>
                  <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#507c59] transition-all duration-300 group-hover:w-full" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Show More Button */}
        <div className="mt-20 flex justify-center">
            <FadeIn direction="up" delay={0.2} duration={0.6}>
              <Link
                href="/products"
                className="group relative px-10 py-3 border border-[#507c59] text-[#507c59] uppercase tracking-widest text-sm transition duration-300 hover:bg-[#507c59] hover:text-white"
              >
                {t("showMore")}

                {/* subtle animated underline */}
                <span className="absolute left-1/2 -bottom-2 w-0 h-[1px] bg-[#507c59] transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </Link>
            </FadeIn>
        </div>

      </div>
    </section>
  );
};
