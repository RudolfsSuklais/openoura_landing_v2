"use client";

import { useEffect, useRef } from "react";
import { trackSectionView } from "@/lib/analytics";

type ViewEvent =
  | "viewed_problem"
  | "viewed_solution"
  | "viewed_pricing"
  | "viewed_demo_form";

export function useSectionView<T extends HTMLElement>(event: ViewEvent) {
  const ref = useRef<T | null>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || fired.current) return;
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            if (fired.current) return;
            fired.current = true;
            trackSectionView(event);
            observer.disconnect();
          }
        }
      },
      { threshold: [0.5] },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [event]);

  return ref;
}
