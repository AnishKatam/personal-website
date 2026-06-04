import Image from "next/image";
import profilePic from "../assets/322914.jpeg";
import ShootingStars from "./components/ShootingStars";
import ParticleStrings from "./components/ParticleStrings";
import ScrollHint from "./components/ScrollHint";
import AwesomeBadge from "./components/AwesomeBadge";
/*--- Icon SVGs ---*/
import CIcon from "../assets/SVGs/c.svg";
import AWSIcon from "../assets/SVGs/aws.svg";
import DockerIcon from "../assets/SVGs/docker-icon.svg";
import NodeJSIcon from "../assets/SVGs/nodejs.svg";
import CICDIcon from "../assets/SVGs/github-actions.svg";
import NumpyIcon from "../assets/SVGs/numpy.svg";
import TableauIcon from "../assets/SVGs/tableau.svg";
import XamppIcon from "../assets/SVGs/xampp.svg";
import MongoDBIcon from "../assets/SVGs/mongodb-icon.svg";
export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-x-hidden text-white">
      <ShootingStars />
      <ParticleStrings />
      <AwesomeBadge />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">

        {/* Centered profile */}
        <div className="flex flex-col md:flex-row items-center gap-10 max-w-3xl w-full">
          {/* Profile photo */}
          <div className="relative shrink-0 w-44 h-44">
            
            <div
              className="relative w-44 h-44 rounded-full overflow-hidden border-2 border-white/10"
              style={{
                boxShadow:
                  "0 0 40px 8px rgba(200,200,210,0.18), 0 0 0 1px rgba(220,220,230,0.10)",
              }}
            >
              <Image src={profilePic} alt="Anish Katam" fill className="object-cover" priority />
            </div>
            <div
              className="absolute w-2.5 h-2.5 rounded-full bg-white/90 shadow-[0_0_8px_2px_rgba(220,220,230,0.7)]"
              style={{
                top: "50%",
                left: "50%",
                marginTop: "-5px",
                marginLeft: "-5px",
                animation: "orbit 6s linear infinite",
              }}
            />
          </div>

          {/* Name + intro */}
          <div className="flex flex-col gap-4 text-center md:text-left">
            <div>
              <p
                className="text-xs tracking-[0.35em] uppercase mb-2"
                style={{ fontFamily: "var(--font-orbitron)", color: "#B0B7C6" }}
              >
                Software Engineer
              </p>
              <h1
                className="text-5xl sm:text-6xl font-black leading-none tracking-wider uppercase"
                style={{
                  fontFamily: "var(--font-orbitron)",
                  background: "linear-gradient(135deg, #ffffff 0%, #B0B7C6 55%, #3A4154 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Anish
                <br />
                Katam
              </h1>
            </div>

            <p className="text-zinc-400 text-base max-w-md leading-relaxed">
              CS & Business Information Systems @ University of Rochester.
            </p>

            <div className="flex gap-3 mt-1 justify-center md:justify-start flex-wrap">
              <a
                href="/resume/Anish_Katam_Resume.pdf"
                target="_blank"
                className="px-5 py-2 rounded-full text-sm font-semibold border border-[#B0B7C6]/35 text-[#B0B7C6] hover:bg-white/5 transition-colors"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                Resume
              </a>
              <a
                href="mailto:anishhkatam@gmail.com"
                className="px-5 py-2 rounded-full text-sm font-semibold bg-[#3A4154] hover:bg-[#4A5168] text-white transition-colors"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                Contact
              </a>
            </div>

            {/* Social icons */}
            <div className="flex gap-3 justify-center md:justify-start mt-1">
              <a
                href="https://github.com/AnishKatam"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all"
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/anishkatam/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-zinc-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10 transition-all"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      
        {/* Technical Skills — floating bottom-left (desktop only) */}
        <div className="hidden lg:block absolute bottom-20 left-8 w-[260px] z-20">
          <TechnicalSkillsCard />
        </div>

        {/* Stacked fallback (mobile / smaller screens) */}
        <div className="lg:hidden absolute bottom-8 left-0 right-0 px-6 flex flex-col gap-4">
          <TechnicalSkillsCard compact />
        </div>

        <ScrollHint />
      </section>

   

      {/* ── PROJECTS ─────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeading>Projects</SectionHeading>
          <div className="grid sm:grid-cols-2 gap-6 mt-10">
            <ProjectCard
              title="DandyHacks 2025"
              desc="IT Team Lead for University of Rochester's 13th annual 42-hour hackathon. Built and maintained the official event site used by 200+ attendees across 3 competition tracks."
              tags={["React", "Tailwind", "VanillaJS"]}
              href="https://dandyhacks.net/"
            />
            <ProjectCard
              title="Poker Card Game"
              desc="Full-featured poker game with multiplayer support, a live scoreboard system, and complete card artwork. Currency system through greedy algorithm."
              tags={["Java", "JavaFX", "Algorithms"]}
              href="https://github.com/AnishKatam/Poker"
            />
            <ProjectCard
              title="AI Schedule Builder"
              desc="Web scraper that parsed University of Rochester course data, fed it through AI analysis, and generated personalized semester schedules for students."
              tags={["Python", "AI", "Web Scraping"]}
              href="https://github.com/AnishKatam/DandyHacks"
            />
          </div>
        </div>
      </section>

      {/* ── CONTACT + DISCORD ────────────────────────────────── */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeading>Contact</SectionHeading>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-[1fr_auto_18rem] gap-6 items-stretch">
            <div
              className="rounded-xl p-5 flex flex-col justify-between"
              style={{
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.03)",
                minHeight: "168px",
              }}
            >
              <div>
                <p
                  className="text-xs tracking-[0.3em] uppercase mb-3"
                  style={{ fontFamily: "var(--font-orbitron)", color: "#B0B7C6" }}
                >
                  Let&apos;s Connect
                </p>
                <p
                  className="text-lg font-bold text-white leading-snug"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  Open to new opportunities.
                </p>
                <p className="text-zinc-500 text-sm mt-2">Don&apos;t be a stranger!</p>
              </div>
              <a
                href="/contact"
                className="inline-block mt-5 self-start px-7 py-2.5 rounded-full font-semibold tracking-wider text-sm text-white transition-all hover:scale-[1.03]"
                style={{
                  fontFamily: "var(--font-orbitron)",
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  boxShadow: "inset 0 0 24px rgba(176,183,198,0.10), 0 0 18px rgba(176,183,198,0.10)",
                }}
              >
                Say Hello
              </a>
            </div>

            {/* Discord card */}
            <a
              href="https://discord.gg/M6FEvgukZb"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-[#5865F2]/40 hover:bg-[#5865F2]/5 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/10" style={{ background: "#000" }}>
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <radialGradient id="wl-ring" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="black" />
                        <stop offset="52%" stopColor="black" />
                        <stop offset="68%" stopColor="white" stopOpacity="0.95" />
                        <stop offset="78%" stopColor="white" stopOpacity="0.5" />
                        <stop offset="90%" stopColor="white" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="black" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <rect width="100" height="100" fill="black" />
                    <circle cx="50" cy="50" r="50" fill="url(#wl-ring)" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-white text-sm" style={{ fontFamily: "var(--font-orbitron)" }}>
                    White Light
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">Discord Server</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                  <span className="text-xs text-zinc-400">8 Online</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-zinc-500 inline-block" />
                  <span className="text-xs text-zinc-500">25 Members</span>
                </div>
              </div>

              <span className="text-xs text-[#5865F2] font-semibold group-hover:text-[#7289da] transition-colors">
                Join Server →
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Cards ─────────────────────────────────────────── */

function HoloCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl p-[1px] ${className}`}
      style={{
        background:
          "linear-gradient(135deg, rgba(103,232,249,0.45) 0%, rgba(34,211,238,0.08) 40%, rgba(255,255,255,0.04) 60%, rgba(20,184,166,0.35) 100%)",
      }}
    >
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,18,28,0.85) 0%, rgba(8,12,22,0.85) 100%)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.5)",
        }}
      >
        {/* Corner brackets */}
        {[
          { top: 8, left: 8, borderTop: 1, borderLeft: 1 },
          { top: 8, right: 8, borderTop: 1, borderRight: 1 },
          { bottom: 8, left: 8, borderBottom: 1, borderLeft: 1 },
          { bottom: 8, right: 8, borderBottom: 1, borderRight: 1 },
        ].map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 10,
              height: 10,
              borderColor: "rgba(103,232,249,0.55)",
              borderStyle: "solid",
              borderWidth: 0,
              ...p,
            }}
          />
        ))}
        {children}
      </div>
    </div>
  );
}

function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] tracking-[0.32em] uppercase text-cyan-300/90"
      style={{
        fontFamily: "var(--font-orbitron)",
        textShadow: "0 0 8px rgba(34,211,238,0.4)",
      }}
    >
      {children}
    </p>
  );
}

function TechnicalSkillsCard({ compact = false }: { compact?: boolean }) {
  const skills = [
    { label: "C", icon: CIcon },
    { label: "AWS", icon: AWSIcon },
    { label: "Docker", icon: DockerIcon },
    { label: "Node.js", icon: NodeJSIcon },
    { label: "CI/CD", icon: CICDIcon },
    { label: "NumPy", icon: NumpyIcon },
    { label: "Tableau", icon: TableauIcon },
    { label: "XAMPP", icon: XamppIcon },
    { label: "MongoDB", icon: MongoDBIcon },
  ];
  return (
    <HoloCard>
      <div className={compact ? "p-3" : "p-4"}>
        <CardLabel>Technical Skills</CardLabel>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {skills.map((s) => {
            const IconComponent = s.icon;
            return (
              <div
                key={s.label}
                className="aspect-square rounded-lg border border-cyan-400/15 flex items-center justify-center text-cyan-100/85 hover:text-cyan-100 hover:border-cyan-300/40 hover:bg-cyan-400/5 transition-all"
                style={{ background: "rgba(8,18,26,0.55)" }}
                title={s.label}
              >
                <IconComponent />
              </div>
            );
          })}
        </div>
      </div>
    </HoloCard>
  );
}

/* ── Reusable sections ──────────────────────────────────────── */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-2xl font-bold tracking-[0.2em] uppercase text-white/90"
      style={{ fontFamily: "var(--font-orbitron)" }}
    >
      <span className="text-[#B0B7C6] mr-2">—</span>
      {children}
    </h2>
  );
}

function ProjectCard({ title, desc, tags, href }: { title: string; desc: string; tags: string[]; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl border border-white/10 bg-white/[0.03] p-6 hover:border-[#B0B7C6]/30 hover:bg-white/5 transition-all group"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-base font-bold text-white group-hover:text-[#B0B7C6] transition-colors" style={{ fontFamily: "var(--font-orbitron)" }}>
          {title}
        </h3>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-zinc-600 group-hover:text-[#B0B7C6] transition-colors shrink-0 ml-2 mt-0.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
      </div>
      <p className="text-zinc-400 text-sm leading-relaxed mb-4">{desc}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span key={t} className="text-xs px-2 py-1 rounded bg-[#3A4154]/40 text-[#B0B7C6] border border-[#3A4154]">
            {t}
          </span>
        ))}
      </div>
    </a>
  );
}
