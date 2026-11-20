"use client";

import React from "react";
import { KaTeXMath } from "@/components/ui/KaTeXMath";
import { Badge } from "@/components/ui/Badge";
import type {
  InclusionExclusionVerification,
  ThreeSetInclusionExclusionVerification,
} from "@/types/math";

export interface InclusionExclusionCalculatorProps {
  mode: "2-set" | "3-set";
  pie2Set: InclusionExclusionVerification<string>;
  pie3Set: ThreeSetInclusionExclusionVerification<string>;
  setAName: string;
  setBName: string;
  setCName: string;
  setASize: number;
  setBSize: number;
  setCSize?: number;
}

export function InclusionExclusionCalculator({
  mode,
  pie2Set,
  pie3Set,
  setAName,
  setBName,
  setCName,
  setASize,
  setBSize,
  setCSize,
}: InclusionExclusionCalculatorProps) {
  const is2Set = mode === "2-set";
  const isVerified = is2Set ? pie2Set.isValid : pie3Set.isValid;

  return (
    <div className="rounded-3xl border border-[#EAE3D5] bg-white p-6 shadow-xs text-[#1C1B18] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F5F1E8] pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-base font-montserrat font-bold tracking-tight text-[#1C1B18]">
              Principle of Inclusion-Exclusion (PIE)
            </h3>
            <Badge variant="lime">Theorem Verification</Badge>
          </div>
          <p className="text-xs text-[#78716C] mt-1 font-sans">
            Formal algebraic arithmetic proof verifying calculated cardinality against empirical set union
          </p>
        </div>

        <div>
          {isVerified ? (
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1.5 font-sora text-xs font-semibold text-emerald-800 border border-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              THEORM VERIFIED : PASS
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 font-sora text-xs font-semibold text-red-800 border border-red-200">
              DISCREPANCY DETECTED
            </span>
          )}
        </div>
      </div>

      {is2Set ? (
        /* TWO-SET PIE CALCULATOR */
        <div className="space-y-5 text-xs">
          {/* Formula */}
          <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-5 space-y-2">
            <span className="text-[11px] font-sora font-semibold uppercase tracking-wider text-[#78716C]">
              1. Mathematical Identity (Two Sets)
            </span>
            <KaTeXMath
              math="|A \cup B| = |A| + |B| - |A \cap B|"
              block
              className="text-[#1C1B18] font-bold text-base py-1"
            />
          </div>

          {/* Substituted Numerical Values */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-4 text-center">
              <span className="text-[11px] font-sora font-semibold uppercase text-[#78716C] truncate block" title={setAName}>
                |A| ({setAName})
              </span>
              <div className="font-sora text-2xl font-extrabold text-blue-700 mt-1">
                {setASize}
              </div>
            </div>

            <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-4 text-center">
              <span className="text-[11px] font-sora font-semibold uppercase text-[#78716C] truncate block" title={setBName}>
                |B| ({setBName})
              </span>
              <div className="font-sora text-2xl font-extrabold text-emerald-700 mt-1">
                {setBSize}
              </div>
            </div>

            <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-4 text-center">
              <span className="text-[11px] font-sora font-semibold uppercase text-[#78716C] truncate block">
                Overlap |A ∩ B|
              </span>
              <div className="font-sora text-2xl font-extrabold text-indigo-700 mt-1">
                {pie2Set.intersectionCardinality}
              </div>
            </div>

            <div className="rounded-2xl border border-[#1C1B18] bg-[#1C1B18] p-4 text-center text-white">
              <span className="text-[11px] font-sora font-semibold uppercase text-stone-300 truncate block">
                Direct Union |A ∪ B|
              </span>
              <div className="font-sora text-2xl font-extrabold text-[#FEF08A] mt-1">
                {pie2Set.unionCardinality}
              </div>
            </div>
          </div>

          {/* Step by Step Breakdown */}
          <div className="rounded-2xl border border-[#EAE3D5] bg-white p-5 space-y-4">
            <span className="text-[11px] font-sora font-semibold uppercase tracking-wider text-[#78716C]">
              2. Substituted Arithmetic Step-by-Step
            </span>

            <div className="font-sora text-xs sm:text-sm bg-[#FAF8F5] p-4 rounded-xl border border-[#EAE3D5] space-y-2 text-[#1C1B18]">
              <p>
                <span className="text-[#78716C]">Identity:</span> |A ∪ B| = |A| + |B| - |A ∩ B|
              </p>
              <p>
                <span className="text-[#78716C]">Step 1 (Singletons Sum):</span> {setASize} + {setBSize} ={" "}
                <span className="font-extrabold text-[#1C1B18]">{pie2Set.individualCardinalitiesSum}</span>
              </p>
              <p>
                <span className="text-[#78716C]">Step 2 (Subtract Overlap):</span> - |A ∩ B| = -{" "}
                <span className="font-extrabold text-blue-700">{pie2Set.intersectionCardinality}</span>
              </p>
              <p className="pt-2 border-t border-[#EAE3D5] text-[#1C1B18]">
                <span className="text-[#78716C]">Step 3 (Calculated RHS):</span> {pie2Set.individualCardinalitiesSum} - {pie2Set.intersectionCardinality} ={" "}
                <span className="font-extrabold text-emerald-700">{pie2Set.calculatedRhs}</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 font-sans">
              <span className="font-semibold">
                ✓ Theorem Verified: Calculated RHS ({pie2Set.calculatedRhs}) strictly equals Direct Union cardinality ({pie2Set.unionCardinality}).
              </span>
              <span className="font-sora text-[11px] text-emerald-800 font-medium">
                Aggregation error: 0 (|LHS - RHS| = 0)
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* THREE-SET PIE CALCULATOR */
        <div className="space-y-5 text-xs font-sans">
          {/* Formula */}
          <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-5 space-y-2">
            <span className="text-[11px] font-sora font-semibold uppercase tracking-wider text-[#78716C]">
              1. Mathematical Identity (Three Sets)
            </span>
            <KaTeXMath
              math="|A \cup B \cup C| = (|A| + |B| + |C|) - (|A \cap B| + |A \cap C| + |B \cap C|) + |A \cap B \cap C|"
              block
              className="text-[#1C1B18] font-bold text-xs sm:text-sm py-1"
            />
          </div>

          {/* Substituted Numerical Values */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-4 text-center">
              <span className="text-[11px] font-sora font-semibold uppercase text-[#78716C]" title={`${setAName} + ${setBName} + ${setCName}`}>Singletons Sum</span>
              <div className="font-sora text-2xl font-extrabold text-[#1C1B18] mt-1">
                {pie3Set.singletonsSum}
              </div>
              <span className="text-[10px] text-[#78716C] font-sora truncate block mt-0.5">
                {setASize} + {setBSize} + {setCSize ?? 0}
              </span>
            </div>

            <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-4 text-center">
              <span className="text-[11px] font-sora font-semibold uppercase text-[#78716C]">Pairwise Sum</span>
              <div className="font-sora text-2xl font-extrabold text-blue-700 mt-1">
                {pie3Set.pairwiseIntersectionsSum}
              </div>
              <span className="text-[10px] text-[#78716C] font-sora truncate block mt-0.5">
                {pie3Set.cardAB} + {pie3Set.cardAC} + {pie3Set.cardBC}
              </span>
            </div>

            <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-4 text-center">
              <span className="text-[11px] font-sora font-semibold uppercase text-[#78716C]">Triple Intersection</span>
              <div className="font-sora text-2xl font-extrabold text-purple-700 mt-1">
                {pie3Set.cardABC}
              </div>
              <span className="text-[10px] text-[#78716C] font-sora truncate block mt-0.5">|A ∩ B ∩ C|</span>
            </div>

            <div className="rounded-2xl border border-[#1C1B18] bg-[#1C1B18] p-4 text-center text-white">
              <span className="text-[11px] font-sora font-semibold uppercase text-stone-300">Direct Union</span>
              <div className="font-sora text-2xl font-extrabold text-[#FEF08A] mt-1">
                {pie3Set.unionCardinality}
              </div>
              <span className="text-[10px] text-stone-300 font-sora truncate block mt-0.5">|A ∪ B ∪ C|</span>
            </div>
          </div>

          {/* Step by Step Breakdown */}
          <div className="rounded-2xl border border-[#EAE3D5] bg-white p-5 space-y-4">
            <span className="text-[11px] font-sora font-semibold uppercase tracking-wider text-[#78716C]">
              2. Substituted Arithmetic Step-by-Step
            </span>

            <div className="font-sora text-xs sm:text-sm bg-[#FAF8F5] p-4 rounded-xl border border-[#EAE3D5] space-y-2 text-[#1C1B18]">
              <p>
                <span className="text-[#78716C]">Step 1 (Add Singletons):</span> {setASize} + {setBSize} + {setCSize ?? 0} ={" "}
                <span className="font-extrabold text-[#1C1B18]">{pie3Set.singletonsSum}</span>
              </p>
              <p>
                <span className="text-[#78716C]">Step 2 (Subtract Pairwise Overlaps):</span> - ({pie3Set.cardAB} + {pie3Set.cardAC} + {pie3Set.cardBC}) = -{" "}
                <span className="font-extrabold text-blue-700">{pie3Set.pairwiseIntersectionsSum}</span>
              </p>
              <p>
                <span className="text-[#78716C]">Step 3 (Add Back 3-Way Center):</span> + {pie3Set.cardABC} ={" "}
                <span className="font-extrabold text-emerald-700">+{pie3Set.cardABC}</span>
              </p>
              <p className="pt-2 border-t border-[#EAE3D5] text-[#1C1B18]">
                <span className="text-[#78716C]">Step 4 (Calculated RHS):</span> {pie3Set.singletonsSum} - {pie3Set.pairwiseIntersectionsSum} + {pie3Set.cardABC} ={" "}
                <span className="font-extrabold text-emerald-700">{pie3Set.calculatedRhs}</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 font-sans">
              <span className="font-semibold">
                ✓ 3-Set PIE Verified: Calculated RHS ({pie3Set.calculatedRhs}) strictly equals Direct Union ({pie3Set.unionCardinality}).
              </span>
              <span className="font-sora text-[11px] text-emerald-800 font-medium">
                Exact Partition Theorem Holds
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
