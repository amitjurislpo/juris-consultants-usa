import type { Metadata } from "next";
import { safeNext } from "../../../src/lib/safe-next";
import { googleSignIn } from "./actions";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Log in | Juris Consultants USA",
  description: "Log in to see your orders, company details and documents.",
  robots: { index: false },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const next = safeNext((await searchParams).next);
  const googleOn = Boolean(
    process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET,
  );
  return (
    <main data-page="auth" id="app">
      <section
        className="sec soft"
        style={{ minHeight: "70vh", paddingTop: 0 }}
      >
        <div className="auth-wrap" style={{ paddingTop: 28 }}>
          <h1>Your Juris account</h1>
          <p className="muted" style={{ marginBottom: 20 }}>
            Track your US company, upload documents and see every payment in one
            place. No password to remember. New here? We create your account in
            the same step.
          </p>
          <form action={googleSignIn}>
            <input name="next" type="hidden" value={next} />
            <button
              className="btn btn-outline btn-lg"
              disabled={!googleOn}
              style={{
                alignItems: "center",
                display: "flex",
                gap: 12,
                justifyContent: "center",
                width: "100%",
              }}
              title={
                googleOn
                  ? undefined
                  : "Google sign-in is not configured on this test site yet."
              }
              type="submit"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                height="20"
                viewBox="0 0 48 48"
                width="20"
              >
                <path
                  d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.4-.4-3.5z"
                  fill="#FFC107"
                />
                <path
                  d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
                  fill="#FF3D00"
                />
                <path
                  d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
                  fill="#4CAF50"
                />
                <path
                  d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"
                  fill="#1976D2"
                />
              </svg>
              Continue with Google
            </button>
          </form>
          <p
            className="muted"
            style={{ textAlign: "center", margin: "10px 0", fontSize: 14 }}
          >
            or use your email
          </p>
          <LoginForm next={next} />
        </div>
      </section>
    </main>
  );
}
