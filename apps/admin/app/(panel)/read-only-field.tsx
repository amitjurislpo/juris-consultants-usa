/** A value the person can see but not change. Looks different from an input so it is clear at a glance. */
export function ReadOnlyField({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="ui-field">
      <span className="ui-label">{label}</span>
      <div className="readonly-box" title="This cannot be changed here">
        <span className="readonly-value">{value}</span>
        <span className="readonly-tag">
          <svg
            aria-hidden="true"
            fill="none"
            height="13"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="13"
          >
            <rect height="11" rx="2" width="18" x="3" y="11" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Read only
        </span>
      </div>
      {hint ? <span className="ui-field-helper">{hint}</span> : null}
    </div>
  );
}
