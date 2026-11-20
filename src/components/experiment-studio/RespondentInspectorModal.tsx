"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { SurveyResponse } from "@/types/survey";

export interface RespondentInspectorModalProps {
  title: string;
  subtitle: string;
  matchingIds: readonly string[];
  allResponses: readonly SurveyResponse[];
  onClose: () => void;
}

export function RespondentInspectorModal({
  title,
  subtitle,
  matchingIds,
  allResponses,
  onClose,
}: RespondentInspectorModalProps) {
  const matchingRecords = allResponses.filter((r) =>
    matchingIds.includes(r.response_id)
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
              <h3 className="text-lg font-montserrat font-bold text-[#1C1B18]">{title}</h3>
              <Badge variant="cobalt" className="font-sora text-xs">
                {matchingIds.length} {matchingIds.length === 1 ? "Respondent" : "Respondents"}
              </Badge>
            </div>
            <p className="text-xs text-[#78716C] mt-1 font-sans">{subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full h-8 w-8 flex items-center justify-center text-[#78716C] hover:bg-[#EAE3D5] hover:text-[#1C1B18] transition-all text-sm font-bold"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {/* Content Cards or Empty State */}
        {matchingRecords.length === 0 ? (
          <div className="p-8 text-center rounded-2xl border border-dashed border-[#EAE3D5] bg-white">
            <div className="text-3xl font-sora text-[#A8A29E] mb-1">∅</div>
            <h4 className="text-xs font-montserrat font-bold text-[#1C1B18] uppercase tracking-wider">
              Empty Intersection (0 Respondents)
            </h4>
            <p className="text-xs text-[#78716C] mt-1 max-w-md mx-auto font-sans">
              No survey respondents match this exact brand-feature or budget-combination conjunction in the validated dataset.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
            {matchingRecords.map((r) => (
              <div
                key={r.response_id}
                className="rounded-2xl border border-[#EAE3D5] bg-white p-4 shadow-2xs space-y-2.5"
              >
                <div className="flex items-center justify-between border-b border-[#EAE3D5]/60 pb-2">
                  <span className="font-sora text-xs font-bold text-[#1C1B18] bg-[#FAF8F5] px-2.5 py-0.5 rounded-full border border-[#EAE3D5]">
                    {r.response_id}
                  </span>
                  <span className="font-montserrat text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {r.preferred_brand}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#78716C] font-sans">
                  <span className="font-sora font-semibold text-[#1C1B18]">{r.budget_range}</span>
                  <span>{r.primary_use}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {r.preferred_features.map((f) => (
                    <span
                      key={f}
                      className="font-sora text-[10px] font-medium text-[#1C1B18] bg-[#FAF8F5] px-2 py-0.5 rounded-md border border-[#EAE3D5]"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

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
