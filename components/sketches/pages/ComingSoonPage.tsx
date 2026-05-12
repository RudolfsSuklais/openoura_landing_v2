"use client";

export function ComingSoonPage({ title }: { title: string }) {
  return (
    <main className="flex-1 min-w-0 bg-white p-6 md:p-10 flex items-center justify-center min-h-[480px]">
      <div className="text-center">
        <div className="text-[11px] uppercase font-semibold tracking-[0.05em] text-gray-400 mb-3">
          {title}
        </div>
        <div className="text-[20px] md:text-[24px] font-medium text-gray-400 mb-2">
          Drīzumā
        </div>
        <div className="text-[13px] text-gray-400">
          Šī sadaļa tiek izstrādāta
        </div>
      </div>
    </main>
  );
}
