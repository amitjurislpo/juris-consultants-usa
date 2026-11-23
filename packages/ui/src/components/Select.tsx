import { forwardRef, type SelectHTMLAttributes, useId } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    { id, label, helperText, error, className = "", children, ...props },
    ref,
  ) {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const descriptionId = `${selectId}-description`;

    return (
      <div className={`ui-field ${className}`}>
        {label ? (
          <label className="ui-label" htmlFor={selectId}>
            {label}
          </label>
        ) : null}
        <select
          ref={ref}
          id={selectId}
          className="ui-select"
          aria-invalid={error ? "true" : props["aria-invalid"]}
          aria-describedby={helperText || error ? descriptionId : undefined}
          {...props}
        >
          {children}
        </select>
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
  },
);
