"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { loadSurveyDataset, getActiveDatasetInfo } from "@/lib/data/loader";
import { executeMatchingEngine } from "@/lib/math/matchingEngine";
import type {
  SmartphoneBrand,
  BudgetRange,
  SmartphoneFeature,
} from "@/types/survey";
import type { UserProfileInput } from "@/types/matcher";

import { PreferenceBuilder } from "@/components/my-phoneprint/PreferenceBuilder";
import { ExactMatchCard } from "@/components/my-phoneprint/ExactMatchCard";
import { PartialMatchBreakdown } from "@/components/my-phoneprint/PartialMatchBreakdown";
import { FeatureOverlapCard } from "@/components/my-phoneprint/FeatureOverlapCard";
import { RespondentExplorerTable } from "@/components/my-phoneprint/RespondentExplorerTable";
import { MatchingTheoryPanel } from "@/components/my-phoneprint/MatchingTheoryPanel";

export default function MyPhonePrintPage() {
  const dataset = useMemo(() => loadSurveyDataset(), []);
  const datasetInfo = useMemo(() => getActiveDatasetInfo(), []);
  const responses = dataset.responses;

  // Initial default: Apple, Above ₹60,000, Camera + Battery + Build
  const [brand, setBrand] = useState<SmartphoneBrand>("Apple");
  const [budget, setBudget] = useState<BudgetRange>("Above ₹60,000");
  const [features, setFeatures] = useState<SmartphoneFeature[]>([
    "Camera Quality",
    "Battery Life",
    "Build & Design Quality",
  ]);

  const toggleFeature = (feature: SmartphoneFeature) => {
    if (features.includes(feature)) {
      if (features.length > 1) {
        setFeatures(features.filter((f) => f !== feature));
      }
    } else {
      if (features.length < 3) {
        setFeatures([...features, feature]);
      }
    }
  };

  const resetPreferences = () => {
    setBrand("Apple");
    setBudget("Above ₹60,000");
    setFeatures([]);
  };

  const applyPreset = (preset: UserProfileInput) => {
    setBrand(preset.brand);
    setBudget(preset.budget);
    setFeatures([...preset.features]);
  };

  // Run the matching engine only when exactly 3 features are selected
  const isProfileComplete = features.length === 3;

  const matchResult = useMemo(() => {
    if (!isProfileComplete) return null;

    const profile: UserProfileInput = {
      brand,
      budget,
      features: [features[0]!, features[1]!, features[2]!],
    };

    return executeMatchingEngine(responses, profile);
  }, [responses, brand, budget, features, isProfileComplete]);

  return (
    <div className="space-y-12 pb-24">
      {/* Editorial Page Header */}
      <PageHeader
        sectionCode="02"
        eyebrow="Interactive Preference Profiling"
        title="My PhonePrint: Personal Vector Matcher"
        description="Formulate your 3-dimensional smartphone phenotype: target Brand (B), Budget interval (P), and exactly three non-negotiable features (F). The matching engine computes set intersections and partitions against the 30 student benchmark."
        badge={{ text: datasetInfo.badgeText, variant: datasetInfo.isDemo ? "lime" : "cobalt" }}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/combolab">
              <Button variant="outline" size="sm">
                &larr; ComboLab
              </Button>
            </Link>
            <Link href="/setlab">
              <Button variant="primary" size="sm">
                Open SetLab &rarr;
              </Button>
            </Link>
          </div>
        }
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section 1: Preference Builder */}
        <PreferenceBuilder
          brand={brand}
          setBrand={setBrand}
          budget={budget}
          setBudget={setBudget}
          features={features}
          toggleFeature={toggleFeature}
          resetPreferences={resetPreferences}
          onApplyPreset={applyPreset}
        />

        {/* Section 2: Results Dashboard (Conditioned on complete profile) */}
        {matchResult ? (
          <>
            {/* Exact Matches */}
            <ExactMatchCard result={matchResult} />

            {/* Mutually Exclusive Partial Match Breakdown */}
            <PartialMatchBreakdown result={matchResult} />

            {/* Independent Feature Overlap */}
            <FeatureOverlapCard
              featureOverlap={matchResult.featureOverlap}
              selectedFeatures={matchResult.profile.features}
              totalCohort={matchResult.totalCohort}
            />

            {/* Discrete Mathematics Learning Foundation */}
            <MatchingTheoryPanel />

            {/* Anonymous Respondent Explorer */}
            <RespondentExplorerTable respondents={matchResult.respondents} />
          </>
        ) : (
          <Callout
            variant="warning"
            title="Incomplete Preference Vector"
          >
            Please select exactly three distinct features in the builder above to
            compute your PhonePrint vector and evaluate set intersections across
            the student cohort.
          </Callout>
        )}

        {/* Academic Synthesis Summary */}
        <Callout
          variant="highlight"
          title="PhonePrint Preference Analytics Summary"
        >
          My PhonePrint models user smartphone affinity as a discrete set
          intersection problem over Universe $U$. By evaluating Brand ($B$), Budget ($P$),
          and Feature Triplet ($F$), the system demonstrates how multi-dimensional
          conjunctions partition a population into non-overlapping distance bands,
          providing mathematically rigorous insights without aggregate scalar
          approximations.
        </Callout>
      </div>
    </div>
  );
}
