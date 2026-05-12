import { ChevronsUpDown } from "lucide-react";

export const INTER_STACK =
  "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

export const MONO_STACK =
  "ui-monospace, SFMono-Regular, Menlo, monospace";

export function Checkbox() {
  return (
    <div className="w-4 h-4 rounded border border-gray-300 bg-white" aria-hidden />
  );
}

export function HeaderCell({
  label,
  sortable = true,
  withInfo = false,
}: {
  label: string;
  sortable?: boolean;
  withInfo?: boolean;
}) {
  return (
    <div className="flex items-center gap-1 min-w-0">
      <span className="truncate">{label}</span>
      {sortable && <ChevronsUpDown className="w-3 h-3 text-gray-400 shrink-0" />}
      {withInfo && (
        <span
          className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full text-[9px] font-bold text-gray-400 border border-gray-300 leading-none shrink-0"
          aria-hidden
        >
          i
        </span>
      )}
    </div>
  );
}

export function Tag({
  children,
  small = false,
}: {
  children: React.ReactNode;
  small?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center font-medium tabular-nums rounded-lg ${
        small ? "px-1.5 py-0.5 text-[11px]" : "px-2.5 py-1 text-[12px]"
      }`}
      style={{
        background: "#EDE9FE",
        color: "#6D28D9",
        fontFamily: MONO_STACK,
      }}
    >
      {children}
    </span>
  );
}
