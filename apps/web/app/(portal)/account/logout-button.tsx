"use client";

import { Button, Modal } from "@juris/ui";
import { DashLogoutIcon } from "@juris/ui/dashboard";
import { useState, useTransition } from "react";

/** Log-out button that asks "are you sure?" first, so a stray click does not end the session. */
export function LogoutButton({
  action,
  variant = "menu",
}: {
  action: () => Promise<void>;
  /** "menu" is the text item in the dropdown; "icon" is the small button on the sidebar user card. */
  variant?: "menu" | "icon";
}) {
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();

  return (
    <>
      {variant === "icon" ? (
        <button
          aria-label="Log out"
          className="d-lo"
          onClick={() => setOpen(true)}
          title="Log out"
          type="button"
        >
          <DashLogoutIcon />
        </button>
      ) : (
        <button
          className="pt-logout"
          onClick={() => setOpen(true)}
          type="button"
        >
          Logout
        </button>
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
              {pending ? "Logging out..." : "Yes, log out"}
            </Button>
          </>
        }
        onClose={() => {
          if (!pending) setOpen(false);
        }}
        open={open}
        title="Log out"
      >
        <p className="pt-confirm-q">Are you sure you want to log out?</p>
        <p className="pt-muted">
          You can log back in any time with a code sent to your email.
        </p>
      </Modal>
    </>
  );
}
