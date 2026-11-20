import React from "react";
import Link from "next/link";
import { PhonePrintLogo } from "@/components/ui/PhonePrintLogo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[#EAE3D5]/80 bg-[#FBF9F4] text-xs text-stone-600">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="inline-block">
              <PhonePrintLogo size={32} showWordmark />
            </Link>
            <p className="max-w-md text-xs leading-relaxed text-stone-600 font-sans">
              Interactive preference analytics platform modeling smartphone choices through discrete mathematics,
              combinatorial structures $C(7,3)$, ordered permutations $P(7,3)$, and set-theoretic partition verification.
            </p>
            <div className="rounded-2xl border border-[#EAE3D5] bg-white p-4 text-[11px] text-stone-600 shadow-2xs">
              <span className="font-semibold text-[#1C1B18] font-sora uppercase tracking-wider text-[10px] block mb-1">
                Academic Research Benchmark
              </span>
              Empirical demonstration calibrated on <span className="font-sora text-emerald-800 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">CAMPUS COHORT — N=30</span> with strict 3-feature choice schema.
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="font-heading font-bold text-[#1C1B18] text-sm mb-3">
              Research Modules
            </h4>
            <ul className="space-y-2.5 font-sans text-xs">
              <li>
                <Link
                  href="/"
                  className="text-stone-600 hover:text-[#1C1B18] transition-colors flex items-center gap-1.5"
                >
                  <span className="font-sora text-[10px] text-stone-400">01</span>
                  Campus Pulse
                </Link>
              </li>
              <li>
                <Link
                  href="/my-phoneprint"
                  className="text-stone-600 hover:text-[#1C1B18] transition-colors flex items-center gap-1.5"
                >
                  <span className="font-sora text-[10px] text-stone-400">02</span>
                  My PhonePrint
                </Link>
              </li>
              <li>
                <Link
                  href="/setlab"
                  className="text-stone-600 hover:text-[#1C1B18] transition-colors flex items-center gap-1.5"
                >
                  <span className="font-sora text-[10px] text-stone-400">03</span>
                  SetLab (Venn &amp; PIE)
                </Link>
              </li>
              <li>
                <Link
                  href="/combolab"
                  className="text-stone-600 hover:text-[#1C1B18] transition-colors flex items-center gap-1.5"
                >
                  <span className="font-sora text-[10px] text-stone-400">04</span>
                  ComboLab (C(7,3)=35)
                </Link>
              </li>
              <li>
                <Link
                  href="/experiment-studio"
                  className="text-stone-600 hover:text-[#1C1B18] transition-colors flex items-center gap-1.5"
                >
                  <span className="font-sora text-[10px] text-stone-400">05</span>
                  Experiment Studio
                </Link>
              </li>
              <li>
                <Link
                  href="/methodology"
                  className="text-stone-600 hover:text-[#1C1B18] transition-colors flex items-center gap-1.5"
                >
                  <span className="font-sora text-[10px] text-stone-400">06</span>
                  Methodology &amp; Proofs
                </Link>
              </li>
            </ul>
          </div>

          {/* Mathematical Pillars */}
          <div>
            <h4 className="font-heading font-bold text-[#1C1B18] text-sm mb-3">
              Mathematical Core
            </h4>
            <ul className="space-y-2 font-sora text-[11px] text-stone-600">
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                PIE Theorem Verification
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-stone-700" />
                Combinations C(7,3) = 35 triplets
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                Partition Conservation (N₃+N₂+N₁+N₀=N)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                Permutations P(7,3) = 210
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[#EAE3D5] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500 text-[11px] font-sans">
          <p>&copy; PhonePrint Analytics. Discrete Mathematics &amp; Preference Dynamics.</p>
          <div className="flex items-center gap-4 font-sora">
            <span>Warm Beige &amp; Cream Minimal Aesthetic</span>
            <span>&bull;</span>
            <span>Presentation Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
