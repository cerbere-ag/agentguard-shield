// src/lib/webmcp.ts
export function registerWebMcpTools() {
  const mc = (document as any).modelContext ?? (navigator as any).modelContext;
  if (!mc) return () => {}; // pas de WebMCP : le site fonctionne normalement

  const ctrl = new AbortController();
  const opts = { signal: ctrl.signal };

  mc.registerTool({
    name: "get_product_overview",
    description: "Summarize what Cerbere AG does and its core capabilities.",
    inputSchema: { type: "object", properties: {} },
    async execute() {
      return { content: [{ type: "text", text:
        "Cerbere AG is a runtime control plane between AI agents and systems: observe, decide, enforce." }] };
    },
  }, opts);

  mc.registerTool({
    name: "get_install_instructions",
    description: "Return install steps for the Python SDK and the MCP server.",
    inputSchema: { type: "object", properties: {} },
    async execute() {
      return { content: [{ type: "text", text:
        "pip install cerbere-ag\nclaude mcp add cerbereag --transport sse https://app.cerbereag.site/mcp/sse" }] };
    },
  }, opts);

  mc.registerTool({
    name: "go_to_docs",
    description: "Navigate to the documentation page.",
    inputSchema: { type: "object", properties: {} },
    async execute() {
      window.location.assign("/docs");
      return { content: [{ type: "text", text: "Opening /docs" }] };
    },
  }, opts);

  return () => ctrl.abort(); // désenregistre les outils
}
