const threats = [
  { label: "prompt injection", threat: true },
  { label: "exfiltration", threat: true },
  { label: "destructive commands", threat: true },
  { label: "tool poisoning", threat: true },
  { label: "excessive agency", threat: true },
  { label: "budget overruns", threat: true },
];

export function ThreatOrbit() {
  const radius = 180;

  return (
    <div className="orbit-wrap">
      <div className="orbit">
        <div className="orbit-ring" />
        {threats.map((t, i) => {
          const angle = (i / threats.length) * 2 * Math.PI;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <span
              key={t.label}
              className={t.threat ? "orbit-chip threat" : "orbit-chip"}
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                animationDelay: `${-i * 5}s`,
              }}
            >
              {t.label}
            </span>
          );
        })}
        <div className="orbit-core">
          <span className="orbit-core-badge">🛡️ CERBERE AG</span>
        </div>
      </div>
    </div>
  );
}
