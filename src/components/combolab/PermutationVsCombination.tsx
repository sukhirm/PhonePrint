"use client";

import React, { useState, useMemo } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { KaTeXMath } from "@/components/ui/KaTeXMath";
import {
  SMARTPHONE_FEATURES,
  type SmartphoneFeature,
} from "@/types/survey";
import { generatePermutations } from "@/lib/math/combinations";

export function PermutationVsCombination() {
  const [selectedFeatures, setSelectedFeatures] = useState<
    [SmartphoneFeature, SmartphoneFeature, SmartphoneFeature]
  >([
    "Camera Quality",
    "Battery Life",
    "Processing Performance",
  ]);

  // Generate all 3! = 6 permutations of the 3 selected features
  const permutations = useMemo(() => {
    return generatePermutations(selectedFeatures);
  }, [selectedFeatures]);

  const toggleFeature = (feature: SmartphoneFeature) => {
    if (selectedFeatures.includes(feature)) {
      // Don't deselect below 3
      return;
    }
    // Replace the first feature and shift
    setSelectedFeatures([selectedFeatures[1], selectedFeatures[2], feature]);
  };

  return (
    <Card>
      <CardHeader
        title="Permutations vs Combinations: Why Order Does Not Matter"
        subtitle="Mathematical comparison using empirical smartphone feature triplets"
        badge={<Badge variant="lime">Core Discrete Concept</Badge>}
      />
      <CardContent className="space-y-6">
        {/* Interactive Feature Selector */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-500">
              Select 3 Features to Compare:
            </span>
            <span className="text-xs font-mono text-stone-500">
              Active Triplet: {selectedFeatures.length} / 3
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SMARTPHONE_FEATURES.map((feature) => {
              const isSelected = selectedFeatures.includes(feature);
              return (
                <button
                  key={feature}
                  onClick={() => toggleFeature(feature)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-cobalt-600 text-white shadow-none"
                      : "bg-[#FAF9F5] hover:bg-stone-100 text-stone-700 border border-stone-200"
                  }`}
                >
                  {isSelected ? "✓ " : "+ "}
                  {feature}
                </button>
              );
            })}
          </div>
        </div>

        {/* Side-by-side or responsive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Combinations (Unordered) */}
          <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50/30 backdrop-blur-md p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-emerald-200/60 pb-3">
              <div>
                <span className="text-[11px] font-sora font-semibold uppercase tracking-wider text-emerald-800">
                  Combination (Unordered Set)
                </span>
                <h4 className="text-base font-heading font-extrabold text-slate-900 mt-0.5">
                  Order Does NOT Matter
                </h4>
              </div>
              <Badge variant="lime">C(3, 3) = 1 Outcome</Badge>
            </div>

            <div className="rounded-xl bg-white/90 p-4 border border-emerald-100 shadow-2xs space-y-3">
              <span className="text-[11px] font-sora text-slate-500 uppercase tracking-wider block font-semibold">
                Mathematical Set Notation:
              </span>
              <div className="flex flex-wrap items-center gap-1.5 p-2.5 rounded-xl bg-slate-50/70 border border-slate-200/60 font-sora text-xs">
                <span className="text-slate-400 font-bold text-base">&#123;</span>
                {selectedFeatures.map((f, i) => (
                  <React.Fragment key={f}>
                    <span className="font-semibold text-blue-700 bg-white px-2.5 py-1 rounded-full border border-blue-200/60 shadow-2xs">
                      {f}
                    </span>
                    {i < selectedFeatures.length - 1 && (
                      <span className="text-slate-400">,</span>
                    )}
                  </React.Fragment>
                ))}
                <span className="text-slate-400 font-bold text-base">&#125;</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                In set theory, elements within braces have no intrinsic ordering:
                <br />
                <code className="text-xs font-sora font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 mt-1 inline-block">
                  &#123;A, B, C&#125; = &#123;B, A, C&#125; = &#123;C, B, A&#125;
                </code>
              </p>
            </div>

            <div className="rounded-xl bg-white/90 p-4 border border-emerald-100 text-xs text-slate-700 space-y-1.5 shadow-2xs">
              <span className="font-heading font-bold text-emerald-950 block uppercase text-[11px]">
                PhonePrint Application Context:
              </span>
              <p className="text-slate-600 leading-relaxed font-sans">
                The PhonePrint survey asks students:{" "}
                <em>&quot;Choose your top three priority smartphone features.&quot;</em>{" "}
                Whether a respondent clicks &quot;Battery Life&quot; first or
                &quot;Camera Quality&quot; first, their smartphone preference
                bundle is identical. They form <strong>1 single combination</strong>.
              </p>
            </div>
          </div>

          {/* Permutations (Ordered) */}
          <div className="rounded-2xl border border-blue-200/70 bg-blue-50/30 backdrop-blur-md p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-blue-200/60 pb-3">
              <div>
                <span className="text-[11px] font-sora font-semibold uppercase tracking-wider text-blue-800">
                  Permutations (Ordered Sequences)
                </span>
                <h4 className="text-base font-heading font-extrabold text-slate-900 mt-0.5">
                  Order Matters (Ranked)
                </h4>
              </div>
              <Badge variant="cobalt">P(3, 3) = 3! = 6 Outcomes</Badge>
            </div>

            <div className="rounded-xl bg-white/90 p-4 border border-blue-100 shadow-2xs space-y-2">
              <span className="text-[11px] font-sora text-slate-500 uppercase tracking-wider block font-semibold">
                All 3! = 6 Distinct Ordered Sequences:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {permutations.map((perm, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 p-2 rounded bg-[#FAF9F5] border border-stone-200 font-mono text-[11px]"
                  >
                    <span className="font-bold text-cobalt-600 w-5">
                      #{idx + 1}
                    </span>
                    <span className="text-stone-400">(</span>
                    <span className="truncate text-stone-800 font-medium">
                      {perm.map((f) => f.split(" ")[0]).join(", ")}
                    </span>
                    <span className="text-stone-400">)</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-md bg-white p-3.5 border border-stone-200 text-xs text-stone-700 space-y-1.5">
              <span className="font-mono text-[11px] font-bold text-cobalt-900 block uppercase">
                Combinatorial Relationship:
              </span>
              <p className="text-stone-600 leading-relaxed">
                To count combinations without overcounting, we divide permutations by{" "}
                <KaTeXMath math="r!" />:
              </p>
              <div className="pt-1">
                <KaTeXMath
                  math="C(n, r) = \frac{P(n, r)}{r!} = \frac{6}{3!} = \frac{6}{6} = 1"
                  block
                  className="text-xs font-semibold text-stone-900"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
