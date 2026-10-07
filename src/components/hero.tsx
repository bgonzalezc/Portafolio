"use client";
import { links } from "@/lib/portfolio";
import LiveClock from "./live-clock";
import SceneSlot from "./scene-slot";
export default function Hero({
  onPending,
}: {
  onPending: (label: string) => void;
}) {
  return (
    <section id="index" className="hero" aria-labelledby="hero-name">
      <header className="hero-header">
        <a
          className="wordmark"
          href="#index"
          aria-label="BG / Systems Portfolio"
        >
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <defs>
              <linearGradient id="brand-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#8052ff" />
                <stop offset="1" stopColor="#15846e" />
              </linearGradient>
            </defs>
            <path d="M4 25L15 3L28 25L16 20Z" fill="url(#brand-gradient)" />
          </svg>
          <span>
            BG<span className="brand-subtitle">Systems Portfolio</span>
          </span>
        </a>
        <nav aria-label="Navegación principal" className="header-nav">
          <a href="#profile">Perfil</a>
          <a href="#work">Proyectos</a>
          <a href="#stack">Stack</a>
          <a href="#contact">Contacto</a>
        </nav>
        <a
          className="header-github"
          href={links.github!}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </header>
      <div className="hero-layout">
        <div className="hero-copy">
          <span className="eyebrow amber">Ingeniería Civil Informática</span>
          <h1 id="hero-name">
            Benjamín
            <br />
            González<span className="amber">.</span>
          </h1>
          <p>
            Conecto software, datos e infraestructura para transformar ideas en
            sistemas que funcionan.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              Explorar proyectos
            </a>
            <a
              className="ghost-link"
              href={links.linkedin!}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <button className="ghost-link" onClick={() => onPending("CV")}>
              CV <span className="pending-dot" aria-label="pendiente" />
            </button>
          </div>
          <div className="hero-availability">
            <span className="status-dot" />
            Disponible para práctica profesional
          </div>
        </div>
        <SceneSlot />
      </div>
      <div className="hero-footnote">
        <span>Santiago / Chile</span>
        <span className="hero-time">
          Local time <LiveClock />
        </span>
        <span>Build 2026.10 / 00 Index</span>
      </div>
    </section>
  );
}
