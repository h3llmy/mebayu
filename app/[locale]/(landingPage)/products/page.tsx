"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ProductsHeader,
  FilterBar,
  ProductGrid,
  Pagination,
} from "@/components/products";

export default function Page() {
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
        <ProductsHeader />

        <FilterBar
          totalItems={paginatedProducts.length}
          sort={sort}
          setSort={setSort}
          setPage={setPage}
          category={category}
          setCategory={setCategory}
          material={material}
          setMaterial={setMaterial}
        />

        <ProductGrid products={paginatedProducts} />

        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </section>
  );
}
