"use client";

import { useEffect, type HTMLAttributes, type ReactNode } from "react";

export interface ModalProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  open: boolean;
  title: ReactNode;
  onClose: () => void;
  footer?: ReactNode;
  closeLabel?: string;
}

export function Modal({
  open,
  title,
  onClose,
  footer,
  closeLabel = "Close",
  className = "",
  children,
  ...props
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="ui-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={`ui-modal ${className}`}
        role="dialog"
        aria-modal="true"
        {...props}
      >
        <div className="ui-modal-header">
          <h2 className="ui-modal-title">{title}</h2>
          <button
            type="button"
            className="ui-modal-close"
            aria-label={closeLabel}
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="ui-modal-body">{children}</div>
        {footer ? <div className="ui-modal-footer">{footer}</div> : null}
      </div>
    </div>
  );
}
