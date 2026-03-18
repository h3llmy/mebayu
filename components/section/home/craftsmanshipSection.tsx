"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/ui/fade-in";

export const CraftsmanshipSection = () => {
  const t = useTranslations("Pages.Home.Craftsmanship");

  return (
    <section className="bg-white py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-10 items-end mb-24">
          <FadeIn direction="up" delay={0.2}>
            <span className="block text-[#507c59] tracking-[0.4em] uppercase text-xs font-semibold mb-6">
                Artisan Story
            </span>
            <h2 className="text-4xl md:text-7xl font-extralight tracking-tight text-[#2D2D2A] leading-[1.1]">
              {t("title")}
            </h2>
          </FadeIn>
          
          <FadeIn direction="up" delay={0.3} className="flex justify-start lg:justify-end">
            <p className="mt-8 text-gray-500 max-w-lg text-lg font-light leading-relaxed">
              {t("description")}
            </p>
          </FadeIn>
        </div>

        {/* Masonry Image Grid with varied aspect ratios */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-32 items-stretch">

          {/* Close-up Texture - Wide */}
          <FadeIn direction="up" delay={0.1} className="md:col-span-8">
            <div className="relative w-full aspect-[2/1] overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-700 group">
              <Image
                src="/leather-collection.png"
                alt="Leather texture close-up"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2] hover:grayscale-0"
              />
            </div>
          </FadeIn>

          {/* Hand Stitching - Tall */}
          <FadeIn direction="up" delay={0.2} className="md:col-span-4">
            <div className="relative w-full aspect-[4/5] h-full overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-700 group">
              <Image
                src="/artisan-hands.png"
                alt="Hand stitching process"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>
          </FadeIn>

          {/* Artisan at Work - Wide */}
          <FadeIn direction="up" delay={0.3} className="md:col-span-4">
            <div className="relative w-full aspect-[1/1] overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-700 group">
              <Image
                src="/leather-hero.png"
                alt="Finished piece"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 brightness-[0.9] hover:brightness-100"
              />
            </div>
          </FadeIn>

          {/* Tools - Larger */}
          <FadeIn direction="up" delay={0.4} className="md:col-span-8">
            <div className="relative w-full aspect-[2/1] overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-700 group">
              <Image
                src="/workshop-aesthetic.png"
                alt="Leather crafting workshop"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>
          </FadeIn>

        </div>

        {/* Story Block - Clean and centered */}
        <FadeIn direction="up" delay={0.3}>
          <div className="max-w-4xl mx-auto text-center border-t border-black/5 pt-24 mt-12 pb-12">
            <h3 className="text-2xl md:text-3xl font-light tracking-widest text-[#2D2D2A] mb-10 uppercase">
              {t("storyTitle")}
            </h3>
            <p className="text-gray-600 leading-[2.2] text-xl font-light italic max-w-3xl mx-auto">
              {t("story")}
            </p>
            <div className="w-16 h-[2px] bg-[#507c59] mx-auto mt-16 scale-x-150 opacity-40" />
          </div>
        </FadeIn>

      </div>
    </section>
  );
};
