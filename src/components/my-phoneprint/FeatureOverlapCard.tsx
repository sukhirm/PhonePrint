"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { FeatureOverlapSummary } from "@/types/matcher";
import type { SmartphoneFeature } from "@/types/survey";

export interface FeatureOverlapCardProps {
  featureOverlap: FeatureOverlapSummary;
  selectedFeatures: readonly [
    SmartphoneFeature,
    SmartphoneFeature,
    SmartphoneFeature
  ];
  totalCohort: number;
}

export function FeatureOverlapCard({
  featureOverlap,
  selectedFeatures,
  totalCohort,
}: FeatureOverlapCardProps) {
  const { matchAllThree, matchTwo, matchOne, matchNone } =
    featureOverlap;

  return (
    <Card className="shadow-[0_15px_40px_-15px_rgba(44,38,28,0.06)] border-[#EAE3D5]">
      <CardHeader
        title="4. Independent Feature Triplet Overlap Distribution"
        subtitle={`Evaluating feature overlap with the selected triplet across all ${totalCohort} students independently of brand and budget constraints`}
        badge={<Badge variant="cobalt">Feature Subsets</Badge>}
      />
      <CardContent className="space-y-6">
        {/* Selected Features Display */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D5]">
          <span className="text-xs font-heading font-extrabold text-[#1C1B18] uppercase">
            Target Feature Triplet (Set F*):
          </span>
          <div className="flex flex-wrap gap-2">
            {selectedFeatures.map((f) => (
              <span
                key={f}
                className="text-xs font-sora font-semibold text-stone-800 bg-white border border-[#EAE3D5] px-3 py-1 rounded-full shadow-2xs"
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* 4-Tier Disjoint Breakdown Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-4 text-center space-y-1">
            <span className="font-sora text-[10px] uppercase font-bold text-emerald-800 block">
              All 3 Features
            </span>
            <div className="font-heading text-2xl font-extrabold text-[#1C1B18]">
              {matchAllThree.count}
            </div>
            <span className="font-sora text-xs text-emerald-700 font-semibold block">
              {matchAllThree.percentage}% of cohort
            </span>
          </div>

          <div className="rounded-3xl border border-blue-200 bg-blue-50/40 p-4 text-center space-y-1">
            <span className="font-sora text-[10px] uppercase font-bold text-blue-800 block">
              2 of 3 Features
            </span>
            <div className="font-heading text-2xl font-extrabold text-[#1C1B18]">
              {matchTwo.count}
            </div>
            <span className="font-sora text-xs text-blue-700 font-semibold block">
              {matchTwo.percentage}% of cohort
            </span>
          </div>

          <div className="rounded-3xl border border-amber-200 bg-amber-50/40 p-4 text-center space-y-1">
            <span className="font-sora text-[10px] uppercase font-bold text-amber-800 block">
              1 of 3 Features
            </span>
            <div className="font-heading text-2xl font-extrabold text-[#1C1B18]">
              {matchOne.count}
            </div>
            <span className="font-sora text-xs text-amber-700 font-semibold block">
              {matchOne.percentage}% of cohort
            </span>
          </div>

          <div className="rounded-3xl border border-[#EAE3D5] bg-[#FAF8F5] p-4 text-center space-y-1">
            <span className="font-sora text-[10px] uppercase font-bold text-stone-500 block">
              0 Features (Void)
            </span>
            <div className="font-heading text-2xl font-extrabold text-[#1C1B18]">
              {matchNone.count}
            </div>
            <span className="font-sora text-xs text-stone-600 font-semibold block">
              {matchNone.percentage}% of cohort
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
