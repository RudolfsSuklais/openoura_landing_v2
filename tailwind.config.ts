import type { Config } from "tailwindcss";

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FAFAF7",
        ink: "#0A0A0A",
        ash: "#5C5C57",
        rule: "#1A1A18",
        muted: "#6B6B6B",
        violet: "#6B4BFF",
        pink: "#FF4BA8",
        marker: "#D93838",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        serif: ["var(--font-instrument-serif)", "ui-serif", "Georgia"],
      },
      fontSize: {
        mega: ["clamp(3.5rem, 11vw, 10rem)", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
        display: ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        stat: ["clamp(4rem, 10vw, 8rem)", { lineHeight: "0.9", letterSpacing: "-0.05em" }],
      },
      letterSpacing: {
        tightest: "-0.05em",
      },
      maxWidth: {
        page: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
