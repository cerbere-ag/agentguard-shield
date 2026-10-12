import { useRef, useState } from "react";

const planes = [
  { label: "LLM call / tool call", z: 120 },
  { label: "identity & capability", z: 60 },
  { label: "scope & sensitivity", z: 0 },
  { label: "policy & budgets", z: -60 },
  { label: "decision", z: -120, decision: true },
];

export function DecisionScene() {
  const [tilt, setTilt] = useState<{ rx: number; ry: number } | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -16 - y * 14, ry: x * 32 });
  };

  return (
    <div
      ref={wrapRef}
      className="scene-wrap"
      onMouseMove={onMove}
      onMouseLeave={() => setTilt(null)}
    >
      <div
        className={tilt ? "scene" : "scene scene-auto"}
        style={
          tilt
            ? { transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }
            : undefined
        }
      >
        <div className="scene-axis" />
        {planes.map((p) => (
          <div
            key={p.label}
            className={p.decision ? "scene-plane decision" : "scene-plane"}
            style={{ transform: `translateZ(${p.z}px)` }}
          >
            <span>{p.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
