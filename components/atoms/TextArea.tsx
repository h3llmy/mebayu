import { TextareaHTMLAttributes } from "react";

export interface TextAreaInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const TextAreaInput = ({ label, className, ...props }: TextAreaInputProps) => {
  return (
    <div className="md:col-span-2">
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-0.5">
            {label}
            {props.required && <span className="text-red-500">*</span>}
          </label>
        )}
        <textarea
          {...props}
          className={`w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors ${props.disabled ? 'opacity-70 cursor-not-allowed' : ''} ${className || ''}`}
        />
      </div>
    </div>
  );
};
