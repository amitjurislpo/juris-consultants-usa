import type { HTMLAttributes, ReactNode } from "react";

export type ToastVariant = "primary" | "success" | "warning" | "danger";

export interface ToastProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  title: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
  onClose?: () => void;
  closeLabel?: string;
}

export function Toast({
  title,
  description,
  variant = "primary",
  onClose,
  closeLabel = "Dismiss",
  className = "",
  ...props
}: ToastProps) {
  return (
    <div
      role="status"
      className={`ui-toast ui-toast-${variant} ${className}`}
      {...props}
    >
      <div className="ui-toast-content">
        <span className="ui-toast-title">{title}</span>
        {description ? (
          <span className="ui-toast-description">{description}</span>
        ) : null}
      </div>
      {onClose ? (
        <button
          type="button"
          className="ui-toast-close"
          aria-label={closeLabel}
          onClick={onClose}
        >
          ×
        </button>
      ) : null}
    </div>
  );
}

export function ToastRegion({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`ui-toast-region ${className}`}
      aria-live="polite"
      aria-atomic="true"
      {...props}
    />
  );
}
