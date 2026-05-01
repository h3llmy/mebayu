"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { FoundationForm } from "@/components/organisms/Forms/FoundationForm";
import { FoundationService } from "@/lib/service/foundation/foundationService";

export default function CreateFoundationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: {
    translations: { language_code: string; name: string }[];
  }) => {
    setIsSubmitting(true);

    try {
      await FoundationService.create({ translations: data.translations });
    } catch (error) {
      console.error("Failed to create foundation:", error);
    }

    setIsSubmitting(false);
    router.push("/dashboard/foundations");
  };

  return (
    <FoundationForm
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      title="Create New Foundation"
      description="Define a new foundation for your products."
    />
  );
}
