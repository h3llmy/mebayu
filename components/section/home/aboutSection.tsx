import { useTranslations } from "next-intl";

export const AboutSection = () => {
    const t = useTranslations("Pages.Home.About");
    return (
        <section
            id="about"
            className="bg-white py-24 px-6"
        >
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6 text-[#2D2D2A]">
                    {t("title")}
                </h2>
                <div className="text-gray-600 leading-relaxed max-w-2xl mx-auto space-y-4">
                    <p>{t("p1")}</p>
                    <p>{t("p2")}</p>
                </div>
            </div>
        </section>
    );
}