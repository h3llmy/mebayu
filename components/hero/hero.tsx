"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = ["/hero-2.png", "/hero-1.png"];

export const Hero = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full min-h-[70vh] md:min-h-screen overflow-hidden">
            {/* Slides */}
            {images.map((img, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                >
                    <Image
                        src={img}
                        alt={`Hero ${index}`}
                        fill
                        priority={index === 0}
                        sizes="100vw"
                        className="object-cover object-center"
                    />
                </div>
            ))}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 z-20" />

            {/* Content */}
            <div className="relative z-30 min-h-[70vh] md:min-h-screen flex flex-col justify-center items-center text-center text-white px-6">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-light tracking-wide mb-6">
                    Crafted in Bali
                </h1>
                <p className="text-base sm:text-lg md:text-xl max-w-xl mb-8">
                    Timeless leather pieces shaped with purpose and precision.
                </p>
                <a
                    href="#products"
                    className="px-6 sm:px-8 py-3 bg-white text-black rounded-sm
                     hover:bg-[#6F8F6B] hover:text-white
                     transition duration-300"
                >
                    Explore Collection
                </a>
            </div>
        </section>
    );
};
