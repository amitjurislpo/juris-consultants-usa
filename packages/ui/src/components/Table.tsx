import type { HTMLAttributes, TableHTMLAttributes } from "react";

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {}
export interface TableContainerProps extends HTMLAttributes<HTMLDivElement> {}

export function TableContainer({
  className = "",
  ...props
}: TableContainerProps) {
  return <div className={`ui-table-wrap ${className}`} {...props} />;
}

export function Table({ className = "", ...props }: TableProps) {
  return <table className={`ui-table ${className}`} {...props} />;
}
