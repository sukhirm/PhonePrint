"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { KaTeXMath } from "@/components/ui/KaTeXMath";
import type { BudgetCombinationAnalysisResult } from "@/types/experiment";

export interface BudgetCombinationInterpretationProps {
  result: BudgetCombinationAnalysisResult;
}

export function BudgetCombinationInterpretation({
  result,
}: BudgetCombinationInterpretationProps) {
  const { descriptiveNotes, selectedBudgets } = result;

  return (
    <Card>
      <CardHeader
        title="Experiment 2: Scientific Methodology & Descriptive Interpretation"
        subtitle="Hypothesis framing, within-segment combination conservation, and observational synthesis"
        badge={<Badge variant="cobalt">Academic Analysis</Badge>}
      />
      <CardContent className="space-y-6">
        {/* Hypothesis Framing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4.5 rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] space-y-2">
            <span className="text-[11px] font-sora font-semibold uppercase tracking-wider text-[#78716C] block">
              Descriptive Null Hypothesis (H₀)
            </span>
            <p className="text-xs text-[#57534E] leading-relaxed font-sans">
              The observed three-feature preference triplet distribution is similar across budget segments:
            </p>
            <KaTeXMath
              math="H_0: P(t \mid p_i) = P(t \mid p_j) \quad \forall t \in \text{Triplets}, \quad \forall i, j"
              block
              className="text-xs text-[#1C1B18] font-semibold"
            />
          </div>

          <div className="p-4.5 rounded-2xl border border-[#EAE3D5] bg-white space-y-2">
            <span className="text-[11px] font-sora font-semibold uppercase tracking-wider text-blue-700 block">
              Descriptive Alternative Hypothesis (H₁)
            </span>
            <p className="text-xs text-[#57534E] leading-relaxed font-sans">
              The observed three-feature preference triplet distribution differs across budget segments:
            </p>
            <KaTeXMath
              math="H_1: \exists t \in \text{Triplets}, \exists i, j \text{ such that } P(t \mid p_i) \neq P(t \mid p_j)"
              block
              className="text-xs text-blue-950 font-semibold"
            />
          </div>
        </div>

        {/* Within-Segment Percentage Conservation */}
        <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-5 space-y-2">
          <span className="text-[11px] font-sora font-semibold uppercase tracking-wider text-[#78716C] block">
            Mathematical Conservation Law:
          </span>
          <KaTeXMath
            math="\sum_{t \text{ observed}} P(t \mid p) = \sum_{t \text{ observed}} \frac{C(p, t)}{N(p)} \times 100\% = 100\% \quad (\text{for } N(p) > 0)"
            block
            className="text-xs text-[#1C1B18] font-bold"
          />
          <p className="text-xs text-[#57534E] leading-relaxed pt-1 font-sans">
            Because every survey respondent belongs to exactly one budget tier and selects exactly one feature triplet, the sum of observed combination percentages within each populated budget stratum strictly conserves to 100% (subject only to rounding).
          </p>
        </div>

        {/* Dynamically Generated Descriptive Findings */}
        <div className="rounded-2xl border border-[#EAE3D5] bg-white p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-montserrat font-bold uppercase tracking-wider text-[#1C1B18] block">
              Observed Descriptive Associations
            </span>
            <Badge variant="lime">
              {selectedBudgets.length} Budget Tier{selectedBudgets.length > 1 ? "s" : ""} Compared
            </Badge>
          </div>

          {descriptiveNotes.length > 0 ? (
            <ul className="space-y-2 text-xs text-[#57534E]">
              {descriptiveNotes.map((note, index) => (
                <li
                  key={index}
                  className="rounded-xl bg-[#FAF8F5] p-3 border border-[#EAE3D5] shadow-2xs flex items-start gap-2.5 font-sans"
                >
                  <span className="text-emerald-600 font-bold mr-0.5">&bull;</span>
                  <span className="leading-relaxed">{note}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-[#78716C] italic font-sans">
              No budget combination data available for the current selection.
            </p>
          )}
        </div>

        {/* Methodological Guidance Callout */}
        <Callout
          variant="warning"
          title="Methodological Guardrail: Observational Distribution"
        >
          These findings represent observational cross-sectional survey distributions. They demonstrate how student feature bundles cluster across budget tiers in this specific cohort. They do <strong>not</strong> prove that spending power causally dictates preference (or that preference causes budget allocation). With a finite sample size ({result.totalCohortSize} respondents), individual responses generate discrete percentage increments; these patterns should be evaluated as combinatorial distributions rather than generalized consumer behavior.
        </Callout>
      </CardContent>
    </Card>
  );
}
