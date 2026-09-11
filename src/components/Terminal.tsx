import { useEffect, useRef, useState } from "react";

export type Token = { t: string; c?: string | undefined };
export type Line = Token[];

const speed = 8;
const lineDelay = 90;

export function Terminal({
  title,
  lines,
  height = "min-h-[230px]",
}: {
  title: string;
  lines: Line[];
  height?: string;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<Line[]>([]);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setStarted(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(lines);
      setDone(true);
      return;
    }
    let li = 0;
    let ti = 0;
    let ci = 0;
    let timer: ReturnType<typeof setTimeout>;
    const built: Line[] = [];
    setVisible([]);
    setDone(false);

    const step = () => {
      if (li >= lines.length) {
        setDone(true);
        return;
      }
      const line = lines[li] ?? [];
      while (built.length <= li) built.push([]);
      const token = line[ti];
      if (!token) {
        li += 1;
        ti = 0;
        ci = 0;
        setVisible(built.map((l) => l.slice()));
        timer = setTimeout(step, lineDelay);
        return;
      }
      ci += 1;
      const cur = built[li] ?? [];
      cur[ti] = { t: token.t.slice(0, ci), c: token.c };
      built[li] = cur;
      setVisible(built.map((l) => l.slice()));
      if (ci >= token.t.length) {
        ti += 1;
        ci = 0;
        if (ti >= line.length) {
          li += 1;
          ti = 0;
          timer = setTimeout(step, lineDelay);
          return;
        }
      }
      timer = setTimeout(step, token.t.length > 60 ? 2 : speed);
    };

    timer = setTimeout(step, 200);
    return () => clearTimeout(timer);
  }, [started, lines]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [visible]);

  return (
    <div
      ref={boxRef}
      className="border border-black/50 bg-ink shadow-[0_18px_44px_oklch(0.19_0.008_45/0.22)]"
    >
      <div className="flex items-center gap-2 border-b border-line-black px-3.5 py-3">
        <span className="size-2.5 rounded-full bg-[oklch(0.6_0.09_30)]" />
        <span className="size-2.5 rounded-full bg-[oklch(0.72_0.09_85)]" />
        <span className="size-2.5 rounded-full bg-allow" />
        <span className="ml-1.5 font-mono text-xs text-paper/45">{title}</span>
      </div>
      <div
        ref={bodyRef}
        className={`${height} max-h-[430px] overflow-y-auto whitespace-pre-wrap break-words px-5 pb-6 pt-5 font-mono text-[13px] leading-[1.85] text-paper/85 no-scrollbar`}
      >
        {visible.map((line, i) => (
          <div key={i}>
            {line.map((tok, j) => (
              <span key={j} className={tok?.c}>
                {tok?.t}
              </span>
            ))}
            {i === visible.length - 1 && !done && (
              <span className="animate-caret ml-0.5 inline-block h-[15px] w-2 align-middle bg-amber" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
