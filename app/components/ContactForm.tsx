"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-lg px-4 py-3 text-white text-sm placeholder-zinc-600 bg-white/[0.04] border border-white/10 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          subject: fd.get("subject"),
          message: fd.get("message"),
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-2xl p-10 text-center"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.10)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto mb-5">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-blue-400">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3
          className="text-lg font-bold tracking-wider text-white mb-2"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          Message Sent
        </h3>
        <p className="text-zinc-400 text-sm">I&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl p-8 flex flex-col gap-5"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.09)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-zinc-500 tracking-widest uppercase" style={{ fontFamily: "var(--font-orbitron)" }}>
            Name
          </label>
          <input name="name" type="text" required placeholder="Your name" className={inputClass} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-zinc-500 tracking-widest uppercase" style={{ fontFamily: "var(--font-orbitron)" }}>
            Email
          </label>
          <input name="email" type="email" required placeholder="you@example.com" className={inputClass} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-zinc-500 tracking-widest uppercase" style={{ fontFamily: "var(--font-orbitron)" }}>
          Subject
        </label>
        <input name="subject" type="text" placeholder="What&apos;s this about?" className={inputClass} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-zinc-500 tracking-widest uppercase" style={{ fontFamily: "var(--font-orbitron)" }}>
          Message
        </label>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Tell me what you have in mind..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="text-red-400 text-xs text-center">
          Something went wrong. Try emailing me directly at anishhkatam@gmail.com
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="self-end px-8 py-3 rounded-full text-sm font-semibold text-white transition-all hover:scale-[1.03] disabled:opacity-50"
        style={{
          fontFamily: "var(--font-orbitron)",
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.18)",
          boxShadow: "inset 0 0 24px rgba(100,140,255,0.10), 0 0 18px rgba(100,140,255,0.12)",
        }}
      >
        {status === "loading" ? "Sending…" : "Send Message →"}
      </button>
    </form>
  );
}
