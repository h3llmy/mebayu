import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/ui/fade-in";

export const AboutSection = () => {
    const t = useTranslations("Pages.Home.About");
    return (
        <section
            id="about"
            className="bg-white py-24 px-6 overflow-hidden"
        >
            <div className="max-w-5xl mx-auto text-center">
                <FadeIn direction="up" delay={0.2} duration={0.8}>
                    <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6 text-[#2D2D2A]">
                        {t("title")}
                    </h2>
                </FadeIn>
                
                <FadeIn direction="up" delay={0.4} duration={0.8}>
                    <div className="text-gray-600 leading-relaxed max-w-2xl mx-auto space-y-4">
                        <p>{t("p1")}</p>
                        <p>{t("p2")}</p>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}