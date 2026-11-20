"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { MatchEngineResult } from "@/types/matcher";

export interface ExactMatchCardProps {
  result: MatchEngineResult;
}

export function ExactMatchCard({ result }: ExactMatchCardProps) {
  const { exactMatches, profile, totalCohort, brandSet, budgetSet, featureSet } =
    result;
  const hasExactMatches = exactMatches.count > 0;

  return (
    <Card className="shadow-[0_15px_40px_-15px_rgba(44,38,28,0.06)] border-[#EAE3D5]">
      <CardHeader
        title="2. Exact Profile Matches (B ∩ P ∩ F)"
        subtitle="Simultaneous three-way intersection of Brand, Budget, and Feature Triplet"
        badge={
          hasExactMatches ? (
            <Badge variant="lime">
              {exactMatches.count} Exact Match{exactMatches.count > 1 ? "es" : ""} ({exactMatches.percentage}%)
            </Badge>
          ) : (
            <Badge variant="default">0 Exact Matches (0.0%)</Badge>
          )
        }
      />
      <CardContent className="space-y-6">
        {/* Main Metric Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="sm:col-span-2 rounded-3xl border border-[#EAE3D5] bg-[#FAF8F5] p-6 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-sora uppercase tracking-wider text-stone-500 block font-bold">
                Exact Phenotype Matches
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-heading text-4xl font-extrabold text-[#1C1B18]">
                  {exactMatches.count}
                </span>
                <span className="text-sm font-medium text-stone-600 font-sans">
                  / {totalCohort} Students
                </span>
              </div>
              <p className="mt-1 text-xs text-stone-600 font-sans">
                {exactMatches.percentage}% of the full validated university cohort
              </p>
            </div>

            <div className="pt-3 border-t border-[#EAE3D5] text-xs font-sora text-emerald-800 font-bold flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>|B ∩ P ∩ F| = {exactMatches.count}</span>
            </div>
          </div>

          {/* Component Set Sizes */}
          <div className="rounded-3xl border border-[#EAE3D5] bg-white p-5 space-y-1 shadow-2xs">
            <span className="text-[10px] font-sora uppercase tracking-wider text-stone-500 block font-bold">
              Set Cardinalities
            </span>
            <div className="pt-2 space-y-2 text-xs text-stone-700 font-sans">
              <div className="flex justify-between border-b border-[#F5F1E8] pb-1.5">
                <span>Brand ({profile.brand}):</span>
                <span className="font-sora font-bold text-[#1C1B18]">
                  |B| = {brandSet.size}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#F5F1E8] pb-1.5">
                <span>Budget ({profile.budget}):</span>
                <span className="font-sora font-bold text-[#1C1B18]">
                  |P| = {budgetSet.size}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Exact Triplet:</span>
                <span className="font-sora font-bold text-[#1C1B18]">
                  |F| = {featureSet.size}
                </span>
              </div>
            </div>
          </div>

          {/* Matching Respondent IDs */}
          <div className="rounded-3xl border border-[#EAE3D5] bg-white p-5 space-y-2 shadow-2xs">
            <span className="text-[10px] font-sora uppercase tracking-wider text-stone-500 block font-bold">
              Matched Respondents
            </span>
            {hasExactMatches ? (
              <div className="flex flex-wrap gap-1.5 pt-1 max-h-24 overflow-y-auto">
                {Array.from(exactMatches.ids).map((id) => (
                  <span
                    key={id}
                    className="font-sora text-xs font-bold text-[#1C1B18] bg-[#FAF8F5] border border-[#EAE3D5] px-2.5 py-1 rounded-xl shadow-2xs"
                  >
                    {id}
                  </span>
                ))}
              </div>
            ) : (
              <div className="pt-2 text-xs text-stone-500 font-sans leading-relaxed">
                No students in the 30-person cohort match all 3 criteria simultaneously.
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
