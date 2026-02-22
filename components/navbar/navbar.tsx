"use client";

import { useState } from "react";
import Image from "next/image";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";

export const Navbar = () => {
    const t = useTranslations("Components.Navbar");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const toggleLocale = () => {
        const nextLocale = locale === "en" ? "id" : "en";
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <header className="w-full bg-[#507c59]/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 md:px-8 h-16 md:h-20 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/app-logo.png"
                        alt="Mebayu Logo"
                        width={120}
                        height={40}
                        priority
                        className="object-contain"
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-12 text-sm tracking-[0.15em] uppercase">
                    <Link
                        href="/#about"
                        className="relative text-white/90 hover:text-white transition duration-300 group"
                    >
                        {t("about")}
                        <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                    </Link>
                    <Link
                        href="/#products"
                        className="relative text-white/90 hover:text-white transition duration-300 group"
                    >
                        {t("products")}
                        <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                    </Link>
                    <Link
                        href="/login"
                        className="relative text-white/90 hover:text-white transition duration-300 group"
                    >
                        {t("login")}
                        <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                    </Link>

                    {/* Locale Switcher */}
                    <button
                        onClick={toggleLocale}
                        className="text-white/80 hover:text-white text-xs font-medium border border-white/20 px-2 py-1 rounded hover:cursor-pointer"
                    >
                        {locale.toUpperCase()}
                    </button>
                </nav>

                {/* Hamburger */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden flex flex-col gap-1.5"
                >
                    <span
                        className={`w-6 h-[2px] bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-[6px]" : ""
                            }`}
                    />
                    <span
                        className={`w-6 h-[2px] bg-white transition-all duration-300 ${open ? "opacity-0" : ""
                            }`}
                    />
                    <span
                        className={`w-6 h-[2px] bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-[6px]" : ""
                            }`}
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden transition-all duration-500 ease-in-out ${open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                    } overflow-hidden bg-[#507c59]/95 backdrop-blur-md`}
            >
                <div className="flex flex-col items-center gap-6 py-6 text-white uppercase tracking-widest text-sm">
                    <Link href="/#about" onClick={() => setOpen(false)}>
                        {t("about")}
                    </Link>
                    <Link href="/#products" onClick={() => setOpen(false)}>
                        {t("products")}
                    </Link>
                    <Link href="/login" onClick={() => setOpen(false)}>
                        {t("login")}
                    </Link>
                    <button
                        onClick={() => {
                            toggleLocale();
                            setOpen(false);
                        }}
                        className="text-white/80 hover:cursor-pointer"
                    >
                        Language: {locale.toUpperCase()}
                    </button>
                </div>
            </div>
        </header>
    );
};
