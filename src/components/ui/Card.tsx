import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({
  children,
  className = "",
  hoverable = false,
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-3xl border border-[#EAE3D5] bg-white text-stone-800 shadow-[0_8px_30px_rgba(44,38,28,0.04)] transition-all duration-300 ${
        hoverable ? "hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(44,38,28,0.08)] hover:border-stone-400" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  badge,
  action,
  className = "",
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-start justify-between gap-4 border-b border-[#F5F1E8] px-6 py-4.5 bg-[#FAF8F5]/70 rounded-t-3xl ${className}`}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2.5">
          <h3 className="text-base font-heading font-extrabold tracking-tight text-[#1C1B18]">
            {title}
          </h3>
          {badge}
        </div>
        {subtitle && (
          <p className="text-xs text-stone-500 font-sans">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

export function CardContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function CardFooter({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-between border-t border-[#F5F1E8] px-6 py-4 bg-[#FAF8F5]/40 rounded-b-3xl ${className}`}
    >
      {children}
    </div>
  );
}
