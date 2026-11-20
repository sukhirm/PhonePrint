import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1C1B18] antialiased font-sans selection:bg-[#EAE3D5] selection:text-[#1C1B18] relative overflow-x-hidden flex flex-col">
      {/* Background ambient warm geometry */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Soft subtle warm decorative rings */}
        <svg
          className="absolute -top-40 -left-40 w-[680px] h-[680px] text-[#EAE3D5]/40 stroke-current"
          fill="none"
          viewBox="0 0 600 600"
        >
          <circle cx="300" cy="300" r="280" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="300" cy="300" r="200" strokeWidth="1" />
          <circle cx="300" cy="300" r="120" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
        <svg
          className="absolute top-1/2 -right-48 w-[720px] h-[720px] text-[#EAE3D5]/35 stroke-current"
          fill="none"
          viewBox="0 0 600 600"
        >
          <circle cx="300" cy="300" r="260" strokeWidth="1" strokeDasharray="5 5" />
          <circle cx="300" cy="300" r="180" strokeWidth="1" />
        </svg>
      </div>

      {/* Fluid full-width application layout with floating glass navbar */}
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
}
