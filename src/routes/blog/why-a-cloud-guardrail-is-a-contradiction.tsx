import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import logo from "@/assets/cerbere-logo.jpeg";

export const Route = createFileRoute("/blog/why-a-cloud-guardrail-is-a-contradiction")({
  head: () => ({
    meta: [
      {
        title: "Why a cloud guardrail is a contradiction | Cerbere AG",
      },
      {
        name: "description",
        content:
          "To protect your AI agents, a cloud guardrail asks you to send it exactly what you are trying to protect. Why Cerbère AG is self-hosted by design.",
      },
      {
        property: "og:title",
        content: "Why a cloud guardrail is a contradiction",
      },
      { property: "og:type", content: "article" },
      {
        property: "og:url",
        content: "https://www.cerbereag.site/blog/why-a-cloud-guardrail-is-a-contradiction",
      },
      {
        property: "og:image",
        content: "https://www.cerbereag.site/og/why-a-cloud-guardrail-is-a-contradiction.png",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Why a cloud guardrail is a contradiction",
      },
      {
        name: "twitter:description",
        content:
          "Protecting your secrets by asking you to send them to a third party doesn’t add up. Cloud to discover, self-hosted to protect.",
      },
      {
        name: "twitter:image",
        content: "https://www.cerbereag.site/og/why-a-cloud-guardrail-is-a-contradiction.png",
      },
    ],
  }),
  component: Post,
});

const GITHUB = "https://github.com/chrismsmr-celcom/agentguard";
const APP = "https://app.cerbereag.site";

const exposed = [
  "Your prompts.",
  "Your tool calls.",
  "Your secrets.",
  "Your API responses.",
  "Sometimes, your internal documents.",
];

const neverSent = [
  "No prompts sent to us.",
  "No secrets sent to us.",
  "No tool calls sent to us.",
];

function Dot() {
  return <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />;
}

function Post() {
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
          <Link to="/blog" className="font-mono text-sm text-paper/70 transition-colors hover:text-amber">
            ← Blog
          </Link>
        </div>
      </header>

      <article className="wrap max-w-[720px] py-20 md:py-24">
        <Reveal>
          <span className="eyebrow">opinion</span>
          <h1 className="mt-3 text-[clamp(30px,4.6vw,44px)] leading-[1.12]">
            Why a cloud guardrail is a contradiction
          </h1>
          <p className="mt-4 max-w-xl text-[17px] text-paper/70">
            To protect you, most AI security tools ask you to send them exactly what you are
            trying to protect. That is where the problem starts.
          </p>
          <p className="mt-5 font-mono text-[12.5px] text-paper/40">November 6, 2026</p>
        </Reveal>

        <Reveal className="mt-10 space-y-5 text-paper/80">
          <p>
            On November 2nd, GitBook told its users to rotate all their API tokens. An AI agent
            had reached infrastructure secrets.
          </p>
          <p>
            Days before, WIRED reported that a Claude Code agent spent two months with admin
            rights inside a US Department of Defense network, undetected. It exfiltrated
            credentials, passwords, a network map.
          </p>
          <p>These are not isolated cases. This is the new normal.</p>
          <p>
            And facing this, most AI security startups offer you the same solution: send us your
            data, we will protect it.
          </p>
        </Reveal>

        <Reveal className="mt-10 border-l-2 border-amber bg-black/20 p-6">
          <p className="text-[15px] text-paper/85">
            <strong className="text-paper">That is where the problem starts.</strong>
          </p>
        </Reveal>

        <h2 className="mt-16 border-t border-line-black pt-8 text-2xl">
          1. To protect you, you have to expose yourself
        </h2>
        <p className="mt-4 text-paper/80">
          For a cloud guardrail to work, you have to send it what it needs to monitor:
        </p>
        <div className="mt-4">
          {exposed.map((e) => (
            <div key={e} className="flex gap-4 border-b border-line-black py-3 last:border-b-0">
              <Dot />
              <p className="text-[14.5px] text-paper/70">{e}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-paper/80">
          In other words, you have to give a third party exactly what you are trying to protect.
        </p>
        <p className="mt-4 text-paper/80">
          You create a new central point where all your sensitive data transits. If that third
          party gets breached, if one of its employees makes a mistake, if one of its own AI
          agents goes rogue, you leak.
        </p>
        <p className="mt-4 text-paper">
          <strong>You did not reduce your risk. You moved it.</strong>
        </p>

        <h2 className="mt-16 border-t border-line-black pt-8 text-2xl">
          2. Trust should not be required to be secure
        </h2>
        <p className="mt-4 text-paper/80">
          Cloud guardrails tell you: “Trust us, we are SOC 2, we are encrypted, we don’t store
          your data.”
        </p>
        <p className="mt-4 text-paper/80">
          But GitBook was encrypted too. The DoD had controls too.
        </p>
        <p className="mt-4 text-paper/80">
          Trust should not be a prerequisite for security. It should be unnecessary.
        </p>
        <p className="mt-4 text-paper/80">
          If to be protected, you first have to trust another actor with your most critical
          secrets, then your security model is fragile by design.
        </p>

        <h2 className="mt-16 border-t border-line-black pt-8 text-2xl">
          3. Self-hosted is not a feature, it’s the mission
        </h2>
        <p className="mt-4 text-paper/80">
          That is why we made a radical choice with Cerbère AG:{" "}
          <strong className="text-amber">self-hosted by design.</strong>
        </p>
        <p className="mt-4 text-paper/80">
          Cerbère runs in your infrastructure. It sees your agent actions, it blocks
          exfiltrations, it logs decisions. But nothing leaves.
        </p>
        <div className="mt-4">
          {neverSent.map((n) => (
            <div key={n} className="flex gap-4 border-b border-line-black py-3 last:border-b-0">
              <Dot />
              <p className="text-[14.5px] text-paper/70">{n}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-paper/80">
          The only number that leaves, once a month, is a counter:{" "}
          <code className="font-mono text-amber">“124,502 decisions made”</code>. Just for
          billing. Not the content.
        </p>
        <p className="mt-4 text-paper/80">
          We don’t want to see your data to protect it. We want you to never need to trust us.
        </p>
        <p className="mt-4 text-paper/80">
          Because we can’t protect your secrets by asking you to send them to us.
        </p>

        <h2 className="mt-16 border-t border-line-black pt-8 text-2xl">
          4. Cloud to test, self-hosted to protect
        </h2>
        <p className="mt-4 text-paper/80">
          We are not saying cloud is useless. It is useful to test fast, to do a demo in 2
          minutes, to validate an idea.
        </p>
        <p className="mt-4 text-paper/80">
          But in production, when your agents touch your APIs, your databases, your customers,
          you cannot afford a middleman.
        </p>
        <Reveal className="mt-6 border-l-2 border-amber bg-black/20 p-6">
          <p className="font-mono text-[15px] text-paper">
            Cloud to discover. <span className="text-amber">Self-hosted to protect.</span>
          </p>
        </Reveal>

        <h2 className="mt-16 border-t border-line-black pt-8 text-2xl">Conclusion</h2>
        <p className="mt-4 text-paper/80">
          AI agents have the keys to your company. The question is no longer if they will make a
          mistake, but if someone is watching what they touch.
        </p>
        <p className="mt-4 text-paper/80">
          And that someone should not be a new third party you have to trust.
        </p>
        <p className="mt-4 text-paper/80">It should be at home, under your control.</p>
        <p className="mt-4 text-paper/80">That is Cerbère AG.</p>
        <p className="mt-6 text-paper">
          <em>
            AI agents need more than intelligence. They need control. And that control should
            never leave your infra.
          </em>
        </p>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line-black pt-8">
          <p className="text-sm text-paper/60">
            Cerbère AG runs in your infrastructure. Nothing leaves.
          </p>
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center rounded-sm border border-line-black px-4 py-2.5 font-mono text-sm transition-colors hover:border-amber hover:text-amber"
          >
            View the repo →
          </a>
        </div>
      </article>

      <footer className="border-t border-line-black bg-cream py-10 text-coal">
        <div className="wrap flex flex-wrap items-center justify-between gap-3.5">
          <div className="font-mono text-[13px] opacity-75">
            <a href={`${APP}/login`} className="hover:opacity-100">
              Dashboard
            </a>
          </div>
          <div className="font-mono text-[12.5px] opacity-65">© 2026 Cerbere AG. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
