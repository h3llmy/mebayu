"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { MaterialForm } from "@/components/organisms/Forms/MaterialForm";
import { MaterialService } from "@/lib/service/material/materialService";

export default function CreateMaterialPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: {
    name: string;
  }) => {
    setIsSubmitting(true);

    try {
      await MaterialService.create({ name: data.name });
    } catch (error) {
      console.error("Failed to create material:", error);
    }

    setIsSubmitting(false);
    router.push("/dashboard/materials");
  };

  return (
    <MaterialForm
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      title="Create New Material"
      description="Define a new material for your products."
    />
  );
}
