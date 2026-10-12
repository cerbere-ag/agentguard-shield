import { Reveal } from "@/components/Reveal";

const modes: Array<[string, string, string]> = [
  [
    "local",
    "On your machine",
    "Point the SDK at a local collector. Nothing leaves your network. Ideal for prototyping and small teams getting started.",
  ],
  [
    "cloud",
    "Cerbere Cloud",
    "We host the collector and dashboard. Sign up, get an API key, and your agents are covered in minutes with no infrastructure to run.",
  ],
  [
    "self hosted license",
    "On your own servers",
    "For high volume or regulated environments: a licensed deployment inside your own infrastructure, with your own data residency and controls.",
  ],
];

export function Deployment() {
  return (
    <section className="bg-cream py-20 text-coal md:py-28">
      <div className="wrap">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">deployment</span>
          <h2 className="mt-3 text-[clamp(26px,3.4vw,36px)]">
            Run it where your agents already run.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-px border border-line-cream bg-line-cream md:grid-cols-3">
          {modes.map(([tag, title, body]) => (
            <Reveal key={tag} className="bg-cream p-8">
              <span className="font-mono text-[12.5px] font-semibold text-amber-deep">{tag}</span>
              <h3 className="mb-3 mt-3.5 text-xl">{title}</h3>
              <p className="text-[15px] text-coal/70">{body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
