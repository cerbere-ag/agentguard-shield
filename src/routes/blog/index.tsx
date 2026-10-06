import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import logo from "@/assets/cerbere-logo.jpeg";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog | Cerbere AG" },
      {
        name: "description",
        content:
          "Technical writing from the Cerbere AG team on AI agent security, prompt injection detection and runtime observability.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogIndex,
});

const posts = [
  {
    slug: "detecting-prompt-injection-in-production",
    title: "Detecting prompt injection in production: our first public benchmark",
    dek: "91.5% recall at sub-millisecond latency from regex alone, 98.1% with a ML layer bolted on — and the false positives that come with it. Full methodology, mapped to the OWASP Top 10 for LLM Applications.",
    date: "2026-09-26",
    tag: "benchmark",
  },
];

function BlogIndex() {
  return (
    <div className="bg-ink text-paper">
      <header className="sticky top-0 z-50 border-b border-line-black bg-ink/85 backdrop-blur-md">
        <div className="wrap flex h-[68px] items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 font-mono text-[17px] font-bold">
            <img src={logo} alt="Cerbere AG logo" className="size-8 shrink-0 border border-amber/40 object-cover" />
            <span>
              CERBERE<span className="text-amber">&nbsp;AG</span>
            </span>
          </a>
          <Link to="/" className="font-mono text-sm text-paper/70 transition-colors hover:text-amber">
            ← Back to site
          </Link>
        </div>
      </header>

      <section className="wrap py-20 md:py-24">
        <Reveal>
          <span className="eyebrow">blog</span>
          <h1 className="mt-3 text-[clamp(30px,4.4vw,44px)] leading-[1.1]">Notes from the guardian</h1>
          <p className="mt-4 max-w-xl text-paper/70">
            Benchmarks, incident write-ups and engineering notes on securing AI agents in production.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5">
          {posts.map((p) => (
            <Reveal key={p.slug}>
              <Link
                to={`/blog/${p.slug}` as "/blog"}
                className="group block border border-line-black p-7 transition-colors hover:border-amber md:p-9"
              >
                <div className="flex items-center gap-3 font-mono text-xs text-paper/45">
                  <span className="text-amber">{p.tag}</span>
                  <span>·</span>
                  <time>{p.date}</time>
                </div>
                <h2 className="mt-3 text-2xl leading-tight transition-colors group-hover:text-amber md:text-[28px]">
                  {p.title}
                </h2>
                <p className="mt-3 max-w-2xl text-[15px] text-paper/65">{p.dek}</p>
                <span className="mt-5 inline-block font-mono text-sm text-amber">Read the benchmark →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
