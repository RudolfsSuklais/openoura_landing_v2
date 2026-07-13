"use client";

import { useEffect, useRef, useState } from "react";

/* Self-hosted OpenOura short videos (own player, no third-party chrome).
   Files live in /public/tiktok. Add more items to extend the grid. */
type Vid = { src: string; poster: string; caption: string };

const VIDEOS: Vid[] = [
  { src: "/tiktok/tt1.mp4", poster: "/tiktok/tt1.jpg", caption: "Kāpēc tapa OpenOura" },
  { src: "/tiktok/tt2.mp4", poster: "/tiktok/tt2.jpg", caption: "OpenOura ražotājiem" },
  { src: "/tiktok/tt3.mp4", poster: "/tiktok/tt3.jpg", caption: "Ieskats OpenOura" },
  { src: "/tiktok/tt4.mp4", poster: "/tiktok/tt4.jpg", caption: "Kā tas strādā" },
];

export function TikTok() {
  const [open, setOpen] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    videoRef.current?.play().catch(() => {});
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const current = open !== null ? VIDEOS[open] : null;

  return (
    <section className="block" id="video">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="kicker">Video</span>
          <h2>Redzi OpenOura darbībā</h2>
          <p>Īsi ieskati un padomi. Uzspied uz jebkura, lai to noskatītos tepat lapā.</p>
        </div>
        <div className="tt-grid reveal">
          {VIDEOS.map((v, i) => (
            <button
              key={i}
              type="button"
              className="tt-card"
              onClick={() => setOpen(i)}
              aria-label={`Skatīties: ${v.caption}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="tt-cover" src={v.poster} alt={v.caption} loading="lazy" />
              <span className="tt-play" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </span>
              <span className="tt-cap">{v.caption}</span>
            </button>
          ))}
        </div>
      </div>

      {current && (
        <div className="tt-modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && setOpen(null)}>
          <div className="tt-modal" role="dialog" aria-modal="true" aria-label={current.caption}>
            <button className="tt-close" type="button" aria-label="Aizvērt" onClick={() => setOpen(null)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
            <video
              ref={videoRef}
              className="tt-video"
              src={current.src}
              poster={current.poster}
              controls
              autoPlay
              playsInline
              preload="auto"
            />
            <div className="tt-modal-cap">{current.caption}</div>
          </div>
        </div>
      )}
    </section>
  );
}
