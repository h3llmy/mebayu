import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/ui/fade-in";

export const CtaSection = () => {
  const t = useTranslations("Pages.Home.Cta");

  return (
    <section className="relative bg-[#507c59] text-white py-28 px-6 text-center overflow-hidden">
      
      {/* Subtle overlay pattern effect */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <FadeIn direction="up" delay={0.2}>
          
          <h2 className="text-3xl md:text-5xl font-medium tracking-wide mb-6 leading-tight">
            {t("title")}
          </h2>

          <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed">
            {t("description")}
          </p>

          <a
            href="https://www.instagram.com/mebayu.idn/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-10 py-4 bg-white text-[#507c59] font-medium uppercase tracking-widest text-sm transition-all duration-300 hover:bg-transparent hover:text-white border border-white"
          >
            {t("cta")}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>

        </FadeIn>
      </div>
    </section>
  );
};
