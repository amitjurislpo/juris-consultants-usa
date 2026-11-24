import { Card } from "@juris/ui";
import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  if ((await auth())?.user) redirect("/");

  return (
    <main className="center-screen">
      <Card solid className="auth-card">
        <h1>Admin sign in</h1>
        <p className="muted">Juris Consultants USA staff only.</p>
        <LoginForm />
      </Card>
    </main>
  );
}
