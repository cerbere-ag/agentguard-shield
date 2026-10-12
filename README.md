README.md (nettoyé, sans secrets)

# AgentGuard Shield

Landing page and marketing site for **Cerbere AG**, runtime security and observability for AI agents.

Cerbere AG sits between your AI agents and the actions they take: prompt injection, data exfiltration and destructive commands are stopped before they execute, and every decision is traced in a searchable audit trail.

- Site: https://app.cerbereag.site
- Dashboard: https://app.cerbereag.site/login
- Docs: `/docs` route of this site
- Product repo: https://github.com/chrismsmr-celcom/agentguard

## Quickstart (product, not this site)

Python SDK:

```sh
pip install cerbere-ag
export AGENTGUARD_API_KEY=ag_live_...   # your key, from the dashboard
cerbere

MCP (Claude Code, Cursor and other MCP clients):

claude mcp add cerbereag --transport sse https://app.cerbereag.site/mcp/sse

Never commit real API keys. Treat every key exposed in a git history as compromised and rotate it.

Stack
Vite
React
TanStack Router (file based routes)
Tailwind CSS

Project structure

src/
  routes/        file based routes (index, docs, blog)
  components/    shared components (Terminal, Faq, Integrations, ...)
  components/sections/  landing page sections (Topbar, Hero, Pricing, ...)
  lib/           constants and helpers

Development

npm i
npm run dev

Build with Lovable

This project was built with Lovable. Changes made in the Lovable editor are committed to this repository, and pushes to main sync back into Lovable.
