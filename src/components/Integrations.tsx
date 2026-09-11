import { Reveal } from "./Reveal";

type Item = { name: string; desc: string; mark: string };

const core: Item[] = [
  {
    name: "Python SDK",
    desc: "Native runtime instrumentation for LLM calls and tool execution.",
    mark: "py",
  },
  {
    name: "MCP",
    desc: "Security boundary for MCP clients, servers and tool calls.",
    mark: "mcp",
  },
  {
    name: "HTTP Gateway",
    desc: "Language agnostic telemetry and policy boundary.",
    mark: "http",
  },
  {
    name: "Composio",
    desc: "Guard Composio tool execution with AgentGuard policy enforcement.",
    mark: "cmp",
  },
];

const providers: Item[] = [
  {
    name: "OpenAI",
    desc: "Protect Responses and Chat Completions through the SDK.",
    mark: "oai",
  },
  {
    name: "Anthropic",
    desc: "Protect Claude requests and tool use workflows.",
    mark: "ant",
  },
];

const frameworks: Item[] = [
  {
    name: "LangGraph",
    desc: "Instrument graph nodes and side effecting tool edges.",
    mark: "lg",
  },
  {
    name: "CrewAI",
    desc: "Guard CrewAI tools and agent execution paths.",
    mark: "crew",
  },
];

function Card({ item }: { item: Item }) {
  return (
    <div className="group bg-ink p-7 transition-colors hover:bg-[oklch(0.18_0.006_55)]">
      <span className="inline-flex h-7 items-center border border-amber/50 px-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-amber">
        {item.mark}
      </span>
      <h3 className="mt-4 text-lg text-paper">{item.name}</h3>
      <p className="mt-2 text-sm text-paper/65">{item.desc}</p>
    </div>
  );
}

function Group({ label, items }: { label: string; items: Item[] }) {
  return (
    <div className="mt-10">
      <span className="eyebrow">{label}</span>
      <div
        className={`mt-4 grid gap-px border border-line-black bg-line-black sm:grid-cols-2 ${
          items.length > 2 ? "lg:grid-cols-4" : ""
        }`}
      >
        {items.map((i) => (
          <Card key={i.name} item={i} />
        ))}
      </div>
    </div>
  );
}

export function Integrations() {
  return (
    <section id="integrations" className="border-t border-line-black bg-ink py-20 md:py-28">
      <div className="wrap">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">integrations</span>
          <h2 className="mt-3 text-[clamp(26px,3.4vw,36px)]">
            AgentGuard plugs into the stack you already run.
          </h2>
          <p className="mt-3.5 max-w-[52ch] text-base text-paper/65">
            One policy and telemetry layer across SDKs, providers and agent frameworks. No rewrite
            of your agent required.
          </p>
        </Reveal>

        <Reveal>
          <Group label="core surfaces" items={core} />
        </Reveal>
        <Reveal>
          <Group label="AI providers" items={providers} />
        </Reveal>
        <Reveal>
          <Group label="agent frameworks" items={frameworks} />
        </Reveal>
      </div>
    </section>
  );
}
