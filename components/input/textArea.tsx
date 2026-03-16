import { InputHTMLAttributes } from "react";

export interface TextAreaInputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  placeholder?: string;
  name: string;
  rows?: number;
}

export const TextAreaInput = (props: TextAreaInputProps) => {
  return (
    <div className="md:col-span-2">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-0.5">
          {props.label}
          {props.required && <span className="text-red-500">*</span>}
        </label>
        <textarea
          name={props.name}
          rows={props.rows}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors"
        />
      </div>
    </div>
  );
};
