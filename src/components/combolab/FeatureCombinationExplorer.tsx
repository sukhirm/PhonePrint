"use client";

import React, { useState, useMemo } from "react";
import { Badge } from "@/components/ui/Badge";
import {
  SMARTPHONE_FEATURES,
  type SmartphoneFeature,
} from "@/types/survey";
import type { FeatureCombinationRecord } from "@/types/math";

export interface FeatureCombinationExplorerProps {
  combinations: readonly FeatureCombinationRecord[];
  totalRespondents: number;
  onSelectCombination?: (combination: FeatureCombinationRecord) => void;
  selectedCombinationId?: string | null;
}

type FilterStatus = "all" | "observed" | "unobserved";

export function FeatureCombinationExplorer({
  combinations,
  totalRespondents,
  onSelectCombination,
  selectedCombinationId,
}: FeatureCombinationExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [featureFilter, setFeatureFilter] = useState<string>("all");

  const filteredCombinations = useMemo(() => {
    return combinations.filter((combo) => {
      // 1. Status Filter
      if (statusFilter === "observed" && !combo.isObserved) return false;
      if (statusFilter === "unobserved" && combo.isObserved) return false;

      // 2. Feature Filter
      if (
        featureFilter !== "all" &&
        !combo.features.includes(featureFilter as SmartphoneFeature)
      ) {
        return false;
      }

      // 3. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesId = combo.id.toLowerCase().includes(q);
        const matchesFeature = combo.features.some((f) =>
          f.toLowerCase().includes(q)
        );
        if (!matchesId && !matchesFeature) return false;
      }

      return true;
    });
  }, [combinations, statusFilter, featureFilter, searchQuery]);

  const observedCount = combinations.filter((c) => c.isObserved).length;
  const unobservedCount = combinations.length - observedCount;

  return (
    <div className="rounded-3xl border border-[#EAE3D5] bg-white p-6 shadow-xs text-[#1C1B18] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F5F1E8] pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-base font-montserrat font-bold tracking-tight text-[#1C1B18]">
              Combinatorial Triplet Space Explorer (All 35 Triplets)
            </h3>
            <Badge variant="cobalt">
              {filteredCombinations.length} of {combinations.length} Displayed
            </Badge>
          </div>
          <p className="text-xs text-[#78716C] mt-1 font-sans">
            Exhaustive lexicographic enumeration of C(7, 3) = 35 combinations mapped against {totalRespondents} survey observations
          </p>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D5]">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-sora transition-all ${
              statusFilter === "all"
                ? "bg-[#1C1B18] text-white shadow-xs font-bold"
                : "bg-white text-[#57534E] hover:text-[#1C1B18] border border-[#EAE3D5] font-medium"
            }`}
          >
            All Triplets ({combinations.length})
          </button>
          <button
            onClick={() => setStatusFilter("observed")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-sora transition-all ${
              statusFilter === "observed"
                ? "bg-emerald-700 text-white shadow-xs font-bold"
                : "bg-white text-[#57534E] hover:text-[#1C1B18] border border-[#EAE3D5] font-medium"
            }`}
          >
            Observed ({observedCount})
          </button>
          <button
            onClick={() => setStatusFilter("unobserved")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-sora transition-all ${
              statusFilter === "unobserved"
                ? "bg-[#57534E] text-white shadow-xs font-bold"
                : "bg-white text-[#57534E] hover:text-[#1C1B18] border border-[#EAE3D5] font-medium"
            }`}
          >
            Unobserved Voids ({unobservedCount})
          </button>
        </div>

        {/* Search & Feature Filter Dropdown */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <select
            value={featureFilter}
            onChange={(e) => setFeatureFilter(e.target.value)}
            className="h-9 w-full sm:w-auto rounded-full border border-[#EAE3D5] bg-white px-4 text-xs font-sora text-[#1C1B18] focus:border-[#1C1B18] focus:outline-none shadow-2xs"
          >
            <option value="all">Contains Any Feature</option>
            {SMARTPHONE_FEATURES.map((feature) => (
              <option key={feature} value={feature}>
                Contains: {feature}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search by ID or feature..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full sm:w-48 rounded-full border border-[#EAE3D5] bg-white px-4 text-xs text-[#1C1B18] placeholder-[#A8A29E] focus:border-[#1C1B18] focus:outline-none shadow-2xs font-sans"
          />
        </div>
      </div>

      {/* Combinations Grid */}
      {filteredCombinations.length === 0 ? (
        <div className="p-10 text-center rounded-2xl border border-dashed border-[#EAE3D5] bg-[#FAF8F5]">
          <p className="text-xs text-[#78716C] font-sans">
            No combinations match your current search and filter criteria.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
              setFeatureFilter("all");
            }}
            className="mt-3 text-xs text-blue-700 hover:underline font-sora font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5 max-h-[640px] overflow-y-auto pr-1">
          {filteredCombinations.map((combo) => {
            const isSelected = selectedCombinationId === combo.id;
            return (
              <div
                key={combo.id}
                onClick={() => onSelectCombination?.(combo)}
                className={`p-4 rounded-2xl border text-left cursor-pointer transition-all shadow-2xs ${
                  isSelected
                    ? "border-[#1C1B18] bg-white ring-2 ring-[#1C1B18]"
                    : combo.isObserved
                    ? "border-[#EAE3D5] bg-[#FAF8F5] hover:bg-white hover:border-[#1C1B18]"
                    : "border-[#EAE3D5]/80 bg-[#FAF8F5]/60 hover:bg-[#FAF8F5] hover:border-[#A8A29E]"
                }`}
              >
                {/* Top Bar: ID and Status */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-sora text-xs font-bold text-[#1C1B18] bg-white px-2.5 py-0.5 rounded-full border border-[#EAE3D5]">
                    {combo.id}
                  </span>
                  {combo.isObserved ? (
                    <span className="font-sora text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {combo.observedCount} resp. ({combo.observedPercentage}%)
                    </span>
                  ) : (
                    <span className="font-sora text-[11px] font-medium text-[#78716C] bg-white border border-[#EAE3D5] px-2.5 py-0.5 rounded-full">
                      0 resp. (Void)
                    </span>
                  )}
                </div>

                {/* Feature Badges */}
                <div className="space-y-1.5 my-3">
                  {combo.features.map((feature) => (
                    <div
                      key={feature}
                      className="text-xs font-sora font-medium text-[#1C1B18] bg-white px-2.5 py-1 rounded-md border border-[#EAE3D5] truncate"
                      title={feature}
                    >
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Footer info */}
                <div className="pt-2.5 mt-2 border-t border-[#EAE3D5]/80 flex items-center justify-between text-xs text-[#78716C] font-sans">
                  <span>
                    {combo.isObserved
                      ? `${combo.matchingRespondentIds.length} student${
                          combo.matchingRespondentIds.length > 1 ? "s" : ""
                        }`
                      : "Theoretical void"}
                  </span>
                  <span className="text-[#1C1B18] font-sora font-bold hover:underline text-[11px]">
                    Inspect &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
