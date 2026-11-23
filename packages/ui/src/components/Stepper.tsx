import type { HTMLAttributes, ReactNode } from "react";

export interface StepperItem {
  label: ReactNode;
  status?: "upcoming" | "active" | "complete";
}

export interface StepperProps extends HTMLAttributes<HTMLOListElement> {
  steps: StepperItem[];
}

export function Stepper({ steps, className = "", ...props }: StepperProps) {
  return (
    <ol className={`ui-stepper ${className}`} aria-label="Progress" {...props}>
      {steps.map((step, index) => {
        const status = step.status ?? "upcoming";
        const isActive = status === "active";
        return (
          <li
            key={index}
            className={`ui-step ui-step-${status}`}
            aria-current={isActive ? "step" : undefined}
          >
            <span className="ui-step-marker" aria-hidden="true">
              {status === "complete" ? "✓" : index + 1}
            </span>
            <span>{step.label}</span>
          </li>
        );
      })}
    </ol>
  );
}
