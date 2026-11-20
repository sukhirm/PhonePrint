"use client";

import React, { useState, useMemo } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { KaTeXMath } from "@/components/ui/KaTeXMath";
import {
  calculateCombinations,
  getCombinationCalculationSteps,
} from "@/lib/math/combinations";

interface PresetConfig {
  label: string;
  n: number;
  r: number;
  description: string;
}

const PRESETS: PresetConfig[] = [
  {
    label: "PhonePrint Triplet Space",
    n: 7,
    r: 3,
    description: "C(7, 3) = 35 canonical feature combinations",
  },
  {
    label: "Symmetric Pair C(7, 4)",
    n: 7,
    r: 4,
    description: "C(7, 4) = C(7, 3) = 35 by symmetry",
  },
  {
    label: "Pairwise Feature Overlap",
    n: 7,
    r: 2,
    description: "C(7, 2) = 21 pairwise feature interactions",
  },
  {
    label: "Top 5 Features Subspace",
    n: 5,
    r: 3,
    description: "C(5, 3) = 10 feature triplets among top 5 features",
  },
  {
    label: "Boundary: C(n, 0)",
    n: 7,
    r: 0,
    description: "C(7, 0) = 1 (empty selection / null subset)",
  },
  {
    label: "Boundary: C(n, n)",
    n: 7,
    r: 7,
    description: "C(7, 7) = 1 (complete set selection)",
  },
];

export function CombinationCalculator() {
  const [nInput, setNInput] = useState<number>(7);
  const [rInput, setRInput] = useState<number>(3);

  // Validation
  const validationError = useMemo(() => {
    if (!Number.isInteger(nInput) || !Number.isInteger(rInput)) {
      return "Both n and r must be integers.";
    }
    if (nInput < 0) {
      return "Total available items n cannot be negative.";
    }
    if (rInput < 0) {
      return "Chosen items r cannot be negative.";
    }
    if (rInput > nInput) {
      return `Chosen items r (${rInput}) cannot exceed available items n (${nInput}). In combinations without repetition, r ≤ n is required.`;
    }
    if (nInput > 18) {
      return "For exact safe integer precision (Number.MAX_SAFE_INTEGER) and readable factorial expansion, n is capped at 18 in this interactive calculator.";
    }
    return null;
  }, [nInput, rInput]);

  const calculation = useMemo(() => {
    if (validationError) return null;
    try {
      const steps = getCombinationCalculationSteps(nInput, rInput);
      const total = calculateCombinations(nInput, rInput);
      return { steps, total };
    } catch {
      return null;
    }
  }, [nInput, rInput, validationError]);

  return (
    <div className="rounded-3xl border border-[#EAE3D5] bg-white p-6 shadow-xs text-[#1C1B18] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F5F1E8] pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-base font-montserrat font-bold tracking-tight text-[#1C1B18]">
              Interactive Binomial Coefficient Calculator (nCr)
            </h3>
            <Badge variant="cobalt">Pure Combinatorics</Badge>
          </div>
          <p className="text-xs text-[#78716C] mt-1 font-sans">
            Step-by-step factorial simplification, cancelation, and exact numerical computation
          </p>
        </div>
      </div>

      {/* Preset buttons */}
      <div>
        <label className="text-[11px] font-sora font-semibold uppercase tracking-wider text-[#78716C] block mb-2.5">
          Quick Exploration Presets:
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => {
            const isActive = nInput === preset.n && rInput === preset.r;
            return (
              <button
                key={preset.label}
                onClick={() => {
                  setNInput(preset.n);
                  setRInput(preset.r);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sora transition-all ${
                  isActive
                    ? "bg-[#1C1B18] text-white shadow-xs font-bold"
                    : "bg-[#FAF8F5] hover:bg-[#F5F1E8] text-[#57534E] border border-[#EAE3D5] font-medium"
                }`}
                title={preset.description}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl bg-[#FAF8F5] p-5 border border-[#EAE3D5]">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="input-n"
              className="text-xs font-montserrat font-bold text-[#1C1B18]"
            >
              Available Elements (n)
            </label>
            <span className="text-[11px] text-blue-700 font-sora font-semibold">
              Canonical features = 7
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 w-9 p-0 font-sora font-bold text-sm rounded-full"
              onClick={() => setNInput((prev) => Math.max(0, prev - 1))}
            >
              -
            </Button>
            <input
              id="input-n"
              type="number"
              min={0}
              max={18}
              value={nInput}
              onChange={(e) => setNInput(parseInt(e.target.value, 10) || 0)}
              className="h-9 w-full rounded-full border border-[#EAE3D5] bg-white px-4 text-center font-sora text-sm font-bold text-[#1C1B18] focus:border-[#1C1B18] focus:outline-none shadow-2xs"
            />
            <Button
              variant="outline"
              size="sm"
              className="h-9 w-9 p-0 font-sora font-bold text-sm rounded-full"
              onClick={() => setNInput((prev) => Math.min(18, prev + 1))}
            >
              +
            </Button>
          </div>
          <p className="text-[11px] text-[#78716C] mt-1.5 font-sans">
            Total distinct canonical features available in universe.
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="input-r"
              className="text-xs font-montserrat font-bold text-[#1C1B18]"
            >
              Chosen Elements (r)
            </label>
            <span className="text-[11px] text-emerald-700 font-sora font-semibold">
              Selected features = 3
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 w-9 p-0 font-sora font-bold text-sm rounded-full"
              onClick={() => setRInput((prev) => Math.max(0, prev - 1))}
            >
              -
            </Button>
            <input
              id="input-r"
              type="number"
              min={0}
              max={nInput}
              value={rInput}
              onChange={(e) => setRInput(parseInt(e.target.value, 10) || 0)}
              className="h-9 w-full rounded-full border border-[#EAE3D5] bg-white px-4 text-center font-sora text-sm font-bold text-[#1C1B18] focus:border-[#1C1B18] focus:outline-none shadow-2xs"
            />
            <Button
              variant="outline"
              size="sm"
              className="h-9 w-9 p-0 font-sora font-bold text-sm rounded-full"
              onClick={() => setRInput((prev) => Math.min(nInput, prev + 1))}
            >
              +
            </Button>
          </div>
          <p className="text-[11px] text-[#78716C] mt-1.5 font-sans">
            Exact subset size selected per respondent without repetition.
          </p>
        </div>
      </div>

      {/* Validation Alert */}
      {validationError && (
        <div className="rounded-2xl border border-red-200 bg-red-50/80 p-3.5 text-xs font-medium text-red-900 font-sans">
          <strong>Input Error:</strong> {validationError}
        </div>
      )}

      {/* Step-by-Step Mathematical Output */}
      {calculation && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
            {/* Formula & Substitution Card */}
            <div className="md:col-span-3 rounded-2xl border border-[#EAE3D5] bg-white p-5 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between border-b border-[#F5F1E8] pb-2.5">
                <span className="text-[11px] font-sora font-semibold uppercase tracking-wider text-[#78716C]">
                  Step-by-Step Factorial Simplification
                </span>
                {calculation.steps.isSymmetricApplied && (
                  <Badge variant="lime">
                    Symmetry: C({nInput}, {rInput}) = C({nInput}, {calculation.steps.effectiveR})
                  </Badge>
                )}
              </div>

              <div className="space-y-3">
                <div className="rounded-xl bg-[#FAF8F5] p-3.5 border border-[#EAE3D5]">
                  <span className="text-[10px] font-sora font-semibold uppercase text-[#78716C] block mb-1">
                    1. General Combinatorial Identity
                  </span>
                  <KaTeXMath
                    math={calculation.steps.formulaLatex}
                    block
                    className="text-[#1C1B18] text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div className="rounded-xl bg-[#FAF8F5] p-3.5 border border-[#EAE3D5]">
                  <span className="text-[10px] font-sora font-semibold uppercase text-[#78716C] block mb-1">
                    2. Numerical Value Substitution
                  </span>
                  <KaTeXMath
                    math={calculation.steps.substitutedLatex}
                    block
                    className="text-[#1C1B18] text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div className="rounded-xl bg-[#FAF8F5] p-3.5 border border-[#EAE3D5]">
                  <span className="text-[10px] font-sora font-semibold uppercase text-[#78716C] block mb-1">
                    3. Factorial Cancellation & Arithmetic Reduction
                  </span>
                  <KaTeXMath
                    math={calculation.steps.simplifiedLatex}
                    block
                    className="text-[#1C1B18] text-xs sm:text-sm font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Result Metric Card */}
            <div className="flex flex-col justify-between rounded-2xl border border-[#1C1B18] bg-[#1C1B18] p-6 text-center text-white shadow-xs">
              <div>
                <span className="text-[11px] font-sora font-semibold uppercase tracking-wider text-stone-300">
                  Theoretical Combinations
                </span>
                <div className="mt-3 font-sora text-5xl font-extrabold text-[#FEF08A]">
                  {calculation.total.toLocaleString()}
                </div>
                <p className="mt-2 text-xs text-stone-300 font-sans">
                  Distinct unordered subsets of size {rInput} from {nInput} elements
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800 text-xs text-stone-400 font-sora font-semibold">
                C({nInput}, {rInput}) = {calculation.total}
              </div>
            </div>
          </div>

          {/* Symmetry and Mathematical Properties Note */}
          <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-4 text-xs text-[#57534E] flex items-start gap-2.5 font-sans">
            <span className="text-blue-600 font-bold text-sm">&bull;</span>
            <div>
              <strong>Mathematical Property:</strong> Symmetry states that{" "}
              <KaTeXMath math="C(n, r) = C(n, n - r)" />. Choosing{" "}
              {rInput} elements to bundle is mathematically identical to choosing{" "}
              {nInput - rInput} elements to leave unselected.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
