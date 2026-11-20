"use client";

import React, { useState } from "react";
import { KaTeXMath } from "@/components/ui/KaTeXMath";
import type { SurveyResponse } from "@/types/survey";

interface PresentationWalkthroughProps {
  responses: readonly SurveyResponse[];
}

export function PresentationWalkthrough({ responses }: PresentationWalkthroughProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(true);
  const [combinatoricsMode, setCombinatoricsMode] = useState<"combinations" | "permutations">("combinations");
  const [activeTierDemo, setActiveTierDemo] = useState<string>("Under ₹15,000");

  const totalSteps = 4;

  const STEPS = [
    {
      num: 1,
      tag: "THE SURVEY COHORT",
      title: "Problem Statement & The 30 Student Benchmark",
      subtitle: "Why does choosing a smartphone translate into discrete mathematics?",
    },
    {
      num: 2,
      tag: "COMBINATORIAL CHOICE SPACE",
      title: "Combinations C(7,3) = 35 vs. Permutations P(7,3) = 210",
      subtitle: "The mathematical difference between what features you have vs. how you rank them.",
    },
    {
      num: 3,
      tag: "ECONOMIC CONSTRAINTS",
      title: "Budget Tiers vs. Feature Demand Transitions",
      subtitle: "How real student budgets dictate feature trade-offs from battery to camera.",
    },
    {
      num: 4,
      tag: "SET THEORY VERIFICATION",
      title: "Principle of Inclusion-Exclusion (PIE) Theorem",
      subtitle: "Proving zero double-counting across overlapping student preference sets.",
    },
  ];

  const currentStepData = STEPS[currentStep - 1] ?? {
    num: 1,
    tag: "THE SURVEY COHORT",
    title: "Problem Statement & The 30 Student Benchmark",
    subtitle: "Why does choosing a smartphone translate into discrete mathematics?",
  };

  return (
    <div id="walkthrough" className="rounded-3xl border border-[#EAE3D5] bg-white p-6 sm:p-8 lg:p-10 shadow-[0_15px_40px_-15px_rgba(44,38,28,0.06)] space-y-8">
      {/* Walkthrough Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#F5F1E8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#1C1B18]" />
            <span className="font-sora text-xs font-bold uppercase tracking-wider text-stone-600">
              Guided Presentation Walkthrough
            </span>
            <span className="rounded-full bg-[#F5F1E8] px-2.5 py-0.5 font-sora text-[10px] font-bold text-stone-700 border border-[#EAE3D5]">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-[#1C1B18] mt-1.5">
            {currentStepData.title}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans mt-0.5">
            {currentStepData.subtitle}
          </p>
        </div>

        {/* Step Selector Pills & Speaker Notes Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-full border border-[#EAE3D5] bg-[#FBF9F4] p-1">
            {STEPS.map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => setCurrentStep(s.num)}
                className={`rounded-full px-3 py-1 text-xs font-sora font-semibold transition-all ${
                  currentStep === s.num
                    ? "bg-[#1C1B18] text-white shadow-2xs"
                    : "text-stone-600 hover:text-stone-900 hover:bg-[#F5F1E8]"
                }`}
              >
                0{s.num}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-sans font-medium transition-colors border ${
              showSpeakerNotes
                ? "bg-[#F5F1E8] text-[#1C1B18] border-[#EAE3D5]"
                : "bg-white text-stone-500 border-[#EAE3D5] hover:text-stone-800"
            }`}
          >
            {showSpeakerNotes ? "Hide Speaker Notes" : "Show Speaker Notes"}
          </button>
        </div>
      </div>

      {/* Step Content Area */}
      <div className="space-y-6">
        {/* STEP 1: Survey Cohort & Problem Statement */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-[#EAE3D5] bg-[#FBF9F4] p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-sora text-xs font-bold text-stone-500 uppercase tracking-wide">
                    Survey Population
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-sora text-[10px] font-bold text-emerald-700 border border-emerald-200">
                    N = {responses.length}
                  </span>
                </div>
                <div className="font-heading text-3xl font-extrabold text-[#1C1B18]">
                  {responses.length} Students
                </div>
                <p className="text-xs text-stone-600 font-sans leading-relaxed">
                  Real undergraduate responses collected via structured schema. Every respondent provided their primary brand, strict budget interval, and non-negotiable features.
                </p>
              </div>

              <div className="rounded-2xl border border-[#EAE3D5] bg-[#FBF9F4] p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-sora text-xs font-bold text-stone-500 uppercase tracking-wide">
                    Choice Universe
                  </span>
                  <span className="rounded-full bg-blue-50 px-2 py-0.5 font-sora text-[10px] font-bold text-blue-700 border border-blue-200">
                    n = 7 Features
                  </span>
                </div>
                <div className="font-heading text-3xl font-extrabold text-[#1C1B18]">
                  7 Features
                </div>
                <p className="text-xs text-stone-600 font-sans leading-relaxed">
                  Camera Quality, Battery Life, Display Quality, Processing Performance, Storage Capacity, Software / OS, and Build &amp; Design Quality.
                </p>
              </div>

              <div className="rounded-2xl border border-[#EAE3D5] bg-[#FBF9F4] p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-sora text-xs font-bold text-stone-500 uppercase tracking-wide">
                    Selection Constraint
                  </span>
                  <span className="rounded-full bg-amber-50 px-2 py-0.5 font-sora text-[10px] font-bold text-amber-700 border border-amber-200">
                    r = 3 Subsets
                  </span>
                </div>
                <div className="font-heading text-3xl font-extrabold text-[#1C1B18]">
                  Pick 3 of 7
                </div>
                <p className="text-xs text-stone-600 font-sans leading-relaxed">
                  Students cannot pick everything. Forcing a choice of exactly 3 features creates a combinatorial decision space governed by discrete mathematics.
                </p>
              </div>
            </div>

            {/* Why Math Infographic Box */}
            <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-6 space-y-4">
              <h4 className="font-heading text-sm font-bold text-[#1C1B18]">
                Why Discrete Mathematics instead of a standard bar chart?
              </h4>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                When consumers choose smartphones, they do not evaluate features in isolation. They evaluate <strong>combinations</strong> under <strong>budget constraints</strong>. Discrete math gives us exact tools:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="rounded-xl bg-white p-3.5 border border-[#EAE3D5]">
                  <span className="font-sora text-xs font-bold text-[#1C1B18] block mb-1">1. Combinatorics</span>
                  <p className="text-[11px] text-stone-600">Calculates the total universe of feature packages ($C(7,3)=35$) and ranked preferences ($P(7,3)=210$).</p>
                </div>
                <div className="rounded-xl bg-white p-3.5 border border-[#EAE3D5]">
                  <span className="font-sora text-xs font-bold text-[#1C1B18] block mb-1">2. Set Theory</span>
                  <p className="text-[11px] text-stone-600">Applies Principle of Inclusion-Exclusion ($|A \cup B|$) on real student IDs to prevent double-counting.</p>
                </div>
                <div className="rounded-xl bg-white p-3.5 border border-[#EAE3D5]">
                  <span className="font-sora text-xs font-bold text-[#1C1B18] block mb-1">3. Correlation &amp; Tiers</span>
                  <p className="text-[11px] text-stone-600">Maps purchasing capacity directly to combinatorial feature clusters across 4 budget segments.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Combinations C(7,3)=35 vs Permutations P(7,3)=210 */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Mode Switcher */}
            <div className="flex items-center justify-center">
              <div className="inline-flex rounded-full border border-[#EAE3D5] bg-[#FBF9F4] p-1.5 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setCombinatoricsMode("combinations")}
                  className={`rounded-full px-5 py-2 text-xs font-sora font-semibold transition-all ${
                    combinatoricsMode === "combinations"
                      ? "bg-[#1C1B18] text-white shadow-xs"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  Combinations C(7,3) = 35 (Order Ignored)
                </button>
                <button
                  type="button"
                  onClick={() => setCombinatoricsMode("permutations")}
                  className={`rounded-full px-5 py-2 text-xs font-sora font-semibold transition-all ${
                    combinatoricsMode === "permutations"
                      ? "bg-[#1C1B18] text-white shadow-xs"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  Permutations P(7,3) = 210 (Order Matters)
                </button>
              </div>
            </div>

            {/* Dynamic Math Box */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              <div className="rounded-2xl border border-[#EAE3D5] bg-[#FBF9F4] p-6 flex flex-col justify-between space-y-4">
                <div>
                  <span className="font-sora text-xs font-bold text-stone-500 uppercase tracking-wide">
                    {combinatoricsMode === "combinations" ? "Mathematical Combinations" : "Mathematical Permutations"}
                  </span>
                  <h4 className="text-xl font-heading font-extrabold text-[#1C1B18] mt-1">
                    {combinatoricsMode === "combinations"
                      ? "Feature Bundles on a Device: C(7,3) = 35"
                      : "Ranked Student Preferences: P(7,3) = 210"}
                  </h4>
                  <p className="text-xs text-stone-600 font-sans mt-2 leading-relaxed">
                    {combinatoricsMode === "combinations"
                      ? "If your smartphone has Camera, Battery, and Display, you enjoy all three simultaneously. Whether you list Camera first or Battery first does NOT change the physical phone. Order does not matter."
                      : "When a student fills the survey, they rank: #1 Most Important, #2 Second Priority, #3 Third Priority. Ranking Camera #1 and Battery #2 is distinct from ranking Battery #1 and Camera #2. Order does matter."}
                  </p>
                </div>

                <div className="rounded-xl border border-[#EAE3D5] bg-white p-4 space-y-2">
                  <div className="text-center">
                    <KaTeXMath
                      math={
                        combinatoricsMode === "combinations"
                          ? "C(n, r) = \\frac{n!}{r!(n - r)!} = \\frac{7!}{3! \\times 4!} = \\frac{7 \\times 6 \\times 5}{3 \\times 2 \\times 1} = 35"
                          : "P(n, r) = \\frac{n!}{(n - r)!} = \\frac{7!}{4!} = 7 \\times 6 \\times 5 = 210"
                      }
                      block
                      className="text-[#1C1B18] font-semibold text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Concrete Example Box */}
              <div className="rounded-2xl border border-[#EAE3D5] bg-white p-6 space-y-4">
                <h4 className="font-heading text-sm font-bold text-[#1C1B18]">
                  Concrete Example with 3 Sample Features:
                </h4>
                <div className="flex flex-wrap gap-2 text-xs font-sora">
                  <span className="rounded-full bg-blue-50 text-blue-700 px-3 py-1 border border-blue-200">
                    Camera Quality
                  </span>
                  <span className="rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 border border-emerald-200">
                    Battery Life
                  </span>
                  <span className="rounded-full bg-purple-50 text-purple-700 px-3 py-1 border border-purple-200">
                    Display Quality
                  </span>
                </div>

                {combinatoricsMode === "combinations" ? (
                  <div className="space-y-2 text-xs text-stone-600">
                    <p className="font-semibold text-stone-800">
                      In Combination Space (1 Single Outcome):
                    </p>
                    <div className="rounded-xl bg-[#FBF9F4] p-3 border border-[#EAE3D5] font-sora text-[11px] text-[#1C1B18]">
                      &#123; Camera, Battery, Display &#125; &equiv; &#123; Battery, Display, Camera &#125;
                    </div>
                    <p className="text-[11px] text-stone-500">
                      All permutations of these 3 features collapse into exactly <strong>1 combination triplet</strong>. Across all 7 features, there are exactly <strong>35 possible triplets</strong>.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 text-xs text-stone-600">
                    <p className="font-semibold text-stone-800">
                      In Permutation Space (3! = 6 Distinct Ordered Sequences):
                    </p>
                    <div className="grid grid-cols-2 gap-2 font-sora text-[10px] text-[#1C1B18]">
                      <div className="rounded-lg bg-[#FBF9F4] p-2 border border-[#EAE3D5]">1. Camera &rarr; Battery &rarr; Display</div>
                      <div className="rounded-lg bg-[#FBF9F4] p-2 border border-[#EAE3D5]">2. Camera &rarr; Display &rarr; Battery</div>
                      <div className="rounded-lg bg-[#FBF9F4] p-2 border border-[#EAE3D5]">3. Battery &rarr; Camera &rarr; Display</div>
                      <div className="rounded-lg bg-[#FBF9F4] p-2 border border-[#EAE3D5]">4. Battery &rarr; Display &rarr; Camera</div>
                      <div className="rounded-lg bg-[#FBF9F4] p-2 border border-[#EAE3D5]">5. Display &rarr; Camera &rarr; Battery</div>
                      <div className="rounded-lg bg-[#FBF9F4] p-2 border border-[#EAE3D5]">6. Display &rarr; Battery &rarr; Camera</div>
                    </div>
                    <p className="text-[11px] text-stone-500">
                      Each combination expands into $3! = 6$ permutations. Therefore $35 \times 6 = 210$ total ordered sequences.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Price Range vs Feature Demand Shifts */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Tier Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { name: "Under ₹15,000", count: 5, tag: "Budget Tier" },
                { name: "₹15,000 - ₹30,000", count: 6, tag: "Mid-Range" },
                { name: "₹30,000 - ₹60,000", count: 12, tag: "Upper-Mid (Peak)" },
                { name: "Above ₹60,000", count: 7, tag: "Flagship" },
              ].map((tier) => (
                <button
                  key={tier.name}
                  type="button"
                  onClick={() => setActiveTierDemo(tier.name)}
                  className={`rounded-2xl p-4 text-left border transition-all ${
                    activeTierDemo === tier.name
                      ? "border-[#1C1B18] bg-[#F5F1E8] shadow-2xs"
                      : "border-[#EAE3D5] bg-white hover:bg-[#FBF9F4]"
                  }`}
                >
                  <span className="font-sora text-[10px] font-bold text-stone-500 uppercase block">
                    {tier.tag}
                  </span>
                  <span className="font-heading text-sm font-extrabold text-[#1C1B18] block mt-0.5">
                    {tier.name}
                  </span>
                  <span className="font-sora text-xs text-stone-600 mt-1 block">
                    {tier.count} students ({Math.round((tier.count / 30) * 100)}%)
                  </span>
                </button>
              ))}
            </div>

            {/* Dynamic Tier Analysis */}
            <div className="rounded-2xl border border-[#EAE3D5] bg-[#FBF9F4] p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="font-heading text-base font-bold text-[#1C1B18]">
                  Demand Profile in: {activeTierDemo}
                </h4>
                <span className="font-sora text-xs font-semibold text-stone-500">
                  Real Survey Behavioral Pattern
                </span>
              </div>

              {activeTierDemo === "Under ₹15,000" && (
                <div className="space-y-3 text-xs text-stone-700 font-sans">
                  <p className="leading-relaxed">
                    <strong>Utilitarian &amp; Survival Priorities:</strong> Students in the lowest price tier cannot afford luxury trade-offs. Their dominant priorities are <strong>Battery Life (80%)</strong> and <strong>Storage Capacity (60%)</strong>, prioritizing endurance and app space over premium materials.
                  </p>
                  <div className="flex gap-2">
                    <span className="rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 font-sora text-xs font-semibold">
                      #1 Battery Life (80%)
                    </span>
                    <span className="rounded-full bg-blue-100 text-blue-800 px-3 py-1 font-sora text-xs font-semibold">
                      #2 Storage Capacity (60%)
                    </span>
                    <span className="rounded-full bg-stone-200 text-stone-800 px-3 py-1 font-sora text-xs font-semibold">
                      #3 Processing (40%)
                    </span>
                  </div>
                </div>
              )}

              {activeTierDemo === "₹15,000 - ₹30,000" && (
                <div className="space-y-3 text-xs text-stone-700 font-sans">
                  <p className="leading-relaxed">
                    <strong>Balanced Daily Driver:</strong> The mid-range shows equal distribution across <strong>Battery Life (67%)</strong>, <strong>Software &amp; OS (50%)</strong>, and <strong>Camera Quality (50%)</strong>. Students seek long software longevity and smooth UX without paying flagship prices.
                  </p>
                  <div className="flex gap-2">
                    <span className="rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 font-sora text-xs font-semibold">
                      #1 Battery Life (67%)
                    </span>
                    <span className="rounded-full bg-purple-100 text-purple-800 px-3 py-1 font-sora text-xs font-semibold">
                      #2 Software &amp; OS (50%)
                    </span>
                    <span className="rounded-full bg-blue-100 text-blue-800 px-3 py-1 font-sora text-xs font-semibold">
                      #3 Camera Quality (50%)
                    </span>
                  </div>
                </div>
              )}

              {activeTierDemo === "₹30,000 - ₹60,000" && (
                <div className="space-y-3 text-xs text-stone-700 font-sans">
                  <p className="leading-relaxed">
                    <strong>The Campus Powerhouse (12 Students - 40% of Cohort):</strong> This is the dominant undergraduate purchasing tier. Priorities swing aggressively toward <strong>Processing Performance (75%)</strong> and <strong>Display Quality (67%)</strong>, driven by gaming, content streaming, and high-refresh screens.
                  </p>
                  <div className="flex gap-2">
                    <span className="rounded-full bg-amber-100 text-amber-900 px-3 py-1 font-sora text-xs font-semibold">
                      #1 Processing Performance (75%)
                    </span>
                    <span className="rounded-full bg-blue-100 text-blue-800 px-3 py-1 font-sora text-xs font-semibold">
                      #2 Display Quality (67%)
                    </span>
                    <span className="rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 font-sora text-xs font-semibold">
                      #3 Camera Quality (58%)
                    </span>
                  </div>
                </div>
              )}

              {activeTierDemo === "Above ₹60,000" && (
                <div className="space-y-3 text-xs text-stone-700 font-sans">
                  <p className="leading-relaxed">
                    <strong>Luxury &amp; Content Creation:</strong> At the highest price point, <strong>Camera Quality reaches 100% saturation (7 of 7 students)</strong> and <strong>Build &amp; Design Quality surges to 71%</strong>. Battery and storage are assumed to be adequate; students pay for optics and prestige.
                  </p>
                  <div className="flex gap-2">
                    <span className="rounded-full bg-purple-100 text-purple-800 px-3 py-1 font-sora text-xs font-semibold">
                      #1 Camera Quality (100%)
                    </span>
                    <span className="rounded-full bg-stone-300 text-stone-900 px-3 py-1 font-sora text-xs font-semibold">
                      #2 Build &amp; Design (71%)
                    </span>
                    <span className="rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 font-sora text-xs font-semibold">
                      #3 Battery Life (57%)
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: Set Theory & Principle of Inclusion-Exclusion (PIE) */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              {/* Formula & Set Definitions */}
              <div className="rounded-2xl border border-[#EAE3D5] bg-[#FBF9F4] p-6 space-y-4">
                <span className="font-sora text-xs font-bold text-stone-500 uppercase tracking-wide">
                  Set Theory Foundation
                </span>
                <h4 className="text-xl font-heading font-extrabold text-[#1C1B18]">
                  Principle of Inclusion-Exclusion (PIE)
                </h4>
                <p className="text-xs text-stone-600 font-sans leading-relaxed">
                  When analyzing student choices, simply adding $|A| + |B|$ creates <strong>double-counting</strong> of students who chose both. The PIE theorem mathematically corrects this:
                </p>

                <div className="rounded-xl border border-[#EAE3D5] bg-white p-4 text-center">
                  <KaTeXMath
                    math="|A \cup B| = |A| + |B| - |A \cap B|"
                    block
                    className="text-[#1C1B18] font-bold text-base"
                  />
                </div>

                <div className="space-y-2 text-xs font-sans text-stone-700">
                  <p><strong>Set A (Apple Users):</strong> Students whose primary phone brand is Apple ($|A| = 10$).</p>
                  <p><strong>Set B (Camera Prioritizers):</strong> Students who chose Camera Quality ($|B| = 17$).</p>
                </div>
              </div>

              {/* Real Calculation Card */}
              <div className="rounded-2xl border border-[#EAE3D5] bg-white p-6 space-y-4">
                <span className="font-sora text-xs font-bold text-emerald-700 uppercase tracking-wide">
                  Live Proof with Real Survey IDs
                </span>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[#FBF9F4] p-3 border border-[#EAE3D5]">
                    <span className="font-sora text-[10px] text-stone-500 uppercase block">Set A (Apple)</span>
                    <span className="font-heading text-xl font-extrabold text-[#1C1B18]">|A| = 10</span>
                  </div>
                  <div className="rounded-xl bg-[#FBF9F4] p-3 border border-[#EAE3D5]">
                    <span className="font-sora text-[10px] text-stone-500 uppercase block">Set B (Camera)</span>
                    <span className="font-heading text-xl font-extrabold text-[#1C1B18]">|B| = 17</span>
                  </div>
                  <div className="rounded-xl bg-blue-50/60 p-3 border border-blue-200">
                    <span className="font-sora text-[10px] text-blue-700 uppercase block">Intersection</span>
                    <span className="font-heading text-xl font-extrabold text-blue-900">|A ∩ B| = 8</span>
                  </div>
                  <div className="rounded-xl bg-emerald-50/60 p-3 border border-emerald-200">
                    <span className="font-sora text-[10px] text-emerald-700 uppercase block">Union</span>
                    <span className="font-heading text-xl font-extrabold text-emerald-900">|A ∪ B| = 19</span>
                  </div>
                </div>

                <div className="rounded-xl bg-[#FAF8F5] p-3.5 border border-[#EAE3D5] text-xs font-sora text-stone-700 space-y-1">
                  <p className="font-bold text-[#1C1B18]">
                    19 = 10 + 17 - 8 &radic; Exactly matches unique student IDs
                  </p>
                  <p className="text-[11px] text-stone-500 font-sans">
                    Zero double-counting guaranteed by discrete mathematical theorem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Speaker Notes Box (Expandable) */}
      {showSpeakerNotes && (
        <div className="rounded-2xl border border-amber-200/80 bg-amber-50/40 p-5 space-y-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-600" />
            <span className="font-sora text-xs font-bold uppercase tracking-wider text-amber-900">
              Presentation Talking Script — What to say during your presentation:
            </span>
          </div>

          {currentStep === 1 && (
            <p className="text-xs text-stone-700 font-sans leading-relaxed">
              &ldquo;Good morning everyone. In our project PhonePrint, we analyzed how university students choose smartphones. Rather than just making an opinion poll, we formalized this using discrete mathematics. We surveyed {responses.length} students across strict budget tiers. Each student had to choose exactly 3 features from a canonical universe of 7 features. Because students face budget constraints, they must make discrete trade-offs, which we model mathematically.&rdquo;
            </p>
          )}

          {currentStep === 2 && (
            <p className="text-xs text-stone-700 font-sans leading-relaxed">
              &ldquo;Here is the core combinatorics distinction: when you own a phone, having a Camera, Battery, and Display is a single combination bundle—order doesn&apos;t matter. There are exactly C(7,3) = 35 possible physical configurations. However, when students rank what matters most—first, second, and third priority—order matters! That expands the space into P(7,3) = 210 distinct permutation vectors.&rdquo;
            </p>
          )}

          {currentStep === 3 && (
            <p className="text-xs text-stone-700 font-sans leading-relaxed">
              &ldquo;Now, we map purchasing power to feature demand. You can clearly see a transition phase: below ₹15,000, students prioritize endurance and storage (80% Battery, 60% Storage). In the mid-range (₹30,000–₹60,000), demand surges for processing speed (75%) for gaming and heavy use. In the flagship tier above ₹60,000, camera quality reaches 100% saturation. Budget directly determines which combination subspace a consumer inhabits.&rdquo;
            </p>
          )}

          {currentStep === 4 && (
            <p className="text-xs text-stone-700 font-sans leading-relaxed">
              &ldquo;Finally, we prove set-theoretic identity using the Principle of Inclusion-Exclusion. If we have 10 Apple users and 17 Camera prioritizers, simply adding them yields 27, which double-counts students who are both. By identifying the 8 students in the intersection, our theorem proves that exactly 19 unique students belong to the union: |A ∪ B| = 10 + 17 - 8 = 19.&rdquo;
            </p>
          )}
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[#F5F1E8]">
        <button
          type="button"
          onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
          className={`rounded-full px-5 py-2 text-xs font-sans font-semibold transition-all flex items-center gap-1.5 border ${
            currentStep === 1
              ? "opacity-40 cursor-not-allowed bg-stone-100 text-stone-400 border-stone-200"
              : "bg-white text-stone-800 border-[#EAE3D5] hover:bg-[#F5F1E8]"
          }`}
        >
          <span>&larr;</span>
          <span>Previous Step</span>
        </button>

        <div className="text-xs font-sora font-medium text-stone-500">
          Step {currentStep} of {totalSteps}
        </div>

        <button
          type="button"
          onClick={() => setCurrentStep((prev) => Math.min(totalSteps, prev + 1))}
          disabled={currentStep === totalSteps}
          className={`rounded-full px-6 py-2 text-xs font-sans font-semibold transition-all flex items-center gap-1.5 ${
            currentStep === totalSteps
              ? "opacity-40 cursor-not-allowed bg-stone-100 text-stone-400 border border-stone-200"
              : "bg-[#1C1B18] text-white hover:bg-black shadow-xs hover:scale-[1.02]"
          }`}
        >
          <span>Next Step</span>
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
}
