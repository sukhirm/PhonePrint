"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { loadSurveyDataset, getActiveDatasetInfo } from "@/lib/data/loader";
import { analyzeFeatureCombinations } from "@/lib/data/combinationAnalytics";
import type { FeatureCombinationRecord } from "@/types/math";

import { CombinationCalculator } from "@/components/combolab/CombinationCalculator";
import { PermutationVsCombination } from "@/components/combolab/PermutationVsCombination";
import { FeatureCombinationExplorer } from "@/components/combolab/FeatureCombinationExplorer";
import { CombinationFrequencyAnalysis } from "@/components/combolab/CombinationFrequencyAnalysis";
import { BudgetCombinationAnalysis } from "@/components/combolab/BudgetCombinationAnalysis";
import { CombinatoricsLearningPanel } from "@/components/combolab/CombinatoricsLearningPanel";
import { CombinationDetailModal } from "@/components/combolab/CombinationDetailModal";

type ActiveTab =
  | "all"
  | "calculator"
  | "permutations"
  | "explorer"
  | "frequency"
  | "budget"
  | "theory";

export default function ComboLabPage() {
  const dataset = useMemo(() => loadSurveyDataset(), []);
  const datasetInfo = useMemo(() => getActiveDatasetInfo(), []);
  const responses = dataset.responses;
  const analytics = useMemo(
    () => analyzeFeatureCombinations(responses),
    [responses]
  );

  const [activeTab, setActiveTab] = useState<ActiveTab>("all");
  const [selectedCombination, setSelectedCombination] =
    useState<FeatureCombinationRecord | null>(null);

  return (
    <div className="space-y-8 pb-16">
      {/* Top Page Header */}
      <PageHeader
        sectionCode="04"
        eyebrow="Discrete Mathematics & Combinatorics"
        title="ComboLab: Combinatorial Feature Space"
        description="Interactive laboratory exploring binomial coefficients C(n, r), permutations P(n, r), and empirical survey frequencies. Analyzes the discrete space of C(7, 3) = 35 theoretical triplets from the 7 canonical smartphone features."
        badge={{ text: datasetInfo.badgeText, variant: datasetInfo.isDemo ? "lime" : "cobalt" }}
        actions={
          <div className="flex items-center gap-2">
            <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded-xs border ${
              datasetInfo.isDemo
                ? "text-stone-800 bg-stone-100 border-stone-300/80"
                : "text-cobalt-800 bg-cobalt-50 border-cobalt-200"
            }`}>
              {datasetInfo.tagText}
            </span>
            <Link href="/setlab">
              <Button variant="outline" size="sm">
                &larr; SetLab
              </Button>
            </Link>
          </div>
        }
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation / Focus Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-[#FAF8F5] border border-[#EAE3D5] shadow-2xs">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-full text-xs font-sora transition-all duration-200 ${
              activeTab === "all"
                ? "bg-[#1C1B18] text-white shadow-xs font-bold"
                : "text-[#78716C] hover:text-[#1C1B18] hover:bg-white font-medium"
            }`}
          >
            All Modules Overview
          </button>
          <button
            onClick={() => setActiveTab("calculator")}
            className={`px-4 py-2 rounded-full text-xs font-sora transition-all duration-200 ${
              activeTab === "calculator"
                ? "bg-[#1C1B18] text-white shadow-xs font-bold"
                : "text-[#78716C] hover:text-[#1C1B18] hover:bg-white font-medium"
            }`}
          >
            nCr Calculator
          </button>
          <button
            onClick={() => setActiveTab("permutations")}
            className={`px-4 py-2 rounded-full text-xs font-sora transition-all duration-200 ${
              activeTab === "permutations"
                ? "bg-[#1C1B18] text-white shadow-xs font-bold"
                : "text-[#78716C] hover:text-[#1C1B18] hover:bg-white font-medium"
            }`}
          >
            Permutations vs Combinations
          </button>
          <button
            onClick={() => setActiveTab("explorer")}
            className={`px-4 py-2 rounded-full text-xs font-sora transition-all duration-200 ${
              activeTab === "explorer"
                ? "bg-[#1C1B18] text-white shadow-xs font-bold"
                : "text-[#78716C] hover:text-[#1C1B18] hover:bg-white font-medium"
            }`}
          >
            35-Triplet Space Explorer
          </button>
          <button
            onClick={() => setActiveTab("frequency")}
            className={`px-4 py-2 rounded-full text-xs font-sora transition-all duration-200 ${
              activeTab === "frequency"
                ? "bg-[#1C1B18] text-white shadow-xs font-bold"
                : "text-[#78716C] hover:text-[#1C1B18] hover:bg-white font-medium"
            }`}
          >
            Frequency Ranking &amp; Voids
          </button>
          <button
            onClick={() => setActiveTab("budget")}
            className={`px-4 py-2 rounded-full text-xs font-sora transition-all duration-200 ${
              activeTab === "budget"
                ? "bg-[#1C1B18] text-white shadow-xs font-bold"
                : "text-[#78716C] hover:text-[#1C1B18] hover:bg-white font-medium"
            }`}
          >
            Budget Stratification
          </button>
          <button
            onClick={() => setActiveTab("theory")}
            className={`px-4 py-2 rounded-full text-xs font-sora transition-all duration-200 ${
              activeTab === "theory"
                ? "bg-[#1C1B18] text-white shadow-xs font-bold"
                : "text-[#78716C] hover:text-[#1C1B18] hover:bg-white font-medium"
            }`}
          >
            Curriculum Theory
          </button>
        </div>

        {/* Section 1: nCr Calculator */}
        {(activeTab === "all" || activeTab === "calculator") && (
          <section id="calculator" className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h2 className="text-base font-serif font-bold text-stone-900 tracking-tight">
                1. Combinations Calculator &amp; Factorial Simplification
              </h2>
              <Badge variant="cobalt">Interactive Math</Badge>
            </div>
            <CombinationCalculator />
          </section>
        )}

        {/* Section 2: Permutation vs Combination Explainer */}
        {(activeTab === "all" || activeTab === "permutations") && (
          <section id="permutations" className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h2 className="text-base font-serif font-bold text-stone-900 tracking-tight">
                2. Permutations vs Combinations
              </h2>
              <Badge variant="lime">Order Invariance</Badge>
            </div>
            <PermutationVsCombination />
          </section>
        )}

        {/* Section 3: Feature Combination Explorer (All 35 Triplets) */}
        {(activeTab === "all" || activeTab === "explorer") && (
          <section id="explorer" className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h2 className="text-base font-serif font-bold text-stone-900 tracking-tight">
                3. The C(7, 3) = 35 Feature Triplet Space
              </h2>
              <Badge variant="cobalt">Theoretical vs Observed</Badge>
            </div>
            <FeatureCombinationExplorer
              combinations={analytics.combinations}
              totalRespondents={analytics.totalRespondents}
              selectedCombinationId={selectedCombination?.id}
              onSelectCombination={(combo) => setSelectedCombination(combo)}
            />
          </section>
        )}

        {/* Section 4: Frequency Analysis & Unobserved Voids */}
        {(activeTab === "all" || activeTab === "frequency") && (
          <section id="frequency" className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h2 className="text-base font-serif font-bold text-stone-900 tracking-tight">
                4. Empirical Triplet Frequency Ranking
              </h2>
              <Badge variant="lime">Survey Observations</Badge>
            </div>
            <CombinationFrequencyAnalysis
              analytics={analytics}
              onSelectCombination={(combo) => setSelectedCombination(combo)}
            />
          </section>
        )}

        {/* Section 5: Budget-Based Combination Analysis */}
        {(activeTab === "all" || activeTab === "budget") && (
          <section id="budget" className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h2 className="text-base font-serif font-bold text-stone-900 tracking-tight">
                5. Price Tier Stratification &amp; Denominator Integrity
              </h2>
              <Badge variant="cobalt">Subgroup Analysis</Badge>
            </div>
            <BudgetCombinationAnalysis
              analytics={analytics}
              onSelectCombination={(combo) => setSelectedCombination(combo)}
            />
          </section>
        )}

        {/* Section 6: Curriculum Learning Foundation */}
        {(activeTab === "all" || activeTab === "theory") && (
          <section id="theory" className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h2 className="text-base font-serif font-bold text-stone-900 tracking-tight">
                6. Undergraduate Curriculum Learning Reference
              </h2>
              <Badge variant="outline">Formal Mathematics</Badge>
            </div>
            <CombinatoricsLearningPanel />
          </section>
        )}

        {/* Global Academic Callout */}
        <Callout
          variant="highlight"
          title="PhonePrint Combinatorial Architecture Summary"
        >
          PhonePrint grounds smartphone preference research in discrete
          mathematics. Selecting 3 features from 7 canonical options establishes a
          finite parameter space of exactly 35 unordered combinations. In this{" "}
          cohort of {responses.length} student respondents ({datasetInfo.notes || "SIMULATED CAMPUS DATA — N=30"}),{" "}
          {analytics.totalObservedCombinations} combinations are populated while{" "}
          {analytics.totalUnobservedCombinations} remain unobserved voids, demonstrating how finite sampling interacts
          with multi-attribute combinatorial spaces.
        </Callout>
      </div>

      {/* Modal / Inspector for selected combination */}
      <CombinationDetailModal
        combination={selectedCombination}
        onClose={() => setSelectedCombination(null)}
        allResponses={responses}
      />
    </div>
  );
}
