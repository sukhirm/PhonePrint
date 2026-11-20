"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { KaTeXMath } from "@/components/ui/KaTeXMath";
import { loadSurveyDataset, getActiveDatasetInfo } from "@/lib/data/loader";
import { computeBrandFeatureAssociation } from "@/lib/math/brandFeatureExperiment";
import { computeBudgetCombinationAnalysis } from "@/lib/math/budgetCombinationExperiment";
import {
  SMARTPHONE_BRANDS,
  SMARTPHONE_FEATURES,
  BUDGET_RANGES,
  type SmartphoneBrand,
  type SmartphoneFeature,
  type BudgetRange,
} from "@/types/survey";
import type {
  BrandFeatureCell,
  BudgetCombinationRow,
} from "@/types/experiment";

import { BrandFeatureControls } from "@/components/experiment-studio/BrandFeatureControls";
import { BrandFeatureHeatmap } from "@/components/experiment-studio/BrandFeatureHeatmap";
import { BrandFeatureBarChart } from "@/components/experiment-studio/BrandFeatureBarChart";
import { BrandFeatureInterpretation } from "@/components/experiment-studio/BrandFeatureInterpretation";
import { BudgetCombinationControls } from "@/components/experiment-studio/BudgetCombinationControls";
import { BudgetCombinationMetrics } from "@/components/experiment-studio/BudgetCombinationMetrics";
import { BudgetCombinationChart } from "@/components/experiment-studio/BudgetCombinationChart";
import { BudgetCombinationTable } from "@/components/experiment-studio/BudgetCombinationTable";
import { BudgetCombinationInterpretation } from "@/components/experiment-studio/BudgetCombinationInterpretation";
import { RespondentInspectorModal } from "@/components/experiment-studio/RespondentInspectorModal";

type ActiveTab = "all" | "exp1" | "exp2" | "methodology";

export default function ExperimentStudioPage() {
  // Load dataset
  const dataset = useMemo(() => loadSurveyDataset(), []);
  const datasetInfo = useMemo(() => getActiveDatasetInfo(), []);
  const responses = dataset.responses;

  // Tab State
  const [activeTab, setActiveTab] = useState<ActiveTab>("all");

  // Experiment 1 State
  const [selectedBrands, setSelectedBrands] = useState<SmartphoneBrand[]>([
    ...SMARTPHONE_BRANDS,
  ]);
  const [selectedFeatures, setSelectedFeatures] = useState<SmartphoneFeature[]>([
    ...SMARTPHONE_FEATURES,
  ]);

  // Experiment 2 State
  const [selectedBudgets, setSelectedBudgets] = useState<BudgetRange[]>([
    ...BUDGET_RANGES,
  ]);

  // Modal State
  const [inspectorModal, setInspectorModal] = useState<{
    isOpen: boolean;
    title: string;
    subtitle: string;
    matchingIds: readonly string[];
  } | null>(null);

  // Computations
  const brandFeatureResult = useMemo(
    () =>
      computeBrandFeatureAssociation(responses, selectedBrands, selectedFeatures),
    [responses, selectedBrands, selectedFeatures]
  );

  const budgetCombinationResult = useMemo(
    () => computeBudgetCombinationAnalysis(responses, selectedBudgets),
    [responses, selectedBudgets]
  );

  // Dynamic Feature Percentage Sum summary across currently selected populated brands
  const displayedFeatureSumSummary = useMemo(() => {
    if (brandFeatureResult.isFullFeatureUniverse) {
      return {
        label: "300.0%",
        note: "All 7 Features (Expected: 300%)",
        isExpected300: true,
      };
    }

    if (selectedFeatures.length === 0) {
      return {
        label: "0.0%",
        note: "0 Features Selected",
        isExpected300: false,
      };
    }

    const populatedSelectedBrands = selectedBrands.filter(
      (b) => (brandFeatureResult.brandTotals[b] ?? 0) > 0
    );

    if (populatedSelectedBrands.length === 0) {
      return {
        label: "0.0%",
        note: "No populated cohorts",
        isExpected300: false,
      };
    }

    const sums = populatedSelectedBrands.map(
      (b) => brandFeatureResult.featurePercentageSumByBrand[b] ?? 0
    );
    const minSum = Math.min(...sums);
    const maxSum = Math.max(...sums);

    const rangeLabel =
      minSum === maxSum
        ? `${minSum.toFixed(1)}%`
        : `${minSum.toFixed(1)}% – ${maxSum.toFixed(1)}%`;

    return {
      label: rangeLabel,
      note: `${selectedFeatures.length}/7 Features (Dynamic Sum)`,
      isExpected300: false,
    };
  }, [brandFeatureResult, selectedBrands, selectedFeatures]);

  // Modal Triggers
  const handleSelectCell = (cell: BrandFeatureCell) => {
    const brandCohortSize = brandFeatureResult.brandTotals[cell.brand] ?? 0;
    setInspectorModal({
      isOpen: true,
      title: `${cell.brand} × ${cell.feature}`,
      subtitle: `Discrete intersection S_${cell.brand} ∩ S_${cell.feature}: ${cell.count} respondents (${cell.percentage.toFixed(
        1
      )}% of ${cell.brand} cohort N=${brandCohortSize})`,
      matchingIds: cell.matchingRespondentIds,
    });
  };

  const handleSelectBudgetRow = (row: BudgetCombinationRow) => {
    const allMatchingIds = Object.values(row.matchingRespondentIdsByBudget).flat();
    setInspectorModal({
      isOpen: true,
      title: `${row.combinationId}: {${row.features.join(", ")}}`,
      subtitle: `Observed ${row.totalObservedOverall} times across all segments. ${
        row.isObservedOverall
          ? "Observed empirical combination."
          : "Combinatorial void (unobserved in dataset)."
      }`,
      matchingIds: allMatchingIds,
    });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Page Header */}
      <PageHeader
        sectionCode="05"
        eyebrow="Empirical Discrete Research"
        title="Experiment Studio: Preference Hypothesis Testing"
        description="Investigate empirical patterns and associations across smartphone brands, canonical features, and budget segments. Formulates formal hypotheses, evaluates discrete cross-tabulations, and contrasts theoretical combinatorial spaces against observed survey responses."
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
            <Link href="/combolab">
              <Button variant="outline" size="sm">
                &larr; ComboLab
              </Button>
            </Link>
          </div>
        }
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Observational Non-Causal Framing Banner */}
        <Callout
          variant="warning"
          title="Methodological Grounding: Observational Study Notice"
        >
          <div className="space-y-1.5 text-xs text-stone-700 leading-relaxed font-sans">
            <p>
              Data reflects an observational university sample (N = {responses.length}). Cross-tabulations and segment percentages describe <strong>empirical associations</strong> within this cohort.
            </p>
            <p>
              They <strong>do not prove causal mechanisms</strong>, consumer utility invariance, or general population distributions. Percentages are strictly calculated using respective cohort sizes as denominators (<KaTeXMath math="N(b)" /> for brand cohorts; <KaTeXMath math="N(p)" /> for budget segments).
            </p>
          </div>
        </Callout>

        {/* Studio Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-[#FAF8F5] border border-[#EAE3D5] shadow-2xs">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-full text-xs font-sora transition-all duration-200 ${
              activeTab === "all"
                ? "bg-[#1C1B18] text-white shadow-xs font-bold"
                : "text-[#78716C] hover:text-[#1C1B18] hover:bg-white font-medium"
            }`}
          >
            All Experiments
          </button>
          <button
            onClick={() => setActiveTab("exp1")}
            className={`px-4 py-2 rounded-full text-xs font-sora transition-all duration-200 ${
              activeTab === "exp1"
                ? "bg-[#1C1B18] text-white shadow-xs font-bold"
                : "text-[#78716C] hover:text-[#1C1B18] hover:bg-white font-medium"
            }`}
          >
            Exp 1: Brand–Feature Association
          </button>
          <button
            onClick={() => setActiveTab("exp2")}
            className={`px-4 py-2 rounded-full text-xs font-sora transition-all duration-200 ${
              activeTab === "exp2"
                ? "bg-[#1C1B18] text-white shadow-xs font-bold"
                : "text-[#78716C] hover:text-[#1C1B18] hover:bg-white font-medium"
            }`}
          >
            Exp 2: Combinations by Budget
          </button>
          <button
            onClick={() => setActiveTab("methodology")}
            className={`px-4 py-2 rounded-full text-xs font-sora transition-all duration-200 ${
              activeTab === "methodology"
                ? "bg-[#1C1B18] text-white shadow-xs font-bold"
                : "text-[#78716C] hover:text-[#1C1B18] hover:bg-white font-medium"
            }`}
          >
            Methodology &amp; Hypotheses
          </button>
        </div>

        {/* EXPERIMENT 1 SECTION */}
        {(activeTab === "all" || activeTab === "exp1") && (
          <section className="space-y-6 pt-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-stone-200 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="cobalt">Experiment 01</Badge>
                  <h2 className="text-xl font-serif font-bold text-stone-900 tracking-tight">
                    Brand–Feature Preference Association
                  </h2>
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  Cross-tabulating brand affinity against canonical feature choices. Evaluates within-brand preference distributions P(f | b).
                </p>
                <p className="text-[11px] text-stone-500 mt-1.5 italic">
                  When all seven features are included, the percentages sum to 300% because each respondent selects exactly three features. Filtering the feature list changes the displayed sum.
                </p>
              </div>
              <div className="font-mono text-xs text-stone-700 bg-[#FAF9F5] border border-stone-200 px-3 py-1.5 rounded-md shrink-0 shadow-2xs">
                Denominator: <span className="text-cobalt-700 font-bold">N(b)</span> | Displayed Sum:{" "}
                <span
                  className={
                    displayedFeatureSumSummary.isExpected300
                      ? "text-lime-700 font-bold"
                      : "text-amber-700 font-bold"
                  }
                >
                  {displayedFeatureSumSummary.label}
                </span>{" "}
                <span className="text-stone-500 text-[10px]">
                  ({displayedFeatureSumSummary.note})
                </span>
              </div>
            </div>

            {/* Interactive Multi-Select Controls */}
            <BrandFeatureControls
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              selectedFeatures={selectedFeatures}
              setSelectedFeatures={setSelectedFeatures}
            />

            {/* Heatmap Matrix */}
            <BrandFeatureHeatmap
              result={brandFeatureResult}
              onSelectCell={handleSelectCell}
            />

            {/* Grouped Bar Chart */}
            <BrandFeatureBarChart
              result={brandFeatureResult}
              onSelectCell={handleSelectCell}
            />

            {/* Scientific Interpretation & Descriptive Notes */}
            <BrandFeatureInterpretation result={brandFeatureResult} />
          </section>
        )}

        {/* EXPERIMENT 2 SECTION */}
        {(activeTab === "all" || activeTab === "exp2") && (
          <section className="space-y-6 pt-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-stone-200 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="lime">Experiment 02</Badge>
                  <h2 className="text-xl font-serif font-bold text-stone-900 tracking-tight">
                    Feature Triplet Combinations by Budget Segment
                  </h2>
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  Stratifying the 35 theoretical triplets across budget ranges. Evaluates C(7,3)=35 theoretical vs empirical observations and within-budget distributions P(t | p).
                </p>
              </div>
              <div className="font-mono text-xs text-stone-700 bg-[#FAF9F5] border border-stone-200 px-3 py-1.5 rounded-md shadow-2xs">
                Denominator: <span className="text-lime-700 font-bold">N(p)</span> | Triplet Sum: <span className="text-cobalt-700 font-bold">100%</span>
              </div>
            </div>

            {/* Budget Controls */}
            <BudgetCombinationControls
              selectedBudgets={selectedBudgets}
              setSelectedBudgets={setSelectedBudgets}
            />

            {/* Summary Stat Cards */}
            <BudgetCombinationMetrics result={budgetCombinationResult} />

            {/* Recharts Bar Chart */}
            <BudgetCombinationChart
              result={budgetCombinationResult}
              onSelectRow={handleSelectBudgetRow}
            />

            {/* Full 35 Combination Table */}
            <BudgetCombinationTable
              result={budgetCombinationResult}
              onSelectRow={handleSelectBudgetRow}
            />

            {/* Scientific Interpretation & Conservation Law */}
            <BudgetCombinationInterpretation result={budgetCombinationResult} />
          </section>
        )}

        {/* DEDICATED METHODOLOGY & HYPOTHESIS COMPARISON TAB */}
        {activeTab === "methodology" && (
          <section className="space-y-6 pt-2">
            <div className="border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <Badge variant="default">Formal Framework</Badge>
                <h2 className="text-xl font-serif font-bold text-stone-900 tracking-tight">
                  Research Hypotheses &amp; Methodological Comparison
                </h2>
              </div>
              <p className="text-xs text-stone-600 mt-1">
                Formal mathematical criteria, hypothesis definitions, and analytical guardrails for the PhonePrint research suite.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Exp 1 Summary Card */}
              <Card>
                <CardHeader
                  title="Experiment 1: Brand–Feature Preferences"
                  subtitle="Within-brand preference distributions"
                  badge={<Badge variant="cobalt">Exp 1 Protocol</Badge>}
                />
                <CardContent className="space-y-4 text-xs text-stone-700 leading-relaxed">
                  <div className="p-3 bg-[#FAF9F5] rounded-md border border-stone-200">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block mb-1">
                      Formal Hypothesis Framing
                    </span>
                    <p className="font-medium text-stone-900 mb-1">
                      <strong>H₀ (Null):</strong> Canonical feature selection is conditionally independent of brand choice: <KaTeXMath math="P(f \mid b) = P(f)" /> for all <KaTeXMath math="b \in B, f \in F" />.
                    </p>
                    <p className="font-medium text-stone-900">
                      <strong>H₁ (Alternative):</strong> Feature selection distributions systematically vary across brand cohorts: <KaTeXMath math="\exists b, f: P(f \mid b) \neq P(f)" />.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                      Mathematical Invariants
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-stone-600">
                      <li>Intersection count: <KaTeXMath math="C(b, f) = |S_b \cap S_f|" />.</li>
                      <li>Within-brand percentage: <KaTeXMath math="P(f \mid b) = \frac{C(b, f)}{N(b)} \times 100\%" />.</li>
                      <li>Because each student selects 3 features, <KaTeXMath math="\sum_{f=1}^7 P(f \mid b) = 300.0\%" /> for every populated brand cohort.</li>
                      <li>Safe zero-denominator handling: <KaTeXMath math="P(f \mid b) = 0.0\%" /> when <KaTeXMath math="N(b) = 0" />.</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Exp 2 Summary Card */}
              <Card>
                <CardHeader
                  title="Experiment 2: Budget Segment Triplet Space"
                  subtitle="Discrete combinatorics across expenditure tiers"
                  badge={<Badge variant="lime">Exp 2 Protocol</Badge>}
                />
                <CardContent className="space-y-4 text-xs text-stone-700 leading-relaxed">
                  <div className="p-3 bg-[#FAF9F5] rounded-md border border-stone-200">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block mb-1">
                      Formal Hypothesis Framing
                    </span>
                    <p className="font-medium text-stone-900 mb-1">
                      <strong>H₀ (Null):</strong> Feature triplet choices are uniformly or identically distributed across budget tiers: <KaTeXMath math="P(t \mid p) = P(t)" /> for all <KaTeXMath math="p \in P" />.
                    </p>
                    <p className="font-medium text-stone-900">
                      <strong>H₁ (Alternative):</strong> Specific triplets concentrate within distinct budget tiers (e.g. premium hardware in high budget, value combinations in low budget).
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                      Mathematical Invariants
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-stone-600">
                      <li>Theoretical space: <KaTeXMath math="C(7, 3) = \frac{7!}{3! \cdot 4!} = 35" /> distinct combinations.</li>
                      <li>Observed triplets in sample: {budgetCombinationResult.totalObservedInDataset} combinations; combinatorial voids: {budgetCombinationResult.totalUnobservedInDataset} combinations.</li>
                      <li>Exact unranked set equality: triplet <KaTeXMath math="t = \{f_a, f_b, f_c\}" /> matches regardless of order.</li>
                      <li>Within-budget percentage: <KaTeXMath math="P(t \mid p) = \frac{C(p, t)}{N(p)} \times 100\%" />.</li>
                      <li>Conservation law: <KaTeXMath math="\sum_{t \in C(7,3)} P(t \mid p) = 100.0\%" /> for each populated budget segment.</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Academic Comparison Matrix */}
            <Card>
              <CardHeader
                title="Experiment Comparison Matrix"
                subtitle="Methodological and computational properties of Experiments 1 and 2"
              />
              <CardContent>
                <div className="overflow-x-auto rounded-lg border border-stone-200">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#FAF9F5] font-mono uppercase tracking-wider text-stone-700 border-b border-stone-200 text-[11px]">
                      <tr>
                        <th className="px-4 py-3">Property</th>
                        <th className="px-4 py-3">Experiment 1 (Brand–Feature)</th>
                        <th className="px-4 py-3">Experiment 2 (Budget–Combinations)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-stone-700 bg-white">
                      <tr>
                        <td className="px-4 py-3 font-semibold text-stone-900">Analytical Entity</td>
                        <td className="px-4 py-3">Individual canonical features (<KaTeXMath math="f \in F, |F|=7" />)</td>
                        <td className="px-4 py-3">3-feature subsets / triplets (<KaTeXMath math="t \in \mathcal{P}_3(F), |\mathcal{P}_3(F)|=35" />)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-stone-900">Primary Denominator</td>
                        <td className="px-4 py-3 font-mono text-cobalt-700 font-bold">N(b) (Brand cohort size)</td>
                        <td className="px-4 py-3 font-mono text-lime-700 font-bold">N(p) (Budget segment size)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-stone-900">Sum Conservation Law</td>
                        <td className="px-4 py-3 font-mono">Σ P(f | b) = 300.0% (3 features / student)</td>
                        <td className="px-4 py-3 font-mono">Σ P(t | p) = 100.0% (1 triplet / student)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-stone-900">Theoretical vs Observed</td>
                        <td className="px-4 py-3">All 7 features observed in cohort</td>
                        <td className="px-4 py-3">35 theoretical, {budgetCombinationResult.totalObservedInDataset} observed, {budgetCombinationResult.totalUnobservedInDataset} combinatorial voids</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-stone-900">Set-Theoretic Foundation</td>
                        <td className="px-4 py-3 font-mono">|S_b ∩ S_f|</td>
                        <td className="px-4 py-3 font-mono">|&#123;id | budget = p ∧ features = t&#125;|</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-stone-900">Interpretation Boundary</td>
                        <td className="px-4 py-3 text-stone-500">Descriptive co-selection; no brand loyalty causality</td>
                        <td className="px-4 py-3 text-stone-500">Empirical concentration; no pricing elasticity causality</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </div>

      {/* Respondent Inspector Modal */}
      {inspectorModal && (
        <RespondentInspectorModal
          title={inspectorModal.title}
          subtitle={inspectorModal.subtitle}
          matchingIds={inspectorModal.matchingIds}
          allResponses={responses}
          onClose={() => setInspectorModal(null)}
        />
      )}
    </div>
  );
}
