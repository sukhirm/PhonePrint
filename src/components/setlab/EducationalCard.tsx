"use client";

import React from "react";
import { KaTeXMath } from "@/components/ui/KaTeXMath";
import { Badge } from "@/components/ui/Badge";
import type { ActiveOperation } from "./SetOperationsToolbar";

export interface EducationalCardProps {
  operation: ActiveOperation;
  setAName: string;
  setBName: string;
  setCName?: string;
  resultCount: number;
  totalUniverse: number;
}

interface DefinitionMeta {
  title: string;
  math: string;
  plainEnglish: string;
  properties: string[];
}

const DEFINITIONS: Record<ActiveOperation, (a: string, b: string, c?: string) => DefinitionMeta> = {
  union: (a, b) => ({
    title: "Set Union (A ∪ B)",
    math: "A \\cup B = \\{ x \\in U \\mid x \\in A \\lor x \\in B \\}",
    plainEnglish: `Contains every respondent who chose ${a}, or chose ${b}, or chose both. Elements belonging to both cohorts are listed without duplicate counting.`,
    properties: ["Commutative: A ∪ B = B ∪ A", "Associative: (A ∪ B) ∪ C = A ∪ (B ∪ C)", "Identity: A ∪ ∅ = A"],
  }),
  intersection: (a, b) => ({
    title: "Set Intersection (A ∩ B)",
    math: "A \\cap B = \\{ x \\in U \\mid x \\in A \\land x \\in B \\}",
    plainEnglish: `Contains strictly the respondents who simultaneously selected ${a} AND selected ${b}. If no student matches both criteria, the intersection is the empty set (∅).`,
    properties: ["Commutative: A ∩ B = B ∩ A", "Distributive: A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)", "Domination: A ∩ ∅ = ∅"],
  }),
  diff_ab: (a, b) => ({
    title: "Relative Complement / Difference (A \\ B)",
    math: "A \\setminus B = \\{ x \\in U \\mid x \\in A \\land x \\notin B \\}",
    plainEnglish: `Contains respondents who chose ${a}, but did NOT choose ${b}. This isolates preferences specific to cohort A without influence from cohort B.`,
    properties: ["Non-commutative: A \\ B ≠ B \\ A (in general)", "A \\ B = A ∩ Bᶜ", "A \\ ∅ = A, A \\ A = ∅"],
  }),
  diff_ba: (a, b) => ({
    title: "Relative Complement / Difference (B \\ A)",
    math: "B \\setminus A = \\{ x \\in U \\mid x \\in B \\land x \\notin A \\}",
    plainEnglish: `Contains respondents who chose ${b}, but did NOT choose ${a}. This isolates preferences unique to cohort B.`,
    properties: ["Non-commutative: B \\ A ≠ A \\ B", "B \\ A = B ∩ Aᶜ", "Disjoint from A \\ B"],
  }),
  sym_diff: (a, b) => ({
    title: "Symmetric Difference (A Δ B)",
    math: "A \\mathbin{\\Delta} B = (A \\setminus B) \\cup (B \\setminus A) = \\{ x \\in U \\mid (x \\in A \\oplus x \\in B) \\}",
    plainEnglish: `Contains respondents who belong to either ${a} or ${b}, but NOT both. This is the exact set-theoretic equivalent of the XOR (exclusive-OR) logical operator.`,
    properties: ["Commutative: A Δ B = B Δ A", "A Δ B = (A ∪ B) \\ (A ∩ B)", "Self-inverse: A Δ A = ∅"],
  }),
  comp_a: (a) => ({
    title: "Absolute Complement (Aᶜ)",
    math: "A^c = U \\setminus A = \\{ x \\in U \\mid x \\notin A \\}",
    plainEnglish: `Contains all respondents in the university cohort who did NOT select ${a}. The complement is always defined relative to the universal set U.`,
    properties: ["Double Complement: (Aᶜ)ᶜ = A", "Complementarity: A ∪ Aᶜ = U and A ∩ Aᶜ = ∅", "De Morgan: (A ∪ B)ᶜ = Aᶜ ∩ Bᶜ"],
  }),
  comp_b: (_, b) => ({
    title: "Absolute Complement (Bᶜ)",
    math: "B^c = U \\setminus B = \\{ x \\in U \\mid x \\notin B \\}",
    plainEnglish: `Contains all respondents in the university cohort who did NOT select ${b}.`,
    properties: ["Double Complement: (Bᶜ)ᶜ = B", "Complementarity: B ∪ Bᶜ = U and B ∩ Bᶜ = ∅", "De Morgan: (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ"],
  }),
  neither: (a, b) => ({
    title: "Neither Set ((A ∪ B)ᶜ)",
    math: "(A \\cup B)^c = A^c \\cap B^c = \\{ x \\in U \\mid x \\notin A \\land x \\notin B \\}",
    plainEnglish: `Contains all respondents who selected NEITHER ${a} NOR ${b}. Directly proves De Morgan's First Law.`,
    properties: ["De Morgan: (A ∪ B)ᶜ = Aᶜ ∩ Bᶜ", "Disjoint from A and from B", "Union with (A ∪ B) equals universal set U"],
  }),
  subset_ab: (a, b) => ({
    title: "Subset Inclusion Predicate (A ⊆ B)",
    math: "A \\subseteq B \\iff \\forall x \\in U, (x \\in A \\implies x \\in B)",
    plainEnglish: `Tests whether every respondent who chose ${a} also chose ${b}. If false, the displayed respondents represent counterexample elements belonging to A \\ B.`,
    properties: ["Reflexive: A ⊆ A", "Antisymmetric: (A ⊆ B ∧ B ⊆ A) ⟹ A = B", "Transitive: (A ⊆ B ∧ B ⊆ C) ⟹ A ⊆ C"],
  }),
  disjoint_ab: (a, b) => ({
    title: "Disjointness Predicate (A ∩ B = ∅)",
    math: "A \\text{ and } B \\text{ are disjoint} \\iff A \\cap B = \\emptyset",
    plainEnglish: `Evaluates whether cohorts ${a} and ${b} have zero shared respondents. If true, the intersection cardinality is strictly zero.`,
    properties: ["Mutual exclusion: |A ∪ B| = |A| + |B|", "Zero intersection: |A ∩ B| = 0", "Difference equals original: A \\ B = A"],
  }),
  union_abc: (a, b, c) => ({
    title: "Triple Union (A ∪ B ∪ C)",
    math: "A \\cup B \\cup C = \\{ x \\in U \\mid x \\in A \\lor x \\in B \\lor x \\in C \\}",
    plainEnglish: `Contains respondents who chose at least one of ${a}, ${b}, or ${c || "Set C"}.`,
    properties: ["Inclusion-Exclusion Theorem domain", "Associative and Commutative", "Contains all 7 internal Venn regions"],
  }),
  inter_abc: (a, b, c) => ({
    title: "Triple Intersection (A ∩ B ∩ C)",
    math: "A \\cap B \\cap C = \\{ x \\in U \\mid x \\in A \\land x \\in B \\land x \\in C \\}",
    plainEnglish: `Contains respondents who simultaneously selected ALL THREE: ${a}, ${b}, and ${c || "Set C"}.`,
    properties: ["Core intersection region", "Highest constraint specificity", "Dominated by smallest component set"],
  }),
  inter_ab: (a, b) => ({
    title: "Pairwise Intersection (A ∩ B)",
    math: "A \\cap B = \\{ x \\in U \\mid x \\in A \\land x \\in B \\}",
    plainEnglish: `Contains respondents who selected both ${a} and ${b}, regardless of set C.`,
    properties: ["Equals (A ∩ B ∩ C) ∪ ((A ∩ B) \\ C)", "Pairwise PIE term", "Upper bound: min(|A|, |B|)"],
  }),
  inter_ac: (a, _, c) => ({
    title: "Pairwise Intersection (A ∩ C)",
    math: "A \\cap C = \\{ x \\in U \\mid x \\in A \\land x \\in C \\}",
    plainEnglish: `Contains respondents who selected both ${a} and ${c || "Set C"}.`,
    properties: ["Pairwise PIE term", "Independent of B", "Upper bound: min(|A|, |C|)"],
  }),
  inter_bc: (_, b, c) => ({
    title: "Pairwise Intersection (B ∩ C)",
    math: "B \\cap C = \\{ x \\in U \\mid x \\in B \\land x \\in C \\}",
    plainEnglish: `Contains respondents who selected both ${b} and ${c || "Set C"}.`,
    properties: ["Pairwise PIE term", "Independent of A", "Upper bound: min(|B|, |C|)"],
  }),
  only_a: (a) => ({
    title: "Region 1: A Only",
    math: "A \\setminus (B \\cup C) = A \\cap B^c \\cap C^c",
    plainEnglish: `Contains respondents who selected ${a}, but neither of the other two sets.`,
    properties: ["Mutually disjoint from all other 6 regions", "Pure A cohort isolate", "Partition component"],
  }),
  only_b: (_, b) => ({
    title: "Region 2: B Only",
    math: "B \\setminus (A \\cup C) = B \\cap A^c \\cap C^c",
    plainEnglish: `Contains respondents who selected ${b}, but neither of the other two sets.`,
    properties: ["Mutually disjoint from all other 6 regions", "Pure B cohort isolate", "Partition component"],
  }),
  only_c: (_a, _b, c) => ({
    title: "Region 3: C Only",
    math: "C \\setminus (A \\cup B) = C \\cap A^c \\cap B^c",
    plainEnglish: `Contains respondents who selected ${c || "Set C"}, but neither of the other two sets.`,
    properties: ["Mutually disjoint from all other 6 regions", "Pure C cohort isolate", "Partition component"],
  }),
  only_ab: (a, b) => ({
    title: "Region 4: AB Only",
    math: "(A \\cap B) \\setminus C = A \\cap B \\cap C^c",
    plainEnglish: `Contains respondents who selected both ${a} and ${b}, but explicitly excluded Set C.`,
    properties: ["Exact 2-way intersection", "Disjoint from triple intersection", "Partition component"],
  }),
  only_ac: (a, _b, c) => ({
    title: "Region 5: AC Only",
    math: "(A \\cap C) \\setminus B = A \\cap C \\cap B^c",
    plainEnglish: `Contains respondents who selected both ${a} and ${c || "Set C"}, but excluded Set B.`,
    properties: ["Exact 2-way intersection", "Disjoint from triple intersection", "Partition component"],
  }),
  only_bc: (_a, b, c) => ({
    title: "Region 6: BC Only",
    math: "(B \\cap C) \\setminus A = B \\cap C \\cap A^c",
    plainEnglish: `Contains respondents who selected both ${b} and ${c || "Set C"}, but excluded Set A.`,
    properties: ["Exact 2-way intersection", "Disjoint from triple intersection", "Partition component"],
  }),
  outside_abc: () => ({
    title: "Region 8: Outside All Three",
    math: "(A \\cup B \\cup C)^c = A^c \\cap B^c \\cap C^c",
    plainEnglish: `Contains respondents who chose NONE of the three active sets.`,
    properties: ["Exterior Venn region", "Complement of triple union", "Completes partition of U to 100%"],
  }),
};

export function EducationalCard({
  operation,
  setAName,
  setBName,
  setCName,
  resultCount,
  totalUniverse,
}: EducationalCardProps) {
  const getDef = DEFINITIONS[operation] || DEFINITIONS.intersection;
  const def = getDef(setAName, setBName, setCName);

  return (
    <div className="rounded-3xl border border-[#EAE3D5] bg-white p-6 sm:p-8 shadow-[0_15px_40px_-15px_rgba(44,38,28,0.06)] space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F5F1E8] pb-4">
        <div>
          <span className="text-[10px] font-sora font-bold uppercase tracking-wider text-stone-500">
            Set Theoretic Definition &amp; Theory
          </span>
          <h3 className="text-base font-heading font-extrabold tracking-tight text-[#1C1B18] mt-0.5">
            {def.title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="cobalt">Formal Identity</Badge>
          <span className="font-sora text-xs font-bold text-stone-900 bg-[#FAF8F5] border border-[#EAE3D5] px-3 py-1 rounded-full shadow-2xs">
            n = {resultCount} / {totalUniverse}
          </span>
        </div>
      </div>

      {/* KaTeX Mathematical Notation */}
      <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-5 text-center">
        <KaTeXMath math={def.math} block className="text-[#1C1B18] font-bold text-xs sm:text-sm" />
      </div>

      {/* Plain-English Explanation */}
      <div className="space-y-1.5 text-xs text-stone-700 leading-relaxed font-sans">
        <span className="font-heading font-bold text-[#1C1B18] uppercase text-[10px] tracking-wider block">
          Intuitive Explanation:
        </span>
        <p className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#EAE3D5] leading-relaxed">
          {def.plainEnglish}
        </p>
      </div>

      {/* Mathematical Properties */}
      <div className="border-t border-[#F5F1E8] pt-4">
        <span className="font-heading font-bold text-[#1C1B18] uppercase text-[10px] tracking-wider block mb-3">
          Discrete Mathematical Properties:
        </span>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700 font-sans">
          {def.properties.map((prop, i) => (
            <li key={i} className="flex items-center gap-2 bg-[#FAF8F5] p-3 rounded-2xl border border-[#EAE3D5]">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 flex-shrink-0" />
              <span className="font-sora text-[11px] font-semibold">{prop}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
