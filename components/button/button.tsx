import React, { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const variants = {
    primary:
      "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] focus:ring-[var(--primary)]/20 shadow-sm",
    secondary:
      "bg-[var(--gray-100)] dark:bg-gray-800 text-[var(--gray-900)] dark:text-gray-100 hover:bg-[var(--gray-200)] dark:hover:bg-gray-700 focus:ring-[var(--gray-100)]/20 dark:focus:ring-gray-700/20",
    outline:
      "bg-transparent border border-[var(--gray-200)] dark:border-gray-700 text-[var(--gray-700)] dark:text-gray-300 hover:bg-[var(--gray-50)] dark:hover:bg-gray-800 focus:ring-[var(--gray-200)]/20 dark:focus:ring-gray-700/20",
    danger:
      "bg-[var(--danger)] text-white hover:bg-red-700 focus:ring-red-600/20 shadow-sm",
    ghost:
      "bg-transparent text-[var(--gray-600)] dark:text-gray-400 hover:bg-[var(--gray-100)] dark:hover:bg-gray-800 hover:text-[var(--gray-900)] dark:hover:text-gray-100 focus:ring-[var(--gray-100)]/20 dark:focus:ring-gray-800/20",
  };

  const sizes = {
    sm: "h-9 px-3 text-xs",
    md: "h-11 px-6 text-sm",
    lg: "h-13 px-8 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
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
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};
