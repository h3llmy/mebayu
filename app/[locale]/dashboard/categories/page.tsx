
"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/table";
import { CategoryService } from "@/lib/service/category/categoryService";
import { Category } from "@/lib/service/category/categoryModel";
import { useSearchParams } from "next/navigation";
import { RedirectButton } from "@/components/button";
import { Link } from "@/i18n/routing";

export default function CategoryPage() {
    const searchParams = useSearchParams();
    const [data, setData] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
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

                const result = await CategoryService.getAll({
                    page,
                    limit,
                    search,
                    sort,
                    sort_order,
                });

                setData(result.data);
                setTotal(result.total_data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [searchParams, refreshNonce]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this category?")) return;
        try {
            await CategoryService.delete(id);
            setRefreshNonce((n) => n + 1);
        } catch (error) {
            console.error("Failed to delete category:", error);
            alert("Failed to delete category");
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Product Categories</h1>
                    <p className="text-gray-500 dark:text-gray-400">Organize your products into logical sections.</p>
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
                    { header: "Created At", accessor: "created_at", sortable: true, render: (value) => new Date(value).toLocaleString() },
                    {
                        header: "Actions",
                        accessor: "id",
                        render: (id) => (
                            <div className="flex items-center gap-3">
                                <Link
                                    href={`/dashboard/categories/${id}/detail`}
                                    className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                                >
                                    Detail
                                </Link>
                                <Link
                                    href={`/dashboard/categories/${id}`}
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
                        onClick: (rows) => alert(`Deleting ${rows.length} categories`),
                    }
                ]}
            />
        </div>
    );
}
