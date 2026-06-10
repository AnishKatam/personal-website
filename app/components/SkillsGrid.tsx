"use client";

import { useEffect, useState } from "react";
import CIcon from "../../assets/SVGs/c.svg";
import AWSIcon from "../../assets/SVGs/aws.svg";
import DockerIcon from "../../assets/SVGs/docker-icon.svg";
import NodeJSIcon from "../../assets/SVGs/nodejs.svg";
import CICDIcon from "../../assets/SVGs/github-actions.svg";
import NumpyIcon from "../../assets/SVGs/numpy.svg";
import TableauIcon from "../../assets/SVGs/tableau.svg";
import XamppIcon from "../../assets/SVGs/xampp.svg";
import MongoDBIcon from "../../assets/SVGs/mongodb-icon.svg";

const skills = [
  { label: "C", icon: CIcon },
  { label: "Node.js", icon: NodeJSIcon },
  { label: "AWS", icon: AWSIcon },
  { label: "Docker", icon: DockerIcon },
  { label: "CI/CD", icon: CICDIcon },
  { label: "MongoDB", icon: MongoDBIcon },
  { label: "NumPy", icon: NumpyIcon },
  { label: "Tableau", icon: TableauIcon },
  { label: "XAMPP", icon: XamppIcon },
];

export function SkillsCard() {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0d0e12]/90 p-3">
      <p className="font-mono text-[11px] tracking-wider text-zinc-500 mb-2 px-1">
        skills
      </p>
      <div className="grid grid-cols-3 gap-1.5">
        {skills.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="springy flex h-16 w-[72px] flex-col items-center justify-center gap-1 rounded-lg border border-white/[0.06] bg-white/[0.03] hover:border-white/20"
              title={s.label}
            >
              <span className="flex [&>svg]:h-5 [&>svg]:w-5">
                <Icon />
              </span>
              <span className="text-[10px] text-zinc-500">{s.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

//fades out as you scroll
export default function FloatingSkills() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const onScroll = () => setOpacity(Math.max(0, 1 - window.scrollY / 300));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hidden = opacity <= 0.05;
  return (
    <div
      className="fixed bottom-8 left-8 z-40 hidden lg:block"
      style={{
        opacity,
        pointerEvents: hidden ? "none" : "auto",
        transition: "opacity 0.15s linear",
      }}
      aria-hidden={hidden}
    >
      <SkillsCard />
    </div>
  );
}
