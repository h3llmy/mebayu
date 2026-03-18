"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { Locale } from "@/types";


export const Navbar = () => {
    const t = useTranslations("Components.Navbar");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleLocale = () => {
        const nextLocale = locale === Locale.EN ? Locale.ID : Locale.EN;
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <header 
            className={`w-full fixed top-0 z-50 transition-all duration-500 flex items-center ${
                scrolled || open
                ? "bg-[#2D2D2A]/95 backdrop-blur-md text-white shadow-sm h-16 md:h-20" 
                : "bg-transparent text-white h-20 md:h-24"
            }`}
        >
            <div className="relative z-50 w-full max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">

                {/* Logo with better vertical centering */}
                <Link href="/" className="flex items-center">
                    <div className={`transition-all duration-500 overflow-hidden flex items-center ${scrolled || open ? "scale-90" : "scale-100"}`}>
                        <Image
                            src="/app-logo.png"
                            alt="Mebayu Logo"
                            width={110}
                            height={35}
                            priority
                            className={`object-contain transition-all duration-500 brightness-0 invert`}
                        />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-10 text-[11px] tracking-[0.3em] font-bold uppercase">
                    {[
                        { name: t("about"), href: "/#about" },
                        { name: t("products"), href: "/#products" },
                        { name: t("login"), href: "/login" },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="relative group overflow-hidden"
                        >
                            <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                                {item.name}
                            </span>
                            <span className="absolute left-0 top-full block transition-transform duration-500 group-hover:-translate-y-full text-[#507c59]">
                                {item.name}
                            </span>
                        </Link>
                    ))}

                    {/* Locale Switcher */}
                    <button
                        onClick={toggleLocale}
                        className={`text-[10px] font-bold border px-3 py-1.5 rounded-full transition-all duration-300 hover:cursor-pointer ${
                            scrolled || open
                            ? "border-white/20 hover:bg-white hover:text-black" 
                            : "border-white/30 hover:bg-white hover:text-black"
                        }`}
                    >
                        {locale.toUpperCase()}
                    </button>
                </nav>

                {/* Hamburger (Custom Animated) - Re-aligned for precision */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center focus:outline-none z-50"
                    aria-label="Toggle Menu"
                >
                    <div className="relative w-6 h-5">
                        <span
                            className={`block absolute h-[1px] w-6 bg-current transform transition duration-500 ease-in-out ${
                                open ? "rotate-45 top-2" : "top-0"
                            } text-white`}
                        />
                        <span
                            className={`block absolute h-[1px] w-6 bg-current transform transition duration-500 ease-in-out top-2 ${
                                open ? "opacity-0" : "opacity-100"
                            } text-white`}
                        />
                        <span
                            className={`block absolute h-[1px] w-6 bg-current transform transition duration-500 ease-in-out ${
                                open ? "-rotate-45 top-2" : "top-4"
                            } text-white`}
                        />
                    </div>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`md:hidden absolute top-0 left-0 w-full h-screen bg-[#2D2D2A] z-40 transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${
                    open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
                }`}
            >
                <div className="flex flex-col items-center justify-center h-full gap-12 text-white uppercase tracking-[0.4em] text-sm font-bold">
                    <Link href="/#about" onClick={() => setOpen(false)} className="hover:text-[#507c59] transition-colors">
                        {t("about")}
                    </Link>
                    <div className="w-8 h-[1px] bg-white/10" />
                    <Link href="/#products" onClick={() => setOpen(false)} className="hover:text-[#507c59] transition-colors">
                        {t("products")}
                    </Link>
                    <div className="w-8 h-[1px] bg-white/10" />
                    <Link href="/login" onClick={() => setOpen(false)} className="hover:text-[#507c59] transition-colors">
                        {t("login")}
                    </Link>
                    
                    <div className="mt-8">
                        <button
                            onClick={() => {
                                toggleLocale();
                                setOpen(false);
                            }}
                            className="text-white border border-white/30 rounded-full px-6 py-2 text-[10px]"
                        >
                            Language: {locale.toUpperCase()}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};
