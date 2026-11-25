"use client";

import { Button, Modal } from "@juris/ui";
import { DashIcon } from "@juris/ui/dashboard";
import { useState, useTransition } from "react";

/** Sign-out button that asks "are you sure?" first, so a stray click does not end the session. */
export function SignOutButton({
  action,
  iconOnly = false,
}: {
  action: () => Promise<void>;
  /** Small round icon button for the sidebar user card. */
  iconOnly?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();

  return (
    <>
      {iconOnly ? (
        <button
          aria-label="Sign out"
          className="d-lo"
          onClick={() => setOpen(true)}
          title="Sign out"
          type="button"
        >
          <DashIcon name="logout" />
        </button>
      ) : (
        <Button
          className="user-menu-signout-button"
          onClick={() => setOpen(true)}
          type="button"
          variant="outline"
        >
          Sign out
        </Button>
      )}
      <Modal
        footer={
          <>
            <Button
              disabled={pending}
              onClick={() => setOpen(false)}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              disabled={pending}
              onClick={() => start(async () => action())}
              type="button"
            >
              {pending ? "Signing out..." : "Yes, sign out"}
            </Button>
          </>
        }
        onClose={() => {
          if (!pending) setOpen(false);
        }}
        open={open}
        title="Sign out"
      >
        <p className="tz-question">Are you sure you want to sign out?</p>
        <p className="muted tz-hint">
          You will need your password and an email code to sign in again.
        </p>
      </Modal>
    </>
  );
}
