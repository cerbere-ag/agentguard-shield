import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import logo from "@/assets/cerbere-logo.jpeg";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Documentation | Cerbere AG" },
      {
        name: "description",
        content:
          "Set up Cerbere AG: install the Python SDK or the MCP server, run your own collector, and protect LLM and tool calls with policies.",
      },
      { property: "og:title", content: "Documentation | Cerbere AG" },
      {
        property: "og:description",
        content:
          "Install the SDK, configure the collector and connect your agent to Cerbere AG in a few minutes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Docs,
});

const GITHUB = "https://github.com/chrismsmr-celcom/agentguard";
const APP = "https://app.cerbereag.site";

function Code({ children }: { children: string }) {
  return (
    <pre className="my-3 overflow-x-auto border border-line-black bg-coal p-4 font-mono text-[13px] leading-relaxed text-paper/90">
      <code>{children}</code>
    </pre>
  );
}

function Inline({ children }: { children: ReactNode }) {
  return (
    <code className="border border-line-black bg-coal px-1.5 py-0.5 font-mono text-[0.9em] text-amber">
      {children}
    </code>
  );
}

function Sub({ children }: { children: ReactNode }) {
  return <h3 className="mt-7 text-base text-paper">{children}</h3>;
}

function CopyForLlm({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const done = () => {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  const fallback = () => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      done();
    } finally {
      document.body.removeChild(ta);
    }
  };

  const copy = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(fallback);
    } else {
      fallback();
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`shrink-0 border px-2.5 py-1 font-mono text-xs transition-colors ${
        copied
          ? "border-amber text-amber"
          : "border-line-black text-paper/70 hover:border-amber hover:text-amber"
      }`}
      aria-live="polite"
    >
      {copied ? "Copied" : "Copy for LLM"}
    </button>
  );
}

type Section = { id: string; title: string; md: string; body: ReactNode };

const sections: Section[] = [
  {
    id: "install",
    title: "Installation",
    md: `## Installation (Cerbere AG)

Requirements: Python 3.11+ and pip.

SDK only (use this if a Cerbere collector already runs somewhere):
pip install cerbere-ag

Optional extras:
pip install "cerbere-ag[signing]"   # verify signed policy decisions (Ed25519)
pip install "cerbere-ag[pii]"       # advanced PII detection via Presidio
pip install "cerbere-ag[redis]"     # distributed rate limiting / LLM Judge cache
pip install "cerbere-ag[ml]"        # local ML classifier (torch + transformers)

Self-hosted collector:
git clone ${GITHUB}.git
cd agentguard
pip install -r requirements.txt
gunicorn wsgi:app --bind 0.0.0.0:8080

Check it responds:
curl http://localhost:8080/api/metrics

Docker:
cp env.example .env
python -c "import secrets; print('ag-' + secrets.token_urlsafe(32))"   # put the key in .env
docker compose up -d
`,
    body: (
      <>
        <p className="text-paper/70">
          You need Python 3.11+ and pip. There are two ways in, depending on whether a collector
          already runs for you.
        </p>

        <Sub>SDK only</Sub>
        <p className="text-paper/70">
          Use this when a Cerbere collector already exists, hosted or self-hosted.
        </p>
        <Code>pip install cerbere-ag</Code>
        <p className="text-paper/70">Optional extras, installed the same way:</p>
        <Code>{`pip install "cerbere-ag[signing]"   # verify signed policy decisions (Ed25519)
pip install "cerbere-ag[pii]"       # advanced PII detection via Presidio
pip install "cerbere-ag[redis]"     # distributed rate limiting / LLM Judge cache
pip install "cerbere-ag[ml]"        # local ML classifier (torch + transformers)`}</Code>

        <Sub>Self-hosted collector</Sub>
        <Code>{`git clone ${GITHUB}.git
cd agentguard
pip install -r requirements.txt
gunicorn wsgi:app --bind 0.0.0.0:8080`}</Code>
        <p className="text-paper/70">
          The collector listens on <Inline>http://localhost:8080</Inline>. Check that it answers:
        </p>
        <Code>curl http://localhost:8080/api/metrics</Code>

        <Sub>Docker</Sub>
        <Code>{`cp env.example .env
python -c "import secrets; print('ag-' + secrets.token_urlsafe(32))"   # put the key in .env
docker compose up -d`}</Code>
      </>
    ),
  },
  {
    id: "quickstart",
    title: "Quick start",
    md: `## Quick start (Cerbere AG)

Create the client once, then wrap LLM calls and tool calls with decorators.

from agentguard import AgentGuard

guard = AgentGuard(
    collector_url="http://localhost:8080",
    api_key="ag-your-key",
    agent_id="my-agent",
    max_budget=10.0,
    block_on_high=True,
    use_ml=True,
    use_llm_judge=True,
)

@guard.guard_llm_call
def call_openai(messages):
    return client.chat.completions.create(model="gpt-4o", messages=messages)

@guard.guard_tool_call
def send_email(to, subject, body):
    return email_service.send(to, subject, body)
`,
    body: (
      <>
        <p className="text-paper/70">
          Create the client once, then wrap your LLM calls and tool calls with decorators. Cerbere
          checks each call before it runs and records the decision.
        </p>
        <Code>{`from agentguard import AgentGuard

guard = AgentGuard(
    collector_url="http://localhost:8080",
    api_key="ag-your-key",
    agent_id="my-agent",
    max_budget=10.0,
    block_on_high=True,
    use_ml=True,
    use_llm_judge=True,
)`}</Code>
        <Sub>Protect an LLM call</Sub>
        <Code>{`@guard.guard_llm_call
def call_openai(messages):
    return client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
    )`}</Code>
        <Sub>Protect a tool call</Sub>
        <Code>{`@guard.guard_tool_call
def send_email(to, subject, body):
    return email_service.send(to, subject, body)`}</Code>
      </>
    ),
  },
  {
    id: "config",
    title: "Configuration",
    md: `## Configuration (Cerbere AG collector, environment variables)

AGENTGUARD_API_KEY         collector authentication key
AGENTGUARD_DB_TYPE         sqlite | postgres
DATABASE_URL               connection string when using postgres
AGENTGUARD_USE_ML          enable the local ML classifier
AGENTGUARD_MODEL_PATH      path to the ML model
AGENTGUARD_ML_THRESHOLD    ML decision threshold (example: 0.80)
AGENTGUARD_USE_LLM_JUDGE   enable the LLM Judge for ambiguous cases
DEEPSEEK_API_KEY           key for the model used by the LLM Judge
AGENTGUARD_JUDGE_MODEL     judge model name (example: deepseek-chat)
AGENTGUARD_BLOCK_ON_AMBIGUOUS  block when the judge is unsure
AGENTGUARD_RATE_LIMIT      example: 300 per minute
AGENTGUARD_SPAN_RATE_LIMIT example: 150 per minute
AGENTGUARD_LOG_LEVEL       example: INFO
`,
    body: (
      <>
        <p className="text-paper/70">
          The collector reads its settings from environment variables. These are the ones you will
          use most.
        </p>
        <div className="mt-4 overflow-x-auto border border-line-black">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-line-black text-paper/50">
                <th className="px-4 py-2.5 font-mono text-xs font-medium">Variable</th>
                <th className="px-4 py-2.5 font-mono text-xs font-medium">What it does</th>
              </tr>
            </thead>
            <tbody className="text-paper/75">
              {[
                ["AGENTGUARD_API_KEY", "Collector authentication key"],
                ["AGENTGUARD_DB_TYPE", "sqlite or postgres"],
                ["DATABASE_URL", "Connection string when using postgres"],
                ["AGENTGUARD_USE_ML", "Enable the local ML classifier"],
                ["AGENTGUARD_MODEL_PATH", "Path to the ML model"],
                ["AGENTGUARD_ML_THRESHOLD", "ML decision threshold, for example 0.80"],
                ["AGENTGUARD_USE_LLM_JUDGE", "Enable the LLM Judge for ambiguous cases"],
                ["DEEPSEEK_API_KEY", "Key for the model the LLM Judge calls"],
                ["AGENTGUARD_JUDGE_MODEL", "Judge model name, for example deepseek-chat"],
                ["AGENTGUARD_BLOCK_ON_AMBIGUOUS", "Block when the judge is unsure"],
                ["AGENTGUARD_RATE_LIMIT", "Request limit, for example 300 per minute"],
                ["AGENTGUARD_SPAN_RATE_LIMIT", "Span ingestion limit, for example 150 per minute"],
                ["AGENTGUARD_LOG_LEVEL", "Log verbosity, for example INFO"],
              ].map(([name, desc]) => (
                <tr key={name} className="border-b border-line-black last:border-0">
                  <td className="px-4 py-2.5 align-top font-mono text-[12.5px] text-amber">
                    {name}
                  </td>
                  <td className="px-4 py-2.5 align-top">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: "mcp",
    title: "MCP server",
    md: `## MCP server (Cerbere AG)

If your agent runs on a client that supports the Model Context Protocol (Claude, Cursor, ...), use the MCP server instead of wiring the SDK by hand.

pip install cerbere-ag-mcp

Connect Claude Code to the hosted server:
claude mcp add cerbereag --transport sse ${APP}/mcp/sse

Claude Desktop and Cursor configuration snippets: ${GITHUB}/blob/main/README_MCP.md
`,
    body: (
      <>
        <p className="text-paper/70">
          If your agent runs on a client that supports the Model Context Protocol (Claude, Cursor
          and others), use the MCP server instead of wiring the SDK by hand.
        </p>
        <Code>pip install cerbere-ag-mcp</Code>
        <Sub>Connect Claude Code to the hosted server</Sub>
        <Code>{`claude mcp add cerbereag --transport sse ${APP}/mcp/sse`}</Code>
        <p className="text-paper/70">
          Claude Desktop and Cursor configuration snippets, plus the list of exposed tools, are in{" "}
          <a
            href={`${GITHUB}/blob/main/README_MCP.md`}
            target="_blank"
            rel="noopener"
            className="text-amber underline-offset-4 hover:underline"
          >
            README_MCP.md
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "dashboard",
    title: "Dashboard",
    md: `## Dashboard (Cerbere AG)

The collector serves a dashboard with agent traces, policy decisions, the human approval queue and daily activity.
Self-hosted: open your collector URL. Hosted: ${APP}
`,
    body: (
      <>
        <p className="text-paper/70">
          The collector serves a dashboard with agent traces, policy decisions, the human approval
          queue and daily activity. Self-hosted, open your collector URL. For the hosted version,
          sign in at{" "}
          <a
            href={APP}
            target="_blank"
            rel="noopener"
            className="text-amber underline-offset-4 hover:underline"
          >
            app.cerbereag.site
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "support",
    title: "Support and source",
    md: `## Support and source (Cerbere AG)

Source code (SDK and collector): ${GITHUB}
Report a bug or ask a question: open an issue on the same repository.
`,
    body: (
      <ul className="list-disc space-y-2 pl-5 text-paper/70 marker:text-amber">
        <li>
          Source code for the SDK and collector:{" "}
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener"
            className="text-amber underline-offset-4 hover:underline"
          >
            github.com/chrismsmr-celcom/agentguard
          </a>
        </li>
        <li>Report a bug or ask a question by opening an issue on that repository.</li>
      </ul>
    ),
  },
];

function Docs() {
  return (
    <div className="bg-ink text-paper">
      <header className="sticky top-0 z-50 border-b border-line-black bg-ink/85 backdrop-blur-md">
        <div className="wrap flex h-[68px] items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 font-mono text-[17px] font-bold">
            <img
              src={logo}
              alt="Cerbere AG logo"
              className="size-8 shrink-0 border border-amber/40 object-cover"
            />
            <span>
              CERBERE<span className="text-amber">&nbsp;AG</span>
            </span>
          </a>
          <Link
            to="/"
            className="font-mono text-sm text-paper/70 transition-colors hover:text-amber"
          >
            ← Back to site
          </Link>
        </div>
      </header>

      <div className="wrap grid gap-12 py-16 md:py-20 lg:grid-cols-[200px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <nav className="sticky top-28 flex flex-col gap-2.5 font-mono text-sm">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-paper/60 transition-colors hover:text-amber"
              >
                {s.title}
              </a>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 max-w-3xl">
          <Reveal>
            <span className="eyebrow">docs</span>
            <h1 className="mt-3 text-[clamp(30px,4.4vw,44px)] leading-[1.1]">Set up Cerbere AG</h1>
            <p className="mt-4 max-w-xl text-paper/70">
              Cerbere AG sits between your agents and the actions they take. This page covers the
              install, the configuration, and the two ways to connect an agent: the Python SDK or
              the MCP server. Every section has a button that copies it as plain text you can paste
              into an LLM.
            </p>
          </Reveal>

          <nav className="mt-8 flex gap-4 overflow-x-auto font-mono text-sm lg:hidden">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="shrink-0 text-paper/60 transition-colors hover:text-amber"
              >
                {s.title}
              </a>
            ))}
          </nav>

          {sections.map((s) => (
            <section key={s.id} id={s.id} className="mt-16 scroll-mt-28">
              <div className="flex items-baseline justify-between gap-4 border-b border-line-black pb-3">
                <h2 className="text-2xl">{s.title}</h2>
                <CopyForLlm text={s.md} />
              </div>
              <div className="mt-5">{s.body}</div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}

