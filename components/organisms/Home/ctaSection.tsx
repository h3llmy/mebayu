"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "../../atoms/FadeIn";
import { Instagram, Send } from "lucide-react";
import Image from "next/image";

export const CtaSection = () => {
  const t = useTranslations("Pages.Home.Cta");

  return (
    <section className="relative h-[80vh] flex items-center bg-[#2D2D2A] text-white py-32 px-6 text-center overflow-hidden">
      
      {/* Background Image with Parallax-like effect */}
      <div className="absolute inset-0 opacity-40 z-0 select-none grayscale-[0.8]">
        <Image
           src="/workshop-aesthetic.png"
           alt="Mebayu Workshop"
           fill
           className="object-cover transition-transform duration-1000 scale-105"
        />
      </div>

      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2A]/90 via-[#2D2D2A]/60 to-[#2D2D2A]/90 pointer-events-none z-10" />

      <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center">
        <FadeIn direction="up" delay={0.2} duration={1.2}>
          <span className="block text-[#507c59] tracking-[0.5em] uppercase text-xs font-bold mb-10">
            Join the journey
          </span>
          <h2 className="text-4xl md:text-7xl font-light tracking-tight mb-12 leading-[1.1]">
            {t("title")}
          </h2>

          <p className="text-white/70 text-lg md:text-2xl mb-16 leading-relaxed max-w-3xl mx-auto font-light">
            {t("description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <a
                href="https://www.instagram.com/mebayu.idn/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 px-12 py-5 bg-white text-black font-semibold uppercase tracking-[0.2em] text-xs transition-all duration-500 hover:bg-[#507c59] hover:text-white rounded-sm"
            >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {t("cta")}
            </a>

            <a
                href="#contact"
                className="group flex items-center gap-4 text-white/70 hover:text-white tracking-[0.3em] uppercase text-xs font-light transition-all duration-300"
            >
                Connect with us
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-3 group-hover:-translate-y-3" />
            </a>
          </div>

        </FadeIn>
      </div>
    </section>
  );
};
