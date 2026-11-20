import React from "react";
import { Badge, type BadgeVariant } from "./Badge";

export interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  badge?: {
    text: string;
    variant?: BadgeVariant;
  };
  accentColor?: "cobalt" | "lime" | "graphite";
  icon?: React.ReactNode;
  className?: string;
}

export function MetricCard({
  label,
  value,
  subtext,
  badge,
  accentColor = "cobalt",
  icon,
  className = "",
}: MetricCardProps) {
  const accentGlow = {
    cobalt: "from-blue-500/10 to-indigo-500/0",
    lime: "from-emerald-500/10 to-teal-500/0",
    graphite: "from-slate-500/10 to-slate-500/0",
  };

  const accentPill = {
    cobalt: "bg-blue-600",
    lime: "bg-emerald-600",
    graphite: "bg-slate-700",
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/90 bg-white/75 backdrop-blur-xl p-5 shadow-[0_8px_30px_rgb(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgb(37,99,235,0.08)] hover:border-blue-200/60 ${className}`}
    >
      {/* Top subtle ambient glow */}
      <div
        className={`absolute inset-x-0 top-0 h-16 bg-gradient-to-b ${accentGlow[accentColor]} pointer-events-none`}
      />

      <div className="relative flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full ${accentPill[accentColor]}`} />
          <span className="font-sora text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            {label}
          </span>
        </div>
        {icon && (
          <span className="text-slate-400 transition-colors group-hover:text-blue-600">
            {icon}
          </span>
        )}
      </div>

      <div className="relative mt-3 flex items-baseline justify-between gap-2">
        <div className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {value}
        </div>
        {badge && (
          <Badge variant={badge.variant || "default"} size="sm">
            {badge.text}
          </Badge>
        )}
      </div>

      {subtext && (
        <p className="relative mt-3 border-t border-slate-100/80 pt-2.5 text-xs text-slate-500 font-sans leading-relaxed">
          {subtext}
        </p>
      )}
    </div>
  );
}
