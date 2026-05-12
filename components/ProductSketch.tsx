type Props = {
  variant?: "dashboard" | "orders" | "stock";
  className?: string;
};

// Hand-built SVG "screenshots" of the product — not real, but tasteful suggestion.
export function ProductSketch({ variant = "dashboard", className }: Props) {
  if (variant === "orders") return <OrdersSketch className={className} />;
  if (variant === "stock") return <StockSketch className={className} />;
  return <DashboardSketch className={className} />;
}

function Frame({ children, className, minimal = false }: { children: React.ReactNode; className?: string; minimal?: boolean }) {
  return (
    <div
      className={`relative bg-paper border hairline rounded-xl shadow-[0_40px_100px_-40px_rgba(10,10,10,0.28)] overflow-hidden ${className ?? ""}`}
    >
      {minimal ? (
        <div className="px-4 md:px-6 py-3 border-b hairline flex items-center justify-center">
          <div className="inline-flex items-center gap-2 bg-ink/[0.04] rounded-md px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full gradient-bg" />
            <span className="mono text-[11px] text-ash">openoura.app/razosana</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b hairline">
          <span className="h-2.5 w-2.5 rounded-full bg-[#E6E6DF]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E6E6DF]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E6E6DF]" />
          <span className="mono text-[10px] text-muted ml-3 truncate">openoura.app/razosana</span>
        </div>
      )}
      {children}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "RAŽO"
      ? "bg-[#F4E2BC] text-[#7A571A]"
      : status === "TĀME"
      ? "bg-[#D7E1F0] text-[#22416F]"
      : "bg-[#E6E6DE] text-[#5C5C57]";
  return (
    <span className={`inline-block mono text-[9px] tracking-[0.12em] rounded px-1.5 py-1 ${styles}`}>
      {status}
    </span>
  );
}

function DashboardSketch({ className }: { className?: string }) {
  const rows = [
    { id: "2614", title: "Logu rāmji, ozols", client: "SIA Finestra", date: "13.05", status: "RAŽO" },
    { id: "2613", title: "Durvju komplekts", client: "Koks & Co", date: "14.05", status: "TĀME" },
    { id: "2612", title: "Galda virsmas (8)", client: "Ozols SIA", date: "15.05", status: "RAŽO" },
    { id: "2611", title: "Plauktu sistēma", client: "Mājīgi.lv", date: "17.05", status: "GAIDA" },
    { id: "2610", title: "Sienu paneļi (40m²)", client: "BūveLat", date: "20.05", status: "TĀME" },
  ];

  return (
    <Frame className={className} minimal>
      <div className="grid grid-cols-12 min-h-[420px]">
        <aside className="hidden md:flex col-span-3 border-r hairline p-5 flex-col gap-2.5 text-[12px] text-ash">
          <div className="mono text-[10px] uppercase tracking-[0.18em] text-muted mb-4">Izvēlne</div>
          {[
            ["Pārskats", true],
            ["Pasūtījumi", false],
            ["Tāmes", false],
            ["Krājumi", false],
            ["Pavadzīmes", false],
            ["Cilvēki", false],
            ["Atskaites", false],
          ].map(([label, active]) => (
            <div
              key={label as string}
              className={`flex items-center gap-2.5 ${active ? "text-ink font-medium" : ""}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${active ? "gradient-bg" : "bg-ink/15"}`} />
              {label}
            </div>
          ))}
          <div className="mt-auto pt-6 border-t hairline mono text-[10px] text-muted leading-relaxed">
            Versija 1.0<br />
            <span className="text-ash">Rīga · LV</span>
          </div>
        </aside>

        <main className="col-span-12 md:col-span-9 p-5 md:p-7 space-y-5">
          <div className="flex items-baseline justify-between">
            <div className="font-serif text-[26px] md:text-[30px] leading-none">Pārskats</div>
            <div className="mono text-[11px] text-muted">11.05.2026 · 08:30</div>
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {[
              { v: "23", k: "aktīvi pasūt.", trend: "↑ 4 vs. pag.", up: true },
              { v: "21", k: "termiņā", trend: "91% no aktīviem", up: false },
              { v: "47", k: "šonedēļ pab.", trend: "↑ 8 vs. pag.", up: true },
            ].map((s) => (
              <div key={s.k} className="border hairline rounded-md p-3 md:p-4">
                <div className="mono text-[10px] uppercase tracking-[0.14em] text-muted">{s.k}</div>
                <div className="mono text-[34px] md:text-[44px] leading-none mt-2 tracking-tight">{s.v}</div>
                <div className={`mt-2.5 mono text-[10px] ${s.up ? "text-[#2F7A3F]" : "text-ash"}`}>
                  {s.trend}
                </div>
              </div>
            ))}
          </div>

          <div className="border hairline rounded-md overflow-hidden">
            <div className="grid grid-cols-12 px-4 py-2.5 mono text-[10px] uppercase tracking-[0.14em] text-muted border-b hairline">
              <div className="col-span-1">#</div>
              <div className="col-span-5">Pasūtījums</div>
              <div className="col-span-3 hidden sm:block">Klients</div>
              <div className="col-span-2">Termiņš</div>
              <div className="col-span-1 sm:col-span-1 text-right">Stat.</div>
            </div>
            {rows.map((row, i) => (
              <div
                key={row.id}
                data-row-id={row.id}
                className={`grid grid-cols-12 items-center px-4 py-3 text-[12px] ${i < rows.length - 1 ? "border-b hairline" : ""} ${i === 0 ? "bg-ink/[0.015]" : ""}`}
              >
                <div className="col-span-1 mono text-ash">{row.id}</div>
                <div className="col-span-5 text-ink truncate pr-2">{row.title}</div>
                <div className="col-span-3 hidden sm:block text-ash truncate pr-2">{row.client}</div>
                <div className="col-span-2 mono text-ash">{row.date}</div>
                <div className="col-span-3 sm:col-span-1 text-right">
                  <StatusBadge status={row.status} />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </Frame>
  );
}

function OrdersSketch({ className }: { className?: string }) {
  return (
    <Frame className={className}>
      <div className="p-5 space-y-3 min-h-[260px]">
        <div className="flex items-baseline justify-between">
          <div className="font-serif text-[20px] leading-none">Pasūtījums #2614</div>
          <div className="mono text-[10px] text-muted">SIA Finestra</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="border hairline rounded p-3">
            <div className="mono text-[9px] uppercase text-muted">Plānotais laiks</div>
            <div className="mono text-[22px] mt-1">42h</div>
          </div>
          <div className="border hairline rounded p-3">
            <div className="mono text-[9px] uppercase text-muted">Faktiskais</div>
            <div className="mono text-[22px] mt-1">38h <span className="text-marker text-[12px] align-top">−9%</span></div>
          </div>
        </div>
        <div className="border hairline rounded">
          {["Materiāli sagatavoti", "Griešana", "Slīpēšana", "Krāsošana", "Pakošana"].map((s, i) => (
            <div key={s} className="flex items-center gap-3 px-3 py-2 border-b hairline last:border-b-0 text-[11px]">
              <span className={`h-2 w-2 rounded-full ${i < 3 ? "bg-ink" : "border hairline"}`} />
              <span className={i < 3 ? "text-ink" : "text-muted"}>{s}</span>
              <span className="ml-auto mono text-[10px] text-muted">{i < 3 ? "✓ pabeigts" : "—"}</span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function StockSketch({ className }: { className?: string }) {
  return (
    <Frame className={className}>
      <div className="p-5 min-h-[260px]">
        <div className="flex items-baseline justify-between mb-3">
          <div className="font-serif text-[20px] leading-none">Krājumi</div>
          <div className="mono text-[10px] text-muted">noliktava — Liepāja</div>
        </div>
        <div className="space-y-2">
          {[
            ["Ozols, 28mm", "142 m²", 0.78],
            ["Bērzs, 18mm", "86 m²", 0.42],
            ["Eļļa, transparenta", "12 L", 0.22],
            ["Skrūves 4×40", "1240 gab.", 0.95],
          ].map(([name, qty, w]) => (
            <div key={name as string} className="text-[11px]">
              <div className="flex justify-between mb-1">
                <span>{name}</span>
                <span className="mono text-ash">{qty}</span>
              </div>
              <div className="h-1.5 bg-[#EDEDE6] rounded">
                <div
                  className="h-full rounded gradient-bg"
                  style={{ width: `${(w as number) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}
