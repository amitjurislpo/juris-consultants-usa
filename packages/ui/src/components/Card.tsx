import type { HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  solid?: boolean;
  hover?: boolean;
}

export function Card({
  className = "",
  solid = false,
  hover = false,
  ...props
}: CardProps) {
  return (
    <div
      className={`ui-card${solid ? " ui-card-solid" : ""}${hover ? " ui-card-hover" : ""} ${className}`}
      {...props}
    />
  );
}
