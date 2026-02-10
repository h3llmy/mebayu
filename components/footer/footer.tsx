import { useTranslations } from "next-intl";
import Link from "next/link";

export const Footer = () => {
    const t = useTranslations("Components.Footer");
    return (
        <footer className="bg-[#507c59] text-white">
            <div className="max-w-6xl mx-auto px-6 md:px-8 py-14">

                {/* Top Section */}
                <div className="grid md:grid-cols-3 gap-10 border-b border-white/10 pb-10">

                    {/* Brand */}
                    <div>
                        <h2 className="text-lg tracking-[0.25em] uppercase mb-4">
                            Mebayu
                        </h2>
                        <p className="text-white/70 text-sm leading-relaxed max-w-sm">
                            {t("description")}
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-sm tracking-[0.25em] uppercase mb-4">
                            {t("explore")}
                        </h3>
                        <div className="flex flex-col gap-3 text-sm text-white/70">
                            <Link href="#about" className="hover:text-white transition">
                                {t("about")}
                            </Link>
                            <Link href="#products" className="hover:text-white transition">
                                {t("products")}
                            </Link>
                            <a
                                href="https://www.instagram.com/mebayu.idn/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition"
                            >
                                Instagram
                            </a>
                        </div>
                    </div>

                    {/* Contact / Social */}
                    <div>
                        <h3 className="text-sm tracking-[0.25em] uppercase mb-4">
                            {t("connect")}
                        </h3>
                        <p className="text-white/70 text-sm mb-3">
                            Bali, Indonesia
                        </p>
                        <a
                            href="mailto:hello@mebayu.com"
                            className="text-white/70 text-sm hover:text-white transition"
                        >
                            hello@mebayu.com
                        </a>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-6 text-center text-xs tracking-widest text-white/50">
                    © {new Date().getFullYear()} Mebayu. All rights reserved.
                </div>
            </div>
        </footer>
    );
};
