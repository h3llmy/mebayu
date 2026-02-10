"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
    const [open, setOpen] = useState(false);

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
                    {["About", "Products"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="relative text-white/90 hover:text-white transition duration-300 group"
                        >
                            {item}
                            <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}

                    <a
                        href="https://www.instagram.com/mebayu.idn/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-white/40 text-white text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-[#507c59] transition duration-300"
                    >
                        Instagram
                    </a>
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
                className={`md:hidden transition-all duration-500 ease-in-out ${open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                    } overflow-hidden bg-[#507c59]/95 backdrop-blur-md`}
            >
                <div className="flex flex-col items-center gap-6 py-6 text-white uppercase tracking-widest text-sm">
                    <Link href="#about" onClick={() => setOpen(false)}>
                        About
                    </Link>
                    <Link href="#products" onClick={() => setOpen(false)}>
                        Products
                    </Link>
                    <a
                        href="https://www.instagram.com/mebayu.idn/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        className="border border-white/40 px-6 py-2"
                    >
                        Instagram
                    </a>
                </div>
            </div>
        </header>
    );
};
