"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { MatchEngineResult } from "@/types/matcher";

export interface PartialMatchBreakdownProps {
  result: MatchEngineResult;
}

export function PartialMatchBreakdown({ result }: PartialMatchBreakdownProps) {
  const {
    category3Exact,
    category2Partial,
    category1Partial,
    category0None,
    totalCohort,
  } = result;

  const n3 = category3Exact.count;
  const p3 = category3Exact.percentage;

  const n2 = category2Partial.total.count;
  const p2 = category2Partial.total.percentage;

  const n1 = category1Partial.total.count;
  const p1 = category1Partial.total.percentage;

  const n0 = category0None.count;
  const p0 = category0None.percentage;

  return (
    <Card className="shadow-[0_15px_40px_-15px_rgba(44,38,28,0.06)] border-[#EAE3D5]">
      <CardHeader
        title="3. Mutually Exclusive Match Classification"
        subtitle="Partition of the respondent cohort across 3, 2, 1, or 0 satisfied criteria"
        badge={<Badge variant="cobalt">Discrete Classification</Badge>}
      />
      <CardContent className="space-y-6">
        {/* Visual Partition Distribution Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-sora font-semibold text-stone-700">
            <span>Cohort Distribution (N = {totalCohort})</span>
            <span className="text-stone-500">
              {n3 + n2 + n1 + n0} / {totalCohort} Students (100% Conserved)
            </span>
          </div>

          <div className="flex h-5 w-full overflow-hidden rounded-full border border-[#EAE3D5] bg-[#FAF8F5] p-0.5">
            {n3 > 0 && (
              <div
                style={{ width: `${p3}%` }}
                className="bg-emerald-600 rounded-full transition-all flex items-center justify-center text-[10px] font-bold text-white font-sora"
                title={`Exact 3/3: ${n3} (${p3}%)`}
              >
                {p3 >= 10 ? `${p3}%` : ""}
              </div>
            )}
            {n2 > 0 && (
              <div
                style={{ width: `${p2}%` }}
                className="bg-blue-600 rounded-full transition-all flex items-center justify-center text-[10px] font-bold text-white font-sora"
                title={`Partial 2/3: ${n2} (${p2}%)`}
              >
                {p2 >= 10 ? `${p2}%` : ""}
              </div>
            )}
            {n1 > 0 && (
              <div
                style={{ width: `${p1}%` }}
                className="bg-amber-500 rounded-full transition-all flex items-center justify-center text-[10px] font-bold text-white font-sora"
                title={`Weak 1/3: ${n1} (${p1}%)`}
              >
                {p1 >= 10 ? `${p1}%` : ""}
              </div>
            )}
            {n0 > 0 && (
              <div
                style={{ width: `${p0}%` }}
                className="bg-stone-300 rounded-full transition-all flex items-center justify-center text-[10px] font-bold text-stone-700 font-sora"
                title={`No Match 0/3: ${n0} (${p0}%)`}
              >
                {p0 >= 10 ? `${p0}%` : ""}
              </div>
            )}
          </div>
        </div>

        {/* 4 Partition Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-4 space-y-1">
            <span className="font-sora text-[10px] font-bold uppercase text-emerald-800">
              3/3 Exact Matches
            </span>
            <div className="font-heading text-2xl font-extrabold text-[#1C1B18]">
              {n3} <span className="text-xs font-normal text-stone-500 font-sans">students</span>
            </div>
            <span className="font-sora text-xs text-emerald-700 font-semibold block">
              {p3}% of cohort
            </span>
          </div>

          <div className="rounded-3xl border border-blue-200 bg-blue-50/40 p-4 space-y-1">
            <span className="font-sora text-[10px] font-bold uppercase text-blue-800">
              2/3 Partial Matches
            </span>
            <div className="font-heading text-2xl font-extrabold text-[#1C1B18]">
              {n2} <span className="text-xs font-normal text-stone-500 font-sans">students</span>
            </div>
            <span className="font-sora text-xs text-blue-700 font-semibold block">
              {p2}% of cohort
            </span>
          </div>

          <div className="rounded-3xl border border-amber-200 bg-amber-50/40 p-4 space-y-1">
            <span className="font-sora text-[10px] font-bold uppercase text-amber-800">
              1/3 Single Criteria
            </span>
            <div className="font-heading text-2xl font-extrabold text-[#1C1B18]">
              {n1} <span className="text-xs font-normal text-stone-500 font-sans">students</span>
            </div>
            <span className="font-sora text-xs text-amber-700 font-semibold block">
              {p1}% of cohort
            </span>
          </div>

          <div className="rounded-3xl border border-[#EAE3D5] bg-[#FAF8F5] p-4 space-y-1">
            <span className="font-sora text-[10px] font-bold uppercase text-stone-500">
              0/3 Disjoint
            </span>
            <div className="font-heading text-2xl font-extrabold text-[#1C1B18]">
              {n0} <span className="text-xs font-normal text-stone-500 font-sans">students</span>
            </div>
            <span className="font-sora text-xs text-stone-600 font-semibold block">
              {p0}% of cohort
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
