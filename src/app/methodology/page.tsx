import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { KaTeXMath } from "@/components/ui/KaTeXMath";
import { getActiveDatasetInfo } from "@/lib/data/loader";
import {
  SMARTPHONE_BRANDS,
  BUDGET_RANGES,
  SMARTPHONE_FEATURES,
  PRIMARY_USES,
  OS_PREFERENCES,
} from "@/types/survey";

export default function MethodologyPage() {
  const datasetInfo = getActiveDatasetInfo();

  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        sectionCode="06"
        eyebrow="Academic Research Framework"
        title="Methodology & Data Architecture"
        description="Formal documentation of the survey design, discrete mathematical foundations, validation schemas, and offline data pipeline."
        badge={{ text: datasetInfo.badgeText, variant: datasetInfo.isDemo ? "cobalt" : "lime" }}
        actions={
          <Link href="/">
            <Button variant="outline" size="sm">
              &larr; Back to Campus Pulse
            </Button>
          </Link>
        }
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Core Constraints Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-[#EAE3D5] bg-white p-6 shadow-xs text-[#1C1B18] space-y-4">
            <div className="flex items-center justify-between border-b border-[#F5F1E8] pb-3">
              <div>
                <h3 className="text-base font-montserrat font-bold text-[#1C1B18]">
                  Approved 7-Feature Canonical Domain
                </h3>
                <p className="text-xs text-[#78716C] font-sans mt-0.5">
                  Uniform discrete domain for all survey choices
                </p>
              </div>
              <Badge variant="lime">Approved Domain</Badge>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-1">
              {SMARTPHONE_FEATURES.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D5] shadow-2xs"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1C1B18] text-white font-sora text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <span className="font-montserrat font-bold text-xs text-[#1C1B18]">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-[#78716C] border-t border-[#F5F1E8] pt-3 font-sans leading-relaxed">
              Each respondent selects <strong>exactly three distinct features</strong>. Non-distinct choices or counts other than three fail strict schema validation.
            </p>
          </div>

          <div className="rounded-3xl border border-[#EAE3D5] bg-white p-6 shadow-xs text-[#1C1B18] space-y-4">
            <div className="flex items-center justify-between border-b border-[#F5F1E8] pb-3">
              <div>
                <h3 className="text-base font-montserrat font-bold text-[#1C1B18]">
                  Mathematical Foundations
                </h3>
                <p className="text-xs text-[#78716C] font-sans mt-0.5">
                  Implemented in pure TypeScript modules decoupled from UI
                </p>
              </div>
              <Badge variant="cobalt">Pure Mathematics</Badge>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-5 space-y-2">
                <span className="text-[11px] font-sora font-semibold uppercase tracking-wider text-[#78716C] block">
                  1. Principle of Inclusion-Exclusion (PIE)
                </span>
                <KaTeXMath
                  math="|A \cup B| = |A| + |B| - |A \cap B|"
                  block
                  className="text-blue-700 font-bold text-base py-1"
                />
                <p className="text-xs text-[#57534E] font-sans">
                  Prevents double counting shared elements in overlapping consumer sets.
                </p>
              </div>

              <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-5 space-y-2">
                <span className="text-[11px] font-sora font-semibold uppercase tracking-wider text-[#78716C] block">
                  2. Combinatorial Feature Triplet Space
                </span>
                <KaTeXMath
                  math="\binom{n}{r} = \binom{7}{3} = \frac{7 \times 6 \times 5}{3 \times 2 \times 1} = 35"
                  block
                  className="text-emerald-700 font-bold text-base py-1"
                />
                <p className="text-xs text-[#57534E] font-sans">
                  The exact space of all possible 3-feature selections available to university participants.
                </p>
              </div>

              <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-5 space-y-2">
                <span className="text-[11px] font-sora font-semibold uppercase tracking-wider text-[#78716C] block">
                  3. Ordered Permutation Expansion
                </span>
                <KaTeXMath
                  math="P(7, 3) = \frac{7!}{(7-3)!} = 7 \times 6 \times 5 = 210"
                  block
                  className="text-purple-700 font-bold text-base py-1"
                />
                <p className="text-xs text-[#57534E] font-sans">
                  Total ordered priority ranking permutations across the 35 subsets.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Survey Data Fields Specification */}
        <div className="rounded-3xl border border-[#EAE3D5] bg-white p-6 shadow-xs text-[#1C1B18] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F5F1E8] pb-4">
            <div>
              <h3 className="text-base font-montserrat font-bold text-[#1C1B18]">
                Survey Data Model Specification
              </h3>
              <p className="text-xs text-[#78716C] font-sans mt-0.5">
                Six discrete attributes recorded per participant with strict schema validation
              </p>
            </div>
            <Badge variant="lime">Schema Integrity</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Field 1 */}
            <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-4.5 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-sora text-xs font-bold text-[#1C1B18]">response_id</span>
                <span className="font-sora text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">string</span>
              </div>
              <p className="text-xs text-[#57534E] font-sans">
                Unique alphanumeric identifier (e.g., <code>RESP_001</code>). Duplicate IDs strictly rejected.
              </p>
            </div>

            {/* Field 2 */}
            <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-4.5 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-sora text-xs font-bold text-[#1C1B18]">preferred_brand</span>
                <span className="font-sora text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">enum</span>
              </div>
              <p className="text-xs text-[#57534E] font-sans">
                {SMARTPHONE_BRANDS.join(", ")}
              </p>
            </div>

            {/* Field 3 */}
            <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-4.5 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-sora text-xs font-bold text-[#1C1B18]">budget_range</span>
                <span className="font-sora text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">enum</span>
              </div>
              <p className="text-xs text-[#57534E] font-sans">
                {BUDGET_RANGES.join(", ")}
              </p>
            </div>

            {/* Field 4 */}
            <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-4.5 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-sora text-xs font-bold text-[#1C1B18]">preferred_features</span>
                <span className="font-sora text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">[3 strings]</span>
              </div>
              <p className="text-xs text-[#57534E] font-sans">
                Exactly 3 distinct items from the 7 approved canonical features.
              </p>
            </div>

            {/* Field 5 */}
            <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-4.5 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-sora text-xs font-bold text-[#1C1B18]">primary_use</span>
                <span className="font-sora text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">enum</span>
              </div>
              <p className="text-xs text-[#57534E] font-sans">
                {PRIMARY_USES.join(", ")}
              </p>
            </div>

            {/* Field 6 */}
            <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-4.5 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-sora text-xs font-bold text-[#1C1B18]">os_preference</span>
                <span className="font-sora text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">enum</span>
              </div>
              <p className="text-xs text-[#57534E] font-sans">
                {OS_PREFERENCES.join(", ")}
              </p>
            </div>
          </div>
        </div>

        {/* Offline Pipeline Infographic */}
        <div className="rounded-3xl border border-[#EAE3D5] bg-white p-6 shadow-xs text-[#1C1B18] space-y-4">
          <div className="flex items-center justify-between border-b border-[#F5F1E8] pb-3">
            <div>
              <h3 className="text-base font-montserrat font-bold text-[#1C1B18]">
                Offline Data Processing Pipeline
              </h3>
              <p className="text-xs text-[#78716C] font-sans mt-0.5">
                Multi-stage validation ensuring mathematical invariants prior to browser hydration
              </p>
            </div>
            <Badge variant="cobalt">Deterministic</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D5] text-center space-y-2">
              <span className="font-sora text-[10px] font-bold text-stone-500 uppercase">Stage 01</span>
              <h4 className="font-montserrat font-bold text-xs text-[#1C1B18]">Data Ingestion</h4>
              <p className="text-[11px] text-[#78716C] font-sans">
                Raw survey responses exported as sanitized CSV / JSON.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D5] text-center space-y-2">
              <span className="font-sora text-[10px] font-bold text-blue-700 uppercase">Stage 02</span>
              <h4 className="font-montserrat font-bold text-xs text-[#1C1B18]">Schema Validation</h4>
              <p className="text-[11px] text-[#78716C] font-sans">
                Zod validation: exactly 3 distinct features per student.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D5] text-center space-y-2">
              <span className="font-sora text-[10px] font-bold text-emerald-700 uppercase">Stage 03</span>
              <h4 className="font-montserrat font-bold text-xs text-[#1C1B18]">Combinatorics Index</h4>
              <p className="text-[11px] text-[#78716C] font-sans">
                Pre-computes C(7, 3)=35 triplets and sets intersections.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#1C1B18] border border-[#1C1B18] text-center text-white space-y-2">
              <span className="font-sora text-[10px] font-bold text-[#FEF08A] uppercase">Stage 04</span>
              <h4 className="font-montserrat font-bold text-xs text-white">Hydrated Runtime</h4>
              <p className="text-[11px] text-stone-300 font-sans">
                Interactive real-time discrete mathematics engine in Next.js.
              </p>
            </div>
          </div>
        </div>

        {/* Dataset Disclaimer */}
        <Callout
          variant="highlight"
          title={datasetInfo.isDemo ? `Simulated Campus Dataset Notice (N=${datasetInfo.totalResponses})` : "Verified Empirical Survey Dataset Notice"}
        >
          {datasetInfo.isDemo ? (
            <>
              All data files currently loaded represent the calibrated benchmark dataset of {datasetInfo.totalResponses} student responses (<strong>SIMULATED CAMPUS DATA — N={datasetInfo.totalResponses}</strong>) tagged with <code>is_demo: true</code>. The records model realistic undergraduate preferences across all canonical brands, budget ranges, and 3-feature combinations to validate schema integrity, mathematical invariants, and interactive visual analytics.
            </>
          ) : (
            <>
              The application is currently operating on real survey data with <code>is_demo: false</code> ({datasetInfo.totalResponses} verified responses). Raw submissions were validated and cleaned through the offline pipeline.
            </>
          )}
        </Callout>
      </div>
    </div>
  );
}
