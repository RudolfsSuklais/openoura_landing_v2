export function DashboardSkeleton() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border hairline bg-white shadow-xl shadow-ink/5">
      <div className="h-14 border-b hairline bg-gray-50/60" />
      <div className="flex">
        <div className="hidden md:block w-[240px] h-[600px] border-r hairline bg-gray-50/40" />
        <div className="flex-1 h-[600px] p-6">
          <div className="space-y-4">
            <div className="h-8 w-48 rounded bg-gray-100 animate-pulse" />
            <div className="h-32 w-full rounded-2xl bg-gray-100 animate-pulse" />
            <div className="h-64 w-full rounded-2xl bg-gray-100 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
