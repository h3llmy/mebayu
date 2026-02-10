import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface Product {
  name: string;
  price: string;
  category: string;
  material: string;
  description: string;
}

interface Props {
  product: Product;
}

export const ProductInfo = ({ product }: Props) => {
  const t = useTranslations("Pages.ProductDetail");

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl md:text-4xl font-light tracking-wide text-[#2D2D2A]">
        {product.name}
      </h1>

      <p className="mt-4 text-2xl font-medium text-[#507c59]">
        {product.price}
      </p>

      {/* Tags */}
      <div className="flex gap-4 mt-6 text-xs uppercase tracking-widest text-gray-500">
        <span className="border border-gray-300 px-3 py-1">
          {product.category}
        </span>
        <span className="border border-gray-300 px-3 py-1">
          {product.material}
        </span>
      </div>

      {/* Description */}
      <div className="mt-10">
        <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-4">
          {t("Description")}
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-12 flex flex-col sm:flex-row gap-4">
        <a
          href={`https://wa.me/62817085750446?text=Hello, I'm interested in ${product.name}`}
          target="_blank"
          className="px-8 py-3 bg-[#507c59] text-white text-sm tracking-widest uppercase text-center hover:bg-[#466e4e] transition"
        >
          {t("Order")}
        </a>

        <Link
          href="/products"
          className="px-8 py-3 border border-[#507c59] text-[#507c59] text-sm tracking-widest uppercase text-center hover:bg-[#507c59] hover:text-white transition"
        >
          {t("BackToProducts")}
        </Link>
      </div>
    </div>
  );
};
