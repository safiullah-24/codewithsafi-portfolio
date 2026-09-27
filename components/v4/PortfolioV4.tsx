"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Command as CommandIcon,
  Copy,
  Menu,
  Pause,
  Play,
  Plus,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { profile, projects, journey, type Project } from "@/data/portfolio";
import { CaseStudy, GithubActivity } from "@/components/portfolio/Portfolio";
import {
  TaylorPlot,
  RepoFlow,
  MeetingDiagram,
} from "@/components/portfolio/Visuals";
import {
  Orbit,
  Capabilities,
  PolyInstrument,
  DataPipeline,
} from "./Instruments";

const chapters = [
  ["capabilities", "Capabilities"],
  ["poly", "PolyBridge"],
  ["work", "Work"],
  ["journey", "Journey"],
  ["contact", "Contact"],
];
const Ext = ({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={className}
  >
    {children}
  </a>
);
const Label = ({ n, children }: { n: string; children: React.ReactNode }) => (
  <div className="v4-label v4-meta">
    <span>{n} /</span>
    <span>{children}</span>
  </div>
);
function ProjectText({
  p,
  onOpen,
}: {
  p: Project;
  onOpen: (p: Project) => void;
}) {
  return (
    <div className="v4-project-text">
      <span className="v4-meta">{p.category}</span>
      <h3>{p.name}</h3>
      <p className="v4-project-headline">{p.headline}</p>
      <p>{p.description}</p>
      <div className="v4-tags">
        {p.stack.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
      <button className="v4-link" onClick={() => onOpen(p)} data-cursor="READ">
        Explore the case study <ArrowUpRight size={19} />
      </button>
      <span className="v4-meta v4-project-role">{p.role}</span>
    </div>
  );
}

export default function PortfolioV4() {
  const [motion, setMotion] = useState(false);
  const [ready, setReady] = useState(false);
  const [enhanced, setEnhanced] = useState(false);
  const [menu, setMenu] = useState(false);
  const [command, setCommand] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [chapter, setChapter] = useState("home");
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState("");
  const hero = useRef<HTMLElement>(null);
  const cursor = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const q = matchMedia("(prefers-reduced-motion: reduce)");
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("safi-v4-motion");
    } catch {}
    const allow = !q.matches && saved !== "reduced";
    setMotion(allow);
    setEnhanced(true);
    const timer = setTimeout(() => setReady(true), allow ? 700 : 0);
    const change = () => setMotion(!q.matches);
    q.addEventListener("change", change);
    return () => {
      clearTimeout(timer);
      q.removeEventListener("change", change);
    };
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = motion ? "full" : "reduced";
    return () => {
      delete document.documentElement.dataset.motion;
    };
  }, [motion]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.06, rootMargin: "0px 0px -22px 0px" },
    );
    document
      .querySelectorAll(".v4-reveal,.reveal")
      .forEach((el) => io.observe(el));
    const sections = [
      ...document.querySelectorAll<HTMLElement>(".v4-root main>section[id]"),
    ];
    let frame = 0;
    const scroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const progress =
          window.scrollY /
          Math.max(1, document.documentElement.scrollHeight - innerHeight);
        document.documentElement.style.setProperty(
          "--scroll-progress",
          String(progress),
        );
        const current = [...sections]
          .reverse()
          .find((s) => s.getBoundingClientRect().top < innerHeight * 0.4);
        setChapter(current?.id || "home");
        const rect = hero.current?.getBoundingClientRect();
        if (rect && rect.bottom > 0)
          hero.current?.style.setProperty(
            "--hero-drift",
            `${Math.min(100, window.scrollY * 0.12)}px`,
          );
        frame = 0;
      });
    };
    window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", scroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    if (!motion || !matchMedia("(pointer:fine)").matches) return;
    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = hero.current?.getBoundingClientRect();
        if (r && r.bottom > 0) {
          hero.current?.style.setProperty(
            "--mx",
            `${(e.clientX / innerWidth - 0.5) * 13}px`,
          );
          hero.current?.style.setProperty(
            "--my",
            `${(e.clientY / innerHeight - 0.5) * 9}px`,
          );
        }
        if (cursor.current) {
          const target = (e.target as HTMLElement).closest("[data-cursor]");
          cursor.current.dataset.show = target ? "true" : "false";
          cursor.current.style.transform = `translate3d(${e.clientX + 18}px,${e.clientY + 18}px,0)`;
        }
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, [motion]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommand((v) => !v);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2600);
    return () => clearTimeout(t);
  }, [toast]);
  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setToast("Email copied.");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setToast(profile.email);
    }
  }, []);
  const toggleMotion = () => {
    const next = !motion;
    setMotion(next);
    try {
      localStorage.setItem("safi-v4-motion", next ? "full" : "reduced");
    } catch {}
  };
  const go = (id: string) => {
    setCommand(false);
    setMenu(false);
    requestAnimationFrame(() =>
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: motion ? "smooth" : "instant" }),
    );
  };
  return (
    <div className="v4-root" data-enhanced={enhanced} data-ready={ready}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="scroll-progress" aria-hidden="true" />
      {enhanced && !ready && (
        <div className="v4-loader" aria-hidden="true">
          <img
            src="/brand/codewithsafi-mark.webp"
            width="76"
            height="76"
            alt=""
          />
          <span className="v4-meta">CODEWITHSAFI / CONNECTING IDEAS</span>
          <i />
        </div>
      )}
      <span className="v4-cursor v4-meta" ref={cursor} aria-hidden="true">
        READ ↗
      </span>
      <header className="v4-header">
        <a
          href="#home"
          className="v4-brand"
          aria-label="CodeWithSafi — Safi Ullah home"
        >
          <img
            src="/brand/codewithsafi-mark.webp"
            alt=""
            width="40"
            height="40"
          />
          <span>CodeWithSafi</span>
        </a>
        <nav aria-label="Main navigation">
          {chapters.slice(0, 4).map(([id, label]) => (
            <a
              key={id}
              href={"#" + id}
              aria-current={chapter === id ? "location" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="v4-header-actions">
          <button
            className="v4-command-trigger"
            aria-label="Open command palette"
            onClick={() => setCommand(true)}
          >
            <CommandIcon size={15} />
            <span>K</span>
          </button>
          <a className="v4-header-contact" href="#contact">
            Let’s talk <ArrowUpRight size={17} />
          </a>
          <button
            className="v4-menu-trigger"
            onClick={() => setMenu(true)}
            aria-label="Open navigation"
          >
            <Menu size={23} />
          </button>
        </div>
      </header>
      <Dialog open={menu} onOpenChange={setMenu}>
        <DialogContent className="v4-menu-dialog">
          <DialogTitle>Explore CodeWithSafi</DialogTitle>
          <DialogDescription>
            Follow a thread through the work.
          </DialogDescription>
          <nav aria-label="Mobile navigation">
            {[
              ["home", "Home"],
              ...chapters,
              ["experience", "Experience"],
              ["open-source", "GitHub"],
            ].map(([id, label], i) => (
              <a key={id} href={"#" + id} onClick={() => go(id)}>
                <span className="v4-meta">0{i}</span>
                {label}
                <ArrowUpRight size={23} />
              </a>
            ))}
          </nav>
        </DialogContent>
      </Dialog>
      <main id="main">
        <section id="home" className="v4-hero" ref={hero}>
          <div className="v4-hero-top v4-meta">
            <span>AN ENGINEER IN CONTINUOUS EVOLUTION</span>
            <span>
              LAHORE, PAKISTAN <i>31.52° N / 74.35° E</i>
            </span>
          </div>
          <div className="v4-hero-layout">
            <div className="v4-hero-copy">
              <div className="v4-hero-kicker v4-meta">
                <span />
                AI × SYSTEMS × WEB
              </div>
              <h1>
                <span>
                  <b>Safi</b>
                </span>
                <span>
                  <b>
                    Ullah<span className="name-period">.</span>
                  </b>
                </span>
              </h1>
              <div className="v4-hero-role">
                <p>Software Engineer</p>
                <p>Computer Science Student</p>
              </div>
              <p className="v4-hero-note">
                I connect ideas across interfaces,
                <br /> intelligence, and the systems underneath.
              </p>
              <a className="v4-round-link" href="#work">
                <span>
                  <ArrowDown size={21} />
                </span>
                Enter the work
              </a>
            </div>
            <figure className="v4-hero-figure">
              <Orbit />
              <div className="v4-portrait-rails" aria-hidden="true">
                <span />
                <span />
                <i />
                <i />
              </div>
              <div className="v4-portrait">
                <img
                  src="/safi-portrait.webp"
                  alt="Safi Ullah, software engineer and computer science student"
                  width="1194"
                  height="1317"
                  fetchPriority="high"
                />
                <div className="v4-portrait-light" />
              </div>
              <span className="v4-portrait-side v4-meta">
                THE HUMAN BEHIND THE SYSTEMS
              </span>
              <figcaption>
                <span className="v4-meta">SAFI ULLAH / CODEWITHSAFI</span>
                <span className="v4-meta">
                  ALWAYS LEARNING. ALWAYS BUILDING.
                </span>
              </figcaption>
            </figure>
          </div>
          <div className="v4-hero-bottom">
            <span className="v4-meta v4-hero-edition">
              PERSONAL PORTFOLIO
              <br /> <strong>EXPERIMENT / 04</strong>
            </span>
            <a className="v4-poly-signature" href="#poly">
              <span className="signature-mark" aria-hidden="true">
                P<span>↗</span>
              </span>
              <span>
                <small className="v4-meta">ORIGINATED & BUILDING</small>
                <strong>
                  PolyBridge <span>+</span> Poly
                </strong>
              </span>
              <span className="signature-note">
                A new conversation
                <br /> between languages.
              </span>
              <ArrowUpRight size={24} />
            </a>
            <a href="#capabilities" className="v4-hero-scroll v4-meta">
              SCROLL TO CONNECT
              <ArrowDown size={18} />
            </a>
          </div>
        </section>
        <section id="about" className="v4-about v4-shell">
          <Label n="01">THE QUESTION THAT CONNECTS IT ALL</Label>
          <div className="v4-about-layout v4-reveal">
            <h2>
              What happens
              <br /> when you connect
              <br /> <span>the unfamiliar?</span>
            </h2>
            <div>
              <p>
                I’m Safi, a software engineer and computer science student in
                Lahore. I like the point where a difficult idea becomes
                something you can interact with.
              </p>
              <p>
                That curiosity takes me from visualizing mathematics to
                real-time systems, AI workflows, and the space between
                programming languages.
              </p>
              <a className="v4-link" href="/resume">
                The résumé version <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
          <div className="v4-principle-line v4-meta">
            <span>UNDERSTAND THE PROBLEM</span>
            <Plus size={14} />
            <span>MAKE THE IDEA WORK</span>
            <Plus size={14} />
            <span>KEEP THE QUESTION OPEN</span>
          </div>
        </section>
        <section id="capabilities" className="v4-capabilities v4-shell">
          <Label n="02">ENGINEERING CAPABILITIES</Label>
          <div className="v4-section-intro v4-reveal">
            <h2>
              The tools change.
              <br /> <span>The thinking connects.</span>
            </h2>
            <p>
              Languages, interfaces, systems, and intelligence.
              <br /> Here’s what I use, where I use it,
              <br /> and what I’m exploring next.
            </p>
          </div>
          <Capabilities onOpen={setSelected} />
        </section>
        <section id="poly" className="v4-poly">
          <div className="v4-shell">
            <Label n="03">SIGNATURE INITIATIVE / ORIGINAL R&D</Label>
            <div className="v4-poly-title v4-reveal">
              <div>
                <span className="v4-meta">CONCEIVED BY SAFI ULLAH</span>
                <h2>
                  PolyBridge<span>+ Poly</span>
                </h2>
              </div>
              <div className="v4-research-status">
                <span className="status-line" />
                <span>
                  Architecture
                  <br /> & prototyping
                </span>
              </div>
            </div>
            <div className="v4-poly-intro v4-reveal">
              <p className="v4-poly-thesis">
                The next boundary
                <br /> I want to question:
                <br /> <em>language itself.</em>
              </p>
              <div>
                <p>
                  I conceived <strong>PolyBridge</strong> and the{" "}
                  <strong>Poly</strong> language direction to explore how
                  different programming languages could work together in one
                  source.
                </p>
                <p>
                  Poly is the proposed source format. PolyBridge is the system
                  around it: adapters, shared understanding, and coordinated
                  execution. I’m developing the architecture and prototypes with
                  my team.
                </p>
                <a
                  className="v4-link"
                  href={
                    "mailto:" + profile.email + "?subject=PolyBridge%20research"
                  }
                >
                  Discuss the research <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
            <div className="v4-reveal">
              <PolyInstrument />
            </div>
            <div className="v4-poly-footnote">
              <span className="v4-meta">
                A RESEARCH DIRECTION, STILL TAKING SHAPE.
              </span>
              <p>
                Syntax, runtime choices, type mapping, and isolation are open
                design questions. The goal is a small, testable prototype before
                a wider language ecosystem.
              </p>
            </div>
          </div>
        </section>
        <section id="work" className="v4-work v4-shell">
          <Label n="04">SELECTED WORK / OPEN THE SYSTEM</Label>
          <div className="v4-section-intro v4-reveal">
            <h2>
              Ideas, made
              <br /> <span>inspectable.</span>
            </h2>
            <p>
              Explore the interaction.
              <br /> Then follow it into the code.
            </p>
          </div>
          <article className="v4-project v4-calculus v4-reveal">
            <div className="v4-project-number v4-meta">
              01 / MATHEMATICAL INTUITION
            </div>
            <div className="v4-project-layout">
              <ProjectText p={projects[0]} onOpen={setSelected} />
              <div className="v4-project-demo">
                <TaylorPlot />
              </div>
            </div>
          </article>
          <article className="v4-project v4-repo v4-reveal">
            <div className="v4-project-number v4-meta">
              02 / INTENT → CONTEXT → CHANGE
            </div>
            <div className="v4-project-layout">
              <ProjectText p={projects[1]} onOpen={setSelected} />
              <div className="v4-project-demo">
                <RepoFlow />
              </div>
            </div>
          </article>
          <article className="v4-project v4-meet v4-reveal">
            <div className="v4-project-number v4-meta">
              03 / CONNECTION, MADE VISIBLE
            </div>
            <div className="v4-project-layout">
              <ProjectText p={projects[2]} onOpen={setSelected} />
              <div className="v4-project-demo">
                <MeetingDiagram />
              </div>
            </div>
          </article>
          <div className="v4-research-work v4-reveal">
            <div className="v4-ml-work">
              <DataPipeline />
              <div>
                <span className="v4-meta">04 / ML INTERNSHIP WORK</span>
                <h3>FlyRank ML Lab</h3>
                <p>
                  Search-intelligence experiments grounded in notebooks, task
                  framing, and explicit data contracts.
                </p>
                <button
                  className="v4-link"
                  onClick={() => setSelected(projects[3])}
                >
                  Inside the research <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
            <button
              className="v4-fitness-work"
              onClick={() => setSelected(projects[4])}
              data-cursor="READ"
            >
              <span className="v4-meta">05 / COLLABORATIVE EXPLORATION</span>
              <h3>AI Fitness Trainer</h3>
              <p>
                Profiles → application logic → recommendations.
                <br /> An exploration of context-aware Python applications.
              </p>
              <span className="v4-meta">FLASK / SQLITE / SQLALCHEMY</span>
              <ArrowUpRight size={24} />
            </button>
          </div>
        </section>
        <section id="experience" className="v4-experience v4-shell">
          <Label n="05">BUILDING WITH OTHERS</Label>
          <div className="v4-experience-layout">
            <h2 className="v4-reveal">
              One engineer.
              <br /> <span>Shared progress.</span>
            </h2>
            <div className="v4-experience-list">
              {[
                {
                  year: "2026",
                  name: "QuantumLogicsLabs",
                  role: "Web engineering intern · Open-source collaborator",
                  text: "Interactive calculus tools, repository intelligence, and collaboration across frontend and backend work. Contributed code, reviewed changes, and took on team-captain responsibilities.",
                  url: "https://github.com/QuantumLogicsLabs/CalculusRuntime-Frontend/commits/main/?author=safiullah-24",
                  link: "Contribution history",
                },
                {
                  year: "2026",
                  name: "FlyRank",
                  role: "Machine learning internship",
                  text: "Search-intelligence data through notebooks, research questions, task framing, and data contracts. Learning to support each modeling decision with evidence.",
                  url: projects[3].repository,
                  link: "Explore the lab",
                },
                {
                  year: "ONGOING",
                  name: "Independent & client work",
                  role: "Web development · Product thinking",
                  text: "Full-stack projects, storefront experiences, product pages, and responsive interfaces. Connecting implementation decisions to how people actually use a product.",
                  url: "",
                  link: "",
                },
              ].map((e) => (
                <article key={e.name} className="v4-reveal">
                  <span className="v4-meta">{e.year}</span>
                  <div>
                    <h3>{e.name}</h3>
                    <span className="experience-role">{e.role}</span>
                    <p>{e.text}</p>
                    {e.url && (
                      <Ext href={e.url} className="v4-link">
                        {e.link}
                        <ArrowUpRight size={16} />
                      </Ext>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="journey" className="v4-journey v4-shell">
          <Label n="06">AN EXPANDING PRACTICE</Label>
          <div className="v4-section-intro v4-reveal">
            <h2>
              Learning is
              <br /> <span>never a straight line.</span>
            </h2>
            <p>
              The next thing I learn changes
              <br /> how I understand the last.
            </p>
          </div>
          <Accordion
            type="single"
            collapsible
            defaultValue="Foundations"
            className="v4-journey-list v4-reveal"
          >
            {journey.map((j, i) => (
              <AccordionItem key={j.name} value={j.name}>
                <AccordionTrigger>
                  <span className="v4-meta">0{i + 1}</span>
                  <span>{j.name}</span>
                  <small>{j.word}</small>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="journey-content-v4">
                    <span aria-hidden="true">0{i + 1}</span>
                    <div>
                      <h3>{j.word}</h3>
                      <p>{j.text}</p>
                      <div className="v4-tags">
                        {j.tags.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
        <section id="open-source" className="v4-open-source v4-shell">
          <Label n="07">OUT IN THE OPEN</Label>
          <div className="v4-section-intro v4-reveal">
            <h2>
              A public record
              <br /> <span>of figuring it out.</span>
            </h2>
            <p>
              Contributions, reviews, and shared context.
              <br /> The work continues between commits.
            </p>
          </div>
          <GithubActivity />
        </section>
        <section id="contact" className="v4-contact">
          <div className="v4-shell">
            <Label n="08">THE NEXT CONNECTION</Label>
            <div className="v4-contact-main v4-reveal">
              <span className="v4-meta">
                PROJECTS / INTERNSHIPS / RESEARCH / A GOOD CONVERSATION
              </span>
              <h2>
                What’s your next
                <br /> <span>hard question?</span>
              </h2>
              <a href={"mailto:" + profile.email} className="v4-email">
                {profile.email}
                <ArrowUpRight />
              </a>
              <button onClick={copy} className="v4-copy">
                {copied ? <Check size={16} /> : <Copy size={16} />}{" "}
                {copied ? "Copied" : "Copy email"}
              </button>
            </div>
            <div className="v4-contact-links">
              <Ext href={profile.github}>
                GitHub <ArrowUpRight size={18} />
              </Ext>
              <Ext href={profile.linkedin}>
                LinkedIn <ArrowUpRight size={18} />
              </Ext>
              <a href="/resume">
                Résumé <ArrowUpRight size={18} />
              </a>
              <Ext href={profile.leetcode}>
                LeetCode <ArrowUpRight size={18} />
              </Ext>
            </div>
            <div className="v4-personal-note">
              <p>
                Explaining technology through CodeWithSafi.
                <br /> Finding patterns in unfamiliar systems.
                <br /> Practicing consistency—in code and in the gym.
              </p>
              <span className="v4-meta">CURIOUS BY DEFAULT.</span>
            </div>
            <footer className="v4-footer">
              <a href="#home" className="v4-brand">
                <img
                  src="/brand/codewithsafi-mark.webp"
                  width="40"
                  height="40"
                  alt=""
                />
                <span>CodeWithSafi</span>
              </a>
              <span className="v4-meta">
                © 2026 SAFI ULLAH
                <br /> LAHORE, PAKISTAN
              </span>
              <button
                className="v4-motion v4-meta"
                onClick={toggleMotion}
                aria-pressed={!motion}
              >
                {motion ? <Pause size={14} /> : <Play size={14} />} MOTION{" "}
                {motion ? "ON" : "REDUCED"}
              </button>
              <a href="#home" className="v4-meta v4-back">
                BACK TO TOP <ArrowUpRight size={15} />
              </a>
            </footer>
          </div>
        </section>
      </main>
      <CaseStudy project={selected} onClose={() => setSelected(null)} />
      <CommandDialog
        open={command}
        onOpenChange={setCommand}
        title="Explore CodeWithSafi"
        description="Search chapters, projects, and actions."
        className="portfolio-command"
      >
        <div className="command-brand">
          <img
            src="/brand/codewithsafi-mark.webp"
            width="26"
            height="26"
            alt=""
          />
          <span>CodeWithSafi</span>
        </div>
        <CommandInput placeholder="Follow a thread…" />
        <CommandList>
          <CommandEmpty>No matching thread.</CommandEmpty>
          <CommandGroup heading="EXPLORE">
            {[
              ...chapters,
              ["experience", "Experience"],
              ["open-source", "GitHub activity"],
            ].map(([id, label]) => (
              <CommandItem key={id} onSelect={() => go(id)}>
                {label}
                <ArrowUpRight size={15} />
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="CASE STUDIES">
            {projects.map((p) => (
              <CommandItem
                key={p.id}
                onSelect={() => {
                  setCommand(false);
                  setSelected(p);
                }}
              >
                {p.name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="QUICK ACTIONS">
            <CommandItem
              onSelect={() => {
                copy();
                setCommand(false);
              }}
            >
              Copy email
            </CommandItem>
            <CommandItem
              onSelect={() => {
                toggleMotion();
                setCommand(false);
              }}
            >
              {motion ? "Reduce motion" : "Enable motion"}
            </CommandItem>
            <CommandItem
              onSelect={() => {
                location.href = "/resume";
              }}
            >
              View résumé
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      <div className={"toast mono " + (toast ? "show" : "")} role="status">
        {toast}
      </div>
    </div>
  );
}
