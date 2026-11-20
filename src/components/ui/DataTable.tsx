import React from "react";

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  className?: string;
  emptyMessage?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  className = "",
  emptyMessage = "No survey records found",
}: DataTableProps<T>) {
  return (
    <div
      className={`overflow-x-auto rounded-2xl border border-white/80 bg-white/75 backdrop-blur-xl shadow-[0_8px_30px_rgb(15,23,42,0.04)] ${className}`}
    >
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="border-b border-slate-200/60 bg-slate-50/60 text-slate-700 font-medium">
            {columns.map((col) => {
              const alignClass =
                col.align === "center"
                  ? "text-center"
                  : col.align === "right"
                  ? "text-right"
                  : "text-left";
              return (
                <th
                  key={col.key}
                  className={`px-5 py-3 font-sora tracking-wider uppercase text-[11px] text-slate-500 font-semibold ${alignClass} ${col.className || ""}`}
                >
                  {col.header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-sans">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-5 py-8 text-center text-slate-400 italic"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr
                key={keyExtractor(item)}
                className={`transition-colors hover:bg-blue-50/30 ${
                  idx % 2 === 1 ? "bg-slate-50/30" : "bg-white/40"
                }`}
              >
                {columns.map((col) => {
                  const alignClass =
                    col.align === "center"
                      ? "text-center"
                      : col.align === "right"
                      ? "text-right"
                      : "text-left";
                  return (
                    <td
                      key={col.key}
                      className={`px-5 py-3 text-slate-700 ${alignClass} ${col.className || ""}`}
                    >
                      {col.render ? col.render(item) : (item as Record<string, React.ReactNode>)[col.key]}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
