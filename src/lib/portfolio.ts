// Replace only verified personal destinations. null renders an honest pending state.
export const links: Record<
  "github" | "linkedin" | "cv" | "email",
  string | null
> = {
  github: "https://github.com/bgonzalezc",
  linkedin:
    "https://www.linkedin.com/in/benjam%C3%ADn-gonz%C3%A1lez-carrasco-08227832a/",
  cv: null,
  email: "benjamingonzalezc3@gmail.com",
};
export const contact = {
  phone: "+56 9 4544 3987",
  phoneHref: "tel:+56945443987",
};
export const projects = [
  {
    id: "01",
    title: "ATLAS",
    category: "FULL STACK / WEB PLATFORM",
    year: "WEB",
    description: "Una plataforma para conectar negocios y compradores.",
    detail:
      "Desarrollo de una plataforma web con foco en la organización de información comercial y la conexión entre negocios y sus clientes.",
    tags: ["Web development", "REST APIs", "SQL"],
    visual: "atlas",
    scope: "Plataforma web",
    challenge:
      "Conectar la oferta de negocios con las necesidades de compradores.",
  },
  {
    id: "02",
    title: "Dam Settlement Forecasting",
    category: "DATA SCIENCE / TIME SERIES",
    year: "ARIMA",
    description:
      "Series temporales para entender el comportamiento de una represa.",
    detail:
      "Análisis estadístico del asentamiento de una estructura hidroeléctrica con modelos ARIMA y diagnóstico de series temporales.",
    tags: ["R", "ARIMA", "ADF / Ljung-Box"],
    visual: "forecast",
    scope: "Modelo estadístico",
    challenge:
      "Estudiar patrones temporales y evaluar una metodología de predicción.",
  },
  {
    id: "03",
    title: "CMF Financial Dashboard",
    category: "DATA ANALYTICS / FINANCE",
    year: "DATA",
    description: "Indicadores bancarios convertidos en información explorable.",
    detail:
      "Dashboard para explorar indicadores bancarios de la CMF, combinando preparación de datos y visualización interactiva.",
    tags: ["Python", "Pandas", "Streamlit"],
    visual: "dashboard",
    scope: "Dashboard analítico",
    challenge: "Hacer legibles y comparables los indicadores financieros.",
  },
  {
    id: "04",
    title: "Digital Twin Elevator",
    category: "SIMULATION / HARDWARE",
    year: "IOT",
    description:
      "Un puente entre un sistema físico y su representación digital.",
    detail:
      "Gemelo digital de un ascensor mediante Unity, Arduino y comunicación serial, conectando software y hardware.",
    tags: ["Unity", "Arduino", "Serial"],
    visual: "elevator",
    scope: "Simulación conectada",
    challenge:
      "Mantener una representación digital vinculada al sistema físico.",
  },
  {
    id: "05",
    title: "Private Cloud / Immich",
    category: "INFRASTRUCTURE / SELF HOSTED",
    year: "OPS",
    description: "Servicios propios. Infraestructura bajo control.",
    detail:
      "Infraestructura personal para desplegar y administrar servicios con Immich, Docker, Linux y WSL.",
    tags: ["Docker", "Linux", "WSL / Immich"],
    visual: "cloud",
    scope: "Infraestructura personal",
    challenge:
      "Organizar el despliegue y la administración de servicios propios.",
  },
  {
    id: "06",
    title: "Database Systems",
    category: "DATABASES / RELATIONAL DESIGN",
    year: "SQL",
    description: "Modelar relaciones. Construir una base consistente.",
    detail:
      "Proyectos de diseño relacional, claves primarias y foráneas y consultas JOIN para estructurar y consultar información.",
    tags: ["SQL", "MySQL", "Relational modeling"],
    visual: "database",
    scope: "Diseño y consultas",
    challenge:
      "Representar relaciones y preservar la integridad de la información.",
  },
] as const;
export const stack = [
  ["01 / LANGUAGES", "Python", "SQL", "R", "C", "Julia", "JavaScript"],
  ["02 / DEVELOPMENT", "Flask", "Node.js", "REST APIs", "Git / GitHub"],
  ["03 / DATA", "Pandas", "Streamlit", "Statistical analysis", "Time series"],
  ["04 / INFRASTRUCTURE", "Linux", "Docker", "WSL", "SSH / Networks"],
];
