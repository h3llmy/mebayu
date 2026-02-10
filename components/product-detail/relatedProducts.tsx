import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const RelatedProducts = () => {
  const t = useTranslations("Pages.ProductDetail");

  return (
    <div className="mt-24 border-t border-gray-200 pt-16 text-center">
      <h3 className="text-2xl font-light text-[#2D2D2A] mb-6">
        {t("YouMayAlsoLike")}
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((item) => (
          <Link key={item} href={`../products/${item}`} className="group">
            <div className="relative w-full aspect-[3/4] bg-white overflow-hidden">
              <Image
                src="/hero-1.png"
                alt="Related"
                fill
                className="object-cover group-hover:scale-105 transition"
              />
            </div>
            <p className="mt-4 text-sm text-[#2D2D2A]">
              Leather Bag {item}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
