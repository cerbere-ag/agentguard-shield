import { Reveal } from "@/components/Reveal";

type Stage = {
  n: string;
  title: string;
  icon: (props: { className?: string }) => React.ReactNode;
  items?: string[];
  verdict?: boolean;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const icons = {
  cpu: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </svg>
  ),
  shield: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M12 3l7 3v5c0 4.4-2.9 7.6-7 9-4.1-1.4-7-4.6-7-9V6l7-3z" />
      <path d="M9.5 11.5l1.8 1.8 3.2-3.6" />
    </svg>
  ),
  layers: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </svg>
  ),
  toggle: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <rect x="3" y="8" width="18" height="8" rx="4" />
      <circle cx="8" cy="12" r="2" />
      <circle cx="16" cy="12" r="2" />
    </svg>
  ),
  db: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
    </svg>
  ),
  monitor: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <rect x="3" y="4" width="18" height="12" rx="1" />
      <path d="M9 20h6M12 16v4" />
    </svg>
  ),
};

const stages: Stage[] = [
  { n: "01", title: "AI Agent", icon: icons.cpu, items: ["Any framework", "Any LLM provider"] },
  {
    n: "02",
    title: "AgentGuard SDK",
    icon: icons.shield,
    items: ["Policy enforcement", "Security checks", "Budget controls", "Tool controls"],
  },
  {
    n: "03",
    title: "3-layer detection",
    icon: icons.layers,
    items: ["1. Regex / rules", "2. ML classifier", "3. LLM judge"],
  },
  { n: "04", title: "Decision", icon: icons.toggle, verdict: true },
  {
    n: "05",
    title: "Collector",
    icon: icons.db,
    items: ["Traces", "Metrics", "Security events", "Cost / usage"],
  },
  { n: "06", title: "Dashboard", icon: icons.monitor, items: ["Audit trail", "Alerts and analytics"] },
];

function StageCard({ stage }: { stage: Stage }) {
  const Icon = stage.icon;

  return (
    <div className="group relative flex-1 border border-line-black bg-[oklch(0.17_0.004_60)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber/60 hover:shadow-[0_14px_44px_oklch(0.795_0.13_55/0.14)]">
      <span className="absolute left-0 top-0 h-[2px] w-0 bg-amber transition-all duration-300 group-hover:w-full" />

      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] text-amber/70">{stage.n}</span>

        <Icon className="size-4.5 text-paper/35 transition-all duration-300 group-hover:scale-110 group-hover:text-amber" />
      </div>

      <h3 className="mt-3 font-mono text-sm font-semibold text-paper transition-colors duration-300 group-hover:text-amber">
        {stage.title}
      </h3>

      {stage.items && (
        <ul className="mt-2.5 space-y-1">
          {stage.items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-[12.5px] text-paper/55 transition-colors duration-300 group-hover:text-paper/75"
            >
              <span className="text-amber opacity-40 transition-opacity duration-300 group-hover:opacity-100">
                ·
              </span>
              {item}
            </li>
          ))}
        </ul>
      )}

      {stage.verdict && (
        <div className="mt-3 flex gap-2 font-mono text-[12.5px]">
          <span className="border border-allow/40 px-1.5 py-0.5 text-allow transition-colors duration-300 group-hover:border-allow/70">
            ✓ Allow
          </span>

          <span className="border border-deny/40 px-1.5 py-0.5 text-deny transition-colors duration-300 group-hover:border-deny/70">
            ⛔ Block
          </span>
        </div>
      )}
    </div>
  );
}

function Flow({ dir, delay }: { dir: "x" | "y" | "x-left"; delay: number }) {
  if (dir === "y") {
    return (
      <div
        className="relative mx-auto h-7 w-px bg-line-black md:my-1"
        aria-hidden="true"
      >
        <span
          className="flow-anim-y absolute -left-[2.5px] size-1.5 rounded-full bg-amber"
          style={{ animationDelay: `${delay}s` }}
        />
      </div>
    );
  }

  return (
    <div
      className="relative hidden h-px w-10 shrink-0 self-center bg-line-black md:block"
      aria-hidden="true"
    >
      <span
        className={`flow-anim-x absolute -top-[2.5px] size-1.5 rounded-full bg-amber ${
          dir === "x-left" ? "flow-reverse" : ""
        }`}
        style={{ animationDelay: `${delay}s` }}
      />
      <span
        className={`absolute top-1/2 size-1.5 -translate-y-1/2 rotate-45 border-r border-t border-paper/50 ${
          dir === "x-left" ? "-left-1" : "-right-1"
        }`}
      />
    </div>
  );
}

export function HowItWorks() {
  return (
    <Reveal className="mt-16">
      {/* mobile: vertical pipeline */}
      <div className="mx-auto flex max-w-sm flex-col items-stretch md:hidden">
        {stages.map((stage, i) => (
          <div key={stage.n} className="flex flex-col">
            <StageCard stage={stage} />
            {i < stages.length - 1 && <Flow dir="y" delay={i * 0.45} />}
          </div>
        ))}
      </div>

      {/* desktop: snake layout, 3 across */}
      <div className="hidden md:grid md:grid-cols-[1fr_2.5rem_1fr_2.5rem_1fr]">
        <StageCard stage={stages[0]!} />
        <Flow dir="x" delay={0} />
        <StageCard stage={stages[1]!} />
        <Flow dir="x" delay={0.45} />
        <StageCard stage={stages[2]!} />

        <div className="col-start-5">
          <Flow dir="y" delay={0.9} />
        </div>

        <div className="col-span-5 flex flex-row-reverse">
          <StageCard stage={stages[3]!} />
          <Flow dir="x-left" delay={1.35} />
          <StageCard stage={stages[4]!} />
          <Flow dir="x-left" delay={1.8} />
          <StageCard stage={stages[5]!} />
        </div>
      </div>
    </Reveal>
  );
}
