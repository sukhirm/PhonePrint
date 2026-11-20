"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { KaTeXMath } from "@/components/ui/KaTeXMath";

interface Topic {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  formula: string;
  explanation: string;
  phoneprintApplication: string;
  properties: string[];
}

const TOPICS: Topic[] = [
  {
    id: "combinations",
    title: "Combinations (Unordered Subsets)",
    subtitle: "Choosing r items from n without replacement where order does not matter",
    badge: "C(n, r)",
    formula: "C(n, r) = \\binom{n}{r} = \\frac{n!}{r!(n - r)!}",
    explanation:
      "A combination is a selection of elements from a collection such that the order of selection does not matter. To compute C(n, r), we count all possible ordered arrangements (permutations) and divide by r! to remove redundancy caused by the r! permutations of each chosen subset.",
    phoneprintApplication:
      "The PhonePrint survey asks respondents to select their top 3 priority features from 7 available canonical features. Selecting Camera, Battery, and Display is identical to selecting Display, Battery, and Camera. There are exactly C(7, 3) = 35 theoretical combinations.",
    properties: [
      "Symmetry: C(n, r) = C(n, n - r)",
      "Boundary Cases: C(n, 0) = 1 and C(n, n) = 1",
      "Linear Identity: C(n, 1) = n",
    ],
  },
  {
    id: "permutations",
    title: "Permutations (Ordered Arrangements)",
    subtitle: "Arranging r items from n where position and order matter",
    badge: "P(n, r)",
    formula: "P(n, r) = \\frac{n!}{(n - r)!} = n \\times (n - 1) \\times \\dots \\times (n - r + 1)",
    explanation:
      "A permutation is an ordered sequence of elements. If the survey had asked respondents to strictly rank their features as 1st (Gold), 2nd (Silver), and 3rd (Bronze), order would matter, resulting in P(7, 3) = 210 possible podium outcomes.",
    phoneprintApplication:
      "For any 3 selected features, there are 3! = 6 possible ordered permutations. In PhonePrint, we treat all 6 orders as equivalent to avoid artificial preference fragmentation.",
    properties: [
      "Complete Permutations: P(n, n) = n!",
      "Zero Selection: P(n, 0) = 1",
      "Relation to Combinations: P(n, r) = r! * C(n, r)",
    ],
  },
  {
    id: "factorial",
    title: "Factorial Notation (n!)",
    subtitle: "The product of all positive integers less than or equal to n",
    badge: "n!",
    formula: "n! = \\prod_{k=1}^{n} k = n \\times (n - 1) \\times (n - 2) \\times \\dots \\times 2 \\times 1",
    explanation:
      "The factorial function represents the number of ways to arrange n distinct objects in a straight line. By convention, 0! = 1, representing the single way to arrange zero objects (the empty arrangement).",
    phoneprintApplication:
      "Factorials are foundational for combinatorial calculations. 7! = 5,040 total permutations of all canonical features; 3! = 6 ways to arrange 3 selected features; 4! = 24 ways to arrange unselected features.",
    properties: [
      "Empty Product Convention: 0! = 1",
      "Recurrence: n! = n * (n - 1)!",
      "Rapid Growth: 7! = 5,040, 10! = 3,628,800",
    ],
  },
  {
    id: "multiplication_principle",
    title: "The Multiplication Principle (Rule of Product)",
    subtitle: "Fundamental counting principle for sequential, independent choices",
    badge: "Rule of Product",
    formula: "|S_1 \\times S_2 \\times \\dots \\times S_k| = |S_1| \\times |S_2| \\times \\dots \\times |S_k|",
    explanation:
      "If a decision can be made in n_1 ways, and for each way a second decision can be made in n_2 ways, the total number of ways to make the sequential decisions is n_1 * n_2.",
    phoneprintApplication:
      "When picking 3 distinct features without replacement: 1st choice has 7 options, 2nd choice has 6 options, 3rd choice has 5 options. By the multiplication principle, there are 7 * 6 * 5 = 210 ordered ways (P(7, 3)). Dividing by 3! = 6 gives the 35 unordered combinations.",
    properties: [
      "Applies to Cartesian Products: |A × B| = |A| * |B|",
      "Independent Choices: Outcomes of each stage must not limit the count of next choices",
      "Contrast with Rule of Sum: Rule of sum applies to disjoint alternative choices (A ∪ B)",
    ],
  },
  {
    id: "pascal",
    title: "Pascal's Identity & Binomial Theorem",
    subtitle: "Recursive relationship between combinations and algebraic polynomial expansions",
    badge: "Pascal's Identity",
    formula: "\\binom{n}{r} = \\binom{n - 1}{r - 1} + \\binom{n - 1}{r}",
    explanation:
      "Pascal's Identity states that to choose r items from n, we can either choose a specific element (and then pick r - 1 from the remaining n - 1), or reject that specific element (and pick all r from the remaining n - 1).",
    phoneprintApplication:
      "In PhonePrint: C(7, 3) = C(6, 2) + C(6, 3) = 15 + 20 = 35. Combinations containing Camera Quality: C(6, 2) = 15. Combinations excluding Camera Quality: C(6, 3) = 20. Total: 15 + 20 = 35.",
    properties: [
      "Geometric Representation: Pascal's Triangle row n, entry r",
      "Binomial Theorem: (x + y)^n = ∑ C(n, k) * x^(n-k) * y^k",
      "Sum of Row: ∑_{k=0}^n C(n, k) = 2^n (size of the power set)",
    ],
  },
];

export function CombinatoricsLearningPanel() {
  const [selectedTopicId, setSelectedTopicId] = useState<string>("combinations");

  const activeTopic = TOPICS.find((t) => t.id === selectedTopicId) ?? TOPICS[0]!;

  return (
    <div className="rounded-3xl border border-[#EAE3D5] bg-white p-6 shadow-xs text-[#1C1B18] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F5F1E8] pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-base font-montserrat font-bold tracking-tight text-[#1C1B18]">
              Discrete Mathematics Learning Foundation
            </h3>
            <Badge variant="cobalt">Educational Reference</Badge>
          </div>
          <p className="text-xs text-[#78716C] mt-1 font-sans">
            Undergraduate curriculum reference for counting principles, factorials, and binomial coefficients
          </p>
        </div>
      </div>

      {/* Topic navigation tabs */}
      <div className="flex flex-wrap gap-2">
        {TOPICS.map((topic) => {
          const isActive = topic.id === selectedTopicId;
          return (
            <button
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              className={`px-4 py-2 rounded-full text-xs font-sora transition-all ${
                isActive
                  ? "bg-[#1C1B18] text-white shadow-xs font-bold"
                  : "bg-[#FAF8F5] hover:bg-[#F5F1E8] text-[#57534E] border border-[#EAE3D5] font-medium"
              }`}
            >
              {topic.title.split(" (")[0]}
            </button>
          );
        })}
      </div>

      {/* Active Topic Content */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F5F1E8] pb-3">
          <div>
            <h3 className="text-base font-montserrat font-bold text-[#1C1B18]">
              {activeTopic.title}
            </h3>
            <p className="text-xs text-[#78716C] font-sans mt-0.5">{activeTopic.subtitle}</p>
          </div>
          <Badge variant="lime" className="font-sora text-xs">
            {activeTopic.badge}
          </Badge>
        </div>

        {/* Mathematical Formula Card */}
        <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-5">
          <span className="text-[11px] font-sora font-semibold uppercase tracking-wider text-[#78716C] block mb-2">
            Formal Mathematical Definition:
          </span>
          <KaTeXMath
            math={activeTopic.formula}
            block
            className="text-[#1C1B18] text-sm sm:text-base font-semibold"
          />
        </div>

        {/* Conceptual Explanation */}
        <div className="text-xs text-[#57534E] leading-relaxed space-y-1.5 font-sans">
          <h4 className="font-montserrat font-bold text-[#1C1B18] text-xs uppercase tracking-wider">
            Core Concept:
          </h4>
          <p>{activeTopic.explanation}</p>
        </div>

        {/* PhonePrint Application Context */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/30 p-5 text-xs space-y-2">
          <span className="font-sora text-emerald-900 uppercase tracking-wider text-[11px] block font-bold">
            Application to PhonePrint Research:
          </span>
          <p className="text-emerald-950 leading-relaxed font-sans">
            {activeTopic.phoneprintApplication}
          </p>
        </div>

        {/* Mathematical Properties */}
        <div className="space-y-2">
          <span className="text-[11px] font-sora font-semibold uppercase tracking-wider text-[#78716C] block">
            Key Mathematical Properties:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {activeTopic.properties.map((prop, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#EAE3D5] bg-[#FAF8F5] p-3 text-xs font-sora font-medium text-[#1C1B18] shadow-2xs"
              >
                <span className="text-blue-600 font-bold mr-1.5">&bull;</span>
                {prop}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
