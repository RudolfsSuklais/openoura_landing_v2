"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function MetaPixelPageView() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_META_PIXEL_ID) return;
    if (typeof window === "undefined") return;

    // MetaPixel.tsx init snippet already fires the first PageView.
    // Skip the initial mount, re-fire on subsequent route changes.
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return null;
}
