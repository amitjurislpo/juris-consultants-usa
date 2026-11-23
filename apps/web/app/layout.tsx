import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@juris/ui/styles.css";

export const metadata: Metadata = {
  title: "Juris Consultants USA",
  description:
    "US company formation and business support for founders worldwide.",
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
