import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface Props {
  productName: string;
}

export const ProductBreadcrumb = ({ productName }: Props) => {
  const t = useTranslations("Pages.ProductDetail");

  return (
    <div className="mb-10 text-sm text-gray-500">
      <Link href="/products" className="hover:text-[#507c59]">
        {t("Products")}
      </Link>
      <span className="mx-2">/</span>
      <span className="text-[#2D2D2A]">{productName}</span>
    </div>
  );
};
