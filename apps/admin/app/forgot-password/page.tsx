import { Card } from "@juris/ui";
import { ResetForm } from "./reset-form";

export const metadata = { title: "Reset password" };

export default function ForgotPasswordPage() {
  return (
    <main className="center-screen">
      <Card solid className="auth-card">
        <h1>Reset password</h1>
        <p className="muted">
          Enter your admin email. We send an 6-digit code to it.
        </p>
        <ResetForm />
      </Card>
    </main>
  );
}
