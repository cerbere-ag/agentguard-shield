import { Reveal } from "@/components/Reveal";

export function Contact() {
  return (
    <section className="bg-cream py-20 text-coal md:py-28">
      <div className="wrap flex flex-wrap items-end justify-between gap-10">
        <Reveal className="max-w-xl">
          <span className="eyebrow">talk to the founders</span>
          <h2 className="mt-3 text-[clamp(26px,3.4vw,36px)]">
            Questions before you deploy an agent? Ask us directly.
          </h2>
        </Reveal>

        <Reveal className="font-mono text-[15px]">
          <div className="flex items-baseline gap-3 border-t border-line-cream py-3.5">
            <span className="font-bold text-amber-deep">wa</span>
            <a
              href="https://wa.me/243854442103"
              target="_blank"
              rel="noopener"
              className="font-medium transition-colors hover:text-amber-deep"
            >
              +243 854 442 103
            </a>
          </div>

          <div className="flex items-baseline gap-3 border-y border-line-cream py-3.5">
            <span className="font-bold text-amber-deep">@</span>
            <a
              href="mailto:christopher-ag@cerbereag.site"
              className="font-medium transition-colors hover:text-amber-deep"
            >
              christopher-ag@cerbereag.site
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
