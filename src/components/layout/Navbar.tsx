"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PhonePrintLogo } from "@/components/ui/PhonePrintLogo";
import { getActiveDatasetInfo } from "@/lib/data/loader";

interface NavLink {
  name: string;
  href: string;
  code: string;
  shortName?: string;
}

const NAV_LINKS: NavLink[] = [
  { name: "Campus Pulse", href: "/", code: "01" },
  { name: "My PhonePrint", href: "/my-phoneprint", code: "02" },
  { name: "SetLab", href: "/setlab", code: "03" },
  { name: "ComboLab", href: "/combolab", code: "04" },
  { name: "Experiment Studio", href: "/experiment-studio", code: "05", shortName: "Experiments" },
  { name: "Methodology", href: "/methodology", code: "06" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const datasetInfo = getActiveDatasetInfo();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#EAE3D5]/80 bg-[#FBF9F4]/90 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/"
            className="group flex items-center gap-2.5 rounded-full transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
          >
            <PhonePrintLogo size={32} showWordmark />
            <span className="font-sora text-[9px] font-bold tracking-widest uppercase bg-[#1C1B18] text-white px-1.5 py-0.5 rounded shadow-2xs">
              LAB
            </span>
          </Link>

          <span className="hidden xl:inline-block h-3.5 w-px bg-[#EAE3D5]" />
          <span className="hidden xl:inline-block font-sora text-[11px] font-medium text-stone-500 whitespace-nowrap tracking-tight">
            Discrete Mathematics Preference Analytics
          </span>
        </div>

        {/* Center: Desktop Navigation Pills (Guaranteed Single-Line & Cleanly Spaced) */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-1 rounded-full border border-[#EAE3D5] bg-white/80 p-1 shadow-[0_2px_8px_-2px_rgba(44,38,28,0.04)]"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-3.5 py-1.5 text-xs font-sans whitespace-nowrap transition-all duration-200 focus:outline-none ${
                  isActive
                    ? "bg-[#1C1B18] text-white font-semibold shadow-xs"
                    : "text-stone-600 hover:text-stone-950 hover:bg-[#F5F1E8] font-medium"
                }`}
              >
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Cohort Benchmark Status & Profiler CTA */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#EAE3D5] bg-white/90 px-3 py-1.5 text-xs shadow-2xs whitespace-nowrap">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-sora text-[11px] font-semibold text-stone-700 tracking-tight whitespace-nowrap">
              {datasetInfo.isDemo ? "N=30 Benchmark" : `N=${datasetInfo.totalResponses} Survey`}
            </span>
          </div>

          <Link
            href="/my-phoneprint"
            className="rounded-full bg-[#1C1B18] text-white hover:bg-black px-4 sm:px-5 py-1.5 text-xs font-heading font-semibold shadow-xs transition-all hover:scale-[1.02] flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>Preference Profiler</span>
            <span>&rarr;</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex lg:hidden items-center justify-center rounded-full p-2 text-stone-700 hover:bg-[#F5F1E8] hover:text-stone-900 border border-[#EAE3D5] transition-colors focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Clean, Warm & Polished) */}
      {mobileMenuOpen && (
        <div className="border-t border-[#EAE3D5] bg-[#FBF9F4]/98 backdrop-blur-2xl px-6 py-4 lg:hidden shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-xs font-medium transition-all ${
                    isActive
                      ? "bg-[#1C1B18] text-white font-semibold shadow-xs"
                      : "text-stone-700 hover:bg-[#F5F1E8] hover:text-stone-950"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`font-sora text-[10px] ${isActive ? "text-stone-300" : "text-stone-400"}`}>
                      {link.code}
                    </span>
                    <span className="whitespace-nowrap">{link.name}</span>
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 border-t border-[#EAE3D5] pt-3 flex items-center justify-between text-xs text-stone-600 font-sora">
            <span className="text-[11px] font-semibold text-stone-800">
              Campus Cohort • N=30 Verified
            </span>
            <span className="text-[10px] text-stone-500">v2.5</span>
          </div>
        </div>
      )}
    </header>
  );
}
