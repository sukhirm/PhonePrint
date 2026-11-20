"use client";

import React from "react";
import { BUDGET_RANGES, type BudgetRange } from "@/types/survey";

export interface BudgetCombinationControlsProps {
  selectedBudgets: readonly BudgetRange[];
  setSelectedBudgets: (budgets: BudgetRange[]) => void;
}

export function BudgetCombinationControls({
  selectedBudgets,
  setSelectedBudgets,
}: BudgetCombinationControlsProps) {
  const toggleBudget = (b: BudgetRange) => {
    if (selectedBudgets.includes(b)) {
      if (selectedBudgets.length > 1) {
        setSelectedBudgets(selectedBudgets.filter((budget) => budget !== b));
      }
    } else {
      setSelectedBudgets([...selectedBudgets, b]);
    }
  };

  return (
    <div className="rounded-3xl border border-[#EAE3D5] bg-[#FAF8F5] p-5 space-y-4 shadow-xs text-[#1C1B18]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EAE3D5] pb-2.5">
        <span className="text-xs font-montserrat font-bold uppercase tracking-wider text-[#1C1B18]">
          Select Budget Segments to Compare ({selectedBudgets.length} of {BUDGET_RANGES.length})
        </span>
        <div className="flex items-center gap-2 text-xs font-sora">
          <button
            onClick={() => setSelectedBudgets([...BUDGET_RANGES])}
            className="text-blue-700 hover:underline font-semibold"
          >
            All Segments
          </button>
          <span className="text-[#A8A29E]">|</span>
          <button
            onClick={() => setSelectedBudgets(["Under ₹15,000", "Above ₹60,000"])}
            className="text-blue-700 hover:underline font-semibold"
          >
            Extreme Tiers
          </button>
          <span className="text-[#A8A29E]">|</span>
          <button
            onClick={() => setSelectedBudgets(["₹15,000 - ₹30,000", "₹30,000 - ₹60,000"])}
            className="text-blue-700 hover:underline font-semibold"
          >
            Mid-Range Tiers
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {BUDGET_RANGES.map((b) => {
          const isSelected = selectedBudgets.includes(b);
          return (
            <button
              key={b}
              onClick={() => toggleBudget(b)}
              className={`p-3.5 rounded-2xl border text-center text-xs font-sora transition-all shadow-2xs ${
                isSelected
                  ? "border-[#1C1B18] bg-white ring-2 ring-[#1C1B18] font-bold text-[#1C1B18]"
                  : "border-[#EAE3D5] bg-white hover:bg-[#FAF8F5] hover:border-[#1C1B18] text-[#57534E] font-medium"
              }`}
            >
              {isSelected ? "✓ " : "+ "}
              {b}
            </button>
          );
        })}
      </div>
    </div>
  );
}
