"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

interface FilterBarProps {
  totalItems: number;
  sort: string;
  sortOrder: "Asc" | "Desc";
  category: string;
  material: string;
}

export const FilterBar = ({
  totalItems,
  sort,
  sortOrder,
  category,
  material,
}: FilterBarProps) => {
    const t = useTranslations("Pages.Products");
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateFilters = (updates: Record<string, string>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(updates).forEach(([name, value]) => {
            params.set(name, value);
        });
        params.set("page", "1"); // Reset to page 1 on filter change
        router.push(`${pathname}?${params.toString()}`);
    };


    return (


    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-16 border-y border-gray-200 py-6">
      <p className="text-sm text-gray-500">
        {t("showing")} {totalItems} {t("items")}
      </p>

      <div className="flex flex-wrap gap-12 text-sm">
        {/* Sort */}
        <FilterSelect
          label={t("sort")}
          value={`${sort}:${sortOrder}`}
          onChange={(v) => {
            const [field, order] = v.split(":");
            updateFilters({ sort: field, sort_order: order });
          }}
          options={[
            { value: "created_at:Desc", label: t("newest") },
            { value: "price:Asc", label: t("lowToHigh") },
            { value: "price:Desc", label: t("highToLow") },
          ]}
        />


        {/* Category */}
        <FilterSelect
          label={t("category")}
          value={category}
          onChange={(v) => updateFilters({ category: v })}
          options={[
            { value: "all", label: t("all") },
            { value: "bags", label: t("bags") },
            { value: "wallets", label: t("wallets") },
            { value: "accessories", label: t("accessories") },
          ]}
        />

        {/* Material */}
        <FilterSelect
          label={t("material")}
          value={material}
          onChange={(v) => updateFilters({ material: v })}
          options={[
            { value: "all", label: t("all") },
            { value: "fullgrain", label: "Full Grain" },
            { value: "crazyhorse", label: "Crazy Horse" },
            { value: "suede", label: "Suede" },
            { value: "vegan", label: "Vegan Leather" },
          ]}
        />

      </div>
    </div>
  );
};

function FilterSelect({
  label,
  value,
  onChange,
  options,
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
