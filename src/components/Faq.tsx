import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Faq() {
  // Définition des questions à l'intérieur du composant pour éviter les erreurs de portée
  const faqs = [
    {
      q: "Comment Cerbere AG détecte-t-il les injections de prompt ?",
      a: "Nous utilisons un moteur à 3 couches : des motifs regex ultra-rapides, un classifieur ML léger et un juge LLM pour les cas ambigus. Tout cela s'exécute en quelques millisecondes avant que le prompt n'atteigne votre modèle.",
    },
    {
      q: "Est-ce que mes données quittent mon infrastructure ?",
      a: "Non. Avec le déploiement local ou self-hosted, toutes les vérifications se font sur votre propre réseau. Aucune donnée sensible n'est envoyée à des serveurs tiers.",
    },
    {
      q: "Quels frameworks d'agents sont compatibles ?",
      a: "Notre SDK Python s'intègre nativement avec LangGraph, CrewAI et tout agent utilisant des appels d'outils standard. Nous supportons également MCP pour une compatibilité universelle.",
    },
    {
      q: "Comment fonctionne la facturation et l'observabilité ?",
      a: "Chaque action de l'agent génère une trace signée. Vous pouvez définir des budgets atomiques par agent et recevoir des alertes Slack ou Gmail en cas de comportement anormal ou de dépassement de coût.",
    },
    {
      q: "Puis-je l'essayer gratuitement avant de m'engager ?",
      a: "Absolument. Le plan Free vous permet de connecter jusqu'à 2 agents avec un historique d'audit de 7 jours, sans carte de crédit requise.",
    },
  ];

  const [selectedFaq, setSelectedFaq] = useState<typeof faqs[0] | null>(null);

  return (
    <section className="bg-ink py-20 md:py-28" id="faq">
      <div className="wrap">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">faq</span>
          <h2 className="mt-3 text-[clamp(26px,3.4vw,36px)]">
            Questions fréquentes
          </h2>
        </Reveal>

        {/* Scroll horizontal */}
        <div className="mt-10 flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
          {faqs.map((item, index) => (
            <Reveal key={index}>
              <button
                type="button"
                onClick={() => setSelectedFaq(item)}
                className="snap-center shrink-0 w-[280px] md:w-[320px] rounded-sm border border-line-black bg-black/20 p-6 text-left transition-all hover:border-amber hover:bg-black/40 active:scale-[0.98]"
              >
                <h3 className="font-display text-lg font-medium text-paper">
                  {item.q}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-amber">
                  Lire la réponse
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Modale */}
      {selectedFaq && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedFaq(null)}
        >
          <div 
            className="relative w-full max-w-lg rounded-sm border border-amber bg-ink p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedFaq(null)}
              className="absolute right-4 top-4 text-paper/50 hover:text-amber transition-colors"
              aria-label="Fermer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            
            <span className="font-mono text-xs font-semibold text-amber">FAQ</span>
            <h3 className="mt-3 text-xl font-display font-medium text-paper">
              {selectedFaq.q}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-paper/70">
              {selectedFaq.a}
            </p>
            
            <button
              type="button"
              onClick={() => setSelectedFaq(null)}
              className="mt-8 w-full rounded-sm bg-amber py-2.5 font-mono text-sm text-ink font-medium hover:bg-amber-deep transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
