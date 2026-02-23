"use client";

import { StorageService } from "@/lib/service/storage";
import React, { useRef, useState, useCallback, useEffect } from "react";

export interface UploadedFile {
  file_key: string;
  public_url: string;
}

export interface ImageUploadProps {
  label?: string;
  error?: string;
  helperText?: string;
  maxFiles?: number;
  value?: UploadedFile[]; // after upload
  onChange?: (files: UploadedFile[]) => void;
  uploadPath: string; // required for presign
  required?: boolean;
}

export const ImageUpload = ({
  label,
  error,
  helperText,
  maxFiles = 5,
  value = [],
  onChange,
  uploadPath,
  required,
}: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  // Sync previews from uploaded public_url
  useEffect(() => {
    if (!value?.length) {
      setPreviews([]);
      return;
    }

    const urls = value.map((file) => file.public_url);
    setPreviews(urls);
  }, [value]);

  const handleFiles = useCallback(
    async (newFiles: FileList | null) => {
      if (!newFiles) return;

      const filesArray = Array.from(newFiles).filter((file) =>
        file.type.startsWith("image/")
      );

      if (!filesArray.length) return;

      const limitedFiles = filesArray.slice(
        0,
        maxFiles - (value?.length || 0)
      );

      try {
        setUploading(true);

        // 1️⃣ Request presigned URLs
        const presignedList = await StorageService.uploadFiles(
          limitedFiles,
          uploadPath
        );

        // 2️⃣ Merge with existing uploaded files
        const updated = [...(value || []), ...presignedList];

        onChange?.(updated);
      } catch (err) {
        console.error("Upload failed:", err);
      } finally {
        setUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    [value, maxFiles, onChange, uploadPath]
  );

  const removeImage = (index: number) => {
    const updated = value.filter((_, i) => i !== index);
    onChange?.(updated);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700 ml-0.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        className={`
          relative border-2 border-dashed rounded-xl p-4 min-h-[160px]
          transition-all duration-200 cursor-pointer overflow-hidden
          ${error
            ? "border-red-300 bg-red-50"
            : "border-gray-200 bg-white hover:border-[var(--primary)] hover:bg-[var(--primary-light)]"
          }
        `}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          max={maxFiles}
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {previews.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <svg
              className="w-10 h-10 text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm font-medium text-gray-900">
              {uploading
                ? "Uploading..."
                : "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG or WEBP (Max {maxFiles} images)
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {previews.map((url, index) => (
              <div
                key={url}
                className="group relative aspect-square rounded-lg overflow-hidden border border-gray-100 shadow-sm"
              >
                <img
                  src={url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  className="absolute top-1 right-1 bg-white/90 p-1 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-50"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-xs text-red-500 mt-1 ml-0.5">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-gray-500 mt-1 ml-0.5">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};