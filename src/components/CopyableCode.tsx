import { useState } from "react";

export function CopyableCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="group w-full cursor-pointer rounded-sm border border-line-black bg-black/30 p-4 text-left transition-all hover:border-amber hover:bg-black/50 active:scale-[0.98]"
    >
      <div className="font-mono text-xs text-paper/50 group-hover:text-amber transition-colors">
        {copied ? "✓ copied" : "click to copy"}
      </div>
      <div className="mt-2 font-mono text-sm text-paper group-hover:text-amber transition-colors break-all">
        {code}
      </div>
    </button>
  );
}
