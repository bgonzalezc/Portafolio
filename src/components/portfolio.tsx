"use client";
import { useEffect, useRef, useState } from "react";
import { contact, links, projects, stack } from "@/lib/portfolio";
import Hero from "./hero";

type Project = (typeof projects)[number];
const sections = [
  "INDEX",
  "PROFILE",
  "WORK",
  "STACK",
  "EXPERIENCE",
  "EDUCATION",
  "CONTACT",
];
function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <div className="section-label mono">
      <span>{number}</span>
      <span>/ {title}</span>
    </div>
  );
}
function ProjectVisual({ project }: { project: Project }) {
  return (
    <div
      className="project-visual"
      aria-label={`Espacio de captura para ${project.title}`}
    >
      <span className="mono">{project.id} / DOCUMENTATION</span>
      <span className="mono">SCREENSHOT PENDING</span>
    </div>
  );
}
export default function Portfolio() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [pending, setPending] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (selected || pending) dialog.current?.showModal();
    else dialog.current?.close();
  }, [selected, pending]);
  function close() {
    setSelected(null);
    setPending(null);
  }
  function destination(key: keyof typeof links, label: string) {
    const value = links[key];
    return value ? (
      <a
        className={label === "Hablemos" ? "button button-primary" : "button"}
        href={key === "email" ? `mailto:${value}` : value}
        target={key === "github" || key === "linkedin" ? "_blank" : undefined}
        rel="noopener noreferrer"
      >
        {label}
      </a>
    ) : (
      <button
        className={label === "Hablemos" ? "button button-primary" : "button"}
        onClick={() => setPending(label)}
      >
        {label}
        <span className="pending-dot" aria-label="pendiente" />
      </button>
    );
  }
  return (
    <>
      <a className="skip" href="#profile">
        Saltar al contenido
      </a>
      <main>
        <Hero onPending={setPending} />
        <nav className="section-nav mono" aria-label="Secciones del portafolio">
          {sections.map((s, i) => (
            <a href={`#${s.toLowerCase()}`} key={s}>
              <span>0{i}</span> {s}
            </a>
          ))}
        </nav>
        <section id="profile" className="content-section profile-section">
          <SectionLabel number="01" title="PROFILE" />
          <div className="section-body profile-body">
            <h2>
              Curiosidad.
              <br />
              <span className="muted">Criterio. Ingeniería.</span>
            </h2>
            <div className="profile-text">
              <p>
                Soy Benjamín González, estudiante de Ingeniería Civil
                Informática en Santiago, Chile. Me interesa trabajar donde el
                software, los datos y la infraestructura se encuentran.
              </p>
              <p>
                Exploro problemas a través de proyectos: desde series temporales
                y plataformas web hasta sistemas conectados y servicios propios.
              </p>
            </div>
            <div className="profile-facts mono">
              <span>
                BASED IN <b>SANTIAGO, CHILE</b>
              </span>
              <span>
                FOCUS <b>SYSTEMS & DATA</b>
              </span>
              <span>
                NEXT STEP <b>PRÁCTICA PROFESIONAL</b>
              </span>
            </div>
          </div>
        </section>
        <section id="work" className="content-section work-section">
          <SectionLabel number="02" title="WORK" />
          <div className="section-body">
            <div className="section-heading">
              <h2>
                Selected projects<span className="accent"> / 06</span>
              </h2>
              <p className="mono muted">IDEAS PUT INTO PRACTICE</p>
            </div>
            <div className="projects-grid">
              {projects.map((project) => (
                <button
                  className="project-card"
                  key={project.id}
                  onClick={() => setSelected(project)}
                  aria-label={`Ver proyecto ${project.title}`}
                >
                  <div className="project-meta mono">
                    <span>{project.category}</span>
                    <span>{project.id}</span>
                  </div>
                  <h3>
                    {project.title}
                    <span className="project-plus">+</span>
                  </h3>
                  <p>{project.description}</p>
                  <div className="tags mono">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
        <section id="stack" className="content-section">
          <SectionLabel number="03" title="STACK" />
          <div className="section-body">
            <div className="section-heading">
              <h2>A practical toolkit.</h2>
              <p className="mono muted">ALWAYS LEARNING</p>
            </div>
            <div className="stack-grid">
              {stack.map(([title, ...items]) => (
                <div className="stack-group" key={title}>
                  <h3 className="mono">{title}</h3>
                  <ul>
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="experience" className="content-section">
          <SectionLabel number="04" title="EXPERIENCE" />
          <div className="section-body">
            <article className="timeline-row">
              <span className="mono muted">ACADEMIC / TEACHING</span>
              <div>
                <h2>Ayudantía de Álgebra</h2>
                <p>
                  Comunicación técnica, resolución de problemas y apoyo al
                  aprendizaje de conceptos matemáticos.
                </p>
              </div>
              <span className="mono muted">FECHAS PENDIENTES</span>
            </article>
            <div className="experience-note mono">
              <span className="accent">OPEN TO OPPORTUNITIES</span>
              <span>Buscando mi próxima experiencia en ingeniería.</span>
            </div>
          </div>
        </section>
        <section id="education" className="content-section">
          <SectionLabel number="05" title="EDUCATION" />
          <div className="section-body">
            <article className="timeline-row">
              <span className="mono muted">FORMACIÓN ACADÉMICA</span>
              <div>
                <h2>Ingeniería Civil Informática</h2>
                <p>
                  Software, datos, bases de datos, redes y fundamentos de
                  ingeniería.
                </p>
                <p className="mono muted education-pending">
                  INSTITUCIÓN Y PERÍODO POR COMPLETAR
                </p>
              </div>
              <span className="mono accent">EN CURSO</span>
            </article>
          </div>
        </section>
        <section id="contact" className="content-section contact-section">
          <SectionLabel number="06" title="CONTACT" />
          <div className="section-body">
            <div className="availability mono">
              <span />
              AVAILABLE FOR INTERNSHIP
            </div>
            <h2>
              Let’s build
              <br />
              something <span className="accent">meaningful.</span>
            </h2>
            <p>
              Abierto a prácticas profesionales y conversaciones sobre software,
              datos e infraestructura.
            </p>
            <div className="flex flex-wrap gap-2 contact-actions">
              {destination("email", "Hablemos")}
              {destination("github", "GitHub")}
              {destination("linkedin", "LinkedIn")}
              {destination("cv", "CV")}
            </div>
            <div className="contact-details">
              <a href={`mailto:${links.email}`}>{links.email}</a>
              <a href={contact.phoneHref}>{contact.phone}</a>
            </div>
          </div>
        </section>
      </main>
      <footer className="mono">
        <span>BG / SYSTEMS PORTFOLIO</span>
        <span>SANTIAGO / CL · BUILD 2026.10</span>
        <a href="#index">BACK TO INDEX ↑</a>
      </footer>
      <dialog
        ref={dialog}
        onCancel={close}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        aria-labelledby="dialog-title"
      >
        <button
          className="dialog-close mono"
          onClick={close}
          aria-label="Cerrar"
        >
          CLOSE ×
        </button>
        {selected ? (
          <>
            <p className="eyebrow mono">
              PROJECT {selected.id} / {selected.category}
            </p>
            <h2 id="dialog-title">{selected.title}</h2>
            <ProjectVisual project={selected} />
            <p>{selected.detail}</p>
            <div className="detail-row">
              <span className="mono muted">PROBLEMA</span>
              <p>{selected.challenge}</p>
            </div>
            <div className="detail-row">
              <span className="mono muted">ALCANCE</span>
              <p>{selected.scope}</p>
            </div>
            <div className="tags mono">
              {selected.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <p className="detail-pending mono">
              Capturas, aporte detallado, resultados y repositorio por
              incorporar.
            </p>
          </>
        ) : (
          <>
            <p className="eyebrow mono">DESTINATION PENDING</p>
            <h2 id="dialog-title">
              {pending === "CV"
                ? "CV por incorporar"
                : `${pending} por conectar`}
            </h2>
            <p>
              {pending === "CV"
                ? "El documento estará disponible aquí cuando se incorpore el CV de Benjamín."
                : "El enlace personal todavía no se ha incorporado a esta primera versión."}
            </p>
            <button className="button" onClick={close}>
              Volver al portafolio
            </button>
          </>
        )}
      </dialog>
    </>
  );
}
