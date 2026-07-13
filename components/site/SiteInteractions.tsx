"use client";

import { useEffect } from "react";

/**
 * Client-side behaviours ported 1:1 from the approved prototype:
 * theme toggle, sticky-nav shadow, product-tab auto-rotation, scroll
 * reveal + bar fills, scroll progress, headline reveal, blob/mock
 * parallax, magnetic buttons, FAQ accordion, live tablet timer, footer
 * language toggle (visual) and the mobile menu. All listeners/timers are
 * cleaned up on unmount, and motion respects prefers-reduced-motion.
 */
export function SiteInteractions() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const root = document.documentElement;

    // ── Theme toggle ───────────────────────────────────────────
    const tbtn = document.getElementById("theme-toggle");
    const ticon = document.getElementById("theme-icon");
    const sun =
      '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
    const moon = '<path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z"/>';
    const setTheme = (t: string) => {
      root.setAttribute("data-theme", t);
      if (ticon) ticon.innerHTML = t === "dark" ? sun : moon;
      try {
        localStorage.setItem("oo-theme", t);
      } catch {
        /* storage unavailable */
      }
    };
    setTheme(root.getAttribute("data-theme") || "light");
    const onTheme = () =>
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    tbtn?.addEventListener("click", onTheme);
    cleanups.push(() => tbtn?.removeEventListener("click", onTheme));

    // ── Nav shadow on scroll ───────────────────────────────────
    const nav = document.getElementById("nav");
    const heroScroll = document.getElementById("hero-scroll");
    const onNavScroll = () => {
      nav?.classList.toggle("scrolled", window.scrollY > 8);
      heroScroll?.classList.toggle("hide", window.scrollY > 160);
    };
    onNavScroll();
    window.addEventListener("scroll", onNavScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onNavScroll));

    // ── Mobile menu ────────────────────────────────────────────
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const setMenu = (open: boolean) => {
      mobileMenu?.classList.toggle("open", open);
      menuToggle?.classList.toggle("open", open);
      menuToggle?.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    };
    const closeMenu = () => setMenu(false);
    const onMenuToggle = () => setMenu(!mobileMenu?.classList.contains("open"));
    const onMenuKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    menuToggle?.addEventListener("click", onMenuToggle);
    document.addEventListener("keydown", onMenuKey);
    cleanups.push(() => {
      menuToggle?.removeEventListener("click", onMenuToggle);
      document.removeEventListener("keydown", onMenuKey);
      document.body.style.overflow = "";
    });
    mobileMenu?.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", closeMenu);
      cleanups.push(() => a.removeEventListener("click", closeMenu));
    });

    // ── Product tabs — auto-rotate + click ─────────────────────
    const tabs = [...document.querySelectorAll<HTMLElement>(".tab")];
    const panels = [...document.querySelectorAll<HTMLElement>(".panel")];
    const pill = document.getElementById("tabpill");
    let cur = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    const movePill = (i: number) => {
      const t = tabs[i];
      if (!t || !pill) return;
      pill.style.width = t.offsetWidth + "px";
      pill.style.transform = "translateX(" + (t.offsetLeft - 5) + "px)";
    };
    const activate = (i: number) => {
      tabs.forEach((t, x) => t.classList.toggle("on", x === i));
      panels.forEach((p, x) => p.classList.toggle("on", x === i));
      movePill(i);
      cur = i;
      const p = panels[i];
      if (!p) return;
      p.querySelectorAll<HTMLElement>(".bar i").forEach(
        (b) => (b.style.width = (b.dataset.w || 0) + "%"),
      );
      p.querySelectorAll<HTMLElement>(".cbar").forEach(
        (c) => (c.style.height = (c.dataset.h || 0) + "%"),
      );
    };
    const cycle = () => activate((cur + 1) % tabs.length);
    tabs.forEach((t, i) => {
      const onClick = () => {
        if (timer) clearInterval(timer);
        activate(i);
        timer = setInterval(cycle, 3400);
      };
      t.addEventListener("click", onClick);
      const onKey = (e: KeyboardEvent) => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        e.preventDefault();
        const dir = e.key === "ArrowRight" ? 1 : -1;
        const ni = (cur + dir + tabs.length) % tabs.length;
        if (timer) clearInterval(timer);
        activate(ni);
        tabs[ni]?.focus();
        timer = setInterval(cycle, 3400);
      };
      t.addEventListener("keydown", onKey);
      cleanups.push(() => {
        t.removeEventListener("click", onClick);
        t.removeEventListener("keydown", onKey);
      });
    });
    if (tabs.length) {
      movePill(0);
      activate(0);
      timer = setInterval(cycle, 3400);
    }
    const onResize = () => movePill(cur);
    window.addEventListener("resize", onResize);
    cleanups.push(() => {
      window.removeEventListener("resize", onResize);
      if (timer) clearInterval(timer);
    });

    // ── Reveal on scroll + inner bars ──────────────────────────
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            e.target
              .querySelectorAll<HTMLElement>(".bar i, .kbar i, .eb i")
              .forEach((b) => (b.style.width = (b.dataset.w || 0) + "%"));
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll<HTMLElement>(".reveal").forEach((el, i) => {
      el.style.transitionDelay = Math.min(i, 3) * 45 + "ms";
      io.observe(el);
    });
    cleanups.push(() => io.disconnect());

    // ── Scroll progress ────────────────────────────────────────
    const pbar = document.getElementById("progress");
    const onProgress = () => {
      const h = document.documentElement;
      const sc = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      if (pbar) pbar.style.width = sc * 100 + "%";
    };
    window.addEventListener("scroll", onProgress, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onProgress));

    // ── Headline reveal ────────────────────────────────────────
    const heroTitle = document.getElementById("heroTitle");
    const raf = requestAnimationFrame(() => heroTitle?.classList.add("in"));
    cleanups.push(() => cancelAnimationFrame(raf));

    // ── Parallax + magnetic buttons (fine pointers, motion ok) ──
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(pointer: fine)").matches;
    if (!reduce && fine) {
      const hero = document.querySelector<HTMLElement>(".hero");
      const blobs = [...document.querySelectorAll<HTMLElement>(".hero .blob")];
      const mock = document.getElementById("mock");
      let praf = 0;
      const onMove = (e: MouseEvent) => {
        if (!hero) return;
        const r = hero.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        cancelAnimationFrame(praf);
        praf = requestAnimationFrame(() => {
          blobs.forEach((b, i) => {
            const d = (i + 1) * 9;
            b.style.marginLeft = x * d + "px";
            b.style.marginTop = y * d + "px";
          });
          if (mock)
            mock.style.transform = `rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg)`;
        });
      };
      const onLeave = () => {
        if (mock) mock.style.transform = "";
        blobs.forEach((b) => {
          b.style.marginLeft = "";
          b.style.marginTop = "";
        });
      };
      hero?.addEventListener("mousemove", onMove);
      hero?.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        hero?.removeEventListener("mousemove", onMove);
        hero?.removeEventListener("mouseleave", onLeave);
        cancelAnimationFrame(praf);
      });
    }

    // ── FAQ accordion ──────────────────────────────────────────
    const faqItems = [...document.querySelectorAll<HTMLElement>(".faq-item")];
    faqItems.forEach((item) => {
      const q = item.querySelector<HTMLElement>(".faq-q");
      const a = item.querySelector<HTMLElement>(".faq-a");
      if (!q || !a) return;
      const onFaq = () => {
        const open = item.classList.contains("open");
        faqItems.forEach((i) => {
          i.classList.remove("open");
          const ia = i.querySelector<HTMLElement>(".faq-a");
          if (ia) ia.style.maxHeight = "";
          i.querySelector(".faq-q")?.setAttribute("aria-expanded", "false");
        });
        if (!open) {
          item.classList.add("open");
          a.style.maxHeight = a.scrollHeight + "px";
          q.setAttribute("aria-expanded", "true");
        }
      };
      q.addEventListener("click", onFaq);
      cleanups.push(() => q.removeEventListener("click", onFaq));
    });

    // ── FAQ keyboard navigation (roving arrows) ────────────────
    const allQ = [...document.querySelectorAll<HTMLElement>(".faq-q")];
    allQ.forEach((q, i) => {
      const onQKey = (e: KeyboardEvent) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          allQ[(i + 1) % allQ.length]?.focus();
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          allQ[(i - 1 + allQ.length) % allQ.length]?.focus();
        }
      };
      q.addEventListener("keydown", onQKey);
      cleanups.push(() => q.removeEventListener("keydown", onQKey));
    });

    // ── Live tablet timer ──────────────────────────────────────
    const dt = document.querySelector<HTMLElement>(".dev-timer");
    let tick: ReturnType<typeof setInterval> | undefined;
    if (dt) {
      let s = 2 * 3600 + 14 * 60 + 33;
      const p = (n: number) => String(n).padStart(2, "0");
      tick = setInterval(() => {
        s++;
        dt.textContent = `${p(Math.floor(s / 3600))}:${p(Math.floor((s % 3600) / 60))}:${p(s % 60)}`;
      }, 1000);
    }
    cleanups.push(() => {
      if (tick) clearInterval(tick);
    });

    // ── Footer language toggle (visual only) ───────────────────
    const langBtns = [...document.querySelectorAll<HTMLElement>(".lang button")];
    langBtns.forEach((b) => {
      const onLang = () => {
        langBtns.forEach((x) => x.classList.remove("on"));
        b.classList.add("on");
      };
      b.addEventListener("click", onLang);
      cleanups.push(() => b.removeEventListener("click", onLang));
    });

    // ── Scrollspy — highlight active nav link ──────────────────
    const spyLinks = [...document.querySelectorAll<HTMLAnchorElement>(".nav-links a")];
    const spyMap = new Map<string, HTMLAnchorElement>();
    spyLinks.forEach((l) => {
      const id = l.getAttribute("href")?.slice(1);
      if (id) spyMap.set(id, l);
    });
    const spySections = [...spyMap.keys()]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const spyIO = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            spyLinks.forEach((l) => l.classList.remove("active"));
            spyMap.get((e.target as HTMLElement).id)?.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    spySections.forEach((s) => spyIO.observe(s));
    cleanups.push(() => spyIO.disconnect());

    // ── Dark CTA cursor spotlight ──────────────────────────────
    const cta = document.querySelector<HTMLElement>(".cta");
    if (cta && !reduce && fine) {
      const onCta = (e: MouseEvent) => {
        const r = cta.getBoundingClientRect();
        cta.style.setProperty("--mx", `${e.clientX - r.left}px`);
        cta.style.setProperty("--my", `${e.clientY - r.top}px`);
      };
      cta.addEventListener("mousemove", onCta);
      cleanups.push(() => cta.removeEventListener("mousemove", onCta));
    }

    // ── Count-up numbers ───────────────────────────────────────
    const countEls = [...document.querySelectorAll<HTMLElement>("[data-count]")];
    countEls.forEach((el) => {
      if (!reduce) el.textContent = "0";
    });
    const runCount = (el: HTMLElement) => {
      const target = parseInt(el.dataset.count || "0", 10);
      if (reduce || !Number.isFinite(target)) {
        el.textContent = String(target);
        return;
      }
      const dur = 1100;
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const countIO = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            runCount(e.target as HTMLElement);
            countIO.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    countEls.forEach((el) => countIO.observe(el));
    cleanups.push(() => countIO.disconnect());

    // ── FAQ search filter ──────────────────────────────────────
    const faqSearch = document.getElementById("faq-search") as HTMLInputElement | null;
    const faqEmpty = document.getElementById("faq-empty");
    if (faqSearch) {
      const onSearch = () => {
        const q = faqSearch.value.toLowerCase().trim();
        let visible = 0;
        document.querySelectorAll<HTMLElement>(".faq-item").forEach((item) => {
          const match = !q || (item.dataset.q || "").includes(q);
          item.classList.toggle("hide", !match);
          if (match) visible++;
        });
        faqEmpty?.classList.toggle("show", visible === 0);
      };
      faqSearch.addEventListener("input", onSearch);
      cleanups.push(() => faqSearch.removeEventListener("input", onSearch));
    }

    // ── Pricing card 3D tilt ───────────────────────────────────
    if (!reduce && fine) {
      document.querySelectorAll<HTMLElement>(".plan").forEach((plan) => {
        const move = (e: MouseEvent) => {
          const r = plan.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          plan.style.transform = `perspective(900px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg) translateY(-4px)`;
        };
        const leave = () => {
          plan.style.transform = "";
        };
        plan.addEventListener("mousemove", move);
        plan.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          plan.removeEventListener("mousemove", move);
          plan.removeEventListener("mouseleave", leave);
        });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
