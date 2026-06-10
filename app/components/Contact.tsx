"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-lg px-4 py-3 text-white text-sm placeholder-zinc-600 bg-white/[0.04] border border-white/10 focus:outline-none focus:border-blue-400/50 focus:bg-white/[0.06] transition-all";

export default function Contact() {
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
          company: fd.get("company"), //honeypot
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
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto mb-5">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-blue-400">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Message sent</h3>
        <p className="text-zinc-400 text-sm">
          Thanks for reaching out.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 flex flex-col gap-5"
    >
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-400">Name</label>
          <input name="name" type="text" required placeholder="Your name" className={inputClass} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-400">Email</label>
          <input name="email" type="email" required placeholder="you@example.com" className={inputClass} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-zinc-400">
          Subject <span className="text-zinc-600">(optional)</span>
        </label>
        <input name="subject" type="text" placeholder="What's this about?" className={inputClass} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-zinc-400">Message</label>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Your message here..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="text-red-400 text-sm text-center">
          Something went wrong and your message didn&apos;t send. Try again, or
          email me at{" "}
          <a href="mailto:anishhkatam@gmail.com" className="underline underline-offset-2 hover:text-red">
            anishhkatam@gmail.com
          </a>
          .
        </p>
      )}
      {/*error data sent to me??? */}

      <button
        type="submit"
        disabled={status === "loading"}
        className="springy self-end px-8 py-3 rounded-full text-sm font-medium bg-white text-zinc-900 hover:bg-zinc-200 disabled:opacity-50"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
