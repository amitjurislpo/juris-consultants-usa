"use client";

import { useActionState } from "react";
import { updateProfileAction, type PortalResult } from "./actions";

const initial: PortalResult = { error: null, notice: null };

export function ProfileForm({
  name,
  email,
  phone,
  country,
}: {
  name: string;
  email: string;
  phone: string;
  country: string;
}) {
  const [state, action, pending] = useActionState(updateProfileAction, initial);

  return (
    <form action={action} className="pt-form" noValidate>
      <div className="pt-fields">
        <div className="pt-field">
          <label htmlFor="pf-name">Name</label>
          <input
            autoComplete="name"
            defaultValue={name}
            id="pf-name"
            maxLength={100}
            name="name"
            placeholder="Your full name"
            required
          />
        </div>
        <div className="pt-field">
          <span className="pt-label">Email</span>
          <div
            className="pt-readonly"
            title="Your email is your login and cannot be changed here"
          >
            <span className="pt-readonly-value">{email}</span>
            <span className="pt-readonly-tag">
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
          <span className="pt-help">
            Your email is your login, so it cannot be changed here.
          </span>
        </div>
        <div className="pt-field">
          <label htmlFor="pf-phone">Phone</label>
          <input
            autoComplete="tel"
            defaultValue={phone}
            id="pf-phone"
            inputMode="tel"
            maxLength={25}
            name="phone"
            placeholder="+91 98765 43210"
          />
        </div>
        <div className="pt-field">
          <label htmlFor="pf-country">Country</label>
          <input
            autoComplete="country-name"
            defaultValue={country}
            id="pf-country"
            maxLength={60}
            name="country"
            placeholder="e.g. India"
          />
        </div>
      </div>
      {state.error ? (
        <p className="pt-error" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.notice ? (
        <p className="pt-ok" role="status">
          {state.notice}
        </p>
      ) : null}
      <div>
        <button className="pt-btn" disabled={pending} type="submit">
          {pending ? "Saving..." : "Save details"}
        </button>
      </div>
    </form>
  );
}
