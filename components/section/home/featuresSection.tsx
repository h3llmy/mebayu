"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/ui/fade-in";
import { Leaf, Award, Recycle, ShieldCheck } from "lucide-react";

export const FeaturesSection = () => {
    const t = useTranslations("Pages.Home.Features");

    const features = [
        {
            icon: <Recycle className="w-8 h-8" />,
            title: t("sustainable.title"),
            desc: t("sustainable.desc"),
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: t("handcrafted.title"),
            desc: t("handcrafted.desc"),
        },
        {
            icon: <Leaf className="w-8 h-8" />,
            title: t("timeless.title"),
            desc: t("timeless.desc"),
        },
        {
            icon: <ShieldCheck className="w-8 h-8" />,
            title: t("guarantee.title"),
            desc: t("guarantee.desc"),
        },
    ];

    return (
        <section className="bg-white py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <FadeIn direction="up">
                        <h2 className="text-3xl md:text-5xl font-light tracking-widest text-[#2D2D2A] uppercase">
                            {t("title")}
                        </h2>
                        <div className="w-20 h-[1px] bg-[#507c59] mx-auto mt-6" />
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {features.map((feature, index) => (
                        <FadeIn 
                            key={index} 
                            direction="up" 
                            delay={0.1 * index}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="mb-6 p-5 rounded-full bg-[#f8f7f4] text-[#507c59] transition-transform duration-500 group-hover:scale-110 group-hover:bg-[#507c59] group-hover:text-white">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-medium mb-3 text-[#2D2D2A]">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed text-sm max-w-[250px]">
                                {feature.desc}
                            </p>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};
