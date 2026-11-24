"use client";

import {
  useRef,
  useState,
  type ClipboardEvent,
  type CSSProperties,
  type KeyboardEvent,
} from "react";

export const OTP_LENGTH = 6;

export interface OtpInputProps {
  /** Current digits, "" to 6 characters. */
  value: string;
  onChange: (value: string) => void;
  /** Called once when the last box is filled. */
  onComplete?: (value: string) => void;
  /** When set, a hidden field with this name carries the digits in a normal form post. */
  name?: string;
  length?: number;
  disabled?: boolean;
  autoFocus?: boolean;
  label?: string;
}

const boxStyle: CSSProperties = {
  width: 48,
  height: 56,
  textAlign: "center",
  fontSize: 24,
  fontWeight: 700,
  borderRadius: 10,
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(148, 163, 184, 0.45)",
  background: "rgba(255, 255, 255, 0.04)",
  color: "inherit",
  padding: 0,
  outline: "none",
  fontFamily: "inherit",
};

const focusStyle: CSSProperties = {
  borderColor: "#3b82f6",
  boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.35)",
};

const digitsOnly = (text: string) => text.replace(/\D/g, "");

/** Six separate boxes. Accepts digits only, supports paste, backspace and arrow keys. */
export function OtpInput({
  value,
  onChange,
  onComplete,
  name,
  length = OTP_LENGTH,
  disabled,
  autoFocus,
  label = "One-time code",
}: OtpInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const [focused, setFocused] = useState<number | null>(null);
  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  function commit(next: string, focusIndex: number) {
    const clean = digitsOnly(next).slice(0, length);
    onChange(clean);
    refs.current[Math.min(focusIndex, length - 1)]?.focus();
    if (clean.length === length) onComplete?.(clean);
  }

  function handleInput(index: number, raw: string) {
    const typed = digitsOnly(raw);
    if (!typed) {
      commit(digits.map((d, i) => (i === index ? "" : d)).join(""), index);
      return;
    }
    // Typing over a filled box, or a multi-character fill (autofill), spreads forward.
    const before = digits.slice(0, index).join("");
    const after = digits.slice(index + typed.length).join("");
    commit(before + typed + after, index + typed.length);
  }

  function handleKeyDown(
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Backspace") {
      event.preventDefault();
      if (digits[index]) {
        commit(digits.map((d, i) => (i === index ? "" : d)).join(""), index);
      } else if (index > 0) {
        commit(
          digits.map((d, i) => (i === index - 1 ? "" : d)).join(""),
          index - 1,
        );
      }
    } else if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      refs.current[index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < length - 1) {
      event.preventDefault();
      refs.current[index + 1]?.focus();
    } else if (
      event.key.length === 1 &&
      !/\d/.test(event.key) &&
      !event.ctrlKey &&
      !event.metaKey
    ) {
      event.preventDefault(); // letters and symbols never reach the box
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const pasted = digitsOnly(event.clipboardData.getData("text")).slice(
      0,
      length,
    );
    if (pasted) commit(pasted, pasted.length);
  }

  return (
    <div
      role="group"
      aria-label={label}
      style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
    >
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(node) => {
            refs.current[index] = node;
          }}
          aria-label={`${label}, digit ${index + 1} of ${length}`}
          autoComplete={index === 0 ? "one-time-code" : "off"}
          autoFocus={autoFocus && index === 0}
          disabled={disabled}
          inputMode="numeric"
          pattern="[0-9]*"
          type="text"
          value={digit}
          style={{ ...boxStyle, ...(focused === index ? focusStyle : null) }}
          onBlur={() => setFocused(null)}
          onChange={(event) => handleInput(index, event.target.value)}
          onFocus={(event) => {
            setFocused(index);
            event.target.select();
          }}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
        />
      ))}
      {name ? <input type="hidden" name={name} value={value} /> : null}
    </div>
  );
}
