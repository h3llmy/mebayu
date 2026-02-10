import { useTranslations } from "next-intl";

export const ProductsHeader = () => {
  const t = useTranslations("Pages.Products");
  return (
    <div className="text-center mb-20">
      <h1 className="text-4xl md:text-5xl font-light tracking-wide text-[#2D2D2A]">
        {t("title")}
      </h1>
      <div className="w-16 h-[1px] bg-[#507c59] mx-auto mt-6" />
      <p className="mt-6 text-gray-500 max-w-xl mx-auto">
        {t("description")}
      </p>
    </div>
  );
};
