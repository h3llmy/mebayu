"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { FoundationForm } from "@/components/organisms/Forms/FoundationForm";
import { FoundationService } from "@/lib/service/foundation/foundationService";
import { Foundation } from "@/lib/service/foundation/foundationModel";
import { useParams } from "next/navigation";

export default function EditFoundationPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [foundation, setFoundation] = useState<Foundation | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFoundation = async () => {
      try {
        const data = await FoundationService.getOne(id);
        setFoundation(data);
      } catch (err) {
        setError((err as Error).message || "Foundation not found");
      } finally {
        setIsLoading(false);
      }
    };
    loadFoundation();
  }, [id]);

  const handleSubmit = async (data: {
    name: string;
  }) => {
    setIsSubmitting(true);
    try {
      await FoundationService.update(id, { name: data.name });
    } catch (error) {
      console.error("Failed to update foundation:", error);
    }
    setIsSubmitting(false);
    router.push("/dashboard/foundations");
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
            Loading foundation details...
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
            onClick={() => router.push("/dashboard/foundations")}
            className="text-[#507c59] hover:underline font-medium"
          >
            Go back to foundations
          </button>
        </div>
      </div>
    );
  }

  return (
    <FoundationForm
      initialData={foundation}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      title="Edit Foundation"
      description={`Editing ${foundation?.name}`}
    />
  );
}
