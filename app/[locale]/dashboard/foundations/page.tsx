"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/organisms/DataTable/dataTable";
import { FoundationService } from "@/lib/service/foundation/foundationService";
import { Foundation } from "@/lib/service/foundation/foundationModel";
import { useSearchParams } from "next/navigation";
import { RedirectButton } from "@/components/molecules/RedirectButton";
import { Link } from "@/i18n/routing";

export default function FoundationPage() {
    const searchParams = useSearchParams();
    const [data, setData] = useState<Foundation[]>([]);
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

                const result = await FoundationService.getAll({
                    page,
                    limit,
                    search,
                    sort,
                    sort_order,
                });

                setData(result.data);
                setTotal(result.total_data);
            } catch (error) {
                console.error("Failed to fetch foundations:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [searchParams, refreshNonce]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this foundation?")) return;
        try {
            await FoundationService.delete(id);
            setRefreshNonce((n) => n + 1);
        } catch (error) {
            console.error("Failed to delete foundation:", error);
            alert("Failed to delete foundation");
        }
    };

    return (
        <div className="px-4 md:px-6 py-6 transition-all duration-300">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Product Foundations</h1>
                    <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">Manage foundations used in your products.</p>
                </div>
                <div className="shrink-0 transition-transform active:scale-95">
                    <RedirectButton href="/dashboard/foundations/create" label="Add Foundation" className="w-full sm:w-auto" />
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
                                    href={`/dashboard/foundations/${id}/detail`}
                                    className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                                >
                                    Detail
                                </Link>
                                <Link
                                    href={`/dashboard/foundations/${id}`}
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
                        onClick: (rows) => alert(`Deleting ${rows.length} foundations`),
                    }
                ]}
            />
        </div>
    );
}
