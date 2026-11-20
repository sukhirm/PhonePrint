"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";

export type Operation2Set =
  | "union"
  | "intersection"
  | "diff_ab"
  | "diff_ba"
  | "sym_diff"
  | "comp_a"
  | "comp_b"
  | "neither"
  | "subset_ab"
  | "disjoint_ab";

export type Operation3Set =
  | "union_abc"
  | "inter_abc"
  | "inter_ab"
  | "inter_ac"
  | "inter_bc"
  | "only_a"
  | "only_b"
  | "only_c"
  | "only_ab"
  | "only_ac"
  | "only_bc"
  | "outside_abc";

export type ActiveOperation = Operation2Set | Operation3Set;

export interface SetOperationsToolbarProps {
  mode: "2-set" | "3-set";
  activeOperation: ActiveOperation;
  onSelectOperation: (op: ActiveOperation) => void;
  resultCardinality: number;
  totalUniverse: number;
}

interface OperationButtonDef {
  id: ActiveOperation;
  label: string;
  symbol: string;
  category: "core" | "relative" | "complement" | "predicate";
}

const OPERATIONS_2SET: OperationButtonDef[] = [
  { id: "union", label: "Union", symbol: "A ∪ B", category: "core" },
  { id: "intersection", label: "Intersection", symbol: "A ∩ B", category: "core" },
  { id: "diff_ab", label: "Difference", symbol: "A \\ B", category: "relative" },
  { id: "diff_ba", label: "Difference", symbol: "B \\ A", category: "relative" },
  { id: "sym_diff", label: "Symmetric Diff", symbol: "A Δ B", category: "relative" },
  { id: "comp_a", label: "Complement of A", symbol: "Aᶜ", category: "complement" },
  { id: "comp_b", label: "Complement of B", symbol: "Bᶜ", category: "complement" },
  { id: "neither", label: "Neither Set", symbol: "(A ∪ B)ᶜ", category: "complement" },
  { id: "subset_ab", label: "Subset Test", symbol: "A ⊆ B?", category: "predicate" },
  { id: "disjoint_ab", label: "Disjointness", symbol: "A ∩ B = ∅?", category: "predicate" },
];

const OPERATIONS_3SET: OperationButtonDef[] = [
  { id: "union_abc", label: "Triple Union", symbol: "A ∪ B ∪ C", category: "core" },
  { id: "inter_abc", label: "Triple Intersection", symbol: "A ∩ B ∩ C", category: "core" },
  { id: "inter_ab", label: "Pairwise Overlap", symbol: "A ∩ B", category: "core" },
  { id: "inter_ac", label: "Pairwise Overlap", symbol: "A ∩ C", category: "core" },
  { id: "inter_bc", label: "Pairwise Overlap", symbol: "B ∩ C", category: "core" },
  { id: "only_a", label: "Region 1", symbol: "A Only", category: "relative" },
  { id: "only_b", label: "Region 2", symbol: "B Only", category: "relative" },
  { id: "only_c", label: "Region 3", symbol: "C Only", category: "relative" },
  { id: "only_ab", label: "Region 4", symbol: "AB Only", category: "relative" },
  { id: "only_ac", label: "Region 5", symbol: "AC Only", category: "relative" },
  { id: "only_bc", label: "Region 6", symbol: "BC Only", category: "relative" },
  { id: "outside_abc", label: "Region 8", symbol: "Outside All 3", category: "complement" },
];

export function SetOperationsToolbar({
  mode,
  activeOperation,
  onSelectOperation,
  resultCardinality,
  totalUniverse,
}: SetOperationsToolbarProps) {
  const operations = mode === "2-set" ? OPERATIONS_2SET : OPERATIONS_3SET;

  return (
    <div className="rounded-3xl border border-[#EAE3D5] bg-white p-6 shadow-[0_15px_40px_-15px_rgba(44,38,28,0.06)] space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F5F1E8]">
        <div>
          <h4 className="text-base font-heading font-extrabold text-[#1C1B18]">
            Set-Theoretic Algebraic Operations
          </h4>
          <p className="text-xs text-stone-500 font-sans">
            Choose a boolean set operation to evaluate on student partitions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="cobalt">
            Result: {resultCardinality} / {totalUniverse} ({Math.round((resultCardinality / totalUniverse) * 100)}%)
          </Badge>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {operations.map((op) => {
          const isSelected = activeOperation === op.id;

          return (
            <button
              key={op.id}
              type="button"
              onClick={() => onSelectOperation(op.id)}
              className={`rounded-2xl px-4 py-2 text-xs font-sora font-semibold transition-all duration-200 border flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? "bg-[#1C1B18] text-white border-[#1C1B18] shadow-xs scale-[1.02]"
                  : "bg-[#FAF8F5] text-stone-700 border-[#EAE3D5] hover:bg-[#F5F1E8]"
              }`}
            >
              <span>{op.symbol}</span>
              <span className={`text-[10px] ${isSelected ? "text-stone-300" : "text-stone-400"}`}>
                ({op.label})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
