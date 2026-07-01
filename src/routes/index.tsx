import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  X,
  ZoomIn,
} from "lucide-react";
import { projects as sourceProjects } from "@/data/projects";
import { certificates as sourceCertificates } from "@/data/certificate";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Santiago Jaimes — Ingeniero de Software Fullstack" },
      {
        name: "description",
        content:
          "Portafolio de Santiago Jaimes, ingeniero de software fullstack. Proyectos en React, Django, Node.js y arquitecturas eficientes.",
      },
      { property: "og:title", content: "Santiago Jaimes — Ingeniero de Software" },
      {
        property: "og:description",
        content: "Desarrollador fullstack convirtiendo ideas complejas en software de alto impacto.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Santiago Jaimes — Ingeniero de Software" },
    ],
  }),
  component: Index,
});

type Project = {
  id: number;
  title: string;
  role: string;
  description: string;
  stack: { name: string; icon: string }[];
  repo?: string;
  images: string[];
  tagLabel: string;
};

const projects: Project[] = sourceProjects.map((project) => ({
  id: project.id,
  title: project.title,
  role: project.role,
  description: project.description,
  stack: project.technologies,
  repo: project.url_repo,
  images: project.images,
  tagLabel: project.role.replace(/^Desarrollador\s+/i, ""),
}));

const stackGroups = [
  { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
  { label: "Backend", items: ["Node.js", "Django", "Python", "REST"] },
  { label: "Database", items: ["PostgreSQL", "Redis", "MySQL"] },
  { label: "Tools", items: ["Git", "Docker", "CI/CD", "Linux"] },
];

type Certificate = {
  id: number;
  images: string[];
};

const certificates: Certificate[] = sourceCertificates;

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <BackgroundGraph />
      <div className="relative mx-auto max-w-6xl px-6 py-12 md:py-20 space-y-32 md:space-y-40">
        <Nav />
        <Hero />
        <Projects />
        <Stack />
        <Certificates />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}

function BackgroundGraph() {
  // Static node positions in a 1000x800 viewBox; edges drawn between indices.
  const nodes: Array<[number, number]> = [
    [120, 140], [260, 90], [420, 200], [580, 110], [760, 180], [900, 100],
    [180, 320], [360, 380], [540, 320], [720, 400], [880, 320],
    [100, 520], [280, 580], [460, 540], [640, 600], [820, 540], [960, 620],
    [220, 720], [440, 760], [640, 740], [820, 720],
  ];
  const edges: Array<[number, number]> = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
    [0, 6], [1, 7], [2, 7], [3, 8], [4, 9], [5, 10],
    [6, 7], [7, 8], [8, 9], [9, 10],
    [6, 11], [7, 12], [8, 13], [9, 14], [10, 15], [10, 16],
    [11, 12], [12, 13], [13, 14], [14, 15], [15, 16],
    [11, 17], [12, 17], [13, 18], [14, 19], [15, 20], [16, 20],
    [17, 18], [18, 19], [19, 20],
  ];
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <svg
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <g stroke="currentColor" className="text-foreground/20" fill="none" strokeWidth="0.8">
          {edges.map(([a, b], i) => {
            const [x1, y1] = nodes[a];
            const [x2, y2] = nodes[b];
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                strokeDasharray="4 6"
                style={{
                  animation: `graph-dash ${10 + (i % 7)}s linear infinite`,
                }}
              />
            );
          })}
        </g>
        <g fill="currentColor" className="text-foreground/70">
          {nodes.map(([x, y], i) => (
            <g
              key={i}
              style={{
                transformOrigin: `${x}px ${y}px`,
                animation: `graph-float ${8 + (i % 5)}s ease-in-out infinite`,
                animationDelay: `${(i % 6) * 0.4}s`,
              }}
            >
              <circle
                cx={x}
                cy={y}
                r={3}
                style={{
                  animation: `graph-pulse ${4 + (i % 4)}s ease-in-out infinite`,
                  animationDelay: `${(i % 5) * 0.5}s`,
                }}
              />
            </g>
          ))}
        </g>
      </svg>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, var(--background) 85%)",
        }}
      />
    </div>
  );
}

// kept for backwards compat — currently unused
function _BackgroundGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full blur-[140px]"
        style={{ background: "var(--primary)", opacity: 0.18 }}
      />
    </div>
  );
}

function Nav() {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
      <div className="flex min-w-0 items-center gap-3 font-mono text-sm">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
          SJ
        </span>
        <span className="truncate text-muted-foreground">
          <span className="text-primary">~/</span>santiago-jaimes
          <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-primary align-middle" />
        </span>
      </div>
      <nav className="hidden items-center gap-6 font-mono text-xs uppercase tracking-widest text-muted-foreground sm:flex">
        <a href="#proyectos" className="transition-colors hover:text-primary">proyectos</a>
        <a href="#stack" className="transition-colors hover:text-primary">stack</a>
        <a href="#contacto" className="transition-colors hover:text-primary">contacto</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="flex flex-col items-center text-center gap-8 pt-8 md:pt-12">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-primary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Disponible para proyectos
        </span>

        <div className="space-y-4">
          <h1 className="text-5xl font-bold leading-[0.95] tracking-tight md:text-8xl">
            Santiago
            <br />
            <span className="text-gradient-mint">Jaimes.</span>
          </h1>
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-primary md:text-base">
            ./ingeniero-de-software
          </p>
        </div>

        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Ingeniero de Software Full-Stack con experiencia entregando soluciones de extremo a extremo para clientes,
          desde APIs REST robustas con Django y NestJS hasta interfaces modernas con React y TypeScript. 
          Especializado en automatización con IA (LLMs, n8n) e integración IoT. Orientado a transformar requerimientos
          complejos de negocio en software mantenible y de alto impacto.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="/docs/CV_Santiago_Jaimes_Ingeniero_Software.pdf"
            download="CV_Santiago_Jaimes_Ingeniero_Software.pdf"
            className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[var(--glow-mint)]"
          >
            <Download className="h-4 w-4" />
            Descargar CV
          </a>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/40 px-6 py-3.5 font-semibold backdrop-blur transition-colors hover:border-primary/60 hover:text-primary"
          >
            Contáctame
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="flex items-center justify-center gap-5 pt-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            echa un vistazo
          </span>
          <div className="h-px flex-1 max-w-[80px] bg-border" />
          <a
            href="https://github.com/SantiagoJaimesC"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/santiago-jaimes-dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
    </section>
  );
}

function Projects() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section id="proyectos" className="space-y-12">
      <SectionHeader
        eyebrow="// proyectos destacados"
        title="Construyendo software que se usa."
        subtitle="Casos reales donde lideré desarrollo end-to-end."
      />

      <div className="space-y-6">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {projects.map((project, i) => (
              <div key={project.id} className="min-w-0 flex-[0_0_100%] px-1">
                <ProjectCard project={project} index={i} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Proyecto anterior"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/40 px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-muted-foreground backdrop-blur transition-colors hover:border-primary/60 hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" /> prev
          </button>

          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Ir al proyecto ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  selected === i ? "w-10 bg-primary" : "w-5 bg-border hover:bg-muted-foreground/50"
                }`}
              />
            ))}
            <span className="ml-3">
              {String(selected + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </div>

          <button
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Siguiente proyecto"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/40 px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-muted-foreground backdrop-blur transition-colors hover:border-primary/60 hover:text-primary"
          >
            next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function ImageLightbox({
  images,
  initialIndex,
  title,
  onClose,
}: {
  images: string[];
  initialIndex: number;
  title: string;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") {
        setIndex((current) => (current - 1 + images.length) % images.length);
      }
      if (event.key === "ArrowRight") {
        setIndex((current) => (current + 1) % images.length);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [images.length, onClose]);

  const goPrev = () => setIndex((current) => (current - 1 + images.length) % images.length);
  const goNext = () => setIndex((current) => (current + 1) % images.length);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Vista ampliada — ${title}`}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-background/90 backdrop-blur-sm"
        aria-label="Cerrar vista ampliada"
      />

      <div className="relative z-10 flex w-full max-w-6xl flex-col gap-4">
        <div className="flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span className="truncate text-foreground">{title}</span>
          <span>
            {index + 1} / {images.length}
          </span>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <img
            src={images[index]}
            alt={`${title} — captura ${index + 1}`}
            className="max-h-[78vh] w-full object-contain"
          />

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Imagen anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full border border-border bg-background/80 text-muted-foreground backdrop-blur transition-all hover:border-primary/60 hover:text-primary"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Siguiente imagen"
                className="absolute right-3 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full border border-border bg-background/80 text-muted-foreground backdrop-blur transition-all hover:border-primary/60 hover:text-primary"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="absolute -top-2 right-0 grid h-10 w-10 place-items-center rounded-full border border-border bg-background/80 text-muted-foreground backdrop-blur transition-colors hover:border-primary/60 hover:text-primary md:-top-3 md:right-0"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-border bg-card/40 p-5 backdrop-blur transition-colors hover:border-primary/40 md:p-8">
      {lightboxIndex !== null && (
        <ImageLightbox
          images={project.images}
          initialIndex={lightboxIndex}
          title={project.title}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      <div className="grid gap-6 lg:grid-cols-[1.9fr_0.85fr] lg:gap-8">
        {/* Carousel */}
        <div className="space-y-3">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-2">
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex">
                {project.images.map((src, i) => (
                  <div key={i} className="relative min-w-0 flex-[0_0_100%]">
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(i)}
                      className="group/image relative block w-full cursor-zoom-in"
                      aria-label={`Ampliar captura ${i + 1} de ${project.title}`}
                    >
                      <img
                        src={src}
                        alt={`${project.title} — captura ${i + 1}`}
                        width={1280}
                        height={800}
                        loading="lazy"
                        className="aspect-[16/10] w-full bg-background/40 object-contain transition-opacity group-hover/image:opacity-90"
                      />
                      <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/75 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground opacity-0 backdrop-blur transition-opacity group-hover/image:opacity-100">
                        <ZoomIn className="h-3 w-3" />
                        ampliar
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute left-4 top-4 rounded-full border border-primary/30 bg-background/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary backdrop-blur">
              {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </div>
            <div className="absolute right-4 top-4 rounded-full border border-border bg-background/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
              {selected + 1} / {project.images.length}
            </div>

            <button
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full border border-border bg-background/70 text-muted-foreground backdrop-blur transition-all hover:border-primary/60 hover:text-primary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Siguiente"
              className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full border border-border bg-background/70 text-muted-foreground backdrop-blur transition-all hover:border-primary/60 hover:text-primary"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5">
            {project.images.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Ir a captura ${i + 1}`}
                className={`h-1 rounded-full transition-all ${
                  selected === i ? "w-8 bg-primary" : "w-4 bg-border hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-3 lg:gap-4">
          <span className="self-start rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
            {project.tagLabel}
          </span>

          <h3 className="text-xl font-bold leading-snug tracking-tight md:text-2xl">
            {project.title}
          </h3>

          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {project.role}
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>

          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-2 self-start rounded-xl border border-border bg-background/40 px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-foreground transition-all hover:border-primary/60 hover:text-primary"
            >
              <Github className="h-4 w-4" />
              Ver repositorio
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Stack row — full width, below images + meta */}
      <div className="mt-8 border-t border-border/70 pt-6">
        <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          // stack
        </div>
        <div className="flex flex-wrap gap-2.5">
          {project.stack.map((tech) => (
            <span
              key={tech.name}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-1.5 font-mono text-xs text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <img
                src={tech.icon}
                alt=""
                width={14}
                height={14}
                loading="lazy"
                className="h-3.5 w-3.5 opacity-90"
              />
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function Stack() {
  return (
    <section id="stack" className="space-y-12">
      <SectionHeader
        eyebrow="// stack tecnológico"
        title="Las herramientas que uso a diario."
        subtitle="Cubrir todo el ciclo, desde la base de datos hasta el pixel final."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stackGroups.map((group) => (
          <div
            key={group.label}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--glow-mint)]"
          >
            <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-primary">
              {`<${group.label} />`}
            </div>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                  <span className="font-mono text-primary">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return ContactImpl();
}

function CertificatesImpl() {
  return null;
}

function Certificates() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section id="certificados" className="space-y-12">
      <SectionHeader
        eyebrow="// certificaciones"
        title="Aprendizaje continuo, certificado."
        subtitle="Cursos y programas que respaldan mi stack."
      />

      <div className="space-y-6">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {certificates.map((cert, i) => (
              <div key={cert.id} className="min-w-0 flex-[0_0_100%] px-1">
                <CertificateCard cert={cert} index={i} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Certificado anterior"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/40 px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-muted-foreground backdrop-blur transition-colors hover:border-primary/60 hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" /> prev
          </button>

          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            {certificates.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Ir al certificado ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  selected === i ? "w-10 bg-primary" : "w-5 bg-border hover:bg-muted-foreground/50"
                }`}
              />
            ))}
            <span className="ml-3">
              {String(selected + 1).padStart(2, "0")} / {String(certificates.length).padStart(2, "0")}
            </span>
          </div>

          <button
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Siguiente certificado"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/40 px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-muted-foreground backdrop-blur transition-colors hover:border-primary/60 hover:text-primary"
          >
            next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function CertificateCard({ cert, index }: { cert: Certificate; index: number }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-border bg-card/40 p-5 backdrop-blur transition-all hover:border-primary/40 md:p-8">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-2">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {cert.images.map((src, i) => (
              <div key={i} className="relative min-w-0 flex-[0_0_100%]">
                <img
                  src={src}
                  alt={`Certificado ${index + 1} — imagen ${i + 1}`}
                  width={1280}
                  height={900}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-contain bg-background/50"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute left-4 top-4 rounded-full border border-primary/30 bg-background/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary backdrop-blur">
          cert_{String(index + 1).padStart(2, "0")}
        </div>
        {cert.images.length > 1 && (
          <>
            <div className="absolute right-4 top-4 rounded-full border border-border bg-background/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
              {selected + 1} / {cert.images.length}
            </div>
            <button
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full border border-border bg-background/70 text-muted-foreground backdrop-blur transition-all hover:border-primary/60 hover:text-primary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Siguiente"
              className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full border border-border bg-background/70 text-muted-foreground backdrop-blur transition-all hover:border-primary/60 hover:text-primary"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {cert.images.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {cert.images.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Ir a imagen ${i + 1}`}
              className={`h-1 rounded-full transition-all ${
                selected === i ? "w-8 bg-primary" : "w-4 bg-border hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      )}
    </article>
  );
}

function ContactImpl() {
  const email = "santiagof11.0@outlook.com"
  const subject = encodeURIComponent('Hola desde tu portafolio');
  const body = encodeURIComponent('¡Hola! Me gustaría ponerme en contacto contigo.');

  return (
    <section id="contacto" className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card/40 p-8 backdrop-blur md:p-16">
      <div
        className="absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "var(--primary)", opacity: 0.25 }}
      />
      <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
            <Sparkles className="h-3 w-3" />
            // hablemos
          </span>
          <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            ¿Tienes una idea?{" "}
            <span className="text-gradient-mint">Construyámosla.</span>
          </h2>
          <p className="max-w-lg text-muted-foreground">
            Siempre abierto a discutir nuevas arquitecturas, colaboraciones técnicas y proyectos
            con propósito.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <a
            href={`mailto:${email}?subject=${subject}&body=${body}`}
            className="group inline-flex items-center justify-between gap-3 rounded-xl bg-primary px-5 py-4 font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[var(--glow-mint)]"
          >
            <span className="inline-flex items-center gap-3">
              <Mail className="h-5 w-5" />
              Enviar un mensaje
            </span>
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:rotate-45" />
          </a>
          <a
            href="https://www.linkedin.com/in/santiago-jaimes-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between gap-3 rounded-xl border border-border bg-background/40 px-5 py-4 font-semibold transition-colors hover:border-primary/60 hover:text-primary"
          >
            <span className="inline-flex items-center gap-3">
              <Linkedin className="h-5 w-5" />
              Conectar en LinkedIn
            </span>
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-t border-border pt-8 font-mono text-xs text-muted-foreground">
      <div className="truncate">
        © {new Date().getFullYear()} Santiago Jaimes — Hecho con código & café.
      </div>
      <div className="flex shrink-0 items-center gap-4">
        <a href="https://github.com/SantiagoJaimesC" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/santiago-jaimes-dev" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-[1fr_auto]">
      <div className="space-y-3">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary">{eyebrow}</div>
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">{title}</h2>
      </div>
      <p className="font-mono text-sm text-muted-foreground md:text-right">{subtitle}</p>
    </div>
  );
}
