import { createFileRoute } from "@tanstack/react-router";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { Topbar } from "@/components/sections/Topbar";
import { Hero } from "@/components/sections/Hero";
import { DecisionChain } from "@/components/sections/DecisionChain";
import { SeeItWork } from "@/components/sections/SeeItWork";
import { Benchmark } from "@/components/sections/Benchmark";
import { Research } from "@/components/sections/Research";
import { Mission } from "@/components/sections/Mission";
import { Observability } from "@/components/sections/Observability";
import { Deployment } from "@/components/sections/Deployment";
import { Pricing } from "@/components/sections/Pricing";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Integrations } from "@/components/Integrations";
import { Faq } from "@/components/Faq";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cerbere AG | Security and observability layer for AI agents" },
      {
        name: "description",
        content:
          "Security and observability layer to control your AI agents in real time. Prompt injection, data exfiltration and destructive commands stopped before they execute, with full traces of every decision.",
      },
      { property: "og:title", content: "Cerbere AG | Security and observability layer for AI agents" },
      {
        property: "og:description",
        content:
          "Control your AI agents in real time. Block prompt injection, exfiltration and destructive commands before they run, and see every agent action in one audit trail.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-ink text-paper">
      <ScrollProgress />
      <Topbar />
      <Hero />
      <Mission />
      <DecisionChain />
      <Observability />
      <Integrations />
      <SeeItWork />
      <Benchmark />
      <Research />
      <Deployment />
      <Pricing />
      <Faq />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}
