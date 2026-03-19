"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const ProductCard = ({ product }: {
    product: {
        id: string | number;
        name: string;
        description?: string;
        price: string | number;
        image: string;
    }
}) => {
    const t = useTranslations("Pages.Home.Products");
    return (
        <Link
            href={`/products/${product.id}`}
            className="group block relative"
        >
            {/* Image Container with Hover Overlay */}
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm bg-[#f8f7f4] transition-all duration-700 ease-in-out group-hover:shadow-2xl z-0">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />

                {/* Visual Overlay on Hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-700 z-10 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="p-4 bg-white/90 backdrop-blur-md rounded-full text-black shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                    >
                        <ArrowRight className="w-6 h-6" />
                    </motion.div>
                </div>
            </div>

            {/* Premium Content Layout */}
            <div className="mt-8 space-y-3 px-1 text-center sm:text-left transition-transform duration-500 group-hover:translate-x-1">
                <h3 className="text-lg font-light tracking-tight text-[#2D2D2A] transition-colors duration-300">
                    {product.name}
                </h3>

                <p className="text-xs text-gray-400 tracking-[0.1em] font-light italic truncate">
                    {product.description}
                </p>

                <div className="flex items-center justify-center sm:justify-start gap-3">
                    <p className="text-sm font-semibold text-[#507c59] tracking-tighter">
                        {product.price}
                    </p>
                    <div className="w-[30px] h-[1px] bg-black/10 group-hover:w-[60px] transition-all duration-700" />
                </div>
            </div>
        </Link>
    );
};