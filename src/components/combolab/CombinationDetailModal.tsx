"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { FeatureCombinationRecord } from "@/types/math";
import type { SurveyResponse } from "@/types/survey";

export interface CombinationDetailModalProps {
  combination: FeatureCombinationRecord | null;
  onClose: () => void;
  allResponses: readonly SurveyResponse[];
}

export function CombinationDetailModal({
  combination,
  onClose,
  allResponses,
}: CombinationDetailModalProps) {
  if (!combination) return null;

  // Retrieve respondent objects
  const matchingResponses = allResponses.filter((resp) =>
    combination.matchingRespondentIds.includes(resp.response_id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1B18]/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#EAE3D5] bg-[#FAF8F5] p-6 shadow-2xl text-[#1C1B18] space-y-5"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#EAE3D5] pb-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-sora text-xs font-bold text-[#1C1B18] bg-white px-2.5 py-0.5 rounded-full border border-[#EAE3D5]">
                {combination.id}
              </span>
              <h3 className="text-lg font-montserrat font-bold text-[#1C1B18]">
                Feature Triplet Details
              </h3>
              {combination.isObserved ? (
                <span className="font-sora text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Observed ({combination.observedCount} resp. • {combination.observedPercentage}%)
                </span>
              ) : (
                <Badge variant="default">Theoretical Void (0 resp.)</Badge>
              )}
            </div>
            <p className="text-xs text-[#78716C] mt-1 font-sans">
              Index #{combination.index} of 35 in dynamic lexicographic enumeration
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full h-8 w-8 flex items-center justify-center text-[#78716C] hover:bg-[#EAE3D5] hover:text-[#1C1B18] transition-all text-sm font-bold"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {/* Feature Triplet Badges */}
        <div>
          <span className="text-[11px] font-sora font-semibold uppercase tracking-wider text-[#78716C] block mb-2">
            Canonical Feature Triplet:
          </span>
          <div className="flex flex-wrap gap-2">
            {combination.features.map((feature) => (
              <span
                key={feature}
                className="font-sora font-semibold text-xs text-blue-800 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200 shadow-2xs"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Empirical Distribution Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-2xl border border-[#EAE3D5] bg-white p-3.5 text-center shadow-2xs">
            <span className="text-[10px] font-sora font-semibold uppercase tracking-wider text-[#78716C] block">
              Observed Count
            </span>
            <div className="mt-1 font-sora text-2xl font-extrabold text-[#1C1B18]">
              {combination.observedCount}
            </div>
          </div>

          <div className="rounded-2xl border border-[#EAE3D5] bg-white p-3.5 text-center shadow-2xs">
            <span className="text-[10px] font-sora font-semibold uppercase tracking-wider text-[#78716C] block">
              Cohort Share
            </span>
            <div className="mt-1 font-sora text-2xl font-extrabold text-blue-700">
              {combination.observedPercentage}%
            </div>
          </div>

          <div className="rounded-2xl border border-[#EAE3D5] bg-white p-3.5 text-center shadow-2xs">
            <span className="text-[10px] font-sora font-semibold uppercase tracking-wider text-[#78716C] block">
              Status
            </span>
            <div
              className={`mt-1 font-sora font-bold text-xs ${
                combination.isObserved ? "text-emerald-700" : "text-[#78716C]"
              }`}
            >
              {combination.isObserved ? "POPULATED" : "UNOBSERVED"}
            </div>
          </div>

          <div className="rounded-2xl border border-[#EAE3D5] bg-white p-3.5 text-center shadow-2xs">
            <span className="text-[10px] font-sora font-semibold uppercase tracking-wider text-[#78716C] block">
              Permutations (3!)
            </span>
            <div className="mt-1 font-sora text-2xl font-extrabold text-[#1C1B18]">
              6
            </div>
          </div>
        </div>

        {/* Matching Respondent Records or Empty Set State */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-montserrat font-bold uppercase tracking-wider text-[#1C1B18]">
              Matching Survey Respondents
            </span>
            <span className="font-sora text-xs text-[#78716C]">
              {matchingResponses.length} records
            </span>
          </div>

          {!combination.isObserved || matchingResponses.length === 0 ? (
            <div className="p-8 text-center rounded-2xl border border-dashed border-[#EAE3D5] bg-white">
              <div className="text-3xl font-sora text-[#A8A29E] mb-1">∅</div>
              <h4 className="text-xs font-montserrat font-bold text-[#1C1B18] uppercase tracking-wider">
                Empty Set: Unobserved Theoretical Combination
              </h4>
              <p className="text-xs text-[#78716C] mt-1 max-w-md mx-auto font-sans">
                No participant in the university survey chose this exact
                three-feature combination. In discrete mathematics, its empirical
                frequency is exactly zero.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto">
              {matchingResponses.map((resp) => (
                <div
                  key={resp.response_id}
                  className="rounded-2xl border border-[#EAE3D5] bg-white p-3.5 flex items-center justify-between shadow-2xs"
                >
                  <div>
                    <span className="font-sora text-xs font-bold text-[#1C1B18] block">
                      {resp.response_id}
                    </span>
                    <span className="text-[11px] text-[#78716C] font-sans">
                      {resp.budget_range} &bull; {resp.primary_use}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-montserrat text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 block mb-1">
                      {resp.preferred_brand}
                    </span>
                    <span className="font-sora text-[10px] text-[#A8A29E]">
                      {resp.os_preference}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-3 border-t border-[#EAE3D5]">
          <Button variant="primary" size="sm" onClick={onClose}>
            Close Inspector
          </Button>
        </div>
      </div>
    </div>
  );
}
