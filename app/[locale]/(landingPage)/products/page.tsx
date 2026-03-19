import {
  ProductsHeader,
  FilterBar,
  ProductGrid,
  Pagination,
} from "@/components/products";
import { ProductService } from "@/lib/service/product";
import { CategoryService } from "@/lib/service/category/categoryService";
import { MaterialService } from "@/lib/service/material/materialService";

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

  const productsPerPage = 8;

  const [productsResponse, categoriesResponse, materialsResponse] = await Promise.all([
    ProductService.getAllPagination({
      page,
      limit: productsPerPage,
      sort,
      sort_order: sortOrder,
      category_id: category !== "all" ? category : undefined,
      material_id: material !== "all" ? material : undefined,
    }),
    CategoryService.getAll({ page: 1, limit: 100 }),
    MaterialService.getAll({ page: 1, limit: 100 }),
  ]);


  const products = productsResponse?.data || [];
  const totalPages = productsResponse?.total_pages || 1;
  const totalData = productsResponse?.total_data || 0;

  const categories = categoriesResponse?.data || [];
  const materials = materialsResponse?.data || [];

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
          categories={categories}
          materials={materials}
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

