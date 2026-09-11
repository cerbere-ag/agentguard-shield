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
  const [open, setOpen] = useState<Qa | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    scroller.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section id="faq" className="bg-cream py-20 text-coal md:py-28">
      <div className="wrap">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="eyebrow">questions</span>
            <h2 className="mt-3 text-[clamp(26px,3.4vw,36px)]">
              Everything teams ask before they put an agent in production.
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous questions"
              onClick={() => scrollBy(-1)}
              className="flex size-10 items-center justify-center border border-line-cream text-coal transition-colors hover:border-amber-deep hover:text-amber-deep"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="More questions"
              onClick={() => scrollBy(1)}
              className="flex size-10 items-center justify-center border border-line-cream text-coal transition-colors hover:border-amber-deep hover:text-amber-deep"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </Reveal>
      </div>

      <div
        ref={scroller}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:px-7 lg:px-[max(1.75rem,calc((100vw-1180px)/2))]"
      >
        {items.map((item) => (
          <button
            key={item.q}
            type="button"
            onClick={() => setOpen(item)}
            className="flex min-h-[190px] w-[300px] shrink-0 snap-start flex-col justify-between border border-line-cream bg-[oklch(0.98_0.012_60)] p-6 text-left transition-colors hover:border-amber-deep sm:w-[330px]"
          >
            <span className="font-mono text-[12px] font-semibold text-amber-deep">{item.tag}</span>
            <span className="mt-5 font-display text-[19px] leading-snug text-coal">{item.q}</span>
            <span className="mt-5 font-mono text-[12px] text-coal/55">read the answer</span>
          </button>
        ))}
      </div>

      <Dialog open={open !== null} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="border-line-black bg-ink text-paper sm:max-w-lg">
          <DialogHeader>
            <span className="font-mono text-[12px] font-semibold text-amber">{open?.tag}</span>
            <DialogTitle className="mt-2 text-left text-xl leading-snug text-paper">
              {open?.q}
            </DialogTitle>
            <DialogDescription className="mt-3 text-left text-[15px] leading-relaxed text-paper/70">
              {open?.a}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
}
