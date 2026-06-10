import Image from "next/image";
import profilePic from "../assets/322914.jpeg";
import Backdrop from "./components/Backdrop";
import AwesomeBadge from "./components/AwesomeBadge";
import Reveal from "./components/Reveal";
import DockNav from "./components/DockNav";
import DiscordActivity from "./components/DiscordActivity";
import WhiteLight from "./components/WhiteLight";
import FloatingSkills, { SkillsCard } from "./components/SkillsGrid";
import Stats from "./components/Stats";
import ParticleNetwork from "./components/ParticleNetwork";
import BackgroundMusic from "./components/BackgroundMusic";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-x-hidden text-white">
      {/* this div wraps the page */}
      <Backdrop />
      <AwesomeBadge />
      <DockNav />
      <FloatingSkills />
      <Stats />
      <ParticleNetwork />
      <BackgroundMusic />

      <section id="home" className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-3xl w-full">
          <Reveal className="shrink-0">
            <div className="relative">
              <div
                className="relative w-44 h-44 rounded-full overflow-hidden border border-white/15"
                style={{ boxShadow: "0 0 60px -15px rgba(120,140,200,0.35)" }}
              >
                <Image src={profilePic} alt="Anish Katam" fill className="object-cover" priority />
              </div>
              <span
                aria-hidden
                className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-[#23A55A] ring-4 ring-[#0a0a0a]"
              />
            </div>
          </Reveal>

          <div className="flex flex-col gap-5 text-center md:text-left">
            <Reveal delay={0.08}>
              <p className="font-mono text-sm text-blue-300/80 mb-2">
                Software Engineer
              </p>
              <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight leading-none">
                Anish Katam
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="text-zinc-400 text-base max-w-lg leading-relaxed">
                CS &amp; Business Information Systems @ University of Rochester.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="flex gap-3 justify-center md:justify-start flex-wrap">
                <a
                  href="/resume/Anish_Katam_Resume.pdf"
                  target="_blank"
                  className="springy px-6 py-2.5 rounded-full text-sm font-medium bg-white text-zinc-900 hover:bg-zinc-200"
                >
                  Resume
                </a>
                <a
                  href="/contact"
                  className="springy px-6 py-2.5 rounded-full text-sm font-medium border border-white/20 text-white hover:bg-white/5"
                >
                  Contact
                </a>
              </div>

              <div className="flex gap-3 justify-center md:justify-start mt-5">
                <a
                  href="https://github.com/AnishKatam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="springy w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/10"
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
                  className="springy w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-zinc-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>

                <a
                  href="mailto:anishhkatam@gmail.com"
                  className="springy w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/10"
                  aria-label="Email"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="lg:hidden relative z-10 px-6 pb-12 flex justify-center">
        <Reveal>
          <SkillsCard />
        </Reveal>
      </section>

      <section id="projects" className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <SectionHeading>Projects</SectionHeading>
          </Reveal>
          <div className="mt-10 flex flex-wrap justify-center gap-5">
            <Reveal delay={0.05} className="w-full sm:w-[calc(50%-0.625rem)]">
              <ProjectCard
                title="DandyHacks 2025"
                desc="Led IT for the University of Rochester's 13th annual 42-hour hackathon — built and ran the event site that 200+ hackers relied on across 3 competition tracks."
                tags={["React", "Tailwind", "VanillaJS"]}
                href="https://dandyhacks.net/"
              />
            </Reveal>
            <Reveal delay={0.12} className="w-full sm:w-[calc(50%-0.625rem)]">
              <ProjectCard
                title="Poker Card Game"
                desc="Multiplayer poker in Java with a live scoreboard and complete card artwork. The chip economy runs on a greedy algorithm I'm still weirdly proud of."
                tags={["Java", "JavaFX", "Algorithms"]}
                href="https://github.com/AnishKatam/Poker"
              />
            </Reveal>
            <Reveal delay={0.19} className="w-full sm:w-[calc(50%-0.625rem)]">
              <ProjectCard
                title="AI Schedule Builder"
                desc="Scrapes University of Rochester course data and uses AI to turn it into personalized semester schedules, so students don't have to puzzle them together by hand."
                tags={["Python", "AI", "Web Scraping"]}
                href="https://github.com/AnishKatam/DandyHacks"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section id="status" className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <SectionHeading>Status</SectionHeading>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-5">
            <Reveal delay={0.05}> {/* use window.matchMedia() to check if mobile (smart implementation) */}
              <DiscordActivity />
            </Reveal>
            <Reveal delay={0.12}>
              <WhiteLight />
            </Reveal>
          </div>
    
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/[0.06] pt-10 pb-28 px-6 mt-12">
        <div className="max-w-3xl mx-auto text-center text-sm text-zinc-500">
          <p>© 2026 Anish Katam</p>
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-semibold tracking-tight text-white">{children}</h2>
  );
}

function ProjectCard({ title, desc, tags, href }: { title: string; desc: string; tags: string[]; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="springy group h-full flex flex-col rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/25 hover:bg-white/[0.04]"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-colors shrink-0 mt-0.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
      </div>
      <p className="text-zinc-400 text-sm leading-relaxed mb-5 flex-1">{desc}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="font-mono text-xs px-2 py-1 rounded border border-white/10 bg-white/[0.04] text-zinc-400"
          >
            {t}
          </span>
        ))}
      </div>
    </a>
  );
}
