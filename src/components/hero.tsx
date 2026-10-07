"use client";
import { useEffect, useState } from "react";
import { links } from "@/lib/portfolio";
import LiveClock from "./live-clock";
import SceneSlot from "./scene-slot";
export default function Hero({
  onPending,
}: {
  onPending: (label: string) => void;
}) {
  const [resolution, setResolution] = useState("— × —");
  useEffect(() => {
    const update = () =>
      setResolution(`${window.innerWidth} × ${window.innerHeight}`);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return (
    <section id="index" className="hero" aria-labelledby="hero-name">
      <header className="hero-header">
        <a
          className="wordmark"
          href="#index"
          aria-label="BG / Systems Portfolio"
        >
          <span className="display">BG</span>
          <span className="mono">
            / SYSTEMS
            <br />
            PORTFOLIO
          </span>
        </a>
        <div className="hero-location mono">
          <span>SANTIAGO / CL</span>
          <span>33.45° S / 70.66° W</span>
          <span>BUILD 2026.10</span>
        </div>
      </header>
      <div className="hero-identity">
        <h1 id="hero-name">
          BENJAMÍN
          <br />
          GONZÁLEZ
        </h1>
        <p>Ingeniería Civil Informática</p>
        <span className="mono">00 / INDEX</span>
      </div>
      <div className="hero-status mono">
        <span className="availability">AVAILABLE FOR INTERNSHIP</span>
        <span>SOFTWARE / DATA / INFRASTRUCTURE</span>
      </div>
      <SceneSlot />
      <div className="hero-bottom">
        <div className="hero-bio">
          <LiveClock display />
          <p>
            Estudiante de Ingeniería Civil Informática.
            <br />
            Explorando software, datos y sistemas.
            <br />
            Santiago, Chile.
          </p>
          <a className="inline-link" href="#profile">
            Más sobre mí
          </a>
        </div>
        <div className="artifact-caption mono">
          <span>ASSEMBLY / 001</span>
          <span>REALTIME 3D</span>
          <span>{resolution}</span>
        </div>
        <nav className="hero-links" aria-label="Enlaces principales">
          <a className="button" href="#work">
            Projects <span>06</span>
          </a>
          <a
            className="button"
            href={links.github!}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="button"
            href={links.linkedin!}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <button className="button" onClick={() => onPending("CV")}>
            CV <span className="pending-dot" aria-label="pendiente" />
          </button>
          <a className="button" href={`mailto:${links.email}`}>
            Email
          </a>
        </nav>
      </div>
      <div className="hero-footnote mono">
        <span>BG / ENGINEERING IN PROGRESS</span>
        <a href="#work">01—06 / EXPLORE THE SYSTEM</a>
      </div>
    </section>
  );
}
