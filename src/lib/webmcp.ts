import { APP_URL, PLANS, SITE_URL } from "./schema";

type ToolResult = { content: { type: "text"; text: string }[] };
const text = (t: string): ToolResult => ({ content: [{ type: "text", text: t }] });

/**
 * Registers read-only WebMCP tools. Safe to call in any browser:
 * does nothing when WebMCP is unavailable. Returns a cleanup function.
 * Current API: document.modelContext (navigator.modelContext is deprecated).
 */
export function registerWebMcpTools(): () => void {
  if (typeof document === "undefined") return () => {};
  const mc = (document as any).modelContext ?? (navigator as any).modelContext;
  if (!mc?.registerTool) return () => {};

  const ctrl = new AbortController();
  const opts = { signal: ctrl.signal };
  const noInput = { type: "object", properties: {} };

  const tools = [
    {
      name: "get_product_overview",
      description:
        "Explain what Cerbere AG is: a runtime security and observability layer between AI agents and their tools.",
      inputSchema: noInput,
      async execute() {
        return text(
          "Cerbere AG intercepts every AI agent tool call before it runs and decides: allow, block, or ask a human. " +
            "It stops prompt injection, data exfiltration and destructive commands, and records every decision in a searchable, Ed25519-signed audit trail. " +
            "Open-source engine (AgentGuard, Apache 2.0) plus Python SDK and MCP server.",
        );
      },
    },
    {
      name: "get_pricing",
      description: "Return Cerbere AG pricing plans (Free, Pro, Team, Enterprise).",
      inputSchema: noInput,
      async execute() {
        const lines = PLANS.map((p) => `${p.name}: $${p.price}/month. ${p.summary}`);
        lines.push("Enterprise: custom. Unlimited agents, self-hosted, SLA, compliance packages.");
        return text(lines.join("\n"));
      },
    },
    {
      name: "get_install_instructions",
      description: "Return install commands for the Python SDK and the MCP server.",
      inputSchema: noInput,
      async execute() {
        return text(
          "Python SDK:\n  pip install cerbere-ag\n  export AGENTGUARD_API_KEY=<your key from the dashboard>\n\n" +
            `MCP (Claude Code, Cursor, other MCP clients):\n  claude mcp add cerbereag --transport sse ${APP_URL}/mcp/sse`,
        );
      },
    },
    {
      name: "get_contact",
      description: "Return contact details for the Cerbere AG founders.",
      inputSchema: noInput,
      async execute() {
        return text("Email: christopher-ag@cerbereag.site. WhatsApp: +243 854 442 103.");
      },
    },
    {
      name: "open_docs",
      description: "Open the Cerbere AG documentation page in this tab.",
      inputSchema: noInput,
      async execute() {
        window.location.assign(`${SITE_URL}/docs`);
        return text("Opening the documentation.");
      },
    },
  ];

  for (const tool of tools) {
    try {
      mc.registerTool(tool, opts);
    } catch {
      /* a failing registration must never break the page */
    }
  }
  return () => ctrl.abort();
}
