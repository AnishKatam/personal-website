import ShootingStars from "../components/ShootingStars";
import ContactForm from "../components/ContactForm";
import ParticleStrings from "../components/ParticleStrings";
import Link from "next/link";

export const metadata = { title: "Contact Me" };

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-x-hidden text-white">
      <ShootingStars />
      <ParticleStrings />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-24">
        <div className="max-w-2xl w-full">
       <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-xs tracking-widest uppercase mb-10 transition-colors"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
  Back
</Link>

          <p
            className="text-xs tracking-[0.35em] text-blue-400 uppercase mb-2"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            Get In Touch
          </p>
          <h1
            className="text-4xl sm:text-5xl font-black leading-none tracking-wider uppercase mb-3"
            style={{
              fontFamily: "var(--font-orbitron)",
              background: "linear-gradient(135deg, #ffffff 0%, #aabbff 50%, #6677ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Contact
          </h1>
          <p className="text-zinc-400 text-base mb-10 max-w-md leading-relaxed">
            Feel free to say anything you want.
          </p>

          <ContactForm />
        </div>
      </div>
    </div>
  );
}
