import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const ProductCard = ({ product }: { product: any }) => {
    const t = useTranslations("Pages.Home.Products");
    return (
        <Link
            href={`/products/${product.id}`}
            className="group block"
        >
            {/* Image */}
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-md bg-white shadow-sm">
                <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition duration-500" />
            </div>

            {/* Content */}
            <div className="mt-6 space-y-2">
                <h3 className="text-base font-medium tracking-wide text-[#2D2D2A] group-hover:text-[#507c59] transition">
                {product.name}
                </h3>

                <p className="text-sm text-gray-500">
                {product.description}
                </p>

                <p className="text-sm font-semibold text-[#507c59]">
                {product.price}
                </p>

                <div className="relative w-fit mt-2">
                <span className="text-xs uppercase tracking-widest text-gray-600">
                    {t("viewDetails")}
                </span>
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#507c59] transition-all duration-300 group-hover:w-full" />
                </div>
            </div>
        </Link>
    );
};