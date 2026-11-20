import React from "react";
import { Badge, type BadgeVariant } from "./Badge";

export interface ChartCardProps {
  title: string;
  subtitle?: string;
  badge?: {
    text: string;
    variant?: BadgeVariant;
  };
  takeaway?: string;
  takeawayAccent?: "cobalt" | "lime";
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ChartCard({
  title,
  subtitle,
  badge,
  takeaway,
  takeawayAccent = "cobalt",
  action,
  children,
  className = "",
}: ChartCardProps) {
  const accentDot = {
    cobalt: "bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]",
    lime: "bg-emerald-600 shadow-[0_0_8px_rgba(16,185,129,0.6)]",
  };

  return (
    <div
      className={`flex flex-col justify-between rounded-2xl border border-white/90 bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(15,23,42,0.04)] text-slate-800 overflow-hidden transition-all duration-300 hover:shadow-[0_16px_36px_rgb(37,99,235,0.06)] ${className}`}
    >
      <div>
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100/80 bg-slate-50/40 px-6 py-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-sm font-heading font-bold tracking-tight text-slate-900">
                {title}
              </h3>
              {badge && (
                <Badge variant={badge.variant || "default"} size="sm">
                  {badge.text}
                </Badge>
              )}
            </div>
            {subtitle && (
              <p className="mt-0.5 text-xs text-slate-500 font-sans">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="flex items-center gap-2">{action}</div>}
        </div>

        <div className="p-6">{children}</div>
      </div>

      {takeaway && (
        <div className="border-t border-slate-100/80 bg-slate-50/50 px-6 py-3.5 text-xs leading-relaxed text-slate-700 flex items-start gap-2.5">
          <span
            className={`mt-1 h-2 w-2 shrink-0 rounded-full ${accentDot[takeawayAccent]}`}
            aria-hidden="true"
          />
          <div className="space-y-0.5">
            <span className="font-sora text-[10px] font-bold uppercase tracking-wider text-blue-700 mr-2">
              Key Observation
            </span>
            <span className="font-sans text-slate-600">{takeaway}</span>
          </div>
        </div>
      )}
    </div>
  );
}
