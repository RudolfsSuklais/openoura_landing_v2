"use client";

type Size = "lg" | "md";

type StepperProps = {
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  ariaLabel?: string;
  size?: Size;
  onChange: (v: number) => void;
};

export function Stepper({
  value,
  min,
  max,
  step,
  suffix,
  ariaLabel,
  size = "lg",
  onChange,
}: StepperProps) {
  const clamp = (v: number) => Math.min(max, Math.max(min, v));

  const numClass =
    size === "lg"
      ? "text-[2.25rem] sm:text-[2.5rem] md:text-[3rem]"
      : "text-[1.75rem] sm:text-[2rem] md:text-[2.25rem]";

  return (
    <div className="inline-flex items-stretch border-2 border-ink/15 rounded-md bg-paper transition-colors duration-150 focus-within:border-ink/70 hover:border-ink/30 overflow-hidden">
      <button
        type="button"
        onClick={() => onChange(clamp(value - step))}
        aria-label={ariaLabel ? `${ariaLabel}: mazāk` : "Mazāk"}
        className="h-12 w-11 md:h-14 md:w-12 flex items-center justify-center mono text-[20px] leading-none text-ink hover:bg-ink/[0.05] active:bg-ink/[0.1] active:scale-[0.96] transition cursor-pointer border-r-2 border-ink/15 select-none"
      >
        −
      </button>
      <div className="flex items-baseline gap-2 px-3 md:px-4 py-1">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          aria-label={ariaLabel}
          onChange={(e) => {
            const next = Number(e.target.value);
            if (Number.isFinite(next)) onChange(clamp(next));
          }}
          className={`mono tabular-nums leading-none tracking-[-0.03em] text-ink bg-transparent border-0 focus:outline-none caret-violet w-[3.5ch] sm:w-[4ch] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield] ${numClass}`}
        />
        <span className="mono text-[12px] md:text-[13px] text-muted whitespace-nowrap">
          {suffix}
        </span>
      </div>
      <button
        type="button"
        onClick={() => onChange(clamp(value + step))}
        aria-label={ariaLabel ? `${ariaLabel}: vairāk` : "Vairāk"}
        className="h-12 w-11 md:h-14 md:w-12 flex items-center justify-center mono text-[20px] leading-none text-ink hover:bg-ink/[0.05] active:bg-ink/[0.1] active:scale-[0.96] transition cursor-pointer border-l-2 border-ink/15 select-none"
      >
        +
      </button>
    </div>
  );
}
