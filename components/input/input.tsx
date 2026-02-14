
import React, { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-gray-700 ml-0.5">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative group">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full h-11 px-4 rounded-lg border bg-white
              transition-all duration-200 outline-none
              placeholder:text-gray-400 text-gray-900 text-sm
              ${icon ? "pl-10" : "pl-4"}
              ${
                error
                  ? "border-red-500 focus:ring-4 focus:ring-red-500/10"
                  : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              }
              ${className}
            `}
            {...props}
          />
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

Input.displayName = "Input";
