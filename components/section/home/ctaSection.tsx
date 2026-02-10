import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/ui/fade-in";

export const CtaSection = () => {
    const t = useTranslations("Pages.Home.Cta");
    return (
        <section className="bg-[#507c59] text-white py-20 px-6 text-center overflow-hidden">
            <FadeIn direction="up" delay={0.2}>
                <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6">
                    {t("title")}
                </h2>
                <p className="max-w-xl mx-auto text-white/80 mb-8">
                    {t("description")}
                </p>
                <a
                    href="https://www.instagram.com/mebayu.idn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 border border-white hover:bg-white hover:text-[#507c59] transition duration-300 uppercase tracking-widest text-sm"
                >
                    {t("cta")}
                </a>
            </FadeIn>
        </section>
    )
}