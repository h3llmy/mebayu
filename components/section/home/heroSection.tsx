"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

import { FadeIn } from "@/components/ui/fade-in";

const images = ["/hero-2.png", "/hero-1.png"];

export const HeroSection = () => {
    const t = useTranslations("Pages.Home.Hero");
    const [current, setCurrent] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        resetTimeout();

        timeoutRef.current = setTimeout(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => resetTimeout();
    }, [current]);

    return (
        <section className="relative w-full min-h-[70vh] md:min-h-screen overflow-hidden">
            {/* Slides */}
            {images.map((img, index) => (
                <div
                    key={index}
                    className={`
                        absolute inset-0 transition-opacity duration-1000
                        ${index === current ? "opacity-100 z-20" : "opacity-0 z-10"}
                    `}
                >
                    <Image
                        src={img}
                        alt={`Hero Image ${index + 1}`}
                        fill
                        sizes="100vw"
                        priority={index === 0}
                        className="object-cover object-center"
                    />
                </div>
            ))}

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 z-25" />

            {/* Content */}
            <div className="relative z-30 flex flex-col justify-center items-center text-center min-h-[70vh] md:min-h-screen px-6 text-white">
                <FadeIn direction="up" delay={0.2} duration={1}>
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-wide mb-6">
                        {t("title")}
                    </h1>
                </FadeIn>

                <FadeIn direction="up" delay={0.4} duration={1}>
                    <p className="text-base sm:text-lg md:text-xl max-w-2xl mb-8">
                        {t("description")}
                    </p>
                </FadeIn>

                <FadeIn direction="up" delay={0.6} duration={1}>
                    <Link
                        href="/products"
                        className="inline-block px-7 py-3 bg-white text-black font-medium rounded hover:bg-[#6F8F6B] hover:text-white transition"
                    >
                        {t("cta")}
                    </Link>
                </FadeIn>
            </div>
        </section>
    );
};
