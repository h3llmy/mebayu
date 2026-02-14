
"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";

export interface ImageUploadProps {
  label?: string;
  error?: string;
  helperText?: string;
  maxFiles?: number;
  value?: File[];
  onChange?: (files: File[]) => void;
  required?: boolean;
}

export const ImageUpload = ({
  label,
  error,
  helperText,
  maxFiles = 5,
  value = [],
  onChange,
  required,
}: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  // Sync previews with value
  useEffect(() => {
    if (!value || value.length === 0) {
      setPreviews([]);
      return;
    }

    const newPreviews = value.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);

    // Cleanup URLs on change or unmount
    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [value]);

  const handleFiles = useCallback((newFiles: FileList | null) => {
    if (!newFiles) return;

    const filesArray = Array.from(newFiles);
    const validFiles = filesArray.filter(file => file.type.startsWith('image/'));
    
    // Combine with existing files but stay under max
    const combinedFiles = [...value, ...validFiles].slice(0, maxFiles);
    
    onChange?.(combinedFiles);

    // Clear input value so same file can be selected again
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }, [value, maxFiles, onChange]);

  const removeImage = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index);
    onChange?.(newFiles);
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
          relative border-2 border-dashed rounded-xl p-4
          transition-all duration-200 cursor-pointer
          ${error ? "border-red-300 bg-red-50" : "border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50/30"}
        `}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="flex flex-col items-center justify-center py-4 text-center">
          <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-500 mt-1">PNG, JPG or WEBP (Max {maxFiles} images)</p>
        </div>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mt-4">
          {previews.map((url, index) => (
            <div key={url} className="group relative aspect-square rounded-lg overflow-hidden border border-gray-100 shadow-sm">
              <img src={url} alt="Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
                className="absolute top-1 right-1 bg-white/90 p-1 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {error ? (
        <p className="text-xs text-red-500 mt-1 ml-0.5">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-gray-500 mt-1 ml-0.5">{helperText}</p>
      ) : null}
    </div>
  );
};
