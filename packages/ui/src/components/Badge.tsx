import type { HTMLAttributes } from "react";

export type BadgeVariant =
  "neutral" | "primary" | "success" | "warning" | "danger" | "info";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({
  variant = "neutral",
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span className={`ui-badge ui-badge-${variant} ${className}`} {...props} />
  );
}
