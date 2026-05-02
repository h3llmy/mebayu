"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/organisms/DataTable/dataTable";
import { MaterialService } from "@/lib/service/material/materialService";
import { Material } from "@/lib/service/material/materialModel";
import { useSearchParams } from "next/navigation";
import { RedirectButton } from "@/components/molecules/RedirectButton";
import { Link } from "@/i18n/routing";

export default function MaterialPage() {
    const searchParams = useSearchParams();
    const [data, setData] = useState<Material[]>([]);
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

                const result = await MaterialService.getAll({
                    page,
                    limit,
                    search,
                    sort,
                    sort_order,
                });

                setData(result.data);
                setTotal(result.total_data);
            } catch (error) {
                console.error("Failed to fetch materials:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [searchParams, refreshNonce]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this material?")) return;
        try {
            await MaterialService.delete(id);
            setRefreshNonce((n) => n + 1);
        } catch (error) {
            console.error("Failed to delete material:", error);
            alert("Failed to delete material");
        }
    };

    return (
        <div className="px-4 md:px-6 py-6 transition-all duration-300">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Product Materials</h1>
                    <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">Manage materials used in your products.</p>
                </div>
                <div className="shrink-0 transition-transform active:scale-95">
                    <RedirectButton href="/dashboard/materials/create" label="Add Material" className="w-full sm:w-auto" />
                </div>
            </div>

            <DataTable
                isLoading={isLoading}
                totalItems={total}
                columns={[
                    { header: "Name", accessor: "translations.0.name", sortable: true },
                    { header: "Created At", accessor: "created_at", sortable: true, render: (value) => new Date(value).toLocaleString() },
                    {
                        header: "Actions",
                        accessor: "id",
                        render: (id) => (
                            <div className="flex items-center gap-3">
                                <Link
                                    href={`/dashboard/materials/${id}/detail`}
                                    className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                                >
                                    Detail
                                </Link>
                                <Link
                                    href={`/dashboard/materials/${id}`}
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
                        onClick: (rows) => alert(`Deleting ${rows.length} materials`),
                    }
                ]}
            />
        </div>
    );
}
