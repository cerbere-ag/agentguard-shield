import { useEffect, useState } from "react";
import { APP, DOCS, GITHUB } from "@/lib/constants";
import logo from "@/assets/cerbere-logo.jpeg";

export function Topbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        if (y < 80) {
          setHidden(false);
        } else if (y > lastY + 6) {
          setHidden(true);
        } else if (y < lastY - 6) {
          setHidden(false);
        }
        lastY = y;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b bg-ink/85 backdrop-blur-md transition-[transform,box-shadow,border-color] duration-300",
        hidden ? "-translate-y-full" : "translate-y-0",
        scrolled ? "border-line-black shadow-[0_10px_40px_oklch(0_0_0/0.45)]" : "border-transparent",
      ].join(" ")}
    >
      <div className="wrap flex h-[68px] items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 font-mono text-[17px] font-bold">
          <img
            src={logo}
            alt="Cerbere AG logo"
            className="size-8 shrink-0 border border-amber/40 object-cover"
          />
          <span>
            CERBERE<span className="text-amber">&nbsp;AG</span>
          </span>
        </a>

        <nav className="flex items-center gap-5">
          <a href={DOCS} className="hidden font-mono text-sm text-paper/70 transition-colors hover:text-amber sm:block">
            Docs
          </a>
          <a href="#integrations" className="hidden font-mono text-sm text-paper/70 transition-colors hover:text-amber sm:block">
            Integrations
          </a>
          <a href="#benchmark" className="hidden font-mono text-sm text-paper/70 transition-colors hover:text-amber sm:block">
            Benchmark
          </a>
          <a href="#pricing" className="hidden font-mono text-sm text-paper/70 transition-colors hover:text-amber sm:block">
            Pricing
          </a>

          <a
            href={GITHUB}
            target="_blank"
            rel="noopener"
            aria-label="View source on GitHub"
            className="flex size-9 items-center justify-center text-paper/75 transition-opacity hover:text-paper"
          >
            <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.28 7.77 10.78.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.16.69-3.83-1.34-3.83-1.34-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16a10.9 10.9 0 0 1 5.72 0c2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.65 5.31-5.18 5.59.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.79.55A11.26 11.26 0 0 0 23.25 11.75C23.25 5.48 18.27.5 12 .5Z" />
            </svg>
          </a>

          <a
            href={APP + "/login"}
            className="inline-flex items-center rounded-sm border border-line-black px-4 py-2.5 font-mono text-sm transition-colors hover:border-amber hover:text-amber"
          >
            Sign in
          </a>
        </nav>
      </div>
    </header>
  );
}
