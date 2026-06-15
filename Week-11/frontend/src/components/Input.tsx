import type{ InputHTMLAttributes, ReactNode } from "react";
import { useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  rightSlot?: ReactNode;
}

export function Input({ label, hint, error, rightSlot, className = "", ...props }: InputProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-slate-600">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          id={id}
          className={`
            h-10 w-full rounded-lg border bg-slate-50 px-3 text-sm text-slate-800
            placeholder:text-slate-300
            outline-none transition-all duration-150
            hover:border-slate-300
            focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${error ? "border-red-300 focus:ring-red-400" : "border-slate-200"}
            ${rightSlot ? "pr-9" : ""}
            ${className}
          `}
          {...props}
        />
        {rightSlot && (
          <div className="absolute right-3 flex items-center">{rightSlot}</div>
        )}
      </div>
      {(hint || error) && (
        <p className={`text-xs ${error ? "text-red-500" : "text-slate-400"}`}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
}