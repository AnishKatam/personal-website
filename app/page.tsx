import Image from "next/image";
import profilePic from "../assets/322914.jpeg";
import freakyCat from "../assets/freaky-cat-freaky-ezgif.com-resize.gif";
import ShootingStars from "./components/ShootingStars";
import ParticleNetwork from "./components/ParticleNetwork";
import Constellation from "./components/Constellation";
import ScrollHint from "./components/ScrollHint";
import AwesomeBadge from "./components/AwesomeBadge";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-x-hidden text-white">
      <ShootingStars />
      <ParticleNetwork />
      <AwesomeBadge />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden">

       

        <div className="flex flex-col md:flex-row items-center gap-14 max-w-5xl w-full">

          {/* Profile photo */}
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 blur-xl opacity-40 scale-110" />
            <div
              className="relative w-52 h-52 rounded-full overflow-hidden border-2 border-white/10"
              style={{ boxShadow: "0 0 40px 8px rgba(100,120,255,0.35), 0 0 0 1px rgba(150,170,255,0.15)" }}
            >
              <Image src={profilePic} alt="Anish Katam" fill className="object-cover" priority />
            </div>
            <div
              className="absolute w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_8px_2px_rgba(100,150,255,0.8)]"
              style={{ top: "50%", left: "50%", marginTop: "-6px", marginLeft: "-6px", animation: "orbit 6s linear infinite" }}
            />
          </div>

          {/* Name + intro */}
          <div className="flex flex-col gap-4 text-center md:text-left">
            <div>
              <p className="text-xs tracking-[0.35em] text-blue-400 uppercase mb-2" style={{ fontFamily: "var(--font-orbitron)" }}>
                Software Engineer
              </p>
              <h1
                className="text-5xl sm:text-6xl font-black leading-none tracking-wider uppercase"
                style={{
                  fontFamily: "var(--font-orbitron)",
                  background: "linear-gradient(135deg, #ffffff 0%, #aabbff 50%, #6677ff 100%)",
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
              Im just surviving.
            </p>

            <div className="flex gap-3 mt-1 justify-center md:justify-start flex-wrap">
              <a
                href="/resume/Anish_Katam_Resume.pdf"
                target="_blank"
                className="px-5 py-2 rounded-full text-sm font-semibold border border-blue-500/50 text-blue-300 hover:bg-blue-500/10 transition-colors"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                Resume
              </a>
              <a
                href="/contact"
                className="px-5 py-2 rounded-full text-sm font-semibold bg-blue-600 hover:bg-blue-500 transition-colors"
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
                className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all"
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/anishkatam/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-zinc-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10 transition-all"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <ScrollHint />
      </section>

      {/* ── SKILLS ───────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeading>Skills</SectionHeading>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-10">
            {[
              "Python", "Java", "JavaScript", "React",
              "Node.js", "HTML / CSS", "Tailwind", "SQL",
              "PHP", "JavaFX", "Git", "Photoshop",
            ].map((skill) => (
              <SkillPill key={skill}>{skill}</SkillPill>
            ))}
          </div>
        </div>
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
                  className="text-xs tracking-[0.3em] text-blue-400 uppercase mb-3"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  Let&apos;s Connect
                </p>
                <p
                  className="text-lg font-bold text-white leading-snug"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  Open to new opportunities and experiences.
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
                  boxShadow: "inset 0 0 24px rgba(100,140,255,0.10), 0 0 18px rgba(100,140,255,0.12)",
                }}
              >
                Say Hello
              </a>
            </div>

            {/* Freaky cat */}
            <div
              className="justify-self-center self-stretch rounded-xl border border-white/10 bg-white/[0.03] p-3 flex items-center justify-center w-[168px] h-[168px] md:w-[168px] md:h-auto"
              aria-hidden
            >
              <Image
                src={freakyCat}
                alt="freaky cat"
                unoptimized
                className="w-full h-full object-contain rounded-lg select-none pointer-events-none"
              />
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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-2xl font-bold tracking-[0.2em] uppercase text-white/90"
      style={{ fontFamily: "var(--font-orbitron)" }}
    >
      <span className="text-blue-400 mr-2">—</span>
      {children}
    </h2>
  );
}

function SkillPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-2 rounded-lg border border-white/10 bg-white/[0.03] text-sm text-zinc-300 text-center hover:border-blue-500/40 hover:bg-blue-500/5 transition-colors cursor-default">
      {children}
    </div>
  );
}

function ProjectCard({ title, desc, tags, href }: { title: string; desc: string; tags: string[]; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl border border-white/10 bg-white/[0.03] p-6 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all group"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors" style={{ fontFamily: "var(--font-orbitron)" }}>
          {title}
        </h3>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 transition-colors shrink-0 ml-2 mt-0.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
      </div>
      <p className="text-zinc-400 text-sm leading-relaxed mb-4">{desc}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span key={t} className="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
            {t}
          </span>
        ))}
      </div>
    </a>
  );
}
