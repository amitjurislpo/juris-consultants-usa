"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Avatar } from "./avatar";
import { EditableAvatar } from "./editable-avatar";

/** Avatar button that opens a small menu: name, My details, photo, Sign out. */
export function UserMenu({
  name,
  image,
  signOut,
}: {
  name: string;
  image: string | null;
  /** The sign-out form, rendered by the server layout. */
  signOut: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent | TouchEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="user-menu" ref={root}>
      <button
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Account menu"
        className="user-menu-button"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <Avatar image={image} name={name} size={40} />
      </button>
      {open ? (
        <div className="user-menu-panel" role="menu">
          <div className="user-menu-head">
            <EditableAvatar image={image} name={name} size={52} />
            <strong className="user-menu-name">{name}</strong>
          </div>
          <Link
            className="user-menu-item"
            href="/my-details"
            onClick={() => setOpen(false)}
            role="menuitem"
          >
            My details
          </Link>
          <div className="user-menu-signout">{signOut}</div>
        </div>
      ) : null}
    </div>
  );
}
