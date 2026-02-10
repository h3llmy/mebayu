import Image from "next/image";
import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/ui/fade-in";

export const AboutSection = () => {
    const t = useTranslations("Pages.Home.About");

    return (
        <section
            id="about"
            className="bg-[#F9F7F4] py-24 px-6"
        >
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                
                {/* Image */}
                <FadeIn direction="left" delay={0.2} duration={0.8}>
                    <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
                        <Image
                            src="/hero-2.png" // replace with workshop or leather image
                            alt="Craftsmanship"
                            fill
                            className="object-cover"
                        />
                    </div>
                </FadeIn>

                {/* Content */}
                <FadeIn direction="right" delay={0.3} duration={0.8}>
                    <div>
                        <h2 className="text-3xl md:text-4xl font-semibold tracking-wide mb-6 text-[#2D2D2A]">
                            {t("title")}
                        </h2>

                        <div className="text-gray-600 leading-relaxed space-y-5 text-lg">
                            <p>{t("p1")}</p>
                            <p>{t("p2")}</p>
                        </div>

                        <div className="mt-8">
                            <span className="inline-block w-16 h-[2px] bg-[#6F8F6B]" />
                        </div>
                    </div>
                </FadeIn>

            </div>
        </section>
    );
};
