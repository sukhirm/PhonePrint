import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "PhonePrint — Discrete Mathematics & Smartphone Preference Analytics",
  description:
    "An interactive research platform modeling smartphone brand and feature preferences through discrete mathematics, combinatorics, and set theory.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans bg-[#F8FAFC] text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
