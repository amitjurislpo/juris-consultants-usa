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
      <section className="sec soft" style={{ minHeight: "70vh" }}>
        <div className="auth-wrap">
          <h1>Log in or create your account</h1>
          <p className="muted" style={{ marginBottom: 20 }}>
            No password needed. Continue with Google, or we email you a one-time
            code. New here? The same step creates your account.
          </p>
          {googleOn ? (
            <>
              <form action={googleSignIn}>
                <input name="next" type="hidden" value={next} />
                <button
                  className="btn btn-outline btn-lg"
                  style={{ width: "100%" }}
                  type="submit"
                >
                  Continue with Google
                </button>
              </form>
              <p
                className="muted"
                style={{ textAlign: "center", margin: "14px 0", fontSize: 14 }}
              >
                or use your email
              </p>
            </>
          ) : null}
          <LoginForm next={next} />
        </div>
      </section>
    </main>
  );
}
