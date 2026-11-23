import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant =
  "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  className = "",
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`ui-button ui-button-${variant}${size === "md" ? "" : ` ui-button-${size}`} ${className}`}
      {...props}
    />
  );
}
