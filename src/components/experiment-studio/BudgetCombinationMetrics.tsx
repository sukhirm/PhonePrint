"use client";

import React from "react";
import type { BudgetCombinationAnalysisResult } from "@/types/experiment";

export interface BudgetCombinationMetricsProps {
  result: BudgetCombinationAnalysisResult;
}

export function BudgetCombinationMetrics({
  result,
}: BudgetCombinationMetricsProps) {
  const {
    totalTheoreticalCombinations,
    totalObservedInDataset,
    totalUnobservedInDataset,
    selectedBudgets,
    budgetTotals,
  } = result;

  const totalRespondentsInSelected = selectedBudgets.reduce(
    (acc, b) => acc + (budgetTotals[b] ?? 0),
    0
  );

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Theoretical Space */}
      <div className="rounded-3xl border border-[#EAE3D5] bg-white p-5 shadow-xs">
        <span className="text-[11px] font-sora font-semibold uppercase tracking-wider text-[#78716C] block">
          Theoretical Triplet Space
        </span>
        <div className="mt-2 font-sora text-3xl font-extrabold text-[#1C1B18]">
          {totalTheoreticalCombinations}
        </div>
        <span className="text-xs text-[#78716C] font-sans mt-1 block">
          C(7, 3) mathematical subsets
        </span>
      </div>

      {/* Observed Triplets */}
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-5 shadow-xs">
        <span className="text-[11px] font-sora font-semibold uppercase tracking-wider text-emerald-800 block">
          Observed in Dataset
        </span>
        <div className="mt-2 font-sora text-3xl font-extrabold text-emerald-900">
          {totalObservedInDataset}
        </div>
        <span className="text-xs text-emerald-800 font-semibold font-sora mt-1 block">
          {((totalObservedInDataset / totalTheoreticalCombinations) * 100).toFixed(1)}% space coverage
        </span>
      </div>

      {/* Unobserved Voids */}
      <div className="rounded-3xl border border-[#EAE3D5] bg-[#FAF8F5] p-5 shadow-xs">
        <span className="text-[11px] font-sora font-semibold uppercase tracking-wider text-[#78716C] block">
          Theoretical Voids
        </span>
        <div className="mt-2 font-sora text-3xl font-extrabold text-[#78716C]">
          {totalUnobservedInDataset}
        </div>
        <span className="text-xs text-[#78716C] font-sans mt-1 block">
          {((totalUnobservedInDataset / totalTheoreticalCombinations) * 100).toFixed(1)}% unchosen in cohort
        </span>
      </div>

      {/* Selected Segments Sample */}
      <div className="rounded-3xl border border-[#1C1B18] bg-[#1C1B18] p-5 shadow-xs text-white">
        <span className="text-[11px] font-sora font-semibold uppercase tracking-wider text-stone-300 block">
          Selected Segments Sample
        </span>
        <div className="mt-2 font-sora text-3xl font-extrabold text-[#FEF08A]">
          {totalRespondentsInSelected}
        </div>
        <span className="text-xs text-stone-300 font-sans mt-1 block">
          Across {selectedBudgets.length} budget tier{selectedBudgets.length > 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}
