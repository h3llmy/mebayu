import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Product } from "@/lib/service/product";

interface RelatedProductsProps {
  products: Product[];
}

export const RelatedProducts = ({ products }: RelatedProductsProps) => {
  const t = useTranslations("Pages.ProductDetail");

  if (!products || products.length === 0) return null;

  return (
    <div className="mt-24 border-t border-gray-200 pt-16 text-center">
      <h3 className="text-2xl font-light text-[#2D2D2A] mb-6">
        {t("YouMayAlsoLike")}
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`} className="group text-left">
            <div className="relative w-full aspect-[3/4] bg-white overflow-hidden">
              <Image
                src={product.images?.[0]?.url || "/hero-1.png"}
                alt={product.translations?.[0]?.name || "Related"}
                fill
                className="object-cover group-hover:scale-105 transition"
              />
            </div>
            <p className="mt-4 text-sm text-[#2D2D2A] font-medium truncate">
              {product.translations?.[0]?.name || "Product"}
            </p>
            <p className="mt-1 text-xs text-gray-500">
               Rp {product.price.toLocaleString('id-ID')}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
