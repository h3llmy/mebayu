"use client";

import React from "react";

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}

export const FilterSelect = ({
  label,
  value,
  onChange,
  options,
}: FilterSelectProps) => {
  return (
    <div className="flex items-center gap-4">
      <span className="uppercase tracking-wider text-gray-500 text-xs">
        {label}
      </span>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-transparent border-b border-gray-300 focus:border-[#507c59] outline-none pr-6 py-1 text-[#2D2D2A] cursor-pointer"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <span className="absolute right-0 top-1 text-xs text-gray-400 pointer-events-none">
          ▼
        </span>
      </div>
    </div>
  );
};
