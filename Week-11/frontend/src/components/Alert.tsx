import { type ReactNode } from "react";

type AlertVariant = "error" | "warning" | "success" | "info";

interface AlertProps {
  variant?: AlertVariant;
  message: ReactNode;
  onDismiss?: () => void;
}

const styles: Record<AlertVariant, string> = {
  error:   "bg-red-50   border-red-200   text-red-700",
  warning: "bg-amber-50 border-amber-200 text-amber-700",
  success: "bg-green-50 border-green-200 text-green-700",
  info:    "bg-blue-50  border-blue-200  text-blue-700",
};

const icons: Record<AlertVariant, string> = {
  error: "✕", warning: "⚠", success: "✓", info: "ℹ",
};

export function Alert({ variant = "info", message, onDismiss }: AlertProps) {
  return (
    <div role="alert" className={`flex items-start gap-2 rounded-lg border px-3 py-2.5 text-sm ${styles[variant]}`}>
      <span className="font-bold shrink-0 mt-px">{icons[variant]}</span>
      <span className="flex-1 leading-snug">{message}</span>
      {onDismiss && (
        <button onClick={onDismiss} className="shrink-0 opacity-50 hover:opacity-100 transition-opacity">✕</button>
      )}
    </div>
  );
}