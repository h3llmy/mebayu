import Image from "next/image";
import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/ui/fade-in";

export const CraftsmanshipSection = () => {
  const t = useTranslations("Pages.Home.Craftsmanship");

  return (
    <section className="bg-white py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-20">
          <FadeIn direction="up" delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-light tracking-wide text-[#2D2D2A]">
              {t("title")}
            </h2>
            <div className="w-16 h-[1px] bg-[#507c59] mx-auto mt-6" />
            <p className="mt-6 text-gray-500 max-w-2xl mx-auto leading-relaxed">
              {t("description")}
            </p>
          </FadeIn>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">

          {/* Close-up Texture */}
          <FadeIn direction="up" delay={0.1}>
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src="/hero-2.png"
                alt="Leather texture close-up"
                fill
                className="object-cover"
              />
            </div>
          </FadeIn>

          {/* Hand Stitching */}
          <FadeIn direction="up" delay={0.2}>
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src="/hero-2.png"
                alt="Hand stitching process"
                fill
                className="object-cover"
              />
            </div>
          </FadeIn>

          {/* Tools */}
          <FadeIn direction="up" delay={0.3}>
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src="/hero-2.png"
                alt="Leather crafting tools"
                fill
                className="object-cover"
              />
            </div>
          </FadeIn>

          {/* Artisan at Work */}
          <FadeIn direction="up" delay={0.4}>
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src="/hero-2.png"
                alt="Artisan working on leather"
                fill
                className="object-cover"
              />
            </div>
          </FadeIn>

        </div>

        {/* Story Block */}
        <FadeIn direction="up" delay={0.3}>
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl md:text-2xl font-light tracking-wide text-[#2D2D2A] mb-6">
              {t("storyTitle")}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {t("story")}
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  );
};
