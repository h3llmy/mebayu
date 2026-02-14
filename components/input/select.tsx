
import React, { SelectHTMLAttributes, forwardRef } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  options: { label: string; value: string | number }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      placeholder,
      options,
      className = "",
      value,
      defaultValue,
      ...rest
    },
    ref
  ) => {
    const isControlled = value !== undefined;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-gray-700 ml-0.5">
            {label}
            {rest.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative group">
          <select
            ref={ref}
            value={value}
            defaultValue={!isControlled ? defaultValue ?? "" : undefined}
            {...rest}
            className={`
              w-full h-11 px-4 rounded-lg border bg-white appearance-none
              transition-all duration-200 outline-none
              text-gray-900 text-sm
              ${
                error
                  ? "border-red-500 focus:ring-4 focus:ring-red-500/10"
                  : "border-[var(--gray-200)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10"
              }
              ${className}
            `}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}

            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--gray-400)] group-focus-within:text-[var(--primary)] transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {error ? (
          <p className="text-xs text-red-500 mt-1 ml-0.5">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-gray-500 mt-1 ml-0.5">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = "Select";
