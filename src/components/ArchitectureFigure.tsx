import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const SRC = "/architecture/cerbere-architecture.webp";
const ALT =
  "Cerbere AG architecture in five stages. Entry: AI agent and MCP server. Runtime: SDK, runtime checks, taint tracking, security models. Decide: SDK policy checks, policy engine, unified decision engine, risk scoring, ML detection, rules and patterns, input normalization, LLM judge. Observe: dashboard user, collector service, application, API, span ingestion, metrics API, dashboard views, database. Govern: identity management, audit API, authentication, immutable audit log. One trace follows a call from invocation to audit log.";

export function ArchitectureFigure() {
  return (
    <figure>
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            aria-label="Enlarge the architecture diagram"
            className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-line-black bg-[#f3eee3] text-left shadow-[0_30px_90px_rgb(0_0_0/0.5)]"
          >
            <img
              src={SRC}
              width={3200}
              height={2080}
              alt={ALT}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
            <span className="absolute right-2 top-2 rounded-sm bg-ink/90 px-2 py-1 font-mono text-[10.5px] text-paper opacity-90 transition-opacity group-hover:opacity-100 md:right-3 md:top-3 md:px-3 md:py-1.5 md:text-[12px]">
              <span className="md:hidden">Tap to enlarge</span>
              <span className="hidden md:inline">Click to enlarge</span>
            </span>
          </button>
        </DialogTrigger>
        <DialogContent className="max-h-[92vh] w-[96vw] max-w-[96vw] overflow-auto border-line-black bg-ink p-2 pt-12 text-paper sm:max-w-[96vw] sm:rounded-lg">
          <DialogTitle className="sr-only">Cerbere AG architecture</DialogTitle>
          <DialogDescription className="sr-only">
            Full-size architecture diagram. Scroll to pan.
          </DialogDescription>
          <img src={SRC} alt="" width={3200} height={2080} className="h-auto w-[1900px] max-w-none" />
        </DialogContent>
      </Dialog>
      <figcaption className="mt-4 max-w-[70ch] text-[13.5px] text-paper/50">
        AgentGuard is the name of the open-source engine and Python module inside Cerbere AG.
      </figcaption>
    </figure>
  );
}
