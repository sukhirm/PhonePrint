"use client";

import React, { useState, useMemo } from "react";
import type { SurveyResponse } from "@/types/survey";

export interface SetRespondentExplorerProps {
  matchingIds: Set<string>;
  allResponses: readonly SurveyResponse[];
  operationName: string;
  setExplanation: string;
}

export function SetRespondentExplorer({
  matchingIds,
  allResponses,
  operationName,
  setExplanation,
}: SetRespondentExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"cards" | "compact">("cards");

  // Filter full survey records belonging to the matching ID set
  const matchingResponses = useMemo(() => {
    return allResponses.filter((resp) => matchingIds.has(resp.response_id));
  }, [allResponses, matchingIds]);

  // Apply user's search query across IDs, brands, features, and primary use
  const filteredResponses = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchingResponses;

    return matchingResponses.filter((r) => {
      return (
        r.response_id.toLowerCase().includes(q) ||
        r.preferred_brand.toLowerCase().includes(q) ||
        r.primary_use.toLowerCase().includes(q) ||
        r.preferred_features.some((f) => f.toLowerCase().includes(q))
      );
    });
  }, [matchingResponses, searchQuery]);

  // Compute breakdown by Brand in this subset
  const brandBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const r of matchingResponses) {
      counts[r.preferred_brand] = (counts[r.preferred_brand] || 0) + 1;
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [matchingResponses]);

  return (
    <div className="rounded-3xl border border-[#EAE3D5] bg-white p-6 shadow-xs text-[#1C1B18] space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#F5F1E8] pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-base font-montserrat font-bold tracking-tight text-[#1C1B18]">
              Matching Respondent Cohort
            </h3>
            <span className="font-sora text-xs font-bold text-[#1C1B18] bg-[#FAF8F5] border border-[#EAE3D5] px-3 py-1 rounded-full">
              {matchingIds.size} {matchingIds.size === 1 ? "Student" : "Students"} Matched
            </span>
          </div>
          <p className="text-xs text-[#78716C] mt-1 font-sans">
            {operationName} &bull; {setExplanation}
          </p>
        </div>

        {/* View Toggle and Search input */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center rounded-full bg-[#FAF8F5] border border-[#EAE3D5] p-1">
            <button
              onClick={() => setViewMode("cards")}
              className={`px-3 py-1 rounded-full text-xs font-sora font-semibold transition-all ${
                viewMode === "cards"
                  ? "bg-[#1C1B18] text-white shadow-xs"
                  : "text-[#78716C] hover:text-[#1C1B18]"
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode("compact")}
              className={`px-3 py-1 rounded-full text-xs font-sora font-semibold transition-all ${
                viewMode === "compact"
                  ? "bg-[#1C1B18] text-white shadow-xs"
                  : "text-[#78716C] hover:text-[#1C1B18]"
              }`}
            >
              Compact
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search ID, brand, feature..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={matchingIds.size === 0}
              className="w-full rounded-full border border-[#EAE3D5] bg-[#FAF8F5] px-4 py-1.5 text-xs text-[#1C1B18] placeholder-[#A8A29E] focus:border-[#1C1B18] focus:bg-white focus:outline-none transition-all disabled:opacity-50 font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#78716C] hover:text-[#1C1B18]"
              >
                &times;
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Cohort Infographic Bar (if matching > 0) */}
      {matchingResponses.length > 0 && brandBreakdown.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D5] flex flex-wrap items-center gap-2 text-xs">
          <span className="font-sora text-[11px] font-semibold text-[#78716C] uppercase tracking-wider">
            Brand Composition:
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {brandBreakdown.map(([brand, count]) => (
              <span
                key={brand}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#EAE3D5] font-sora text-[11px] text-[#1C1B18] shadow-2xs"
              >
                <span className="font-bold">{brand}</span>
                <span className="text-blue-700 font-extrabold">{count}</span>
                <span className="text-[#A8A29E]">
                  ({((count / matchingResponses.length) * 100).toFixed(0)}%)
                </span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Results View */}
      {matchingIds.size === 0 ? (
        /* Empty Set State */
        <div className="rounded-2xl border border-dashed border-[#EAE3D5] bg-[#FAF8F5] p-10 text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EAE3D5] text-[#1C1B18] font-sora text-xl font-bold">
            &empty;
          </div>
          <h4 className="font-montserrat font-bold text-[#1C1B18] text-sm">Empty Set (&empty;)</h4>
          <p className="text-xs text-[#78716C] max-w-md mx-auto leading-relaxed font-sans">
            No students in the active benchmark cohort ({allResponses.length} respondents) satisfy this discrete set condition. In set theory, the cardinality is strictly |S| = 0.
          </p>
        </div>
      ) : filteredResponses.length === 0 ? (
        /* Filter Empty State */
        <div className="rounded-2xl bg-[#FAF8F5] p-8 text-center text-xs text-[#78716C] font-sans border border-[#EAE3D5]">
          No respondents match &ldquo;{searchQuery}&rdquo; within this subset of {matchingIds.size} respondents.
        </div>
      ) : viewMode === "cards" ? (
        /* Bento Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredResponses.map((r) => (
            <div
              key={r.response_id}
              className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-4 hover:border-[#1C1B18] hover:bg-white transition-all space-y-3 shadow-2xs"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-[#EAE3D5]/60 pb-2.5">
                <span className="font-sora text-xs font-bold text-[#1C1B18] bg-white px-2.5 py-0.5 rounded-full border border-[#EAE3D5]">
                  {r.response_id}
                </span>
                <span className="font-montserrat text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  {r.preferred_brand}
                </span>
              </div>

              {/* Attributes */}
              <div className="flex items-center justify-between text-xs text-[#78716C] font-sans">
                <span className="font-sora text-[11px] font-medium text-[#1C1B18]">
                  {r.budget_range}
                </span>
                <span className="text-[11px] text-[#78716C]">
                  {r.primary_use} &bull; {r.os_preference}
                </span>
              </div>

              {/* 3 Features Chips */}
              <div className="space-y-1">
                <span className="text-[10px] font-sora font-semibold uppercase tracking-wider text-[#A8A29E] block">
                  Chosen Triplet (3 of 7):
                </span>
                <div className="flex flex-wrap gap-1">
                  {r.preferred_features.map((feat, i) => (
                    <span
                      key={i}
                      className="font-sora text-[10px] font-semibold text-[#1C1B18] bg-white px-2 py-0.5 rounded-md border border-[#EAE3D5]"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Compact List View */
        <div className="divide-y divide-[#F5F1E8] border border-[#EAE3D5] rounded-2xl bg-white overflow-hidden">
          {filteredResponses.map((r) => (
            <div
              key={r.response_id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 hover:bg-[#FAF8F5] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-sora text-xs font-bold text-[#1C1B18] bg-[#FAF8F5] px-2.5 py-1 rounded-full border border-[#EAE3D5]">
                  {r.response_id}
                </span>
                <span className="font-montserrat text-xs font-bold text-blue-700">
                  {r.preferred_brand}
                </span>
                <span className="font-sora text-[11px] text-[#78716C]">
                  {r.budget_range}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {r.preferred_features.map((feat, i) => (
                  <span
                    key={i}
                    className="font-sora text-[10px] font-medium text-[#1C1B18] bg-[#FAF8F5] px-2 py-0.5 rounded-md border border-[#EAE3D5]"
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#78716C] pt-2 font-sans border-t border-[#F5F1E8]">
        <span>
          Showing {filteredResponses.length} of {matchingIds.size} matching student vectors
        </span>
        <span className="font-sora text-[11px] text-[#A8A29E] mt-1 sm:mt-0">
          Cohort size N = {allResponses.length} &bull; Discrete set evaluation
        </span>
      </div>
    </div>
  );
}
