import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Qa = { q: string; a: string; tag: string };

const items: Qa[] = [
  {
    tag: "getting started",
    q: "How long does it take to protect a first agent?",
    a: "About two minutes. Install the package with pip, set your API key, wrap the tools your agent can call, and the first decision is recorded. There is no dashboard to configure before you start.",
  },
  {
    tag: "security",
    q: "What exactly gets blocked?",
    a: "Prompt injection reaching your tools, data exfiltration through email or HTTP calls, destructive commands such as recursive deletes, and any action that breaks a policy you defined. Each decision is evaluated before the tool runs, never after.",
  },
  {
    tag: "observability",
    q: "What do I actually see in the dashboard?",
    a: "Every agent action as a trace: the tool called, the arguments, the checks that ran, the decision, the latency and the token cost. Allowed actions are recorded too, so you get a full timeline of agent behaviour, not only the incidents.",
  },
  {
    tag: "observability",
    q: "Can I export traces to my existing tooling?",
    a: "Yes. Traces and audit events are available through the HTTP collector and can be forwarded to your own logging or SIEM pipeline. Decisions can be cryptographically signed so an audit trail stays verifiable.",
  },
  {
    tag: "performance",
    q: "Does it slow my agent down?",
    a: "Local policy checks run in the process and cost a few milliseconds. Telemetry is sent asynchronously, so the collector never sits on your critical path. If the collector is unreachable, you choose between fail open and fail closed.",
  },
  {
    tag: "deployment",
    q: "Can I run it fully on my own infrastructure?",
    a: "Yes. Point the SDK at a local collector and nothing leaves your network, or take a self hosted license for high volume and regulated environments with your own data residency.",
  },
  {
    tag: "privacy",
    q: "Do you store my prompts and tool payloads?",
    a: "Sensitive values are redacted before anything is sent. You control which fields are captured, and on local or self hosted deployments the data never leaves your systems.",
  },
  {
    tag: "coverage",
    q: "Which frameworks and providers are supported?",
    a: "Python SDK, MCP clients and servers, the HTTP gateway, Composio, OpenAI, Anthropic, LangGraph and CrewAI. Anything else can be covered through the language agnostic HTTP boundary.",
  },
  {
    tag: "pricing",
    q: "What happens when I outgrow the free plan?",
    a: "Free covers two agents with local deployment and a seven day audit trail. Moving to Pro or Team adds more agents, cloud deployment, alerts, longer retention and custom policies. No migration is needed, only a plan change.",
  },
];

export function Faq() {
  const [selectedFaq, setSelectedFaq] = useState<typeof faqs[0] | null>(null);

  return (
    <section className="bg-ink py-20 md:py-28" id="faq">
      <div className="wrap">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">faq</span>
          <h2 className="mt-3 text-[clamp(26px,3.4vw,36px)]">
            Questions fréquentes
          </h2>
        </Reveal>

        {/* Scroll horizontal */}
        <div className="mt-10 flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
          {faqs.map((item, index) => (
            <Reveal key={index}>
              <button
                onClick={() => setSelectedFaq(item)}
                className="snap-center shrink-0 w-[280px] md:w-[320px] rounded-sm border border-line-black bg-black/20 p-6 text-left transition-all hover:border-amber hover:bg-black/40 active:scale-[0.98]"
              >
                <h3 className="font-display text-lg font-medium text-paper">
                  {item.q}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-amber">
                  Lire la réponse
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Modale */}
      {selectedFaq && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedFaq(null)}
        >
          <div 
            className="relative w-full max-w-lg rounded-sm border border-amber bg-ink p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedFaq(null)}
              className="absolute right-4 top-4 text-paper/50 hover:text-amber transition-colors"
              aria-label="Fermer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            
            <span className="font-mono text-xs font-semibold text-amber">FAQ</span>
            <h3 className="mt-3 text-xl font-display font-medium text-paper">
              {selectedFaq.q}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-paper/70">
              {selectedFaq.a}
            </p>
            
            <button
              onClick={() => setSelectedFaq(null)}
              className="mt-8 w-full rounded-sm bg-amber py-2.5 font-mono text-sm text-ink font-medium hover:bg-amber-deep transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
