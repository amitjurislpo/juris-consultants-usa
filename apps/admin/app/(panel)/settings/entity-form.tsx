"use client";

import { Button, Input, Select } from "@juris/ui";
import { useActionState, useId } from "react";
import type { SettingsFormState } from "./actions";

export interface FieldDef {
  name: string;
  label: string;
  kind: "text" | "number" | "checkbox" | "select" | "textarea";
  options?: { value: string; label: string }[];
  helper?: string;
  /** Shown but not editable (identifies an existing row). */
  locked?: boolean;
  wide?: boolean;
}

interface Props {
  action: (
    previous: SettingsFormState,
    formData: FormData,
  ) => Promise<SettingsFormState>;
  fields: FieldDef[];
  values: Record<string, string>;
  submitLabel: string;
}

const initial: SettingsFormState = { error: null, saved: false };

export function EntityForm({ action, fields, values, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState(action, initial);
  const uid = useId();

  return (
    <form action={formAction} className="mg-form">
      {values.id ? <input type="hidden" name="id" value={values.id} /> : null}
      <div className="mg-fields">
        {fields.map((field) => {
          const value = values[field.name] ?? "";
          const wide = field.wide ? " mg-wide" : "";
          if (field.kind === "checkbox") {
            return (
              <label key={field.name} className="mg-check">
                <input
                  type="checkbox"
                  name={field.name}
                  defaultChecked={value === "on"}
                />
                {field.label}
              </label>
            );
          }
          if (field.kind === "select") {
            return (
              <div key={field.name} className={wide.trim()}>
                {field.locked ? (
                  <input type="hidden" name={field.name} value={value} />
                ) : null}
                <Select
                  label={field.label}
                  name={field.locked ? undefined : field.name}
                  defaultValue={value}
                  disabled={field.locked}
                  helperText={field.helper}
                >
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>
            );
          }
          if (field.kind === "textarea") {
            return (
              <div key={field.name} className={`ui-field${wide}`}>
                <label className="ui-label" htmlFor={`${uid}-${field.name}`}>
                  {field.label}
                </label>
                <textarea
                  id={`${uid}-${field.name}`}
                  name={field.name}
                  className="ui-input mg-textarea"
                  defaultValue={value}
                  rows={3}
                />
                {field.helper ? (
                  <span className="ui-field-helper">{field.helper}</span>
                ) : null}
              </div>
            );
          }
          return (
            <Input
              key={field.name}
              className={wide.trim()}
              label={field.label}
              name={field.name}
              type={field.kind}
              step={field.kind === "number" ? "any" : undefined}
              defaultValue={value}
              readOnly={field.locked}
              helperText={field.helper}
            />
          );
        })}
      </div>
      <div className="mg-actions">
        <Button type="submit" size="sm" disabled={pending}>
          {pending ? "Saving..." : submitLabel}
        </Button>
        {state.error ? (
          <p role="alert" className="form-error">
            {state.error}
          </p>
        ) : null}
        {state.saved && !state.error ? (
          <p role="status" className="muted">
            Saved.
          </p>
        ) : null}
      </div>
    </form>
  );
}
