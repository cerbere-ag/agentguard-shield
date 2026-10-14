
import { Reveal } from "./Reveal";

type Integration = {
  name: string;
  logo?: string;
  fallback: string;
};

const integrations: Integration[] = [
  {
    name: "Python",
    logo: "/logos/python.svg",
    fallback: "PY",
  },
  {
    name: "MCP",
    logo: "/logos/model-context-protocol.svg",
    fallback: "MCP",
  },
  {
    name: "HTTP",
    fallback: "HTTP",
  },
  {
    name: "Composio",
    logo: "/logos/composio.svg",
    fallback: "C",
  },
  {
    name: "OpenAI",
    logo: "/logos/openai.svg",
    fallback: "O",
  },
  {
    name: "Anthropic",
    logo: "/logos/claude-code.svg",
    fallback: "A",
  },
  {
    name: "LangGraph",
    logo: "/logos/langgraph.svg",
    fallback: "LG",
  },
  {
    name: "CrewAI",
    logo: "/logos/crewai.svg",
    fallback: "CA",
  },
];

function IntegrationItem({ item }: { item: Integration }) {
  return (
    <div className="group flex shrink-0 items-center gap-3 border border-line-black bg-ink px-5 py-3">
      <span className="flex h-7 w-7 items-center justify-center">
        {item.logo ? (
          <img
            src={item.logo}
            alt=""
            width={24}
            height={24}
            className="h-6 w-6 object-contain brightness-0 invert opacity-70 transition-opacity duration-200 group-hover:opacity-100"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = "none";

              const fallback = event.currentTarget.nextElementSibling;

              if (fallback instanceof HTMLElement) {
                fallback.style.display = "inline";
              }
            }}
          />
        ) : null}

        <span
          className="font-mono text-[10px] font-semibold uppercase tracking-wider text-amber"
          style={{ display: item.logo ? "none" : "inline" }}
        >
          {item.fallback}
        </span>
      </span>

      <span className="whitespace-nowrap text-sm font-medium text-paper/75 transition-colors duration-200 group-hover:text-paper">
        {item.name}
      </span>
    </div>
  );
}

function IntegrationRow() {
  const duplicated = [...integrations, ...integrations];

  return (
    <div className="relative mt-8 overflow-hidden border-y border-line-black py-3">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent" />

      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent" />

      <div className="integration-marquee flex w-max gap-3">
        {duplicated.map((item, index) => (
          <IntegrationItem
            key={`${item.name}-${index}`}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}

export function Integrations() {
  return (
    <section
      id="integrations"
      className="border-t border-line-black bg-ink py-16 md:py-20"
    >
      <div className="wrap">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">integrations</span>

          <h2 className="mt-3 text-[clamp(26px,3.4vw,36px)]">
            Cerbere AG plugs into the stack you already run.
          </h2>

          <p className="mt-3.5 max-w-[52ch] text-base text-paper/65">
            One policy and telemetry layer across SDKs, providers and agent
            frameworks.
          </p>
        </Reveal>

        <Reveal>
          <IntegrationRow />
        </Reveal>
      </div>

      <style>{`
        .integration-marquee {
          animation: integration-scroll 28s linear infinite;
        }

        .integration-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes integration-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(calc(-50% - 6px));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .integration-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}


