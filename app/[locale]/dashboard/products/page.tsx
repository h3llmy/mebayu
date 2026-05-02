"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/organisms/DataTable/dataTable";
import { useSearchParams } from "next/navigation";
import { RedirectButton } from "@/components/molecules/RedirectButton";
import { Link } from "@/i18n/routing";
import { Category, Product, ProductService } from "@/lib/service/product";

export default function ProductPage() {
    const searchParams = useSearchParams();
    const [data, setData] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // We fetch ALL data for client-side pagination as requested by "pretend like fetch an api" 
    // but keeping the current DataTable logic which handles filtering/sorting/paging internally 
    // for simplicity unless server-side is specifically required.
    // However, the user said "pretend like fetch an api", so I should probably fetch 
    // when params change if I want to "pretend" better.

    const [total, setTotal] = useState(0);
    const [refreshNonce, setRefreshNonce] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const page = Number(searchParams.get("page")) || 1;
                const limit = Number(searchParams.get("limit")) || 10;
                const search = searchParams.get("q") || "";
                const sort = searchParams.get("sort") || undefined;
                const sort_order = (searchParams.get("sort_order") as "Asc" | "Desc") || "Asc";

                const result = await ProductService.getAllPagination({
                    page,
                    limit,
                    search,
                    sort,
                    sort_order,
                });

                setData(result.data);
                setTotal(result.total_data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [searchParams, refreshNonce]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            await ProductService.delete(id);
            setRefreshNonce((n) => n + 1);
        } catch (error) {
            console.error("Failed to delete product:", error);
            alert("Failed to delete product");
        }
    };

    return (
        <div className="px-4 md:px-6 py-6 transition-all duration-300">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Product Dashboard</h1>
                    <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">Manage your product inventory and prices.</p>
                </div>
                <div className="shrink-0 transition-transform active:scale-95">
                    <RedirectButton href="/dashboard/products/create" label="Create Product" className="w-full sm:w-auto" />
                </div>
            </div>

            <DataTable
                isLoading={isLoading}
                totalItems={total}
                columns={[
                    { header: "Name", accessor: "translations.0.name", sortable: true },
                    { header: "Price", accessor: "price", sortable: true },
                    {
                        header: "Categories", accessor: "product_categories", sortable: true, render: (value) => {
                            return value?.map((item: Category) => item.translations.map((item: any) => item.name).join(", "))
                        }
                    },
                    { header: "Materials", accessor: "product_materials", sortable: true, render: (value) => value?.map((item: any) => item.translations.map((item: any) => item.name).join(", ")) },
                    { header: "Foundations", accessor: "product_foundations", sortable: true, render: (value) => value?.map((item: any) => item.translations.map((item: any) => item.name).join(", ")) },
                    {
                        header: "Actions",
                        accessor: "id",
                        sortable: false,
                        render: (id) => (
                            <div className="flex gap-3">
                                <Link
                                    href={`/dashboard/products/${id}/detail`}
                                    className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                                >
                                    Detail
                                </Link>
                                <Link
                                    href={`/dashboard/products/${id}`}
                                    className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(id as string)}
                                    className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        )
                    }
                ]}
                data={data}
                bulkActions={[
                    {
                        label: "Delete Selected",
                        onClick: (rows) => alert(`Deleting ${rows.length} items`),
                    },
                    {
                        label: "Export CSV",
                        onClick: (rows) => console.log("Exporting:", rows),
                    },
                ]}
            />
        </div>
    );
}