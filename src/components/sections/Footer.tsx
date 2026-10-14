import { useEffect, useRef, useState } from "react";
import { APP, DOCS, GITHUB, INSTAGRAM_URL, LINKEDIN_URL, X_URL, YOUTUBE_URL } from "@/lib/constants";
import logo from "@/assets/cerbere-logo.jpeg";

const linkColClass = "flex flex-col gap-2 font-mono text-[13px]";
const linkClass = "opacity-75 hover:opacity-100";
const headingClass = "mb-3 font-mono text-[11px] uppercase tracking-wider opacity-50";

const WORD = "CERBERE AG";

// Interpolation coal -> rouge profond (deny) dans l'espace OKLCH
function tint(q: number) {
  const l = 0.19 + q * 0.26; // 0.19 -> 0.45
  const c = 0.008 + q * 0.152; // 0.008 -> 0.16
  const h = 45 - q * 15; // 45 -> 30
  return `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)})`;
}

function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  // p : progression de la révélation (outline -> remplissage)
  // q : progression "bas de page" (0 = wordmark révélé, 1 = tout en bas)
  const [pq, setPq] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;

        // Révélation : 0 quand le wordmark entre en bas du viewport, 1 quand il est remonté
        const p = 1 - Math.min(Math.max((rect.top - vh * 0.15) / (vh * 0.75), 0), 1);

        // Bas de page : 0 quand le wordmark est révélé, 1 quand il colle au bas du viewport
        const q = 1 - Math.min(Math.max((rect.bottom - vh) / (vh * 0.22), 0), 1);

        setPq([p, q]);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const [p, q] = pq;
  const letters = WORD.split("");

  return (
    <div ref={ref} className="overflow-hidden px-4 pb-2 pt-6">
      <div
        className={`footer-wordmark${q > 0.85 ? " wm-bottom" : ""}`}
        aria-label={WORD}
        style={{
          // Les lettres s'écartent doucement au fur et à mesure qu'on descend
          letterSpacing: `${(-0.01 + q * 0.07).toFixed(3)}em`,
          color: tint(q),
        }}
      >
        {letters.map((ch, i) => {
          if (ch === " ") return <span key={i}>{"\u00A0"}</span>;

          const n = letters.length;
          const local = Math.min(Math.max((p * (n + 1.5) - i) / 1.5, 0), 1);

          return (
            <span key={i} className="wm-letter" style={{ animationDelay: `${i * 45}ms` }}>
              <span className="wm-outline">{ch}</span>
              <span className="wm-fill" style={{ opacity: local }} aria-hidden="true">
                {ch}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-amber text-coal">
      <div className="px-5 pb-10 pt-20 text-center">
        <div className="relative mx-auto mb-2 size-[220px] overflow-hidden shadow-[0_20px_50px_oklch(0.19_0.008_45/0.28)]">
          <img src={logo} alt="Cerbere AG guardian logo" className="size-full object-cover" />
          <div className="animate-logo-scan pointer-events-none absolute inset-x-0 h-[34%] bg-gradient-to-b from-transparent via-white/55 to-transparent" />
        </div>

        <div className="mt-1.5 font-mono text-[15px] font-bold tracking-wide">
          CERBERE AG
          <span className="mt-0.5 block text-[11px] font-medium tracking-[0.14em] opacity-65">
            security and observability layer to control your AI agents in real time
          </span>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <a href={X_URL} target="_blank" rel="noopener" aria-label="Cerbere AG on X" className="flex size-9 items-center justify-center text-coal/70 transition-colors hover:text-coal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2.25h3.19l-6.97 7.97L23.4 21.75h-6.42l-5.03-6.58-5.75 6.58H2.99l7.46-8.53L1.6 2.25h6.58l4.55 6.02 6.17-6.02Zm-1.12 17.5h1.77L7.3 4.15H5.4l12.38 15.6Z" /></svg>
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener" aria-label="Cerbere AG on LinkedIn" className="flex size-9 items-center justify-center text-coal/70 transition-colors hover:text-coal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" /></svg>
          </a>
          <a href={YOUTUBE_URL} target="_blank" rel="noopener" aria-label="Cerbere AG on YouTube" className="flex size-9 items-center justify-center text-coal/70 transition-colors hover:text-coal">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81ZM9.6 15.6V8.4l6.27 3.6-6.27 3.6Z" /></svg>
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener" aria-label="Cerbere AG on Instagram" className="flex size-9 items-center justify-center text-coal/70 transition-colors hover:text-coal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.55.22.95.47 1.37.89.42.42.67.82.89 1.37.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.55-.47.95-.89 1.37-.42.42-.82.67-1.37.89-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.37-.89 3.7 3.7 0 0 1-.89-1.37c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.55.47-.95.89-1.37.42-.42.82-.67 1.37-.89.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.62c-3.14 0-3.5.01-4.74.07-.96.04-1.48.2-1.83.34-.46.18-.79.39-1.13.74-.35.34-.56.67-.74 1.13-.14.35-.3.87-.34 1.83-.06 1.24-.07 1.6-.07 4.74s.01 3.5.07 4.74c.04.96.2 1.48.34 1.83.18.46.39.79.74 1.13.34.35.67.56 1.13.74.35.14.87.3 1.83.34 1.24.06 1.6.07 4.74.07s3.5-.01 4.74-.07c.96-.04 1.48-.2 1.83-.34.46-.18.79-.39 1.13-.74.35-.34.56-.67.74-1.13.14-.35.3-.87.34-1.83.06-1.24.07-1.6.07-4.74s-.01-3.5-.07-4.74c-.04-.96-.2-1.48-.34-1.83a3 3 0 0 0-.74-1.13 3 3 0 0 0-1.13-.74c-.35-.14-.87-.3-1.83-.34C15.5 3.79 15.14 3.78 12 3.78Zm0 3.68a4.54 4.54 0 1 1 0 9.08 4.54 4.54 0 0 1 0-9.08Zm0 1.62a2.92 2.92 0 1 0 0 5.84 2.92 2.92 0 0 0 0-5.84Zm4.72-1.8a1.06 1.06 0 1 1 0 2.12 1.06 1.06 0 0 1 0-2.12Z" /></svg>
          </a>
        </div>
      </div>

      <div className="border-t border-coal/20">
        <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className={headingClass}>Product</div>
            <div className={linkColClass}>
              <a href={DOCS} className={linkClass}>Documentation</a>
              <a href={APP + "/login"} className={linkClass}>Dashboard</a>
              <a href="#pricing" className={linkClass}>Pricing</a>
              <a href="#integrations" className={linkClass}>Integrations</a>
            </div>
          </div>

          <div>
            <div className={headingClass}>Resources</div>
            <div className={linkColClass}>
              <a href="/blog" className={linkClass}>Blog</a>
              <a href="#benchmark" className={linkClass}>Benchmark</a>
              <a href="#research" className={linkClass}>Research</a>
              <a href={GITHUB} target="_blank" rel="noopener" className={linkClass}>GitHub</a>
            </div>
          </div>

          <div>
            <div className={headingClass}>Company</div>
            <div className={linkColClass}>
              <a href="mailto:christopher-ag@cerbereag.site" className={linkClass}>Contact</a>
              <a href="https://wa.me/243854442103" target="_blank" rel="noopener" className={linkClass}>WhatsApp</a>
            </div>
          </div>

          <div>
            <div className={headingClass}>Legal</div>
            <div className={linkColClass}>
              <a href={APP + "/terms"} className={linkClass}>Terms</a>
              <a href={APP + "/privacy"} className={linkClass}>Privacy</a>
            </div>
          </div>
        </div>

        <div className="wrap flex flex-wrap items-center justify-between gap-3.5 border-t border-coal/20 py-5">
          <div className="font-mono text-[12.5px] opacity-65">
            © 2026 Cerbere AG. All rights reserved.
          </div>
          <div className="font-mono text-[12.5px] opacity-50">
            Security and observability layer to control your AI agents in real time
          </div>
        </div>
      </div>

      <FooterWordmark />
    </footer>
  );
}