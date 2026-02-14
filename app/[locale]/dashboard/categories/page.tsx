
"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/table";
import { fetchCategories, type Category } from "@/lib/mockApi";
import { useSearchParams } from "next/navigation";
import { RedirectButton } from "@/components/button";
import { Link } from "@/i18n/routing";

export default function CategoryPage() {
    const searchParams = useSearchParams();
    const [data, setData] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
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

                const result = await fetchCategories({
                    page,
                    limit,
                    search,
                    sort,
                    dir,
                });
                setData(result.items);
                setTotal(result.total);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
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
                    <h1 className="text-2xl font-bold text-gray-900">Product Categories</h1>
                    <p className="text-gray-500">Organize your products into logical sections.</p>
                </div>
                <div>
                    <RedirectButton href="/dashboard/categories/create" label="Add Category" />
                </div>
            </div>

            <DataTable
                isLoading={isLoading}
                totalItems={total}
                columns={[
                    { header: "Name", accessor: "name", sortable: true },
                    { header: "Description", accessor: "description" },
                    { 
                        header: "Products", 
                        accessor: "productCount", 
                        sortable: true,
                        render: (val) => (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {val} products
                            </span>
                        )
                    },
                    { 
                        header: "Status", 
                        accessor: "isActive",
                        render: (active) => (
                            <div className="flex items-center gap-1.5">
                                <div className={`w-2 h-2 rounded-full ${active ? "bg-green-500" : "bg-gray-300"}`} />
                                <span className="text-sm text-gray-600">{active ? "Active" : "Inactive"}</span>
                            </div>
                        )
                    },
                    {
                        header: "Actions",
                        accessor: "id",
                        render: (id) => (
                            <div className="flex items-center gap-3">
                                <Link
                                    href={`/dashboard/categories/${id}`}
                                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                                >
                                    Edit
                                </Link>
                            </div>
                        )
                    }
                ]}
                data={data}
                bulkActions={[
                    {
                        label: "Delete Selected",
                        onClick: (rows) => alert(`Deleting ${rows.length} categories`),
                    }
                ]}
            />
        </div>
    );
}
