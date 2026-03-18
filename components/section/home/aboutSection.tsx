"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/ui/fade-in";
import { MoveRight } from "lucide-react";
import { Link } from "@/i18n/routing";

export const AboutSection = () => {
    const t = useTranslations("Pages.Home.About");

    return (
        <section
            id="about"
            className="bg-[#f8f7f4] py-32 px-6"
        >
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

                {/* Image Composition */}
                <FadeIn direction="left" duration={1}>
                    <div className="relative group">
                        <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden shadow-2xl z-10">
                            <Image
                                src="/artisan-hands.png"
                                alt="Craftsmanship at Mebayu"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </FadeIn>

                {/* Content with luxury typography */}
                <div className="relative">
                    <FadeIn direction="up" delay={0.2}>
                        <span className="block text-[#507c59] tracking-[0.4em] uppercase text-xs font-semibold mb-6">
                            Our Heritage
                        </span>
                        <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-10 text-[#2D2D2A] leading-[1.1]">
                            {t("title")}
                        </h2>

                        <div className="text-gray-500 leading-relaxed space-y-8 text-lg font-light">
                            <p className="border-l-2 border-[#507c59]/20 pl-6 border-b-0 border-t-0 border-r-0">
                                {t("p1")}
                            </p>
                            <p className="pl-6">
                                {t("p2")}
                            </p>
                        </div>

                        <div className="mt-14 flex items-center gap-6">
                            <Link
                                href="/#products"
                                className="group inline-flex items-center gap-3 text-[#2D2D2A] tracking-[0.2em] uppercase text-xs font-bold hover:text-[#507c59] transition-colors"
                            >
                                Explore Our Philosophy
                                <MoveRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                            </Link>
                        </div>
                    </FadeIn>
                </div>

            </div>
        </section>
    );
};
