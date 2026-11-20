import React from "react";

export type CalloutVariant = "info" | "highlight" | "warning" | "neutral";

export interface CalloutProps {
  title?: string;
  variant?: CalloutVariant;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Callout({
  title,
  variant = "info",
  icon,
  children,
  className = "",
}: CalloutProps) {
  const variantStyles: Record<
    CalloutVariant,
    { container: string; title: string; text: string; iconBg: string; iconColor: string; tag: string }
  > = {
    info: {
      container: "border-blue-200/80 bg-blue-50/50 text-stone-800",
      iconBg: "bg-blue-100 text-blue-700",
      title: "text-blue-950 font-heading font-bold",
      text: "text-stone-700",
      iconColor: "text-blue-600",
      tag: "INFO",
    },
    highlight: {
      container: "border-emerald-200/80 bg-emerald-50/50 text-stone-800",
      iconBg: "bg-emerald-100 text-emerald-800",
      title: "text-emerald-950 font-heading font-bold",
      text: "text-stone-700",
      iconColor: "text-emerald-700",
      tag: "DISCLOSURE",
    },
    warning: {
      container: "border-amber-200/80 bg-amber-50/50 text-stone-800",
      iconBg: "bg-amber-100 text-amber-900",
      title: "text-amber-950 font-heading font-bold",
      text: "text-stone-700",
      iconColor: "text-amber-600",
      tag: "ATTENTION",
    },
    neutral: {
      container: "border-[#EAE3D5] bg-[#FAF8F5] text-stone-800",
      iconBg: "bg-white text-stone-700",
      title: "text-[#1C1B18] font-heading font-bold",
      text: "text-stone-700",
      iconColor: "text-stone-700",
      tag: "NOTE",
    },
  };

  const style = variantStyles[variant];

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border p-5 shadow-2xs ${style.container} ${className}`}
    >
      <div className="flex items-start gap-3.5">
        <div
          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl shadow-2xs ${style.iconBg}`}
        >
          {icon ? (
            icon
          ) : (
            <span className="font-sora text-[10px] font-bold">{style.tag[0]}</span>
          )}
        </div>
        <div className="space-y-1 text-xs">
          {title && (
            <div className="flex items-center gap-2">
              <span className={`text-xs uppercase tracking-wide font-sora ${style.title}`}>
                {title}
              </span>
            </div>
          )}
          <div className={`font-sans leading-relaxed ${style.text}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
