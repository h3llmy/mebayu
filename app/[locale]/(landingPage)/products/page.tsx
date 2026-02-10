"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useTranslations,
  useLocale
} from "next-intl";
import {
  useRouter,
  useSearchParams,
  usePathname
} from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/card";
import { FadeIn } from "@/components/ui/fade-in";

export default function Page() {
  const t = useTranslations("Pages.Products");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ----- READ FROM URL -----
  const pageParam = searchParams.get("page") || "1";
  const sortParam = searchParams.get("sort") || "newest";
  const categoryParam = searchParams.get("category") || "all";
  const materialParam = searchParams.get("material") || "all";

  const [page, setPage] = useState(Number(pageParam));
  const [sort, setSort] = useState(sortParam);
  const [category, setCategory] = useState(categoryParam);
  const [material, setMaterial] = useState(materialParam);

  // ----- MOCK DATA -----
  const allProducts = Array.from({ length: 48 }).map((_, i) => ({
    id: i + 1,
    name: `Leather Bag ${i + 1}`,
    price: "Rp 1.250.000",
    image: "/hero-1.png",
    description: "Handmade in Bali",
  }));
  const productsPerPage = 8;

  const totalPages = Math.ceil(allProducts.length / productsPerPage);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * productsPerPage;
    return allProducts.slice(start, start + productsPerPage);
  }, [page]);

  // ----- UPDATE URL WHEN FILTER CHANGES -----
  useEffect(() => {
    const params = new URLSearchParams();

    if (page > 1) params.set("page", String(page));
    if (sort !== "newest") params.set("sort", sort);
    if (category !== "all") params.set("category", category);
    if (material !== "all") params.set("material", material);

    router.push(`${pathname}?${params.toString()}`);
  }, [page, sort, category, material]);

  return (
    <section className="bg-[#f8f7f4] min-h-screen py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-light tracking-wide text-[#2D2D2A]">
            {t("title")}
          </h1>
          <div className="w-16 h-[1px] bg-[#507c59] mx-auto mt-6" />
          <p className="mt-6 text-gray-500 max-w-xl mx-auto">
            {t("description")}
          </p>
        </div>

        {/* FILTER BAR */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-16 border-y border-gray-200 py-6">

          <p className="text-sm text-gray-500">
            {t("showing")} {paginatedProducts.length} {t("items")}
          </p>

          <div className="flex flex-wrap gap-12 text-sm">

            {/* Sort */}
            <FilterSelect
              label={t("sort")}
              value={sort}
              onChange={(v) => {
                setSort(v);
                setPage(1);
              }}
              options={[
                { value: "newest", label: t("newest") },
                { value: "low", label: t("lowToHigh") },
                { value: "high", label: t("highToLow") }
              ]}
            />

            {/* Category */}
            <FilterSelect
              label={t("category")}
              value={category}
              onChange={(v) => {
                setCategory(v);
                setPage(1);
              }}
              options={[
                { value: "all", label: t("all") },
                { value: "bags", label: t("bags") },
                { value: "wallets", label: t("wallets") },
                { value: "accessories", label: t("accessories") }
              ]}
            />

            {/* Material */}
            <FilterSelect
              label={t("material")}
              value={material}
              onChange={(v) => {
                setMaterial(v);
                setPage(1);
              }}
              options={[
                { value: "all", label: t("all") },
                { value: "fullgrain", label: "Full Grain" },
                { value: "crazyhorse", label: "Crazy Horse" },
                { value: "suede", label: "Suede" },
                { value: "vegan", label: "Vegan Leather" }
              ]}
            />

          </div>
        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {paginatedProducts.map((product, index) => (
            <FadeIn
              key={product.id}
              direction="up"
              delay={0.1 * (index % 4)}
              duration={0.6}
            >
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-2 md:gap-4 mt-20 flex-wrap">

          {/* Prev */}
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-2 text-sm border border-gray-300 disabled:opacity-30"
          >
            ←
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNumber = i + 1;

            // Show limited pages on mobile
            const isMobileVisible =
              pageNumber === page ||
              pageNumber === page - 1 ||
              pageNumber === page + 1;

            const active = page === pageNumber;

            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`
                  px-3 py-2 text-sm
                  ${active ? "bg-[#507c59] text-white" : "border border-gray-300"}
                  ${isMobileVisible ? "inline-block" : "hidden md:inline-block"}
                `}
              >
                {pageNumber}
              </button>
            );
          })}

          {/* Next */}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-2 text-sm border border-gray-300 disabled:opacity-30"
          >
            →
          </button>

        </div>

      </div>
    </section>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="uppercase tracking-wider text-gray-500 text-xs">
        {label}
      </span>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-transparent border-b border-gray-300 focus:border-[#507c59] outline-none pr-6 py-1 text-[#2D2D2A] cursor-pointer"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <span className="absolute right-0 top-1 text-xs text-gray-400 pointer-events-none">
          ▼
        </span>
      </div>
    </div>
  );
}
