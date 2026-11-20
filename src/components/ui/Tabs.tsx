import React from "react";

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
}

export interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
  size?: "sm" | "md";
}

export function Tabs({
  items,
  activeId,
  onChange,
  className = "",
  size = "md",
}: TabsProps) {
  const sizeStyles = {
    sm: "p-1 text-xs gap-1",
    md: "p-1.5 text-xs sm:text-sm gap-1.5",
  };

  const itemSizeStyles = {
    sm: "px-3 py-1 rounded-full",
    md: "px-4 py-1.5 rounded-full",
  };

  return (
    <div
      role="tablist"
      className={`inline-flex flex-wrap items-center rounded-full border border-slate-200/70 bg-slate-100/70 backdrop-blur-md shadow-xs ${sizeStyles[size]} ${className}`}
    >
      {items.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 font-sans font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              itemSizeStyles[size]
            } ${
              isActive
                ? "bg-white text-slate-900 font-semibold shadow-[0_2px_8px_rgba(15,23,42,0.06)] border border-slate-200/60"
                : "text-slate-600 hover:text-slate-950 hover:bg-white/50"
            }`}
          >
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={`rounded-full px-2 py-0.5 font-sora text-[10px] font-semibold ${
                  isActive
                    ? "bg-blue-50 text-blue-700 border border-blue-200/50"
                    : "bg-slate-200/70 text-slate-600"
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
