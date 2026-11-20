import React from "react";
import { Badge } from "./Badge";

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  badge?: {
    text: string;
    variant?: "default" | "cobalt" | "lime" | "warning";
  };
  actions?: React.ReactNode;
  className?: string;
  sectionCode?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  badge,
  actions,
  className = "",
  sectionCode,
}: PageHeaderProps) {
  return (
    <div
      className={`border-b border-[#EAE3D5]/80 bg-gradient-to-b from-[#FAF7F0] via-[#FBF9F4] to-transparent px-4 py-8 sm:px-6 sm:py-10 lg:px-8 relative ${className}`}
    >
      <div className="mx-auto max-w-7xl">
        {/* Top metadata pill bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#EAE3D5]/70 font-sora text-[11px] text-stone-500">
          <div className="flex items-center gap-2.5">
            {sectionCode && (
              <span className="font-bold text-[#1C1B18] bg-[#F5F1E8] border border-[#EAE3D5] px-2.5 py-0.5 rounded-full shadow-2xs">
                Module {sectionCode}
              </span>
            )}
            <span className="font-medium text-stone-600">
              Discrete Mathematics &amp; Preference Dynamics
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-stone-500">C(7,3) Triplet Analytics &bull; Set Theory</span>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3 max-w-3xl">
            {/* Eyebrow and badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              {eyebrow && (
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white border border-[#EAE3D5] text-stone-800 font-sora text-xs font-semibold shadow-2xs">
                  {eyebrow}
                </span>
              )}
              {badge && (
                <Badge variant={badge.variant || "default"} size="sm">
                  {badge.text}
                </Badge>
              )}
            </div>

            {/* Heading in Montserrat */}
            <h1 className="text-3xl font-heading font-extrabold tracking-tight text-[#1C1B18] sm:text-4xl lg:text-5xl leading-tight">
              {title}
            </h1>

            {/* Description in DM Sans */}
            {description && (
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl font-sans pt-1">
                {description}
              </p>
            )}
          </div>

          {actions && (
            <div className="flex flex-wrap items-center gap-2.5 md:self-end shrink-0 pt-2 md:pt-0">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  className?: string;
  index?: string;
}

export function SectionHeader({
  title,
  subtitle,
  badge,
  className = "",
  index,
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EAE3D5]/80 ${className}`}>
      <div className="space-y-0.5">
        <div className="flex items-center gap-2.5">
          {index && (
            <span className="font-sora text-xs font-bold text-[#1C1B18] bg-[#F5F1E8] px-2.5 py-0.5 rounded-full border border-[#EAE3D5]">
              {index}
            </span>
          )}
          <h2 className="text-lg font-heading font-bold tracking-tight text-[#1C1B18]">
            {title}
          </h2>
          {badge}
        </div>
        {subtitle && (
          <p className="text-xs text-stone-500 font-sans">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
