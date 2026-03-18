"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { MaterialForm } from "@/components/form/materialForm";
import { MaterialService } from "@/lib/service/material/materialService";
import { Material } from "@/lib/service/material/materialModel";
import { useParams } from "next/navigation";

export default function EditMaterialPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [material, setMaterial] = useState<Material | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMaterial = async () => {
      try {
        const data = await MaterialService.getOne(id);
        setMaterial(data);
      } catch (err) {
        setError((err as Error).message || "Material not found");
      } finally {
        setIsLoading(false);
      }
    };
    loadMaterial();
  }, [id]);

  const handleSubmit = async (data: {
    name: string;
  }) => {
    setIsSubmitting(true);
    try {
      await MaterialService.update(id, { name: data.name });
    } catch (error) {
      console.error("Failed to update material:", error);
    }
    setIsSubmitting(false);
    router.push("/dashboard/materials");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <svg
            className="animate-spin h-8 w-8 text-[#507c59]"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-gray-500 animate-pulse">
            Loading material details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <button
            onClick={() => router.push("/dashboard/materials")}
            className="text-[#507c59] hover:underline font-medium"
          >
            Go back to materials
          </button>
        </div>
      </div>
    );
  }

  return (
    <MaterialForm
      initialData={material}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      title="Edit Material"
      description={`Editing ${material?.name}`}
    />
  );
}
