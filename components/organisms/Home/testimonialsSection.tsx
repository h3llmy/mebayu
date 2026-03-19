"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "../../atoms/FadeIn";
import { Quote } from "lucide-react";

export const TestimonialsSection = () => {
    const t = useTranslations("Pages.Home.Testimonials");

    const testimonials = ["t1", "t2", "t3"];

    return (
        <section className="bg-gradient-to-tr from-[#f8f7f4] to-white py-24 px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <FadeIn direction="up">
                        <Quote className="w-12 h-12 text-[#507c59] mx-auto opacity-20 mb-6" />
                        <h2 className="text-3xl md:text-5xl font-light tracking-wide text-[#2D2D2A]">
                            {t("title")}
                        </h2>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {testimonials.map((id, index) => (
                        <FadeIn 
                            key={id} 
                            direction="up" 
                            delay={0.2 * index}
                            className="relative p-10 bg-white/50 backdrop-blur-sm border border-black/[0.03] shadow-sm rounded-lg hover:shadow-md transition-shadow duration-300"
                        >
                            <p className="text-gray-600 italic leading-loose mb-10 text-lg">
                                &ldquo;{t(`${id}.text`)}&rdquo;
                            </p>
                            
                            <div className="mt-auto pt-6 border-t border-black/5 flex items-center justify-between">
                                <div>
                                    <h4 className="font-semibold text-[#2D2D2A] tracking-wider">
                                        {t(`${id}.author`)}
                                    </h4>
                                    <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mt-1 font-light">
                                        {t(`${id}.role`)}
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};
