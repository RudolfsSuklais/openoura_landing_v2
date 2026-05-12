type Props = {
  className?: string;
  variant?: 1 | 2 | 3;
  rotate?: number;
};

// Hand-drawn-feeling arrow in SVG. Three variants for visual variety.
export function Arrow({ className, variant = 1, rotate = 0 }: Props) {
  const stroke = "#D93838";
  const path =
    variant === 1
      ? "M2 18 C 40 6, 90 30, 138 14 L 130 8 M138 14 L 132 22"
      : variant === 2
      ? "M2 12 C 28 28, 70 -2, 100 16 C 116 25, 128 18, 140 22 L 132 14 M140 22 L 134 30"
      : "M4 20 C 30 4, 70 24, 100 8 C 118 -1, 130 12, 142 10 L 134 4 M142 10 L 136 18";

  return (
    <svg
      className={`scribble ${className ?? ""}`}
      viewBox="0 0 148 36"
      fill="none"
      stroke={stroke}
      strokeWidth="1.6"
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden
    >
      <path d={path} />
    </svg>
  );
}
