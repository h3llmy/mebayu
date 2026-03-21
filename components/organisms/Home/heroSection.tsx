"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";

const defaultImages = ["/leather-hero.png", "/leather-collection.png"];

interface HeroSectionProps {
    images?: string[];
}

export const HeroSection = ({ images = defaultImages }: HeroSectionProps) => {
    const heroImages = images.length > 0 ? images : defaultImages;
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
            setCurrent((prev) => (prev + 1) % heroImages.length);
        }, 6000);
        return () => resetTimeout();
    }, [current, heroImages.length]);

    return (
        <section className="relative w-full h-[85vh] md:h-screen overflow-hidden bg-[#2D2D2A]">
            {/* Slides with AnimatePresence for smoother transitions */}
            <AnimatePresence initial={false}>
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={heroImages[current]}
                        alt={`Hero Image ${current + 1}`}
                        fill
                        sizes="100vw"
                        priority
                        className="object-cover object-center grayscale-[0.1] contrast-[1.1]"
                    />
                    {/* Professional Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-20" />
                </motion.div>
            </AnimatePresence>

            {/* Content Container */}
            <div className="relative z-30 h-full flex flex-col justify-center items-center text-center px-6 max-w-5xl mx-auto">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <span className="block text-white/70 tracking-[0.4em] uppercase text-xs md:text-sm mb-6 font-light">
                        Handcrafted in Bali
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-extralight tracking-tight mb-8 text-white leading-[1.1]">
                        {t("title")}
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 1 }}
                    className="max-w-2xl mx-auto"
                >
                    <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed mb-12 tracking-wide font-sans">
                        {t("description")}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 1 }}
                    className="flex flex-col sm:flex-row gap-6"
                >
                    <Link
                        href="/products"
                        className="group relative px-10 py-4 bg-white text-black font-medium tracking-[0.2em] uppercase text-xs overflow-hidden transition-all duration-500 hover:text-white"
                    >
                        <span className="relative z-10">{t("cta")}</span>
                        <div className="absolute inset-0 bg-[#507c59] translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-white/50"
            >
                <span className="text-[10px] uppercase tracking-[0.3em] font-light">Scroll Explore</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <ArrowDown className="w-5 h-5 stroke-1" />
                </motion.div>
            </motion.div>

            {/* Slide Indicators */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-4">
                {heroImages.map((img, i) => (
                    <button
                        key={`${img}-${i}`}
                        onClick={() => setCurrent(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                            i === current ? "bg-white h-8" : "bg-white/30 hover:bg-white/50"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
};
