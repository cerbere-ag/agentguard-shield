import { useEffect, useRef, useState } from "react";

type Block = {
  step: string;
  name: string;
  color: string;
  items: Array<{ label: string; file?: string; hl?: boolean }>;
};

const BLOCKS: Block[] = [
  {
    step: "1",
    name: "Entry",
    color: "#8b7ff0",
    items: [
      { label: "AI agent", hl: true },
      { label: "MCP server", file: "mcp_server.py" },
    ],
  },
  {
    step: "2",
    name: "Runtime",
    color: "#5aa9f5",
    items: [
      { label: "AgentGuard SDK", file: "sdk.py" },
      { label: "Runtime checks", file: "runtime.py" },
      { label: "Taint tracking", file: "taint.py" },
      { label: "Security models", file: "models.py" },
    ],
  },
  {
    step: "3",
    name: "Decide",
    color: "#f5a742",
    items: [
      { label: "SDK policy checks", file: "policy.py" },
      { label: "Policy engine", file: "engine.py" },
      { label: "Unified decision engine", file: "decision_engine.py" },
      { label: "Risk scoring", file: "risk_engine.py" },
      { label: "ML detection", file: "agentguard_ml.py" },
      { label: "Rules and patterns", file: "patterns.py" },
      { label: "Input normalization", file: "normalizer.py" },
      { label: "LLM judge", file: "judges.py" },
    ],
  },
  {
    step: "4",
    name: "Observe",
    color: "#5ec98a",
    items: [
      { label: "Dashboard user", hl: true },
      { label: "Collector service", file: "service.py" },
      { label: "Collector application", file: "app.py" },
      { label: "Collector API", file: "__init__.py" },
      { label: "Span ingestion", file: "spans.py" },
      { label: "Metrics API", file: "metrics.py" },
      { label: "Dashboard views", file: "dashboard.py" },
      { label: "Collector database", file: "db.py" },
    ],
  },
  {
    step: "5",
    name: "Govern",
    color: "#ef6f5e",
    items: [
      { label: "Identity management", file: "identity_routes.py" },
      { label: "Audit API", file: "audit_routes.py" },
      { label: "Authentication", file: "auth.py" },
      { label: "Immutable audit log", file: "audit.py" },
    ],
  },
];

const ARROWS = [
  "invokes / uses MCP",
  "imports SDK",
  "evaluates policy",
  "sends spans",
];

const CASCADE = [140, 240, 360, 480, 620]; /* ms après l'entrée du bloc i */

export function ArchitectureDiagram() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0); /* 0..5 : nb de blocs révélés */
  const [arrowsOn, setArrowsOn] = useState(0); /* nb de flèches actives */

  useEffect(() => {
    const timers: number[] = [];

    const start = () => {
      timers.forEach(clearTimeout);
      timers.length = 0;
      BLOCKS.forEach((_, i) => {
        timers.push(
          window.setTimeout(() => setStage(i + 1), i * 550),
          window.setTimeout(() => setArrowsOn(i), i * 550 + 300)
        );
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            start();
          }
        }
      },
      { threshold: 0.25 }
    );

    const el = wrapRef.current;
    if (el) io.observe(el);

    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div ref={wrapRef} className="arch-wrap">
      <div className="arch">
        {BLOCKS.map((b, i) => (
          <div key={b.name} style={{ display: "contents" }}>
            <div
              className={i < stage ? "arch-block in" : "arch-block"}
              style={
                i < stage
                  ? undefined
                  : { transitionDelay: "0ms" }
              }
            >
              <div className="arch-head" style={{ background: b.color }}>
                <span>{b.step} · {b.name}</span>
                <span className="arch-step">{b.name}</span>
              </div>
              <div className="arch-body">
                {b.items.map((item, j) => (
                  <div
                    key={item.label}
                    className={item.hl ? "arch-item hl" : "arch-item"}
                    style={{
                      color: item.hl ? b.color : undefined,
                      transitionDelay: `${j * 70}ms`,
                    }}
                  >
                    <span>{item.label}</span>
                    {item.file && <span className="arch-file">{item.file}</span>}
                  </div>
                ))}
              </div>
            </div>

            {i < BLOCKS.length - 1 && (
              <div className={i < arrowsOn ? "arch-arrow on" : "arch-arrow"}>
                <div className="arch-arrow-line" />
                <div className="arch-arrow-tip" />
                <span className="arch-arrow-label">{ARROWS[i]}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="arch-legend">
        {BLOCKS.map((b) => (
          <span key={b.name}>
            <span className="arch-legend-dot" style={{ background: b.color }} />
            {b.name}
          </span>
        ))}
      </div>
    </div>
  );
}
