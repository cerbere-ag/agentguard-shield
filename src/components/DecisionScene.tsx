import { useEffect, useRef, useState } from "react";

const steps = [
  {
    label: "LLM call / tool call",
    desc: "Your agent calls a tool or an LLM through the SDK or MCP server.",
  },
  {
    label: "identity & capability",
    desc: "Cerbere resolves which agent this is and what it is allowed to hold.",
  },
  {
    label: "scope & sensitivity",
    desc: "The specific arguments are checked against scope and data classification.",
  },
  {
    label: "policy & budgets",
    desc: "Budget, rate limits and your org's rules are applied to this one call.",
  },
  {
    label: "decision",
    desc: "Allow, block, or hold for human approval, logged with the full reasoning.",
    decision: true,
  },
];

const PLANE_Z = [120, 60, 0, -60, -120];
const FLAT_Y = [-220, -110, 0, 110, 220];

function ease(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export function DecisionScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height - vh;
        const raw = total > 0 ? -rect.top / total : 0;
        setP(Math.min(Math.max(raw, 0), 1));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const e = ease(p);
  const rotX = -14 * (1 - e);
  const rotY = 26 * (1 - e);
  const sceneScale = 1 - 0.12 * e;
  const descOpacity = Math.min(Math.max((p - 0.55) / 0.35, 0), 1);
  const axisOpacity = Math.min(Math.max((p - 0.4) / 0.3, 0), 1);

  return (
    <div ref={wrapRef} className="morph-wrap">
      <div className="morph-sticky">
        <div
          className="morph-scene"
          style={{
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${sceneScale})`,
          }}
        >
          <div
            className="morph-axis"
            style={{ opacity: axisOpacity, transform: "translateX(-50%) scaleY(1.6)" }}
          />
          {steps.map((s, i) => {
            const z = PLANE_Z[i] * (1 - e);
            const y = FLAT_Y[i] * e;
            const planeScale = 1 + 0.15 * e;
            return (
              <div
                key={s.label}
                className={s.decision ? "morph-plane decision" : "morph-plane"}
                style={{ transform: `translateZ(${z}px) translateY(${y}px) scale(${planeScale})` }}
              >
                <span className="morph-label">{s.label}</span>
                <span className="morph-desc" style={{ opacity: descOpacity }}>
                  {s.desc}
                </span>
              </div>
            );
          })}
        </div>

        {/* Indicateur de progression du schéma */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-wider text-paper/40"
          style={{ opacity: 1 - p }}
        >
          scroll to see how it works
        </div>
      </div>
    </div>
  );
}
