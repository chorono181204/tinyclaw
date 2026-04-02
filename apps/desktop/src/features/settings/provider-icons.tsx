import type { ReactNode } from "react";
import anthropicLogo from "simple-icons/icons/anthropic.svg";
import googleGeminiLogo from "simple-icons/icons/googlegemini.svg";
import mistralLogo from "simple-icons/icons/mistralai.svg";
import openrouterLogo from "simple-icons/icons/openrouter.svg";
import ollamaLogo from "simple-icons/icons/ollama.svg";
import perplexityLogo from "simple-icons/icons/perplexity.svg";
import minimaxLogo from "simple-icons/icons/minimax.svg";

type LogoProps = {
  className?: string;
};

function BrandSvg({
  children,
  viewBox = "0 0 24 24",
}: {
  children: ReactNode;
  viewBox?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className="size-6"
      fill="currentColor"
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

function SvgAssetLogo({ src, title }: { src: string; title: string }) {
  return (
    <div
      aria-label={title}
      className="flex size-12 items-center justify-center rounded-[var(--radius)] bg-white shadow-xs ring-1 ring-border/80"
      title={title}
    >
      <img alt={title} className="size-6 object-contain" src={src} />
    </div>
  );
}

function MonogramLogo({
  bg,
  label,
  textClassName = "text-white",
}: {
  bg: string;
  label: string;
  textClassName?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className="flex size-12 items-center justify-center rounded-[var(--radius)] bg-white shadow-xs ring-1 ring-border/80"
    >
      <div
        className={`flex size-8 items-center justify-center rounded-[calc(var(--radius)*0.8)] text-[11px] font-semibold ${textClassName}`}
        style={{ backgroundColor: bg }}
      >
        {label}
      </div>
    </div>
  );
}

export function ProviderLogo({
  className = "",
  providerId,
}: LogoProps & {
  providerId: string;
}) {
  const logo = (() => {
    switch (providerId) {
      case "anthropic":
        return <SvgAssetLogo src={anthropicLogo} title="Anthropic" />;
      case "google":
        return <SvgAssetLogo src={googleGeminiLogo} title="Google Gemini" />;
      case "mistral":
        return <SvgAssetLogo src={mistralLogo} title="Mistral AI" />;
      case "openrouter":
        return <SvgAssetLogo src={openrouterLogo} title="OpenRouter" />;
      case "ollama":
        return <SvgAssetLogo src={ollamaLogo} title="Ollama" />;
      case "perplexity":
        return <SvgAssetLogo src={perplexityLogo} title="Perplexity" />;
      case "minimax":
        return <SvgAssetLogo src={minimaxLogo} title="MiniMax" />;
      case "openai":
        return (
          <div className="flex size-12 items-center justify-center rounded-[var(--radius)] bg-white shadow-xs ring-1 ring-border/80 text-[#101010]">
            <BrandSvg>
              <path d="M11.8 2.1a4.3 4.3 0 0 1 4.2 2.7 4.6 4.6 0 0 1 4.3 7.4 4.5 4.5 0 0 1-1 5.6 4.5 4.5 0 0 1-5.8 2.7 4.4 4.4 0 0 1-6.6 0 4.5 4.5 0 0 1-5.8-2.7 4.5 4.5 0 0 1-1-5.6A4.6 4.6 0 0 1 4.6 4.8a4.3 4.3 0 0 1 7.2-2.7Zm-4 4.5 4.2-2.3a2.9 2.9 0 0 0-3.9 1.4l-.3.9Zm8.3-.6.3.9 2.4 4.2a3 3 0 0 0-2.7-5.1ZM5.2 8.7a3 3 0 0 0-.5 3.5l.5.8V8.7Zm13.6 4.8-4.2 2.4a2.9 2.9 0 0 0 3.9-1.5l.3-.9Zm-7 6.2a3 3 0 0 0 2.6-1.5h-5.2a3 3 0 0 0 2.6 1.5Zm-6-4.2a3 3 0 0 0 2.7 1.5h.9l-2.6-4.5-1 1.7Zm7.4-1.5 4.2-2.4-2.6-4.5H9.6L7 11.6l2.6 4.4h3.6Z" />
            </BrandSvg>
          </div>
        );
      case "xai":
        return <MonogramLogo bg="#111111" label="xAI" />;
      case "deepseek":
        return <MonogramLogo bg="#4F46E5" label="DS" />;
      case "groq":
        return <MonogramLogo bg="#F97316" label="GQ" />;
      case "cohere":
        return <MonogramLogo bg="#39594D" label="CO" />;
      case "moonshot":
        return <MonogramLogo bg="#111827" label="MS" />;
      case "together":
        return <MonogramLogo bg="#0F172A" label="TG" />;
      case "azure-openai":
        return <MonogramLogo bg="#0078D4" label="Az" />;
      case "openai-compatible":
        return <MonogramLogo bg="#334155" label="API" />;
      default:
        return <MonogramLogo bg="#64748B" label="API" />;
    }
  })();

  return <div className={className}>{logo}</div>;
}
