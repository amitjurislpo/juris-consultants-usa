"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { removeAvatarAction, setAvatarAction } from "./actions";

const SIZE = 256;

/** Round picture: the photo, or the first letter of the name when there is none. */
export function Avatar({
  name,
  image,
  size = 36,
}: {
  name: string;
  image: string | null;
  size?: number;
}) {
  const letter = (name.trim()[0] ?? "A").toUpperCase();
  return (
    <span
      aria-hidden="true"
      className="pt-avatar"
      style={{ width: size, height: size, fontSize: size * 0.42 }}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element -- small data URL, not a remote image
        <img alt="" height={size} src={image} width={size} />
      ) : (
        <svg
          aria-hidden="true"
          className="pt-avatar-letter"
          focusable="false"
          viewBox="0 0 100 100"
        >
          <text
            dy="0.35em"
            fill="#fff"
            fontFamily="inherit"
            fontSize="56"
            fontWeight="700"
            textAnchor="middle"
            x="50"
            y="50"
          >
            {letter}
          </text>
        </svg>
      )}
    </span>
  );
}

/** Crops to a centred square and shrinks to 256x256 JPEG so the picture stays tiny. */
async function toSmallJpeg(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const side = Math.min(bitmap.width, bitmap.height);
  const canvas = document.createElement("canvas");
  canvas.width = SIZE;
  canvas.height = SIZE;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("no canvas");
  context.drawImage(
    bitmap,
    (bitmap.width - side) / 2,
    (bitmap.height - side) / 2,
    side,
    side,
    0,
    0,
    SIZE,
    SIZE,
  );
  return canvas.toDataURL("image/jpeg", 0.85);
}

/** The circle with a small pencil on it. Clicking the pencil opens the file picker. */
export function EditableAvatar({
  name,
  image,
  size = 88,
  allowRemove = false,
}: {
  name: string;
  image: string | null;
  size?: number;
  allowRemove?: boolean;
}) {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function choose(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 10 * 1024 * 1024) {
      setMessage("Choose a JPG, PNG or WebP picture under 10 MB.");
      return;
    }
    setMessage(null);
    start(async () => {
      try {
        const result = await setAvatarAction(await toSmallJpeg(file));
        setMessage(result.error);
        router.refresh();
      } catch {
        setMessage("We could not read that picture.");
      }
    });
  }

  return (
    <div className="pt-editavatar">
      <div
        className="pt-editavatar-circle"
        data-busy={pending ? "true" : "false"}
        style={{ width: size, height: size }}
      >
        <Avatar image={image} name={name} size={size} />
        <button
          aria-label={image ? "Change photo" : "Upload photo"}
          className="pt-avatar-edit"
          disabled={pending}
          onClick={() => input.current?.click()}
          title={image ? "Change photo" : "Upload photo"}
          type="button"
        >
          <svg
            aria-hidden="true"
            fill="none"
            height="14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="14"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
        </button>
        <input
          accept="image/png,image/jpeg,image/webp"
          className="pt-visually-hidden"
          data-testid="avatar-file"
          onChange={(event) => {
            choose(event.target.files?.[0]);
            event.target.value = "";
          }}
          ref={input}
          tabIndex={-1}
          type="file"
        />
      </div>
      {allowRemove && image ? (
        <button
          className="pt-link-button"
          disabled={pending}
          onClick={() =>
            start(async () => {
              await removeAvatarAction();
              router.refresh();
            })
          }
          type="button"
        >
          Remove photo
        </button>
      ) : null}
      {message ? (
        <p aria-live="polite" className="pt-error">
          {message}
        </p>
      ) : null}
    </div>
  );
}
