"use client";

import React, { useState, useMemo } from "react";
import { Badge } from "@/components/ui/Badge";
import type {
  BudgetCombinationAnalysisResult,
  BudgetCombinationRow,
} from "@/types/experiment";

export interface BudgetCombinationTableProps {
  result: BudgetCombinationAnalysisResult;
  onSelectRow?: (row: BudgetCombinationRow) => void;
}

type TableFilter = "observed" | "all" | "voids";

export function BudgetCombinationTable({
  result,
  onSelectRow,
}: BudgetCombinationTableProps) {
  const { all35Rows, selectedBudgets, budgetTotals } = result;

  const [activeFilter, setActiveFilter] = useState<TableFilter>("observed");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRows = useMemo(() => {
    return all35Rows.filter((row) => {
      // 1. Status Filter
      if (activeFilter === "observed" && !row.isObservedOverall) return false;
      if (activeFilter === "voids" && row.isObservedOverall) return false;

      // 2. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesId = row.combinationId.toLowerCase().includes(q);
        const matchesFeature = row.features.some((f) =>
          f.toLowerCase().includes(q)
        );
        if (!matchesId && !matchesFeature) return false;
      }

      return true;
    });
  }, [all35Rows, activeFilter, searchQuery]);

  const countObserved = all35Rows.filter((r) => r.isObservedOverall).length;
  const countVoids = all35Rows.length - countObserved;

  return (
    <div className="rounded-3xl border border-[#EAE3D5] bg-white p-6 shadow-xs text-[#1C1B18] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F5F1E8] pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-base font-montserrat font-bold tracking-tight text-[#1C1B18]">
              Theoretical Space vs. Empirical Observations
            </h3>
            <Badge variant="cobalt">
              {filteredRows.length} of {all35Rows.length} Triplets Displayed
            </Badge>
          </div>
          <p className="text-xs text-[#78716C] mt-1 font-sans">
            Full enumeration of all C(7, 3) = 35 combinations mapped against selected budget tiers
          </p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D5]">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveFilter("observed")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-sora transition-all ${
              activeFilter === "observed"
                ? "bg-emerald-700 text-white shadow-xs font-bold"
                : "bg-white text-[#57534E] hover:text-[#1C1B18] border border-[#EAE3D5] font-medium"
            }`}
          >
            Observed in Dataset ({countObserved})
          </button>
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-sora transition-all ${
              activeFilter === "all"
                ? "bg-[#1C1B18] text-white shadow-xs font-bold"
                : "bg-white text-[#57534E] hover:text-[#1C1B18] border border-[#EAE3D5] font-medium"
            }`}
          >
            All 35 Theoretical Space ({all35Rows.length})
          </button>
          <button
            onClick={() => setActiveFilter("voids")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-sora transition-all ${
              activeFilter === "voids"
                ? "bg-[#57534E] text-white shadow-xs font-bold"
                : "bg-white text-[#57534E] hover:text-[#1C1B18] border border-[#EAE3D5] font-medium"
            }`}
          >
            Theoretical Voids ({countVoids})
          </button>
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Search by ID or feature..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-full border border-[#EAE3D5] bg-white px-4 text-xs text-[#1C1B18] placeholder-[#A8A29E] focus:border-[#1C1B18] focus:outline-none shadow-2xs font-sans"
          />
        </div>
      </div>

      {/* Results Table */}
      {filteredRows.length === 0 ? (
        <div className="p-10 text-center rounded-2xl border border-dashed border-[#EAE3D5] bg-[#FAF8F5]">
          <p className="text-sm text-[#1C1B18] font-montserrat font-bold">
            No combinations match criteria
          </p>
          <button
            onClick={() => {
              setActiveFilter("all");
              setSearchQuery("");
            }}
            className="mt-3 text-xs font-sora font-semibold text-blue-700 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#EAE3D5] bg-white max-h-[520px] shadow-2xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-[11px] font-sora font-semibold uppercase tracking-wider text-[#78716C] border-b border-[#EAE3D5] sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3.5 w-24">Triplet ID</th>
                <th className="px-4 py-3.5 min-w-56 font-montserrat">Canonical Feature Triplet</th>
                <th className="px-4 py-3.5 text-center w-28">Status</th>
                {selectedBudgets.map((b) => (
                  <th key={b} className="px-4 py-3.5 text-center min-w-28 font-sora">
                    <span className="block truncate font-bold text-[#1C1B18]">{b}</span>
                    <span className="text-[10px] text-[#A8A29E] font-medium block">
                      N = {budgetTotals[b] ?? 0}
                    </span>
                  </th>
                ))}
                <th className="px-4 py-3.5 text-center w-28 bg-[#FAF8F5] border-l border-[#EAE3D5] font-sora font-bold text-[#1C1B18]">
                  Total Cohort
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F1E8] font-medium">
              {filteredRows.map((row) => (
                <tr
                  key={row.combinationId}
                  onClick={() => onSelectRow?.(row)}
                  className={`hover:bg-[#FAF8F5] cursor-pointer transition-colors ${
                    row.isObservedOverall ? "" : "opacity-75 bg-[#FAF8F5]/40"
                  }`}
                >
                  {/* ID */}
                  <td className="px-4 py-3.5 font-sora font-bold text-[#1C1B18]">
                    {row.combinationId}
                  </td>

                  {/* Features */}
                  <td className="px-4 py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {row.features.map((f) => (
                        <span
                          key={f}
                          className="text-[11px] font-sora font-medium text-[#1C1B18] bg-[#FAF8F5] px-2 py-0.5 rounded-md border border-[#EAE3D5]"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="px-4 py-3.5 text-center">
                    {row.isObservedOverall ? (
                      <span className="font-sora text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        Observed
                      </span>
                    ) : (
                      <span className="font-sora text-[11px] font-medium text-[#78716C] bg-white border border-[#EAE3D5] px-2 py-0.5 rounded-full">
                        Void
                      </span>
                    )}
                  </td>

                  {/* Frequencies by Selected Budget */}
                  {selectedBudgets.map((b) => {
                    const count = row.frequenciesByBudget[b] ?? 0;
                    const pct = row.percentagesByBudget[b] ?? 0;

                    return (
                      <td key={b} className="px-4 py-3.5 text-center">
                        {count > 0 ? (
                          <div className="font-sora">
                            <span className="font-bold text-[#1C1B18]">
                              {count} resp.
                            </span>
                            <span className="text-[10px] text-emerald-800 block font-semibold">
                              {pct}% of tier
                            </span>
                          </div>
                        ) : (
                          <span className="text-[#A8A29E] font-sora text-xs">
                            0
                          </span>
                        )}
                      </td>
                    );
                  })}

                  {/* Total Cohort Frequency */}
                  <td className="px-4 py-3.5 text-center font-sora font-bold text-[#1C1B18] bg-[#FAF8F5] border-l border-[#EAE3D5]">
                    {row.totalObservedOverall > 0 ? (
                      <div>
                        <span>{row.totalObservedOverall}</span>
                        <span className="text-[10px] text-[#78716C] block font-sans font-normal">
                          {((row.totalObservedOverall / result.totalCohortSize) * 100).toFixed(1)}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-[#A8A29E]">0</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
