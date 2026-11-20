"use client";

import React from "react";
import Link from "next/link";
import { PlayfulHero } from "@/components/home/PlayfulHero";
import { InteractivePhoneDissection } from "@/components/home/InteractivePhoneDissection";
import { CombinatoricsSlotWheel } from "@/components/home/CombinatoricsSlotWheel";
import { PriceFeatureMorphInfographic } from "@/components/home/PriceFeatureMorphInfographic";
import { InteractiveSetPlayground } from "@/components/home/InteractiveSetPlayground";
import { PresentationWalkthrough } from "@/components/campus-pulse/PresentationWalkthrough";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/PageHeader";
import { loadSurveyDataset } from "@/lib/data/loader";

export default function CampusPulsePage() {
  const dataset = loadSurveyDataset();
  const responses = dataset.responses;

  return (
    <div className="space-y-16 pb-24">
      {/* 1. Playful, Funky Animated Hero with Interactive Triplet Builder */}
      <PlayfulHero totalResponses={responses.length} />

      {/* Main Interactive Infographic Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 2. Interactive Phone Chassis Dissection Infographic */}
        <InteractivePhoneDissection responses={responses} />

        {/* 3. Combinatorics Triplet Slot Machine / Wheel */}
        <CombinatoricsSlotWheel responses={responses} />

        {/* 4. Price Range vs. Feature Demand Morphing Infographic */}
        <PriceFeatureMorphInfographic responses={responses} />

        {/* 5. Interactive Set Theory & PIE Venn Playground */}
        <InteractiveSetPlayground responses={responses} />

        {/* 6. Guided Presentation Walkthrough (For Academic Presentation & Easy Explanation) */}
        <PresentationWalkthrough responses={responses} />

        {/* 7. Curriculum Architecture: Explore Dedicated Deep-Dive Modules */}
        <div className="space-y-6 pt-6">
          <SectionHeader
            index="01.E"
            title="Discrete Mathematics Curriculum Architecture"
            subtitle="Explore dedicated experiential-learning modules across set theory, combinatorics, and hypothesis testing"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/my-phoneprint" className="group">
              <Card hoverable className="h-full flex flex-col justify-between border-[#EAE3D5] bg-white">
                <CardHeader
                  title="My PhonePrint"
                  badge={<Badge variant="cobalt">Profiling</Badge>}
                />
                <CardContent className="text-xs text-stone-600 space-y-3 font-sans">
                  <p>
                    Interactive preference profiler generating your personal vector and cohort match score.
                  </p>
                  <div className="text-[#1C1B18] font-sora text-xs font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Launch profiler &rarr;
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/setlab" className="group">
              <Card hoverable className="h-full flex flex-col justify-between border-[#EAE3D5] bg-white">
                <CardHeader
                  title="SetLab"
                  badge={<Badge variant="lime">Set Theory</Badge>}
                />
                <CardContent className="text-xs text-stone-600 space-y-3 font-sans">
                  <p>
                    Full interactive Venn diagrams, Inclusion-Exclusion calculator, and multi-set operations.
                  </p>
                  <div className="text-[#1C1B18] font-sora text-xs font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Open SetLab &rarr;
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/combolab" className="group">
              <Card hoverable className="h-full flex flex-col justify-between border-[#EAE3D5] bg-white">
                <CardHeader
                  title="ComboLab"
                  badge={<Badge variant="cobalt">C(7,3) = 35</Badge>}
                />
                <CardContent className="text-xs text-stone-600 space-y-3 font-sans">
                  <p>
                    Analysis of all 35 feature triplets, combination heatmaps, and combinatorial void detection.
                  </p>
                  <div className="text-[#1C1B18] font-sora text-xs font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Open ComboLab &rarr;
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/experiment-studio" className="group">
              <Card hoverable className="h-full flex flex-col justify-between border-[#EAE3D5] bg-white">
                <CardHeader
                  title="Experiment Studio"
                  badge={<Badge variant="outline">Hypothesis</Badge>}
                />
                <CardContent className="text-xs text-stone-600 space-y-3 font-sans">
                  <p>
                    Feature co-occurrence graphs, contingency matrices, and empirical hypothesis testing.
                  </p>
                  <div className="text-[#1C1B18] font-sora text-xs font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Open Studio &rarr;
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
