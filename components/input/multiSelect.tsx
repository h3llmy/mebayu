"use client";

import React, { useState, useRef, useEffect } from "react";

export interface MultiSelectProps {
    label?: string;
    error?: string;
    helperText?: string;
    placeholder?: string;
    options: { label: string; value: string }[];
    value: string[];
    onChange: (value: string[]) => void;
    required?: boolean;
    className?: string;
    onSearch?: (term: string) => void;
    onLoadMore?: () => void;
    hasMore?: boolean;
    isLoading?: boolean;
}

export function MultiSelect({
    label,
    error,
    helperText,
    placeholder = "Select options",
    options,
    value,
    onChange,
    required,
    className = "",
    onSearch,
    onLoadMore,
    hasMore,
    isLoading,
}: MultiSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<HTMLDivElement>(null);

    const toggleOpen = () => {
        setIsOpen((prev) => {
            if (prev) {
                // If closing, reset search
                setSearchTerm("");
                if (onSearch) onSearch("");
            }
            return !prev;
        });
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm("");
                if (onSearch) onSearch("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onSearch]);

    useEffect(() => {
        if (!onLoadMore || !hasMore || isLoading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    onLoadMore();
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) observer.observe(observerRef.current);
        return () => observer.disconnect();
    }, [onLoadMore, hasMore, isLoading]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (onSearch) {
            onSearch(term);
        }
    };

    const handleToggle = (optionValue: string) => {
        if (value.includes(optionValue)) {
            onChange(value.filter((v) => v !== optionValue));
        } else {
            onChange([...value, optionValue]);
        }
    };

    const handleRemove = (e: React.MouseEvent, optionValue: string) => {
        e.stopPropagation();
        onChange(value.filter((v) => v !== optionValue));
    };

    return (
        <div className="flex flex-col gap-1.5 w-full" ref={containerRef}>
            {label && (
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-0.5">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative group">
                <div
                    onClick={toggleOpen}
                    className={`
            min-h-[44px] w-full px-4 border-r-[32px] border-r-transparent py-2 rounded-lg border bg-white dark:bg-gray-900 cursor-pointer
            flex flex-wrap items-center gap-2 transition-all duration-200 outline-none
            ${error
                            ? "border-red-500 focus:ring-4 focus:ring-red-500/10 hover:border-red-600"
                            : "border-gray-200 dark:border-gray-700 focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 hover:border-gray-300 dark:hover:border-gray-600"
                        }
            ${isOpen ? "!border-[var(--primary)] ring-4 ring-[var(--primary)]/10" : ""}
            ${className}
          `}
                >
                    {value.length === 0 ? (
                        <span className="text-sm text-gray-500 dark:text-gray-400 select-none">{placeholder}</span>
                    ) : (
                        value.map((val) => {
                            const option = options.find((o) => o.value === val);
                            if (!option) return null;
                            return (
                                <span
                                    key={val}
                                    className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 px-2.5 py-1 rounded-md text-xs font-semibold animate-in fade-in zoom-in-95 duration-200"
                                >
                                    {option.label}
                                    <button
                                        type="button"
                                        onClick={(e) => handleRemove(e, val)}
                                        className="hover:bg-gray-200 dark:hover:bg-gray-700 p-0.5 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                                    >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>
                            );
                        })
                    )}

                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                        <svg
                            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                {isOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-950 rounded-xl border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 py-1">
                        {onSearch && (
                            <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-950 z-10">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    placeholder="Search..."
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                                />
                            </div>
                        )}
                        <div className="max-h-60 overflow-y-auto">
                            {options.length === 0 && !isLoading ? (
                                <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">No options available</div>
                            ) : (
                                options.map((option) => {
                                    const isSelected = value.includes(option.value);
                                    return (
                                        <div
                                            key={option.value}
                                            onClick={() => handleToggle(option.value)}
                                            className="flex items-center px-4 py-2.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                                        >
                                            <div
                                                className={`
                          w-4 h-4 rounded border flex items-center justify-center mr-3 transition-colors
                          ${isSelected ? "bg-gray-900 border-gray-900 dark:bg-white dark:border-white" : "border-gray-300 dark:border-gray-600"}
                        `}
                                            >
                                                {isSelected && (
                                                    <svg className="w-3 h-3 text-white dark:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>
                                            <span className={`text-sm ${isSelected ? "text-gray-900 dark:text-white font-medium" : "text-gray-700 dark:text-gray-300"}`}>
                                                {option.label}
                                            </span>
                                        </div>
                                    );
                                })
                            )}

                            {isLoading && (
                                <div className="px-4 py-3 flex justify-center">
                                    <div className="w-5 h-5 border-2 border-gray-300 border-t-[var(--primary)] rounded-full animate-spin"></div>
                                </div>
                            )}

                            {!isLoading && hasMore && (
                                <div ref={observerRef} className="h-4"></div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {error ? (
                <p className="text-xs text-red-500 mt-1 ml-0.5">{error}</p>
            ) : helperText ? (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-0.5">{helperText}</p>
            ) : null}
        </div>
    );
}
