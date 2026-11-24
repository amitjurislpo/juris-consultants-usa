"use client";

import { Button, Input } from "@juris/ui";
import { useActionState } from "react";
import {
  changeStaffAction,
  createStaffAction,
  type StaffFormState,
} from "./actions";

const initial: StaffFormState = {
  error: null,
  notice: null,
  credentials: null,
};

function Result({ state }: { state: StaffFormState }) {
  return (
    <>
      {state.error ? (
        <p role="alert" className="form-error">
          {state.error}
        </p>
      ) : null}
      {state.notice ? <p role="status">{state.notice}</p> : null}
      {state.credentials ? (
        <div className="mg-secret">
          <p className="muted">
            Shown only now. Copy it before leaving this page.
          </p>
          <p>
            Temporary password: <code>{state.credentials.password}</code>
          </p>
        </div>
      ) : null}
    </>
  );
}

export function CreateStaffForm() {
  const [state, action, pending] = useActionState(createStaffAction, initial);
  return (
    <form action={action} className="mg-form" noValidate>
      <div className="mg-fields">
        <Input label="Name" name="name" autoComplete="off" required />
        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="off"
          required
        />
      </div>
      <div className="mg-actions">
        <Button type="submit" size="sm" disabled={pending}>
          {pending ? "Creating..." : "Create staff user"}
        </Button>
      </div>
      <Result state={state} />
    </form>
  );
}

export interface StaffRowProps {
  userId: string;
  role: "STAFF" | "SUPER_ADMIN";
  active: boolean;
  isSelf: boolean;
  locked: boolean;
}

export function StaffRowForm({
  userId,
  role,
  active,
  isSelf,
  locked,
}: StaffRowProps) {
  const [state, action, pending] = useActionState(changeStaffAction, initial);
  const button = (
    intent: string,
    label: string,
    variant: "outline" | "danger",
  ) => (
    <Button
      type="submit"
      name="intent"
      value={intent}
      size="sm"
      variant={variant}
      disabled={pending}
    >
      {label}
    </Button>
  );

  return (
    <form action={action} className="mg-form">
      <input type="hidden" name="userId" value={userId} />
      <div className="mg-row-actions">
        {role === "STAFF"
          ? button("makeSuperAdmin", "Make super admin", "outline")
          : isSelf
            ? null
            : button("makeStaff", "Make staff", "outline")}
        {active
          ? isSelf
            ? null
            : button("disable", "Disable", "danger")
          : button("enable", "Enable", "outline")}
        {button("resetPassword", "Reset password", "outline")}
        {locked ? button("unlock", "Unlock sign-in", "danger") : null}
      </div>
      <Result state={state} />
    </form>
  );
}
