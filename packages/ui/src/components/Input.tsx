import { forwardRef, type InputHTMLAttributes, useId } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { id, label, helperText, error, className = "", ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-description`;

  return (
    <div className={`ui-field ${className}`}>
      {label ? (
        <label className="ui-label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <input
        ref={ref}
        id={inputId}
        className="ui-input"
        aria-invalid={error ? "true" : props["aria-invalid"]}
        aria-describedby={helperText || error ? descriptionId : undefined}
        {...props}
      />
      {error ? (
        <span id={descriptionId} className="ui-field-error">
          {error}
        </span>
      ) : null}
      {!error && helperText ? (
        <span id={descriptionId} className="ui-field-helper">
          {helperText}
        </span>
      ) : null}
    </div>
  );
});
