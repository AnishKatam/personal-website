"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollToPlugin);

const items = [
  {
    id: "home",
    label: "Home",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75"
      />
    ),
  },
  {
    id: "projects",
    label: "Projects",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
      />
    ),
  },
  {
    id: "status",
    label: "Status",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12h3.5l2.5-7 4 14 2.5-7H21"
      />
    ),
  },
];

export default function DockNav() {
  const [active, setActive] = useState("home");
  const navRef = useRef<HTMLElement>(null);

  //entrance animation
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      navRef.current,
      { y: 90, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.9, delay: 0.5, ease: "back.out(1.6)" }
    );
  }, []);

  //active section one above the 30% line
  useEffect(() => {
    const ids = items.map((i) => i.id);
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.scrollY + window.innerHeight * 0.3;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= line) current = id;
      }
      //pin last section at page bottom
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
        current = ids[ids.length - 1];
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  function scrollTo(id: string) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (id === "home") window.scrollTo(0, 0);
      else document.getElementById(id)?.scrollIntoView();
      return;
    }
    gsap.to(window, {
      scrollTo: { y: id === "home" ? 0 : `#${id}` },
      duration: 1,
      ease: "power3.inOut",
    });
  }


  return (
    <div
      className="fixed inset-x-0 bottom-5 z-50 flex justify-center pointer-events-none"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <nav
        ref={navRef}
        aria-label="Section navigation"
        className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/10 bg-[#101114]/90 px-2 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.55)] backdrop-blur-md"
      >
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            aria-current={active === item.id ? "true" : undefined}
            className={`springy flex h-11 items-center gap-2 rounded-full px-4 text-sm font-medium ${
              active === item.id
                ? "bg-white/10 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5"
            >
              {item.icon}
            </svg>
            <span className="hidden sm:block">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
