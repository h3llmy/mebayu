import { ProductsHeader } from "@/components/molecules/ProductsHeader";
import { FilterBar } from "@/components/organisms/FilterBar";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { Pagination } from "@/components/molecules/Pagination";
import { ProductService } from "@/lib/service/product";
import { CategoryService } from "@/lib/service/category/categoryService";
import { MaterialService } from "@/lib/service/material/materialService";
import { FoundationService } from "@/lib/service/foundation/foundationService";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: Props) {
  const resolvedParams = await searchParams;

  const page = Number(resolvedParams.page) || 1;
  const sort = (resolvedParams.sort as string) || "created_at";
  const sortOrder = (resolvedParams.sort_order as "Asc" | "Desc") || "Desc";

  const category = (resolvedParams.category as string) || "all";
  const material = (resolvedParams.material as string) || "all";
  const foundation = (resolvedParams.foundation as string) || "all";

  const productsPerPage = 8;

  const [productsResponse, categoriesResponse, materialsResponse, foundationsResponse] = await Promise.all([
    ProductService.getAllPagination({
      page,
      limit: productsPerPage,
      sort,
      sort_order: sortOrder,
      category_id: category !== "all" ? category : undefined,
      material_id: material !== "all" ? material : undefined,
      foundation_id: foundation !== "all" ? foundation : undefined,
    }),
    CategoryService.getAll({ page: 1, limit: 100 }),
    MaterialService.getAll({ page: 1, limit: 100 }),
    FoundationService.getAll({ page: 1, limit: 100 }),
  ]);


  const products = productsResponse?.data || [];
  const totalPages = productsResponse?.total_page || 1;
  const totalData = productsResponse?.total_data || 0;

  const categories = categoriesResponse?.data || [];
  const materials = materialsResponse?.data || [];
  const foundations = foundationsResponse?.data || [];

  return (
    <section className="bg-[#f8f7f4] min-h-screen py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <ProductsHeader />

        <FilterBar
          totalItems={totalData}
          sort={sort}
          sortOrder={sortOrder}
          category={category}
          material={material}
          foundation={foundation}
          categories={categories}
          materials={materials}
          foundations={foundations}
        />


        <ProductGrid products={products} />

        <Pagination
          page={page}
          totalPages={totalPages}
        />
      </div>
    </section>
  );
}

