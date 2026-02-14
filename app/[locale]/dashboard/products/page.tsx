"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/table";
import { fetchProducts, type Product } from "@/lib/mockApi";
import { useSearchParams } from "next/navigation";
import { RedirectButton } from "@/components/button";
import { Link } from "@/i18n/routing";

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

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const page = Number(searchParams.get("page")) || 1;
                const limit = Number(searchParams.get("limit")) || 10;
                const search = searchParams.get("q") || "";
                const sort = searchParams.get("sort") || undefined;
                const dir = (searchParams.get("dir") as "asc" | "desc") || "asc";

                const result = await fetchProducts({
                    page,
                    limit,
                    search,
                    sort,
                    dir,
                });
                setData(result.items);
                setTotal(result.total);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [searchParams]);

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Product Dashboard</h1>
                    <p className="text-gray-500">Manage your product inventory and prices.</p>
                </div>
                <div>
                    <RedirectButton href="/dashboard/products/create" label="Create Product" />
                </div>
            </div>

            <DataTable
                isLoading={isLoading}
                totalItems={total}
                columns={[
                    { header: "Name", accessor: "name", sortable: true },
                    { header: "Category", accessor: "category", sortable: true },
                    { header: "Material", accessor: "material", sortable: true },
                    { 
                        header: "Price", 
                        accessor: "price", 
                        sortable: true,
                        render: (value) => new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                        }).format(value)
                    },
                    {
                        header: "Actions",
                        accessor: "id",
                        render: (id) => (
                            <Link
                                href={`/dashboard/products/${id}`}
                                className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                            >
                                Edit
                            </Link>
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