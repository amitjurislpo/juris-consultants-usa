import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@juris/ui/styles.css";
import "./admin.css";

export const metadata: Metadata = {
  title: "Juris Consultants USA Admin",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
