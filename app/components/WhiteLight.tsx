"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import serverIcon from "../../assets/white_light.png";

const INVITE_CODE = "M6FEvgukZb";

type Counts = { online: number; members: number };

export default function WhiteLight() {
  const [counts, setCounts] = useState<Counts | null>(null);

  //api for live member counts
  useEffect(() => {
    let cancelled = false;
    fetch(`https://discord.com/api/v10/invites/${INVITE_CODE}?with_counts=true`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (cancelled || json?.approximate_member_count == null) return;
        setCounts({
          online: json.approximate_presence_count ?? 0,
          members: json.approximate_member_count,
        });
      })
      
      .catch(() => {
        //counts stay hidden on failure
      });

    return () => {
      cancelled = true;
    };
  }, []);



  return (
    <a
      href={`https://discord.gg/${INVITE_CODE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="springy group flex h-full cursor-pointer flex-col justify-between gap-6 rounded-xl border border-white/10 bg-[#111214] p-4 hover:border-[#5865F2]/50"
    >
      <div className="flex items-center gap-3">
        <Image
          src={serverIcon}
          alt="White Light server icon"
          width={48}
          height={48}
          className="h-12 w-12 shrink-0 rounded-2xl border border-white/10 object-cover"
        />
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-tight text-white">White Light</p>
          <p className="font-mono text-[11px] text-zinc-400">Discord community</p>
        </div>
      </div>

      {counts && (
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-xs text-zinc-400">
            <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-[#23A55A]" />
            {counts.online.toLocaleString()} Online
          </span>
          <span className="flex items-center gap-1.5 text-xs text-zinc-500">
            <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-zinc-500" />
            {counts.members.toLocaleString()} Members
          </span>
        </div>
      )}

      <span className="text-xs font-medium text-[#5865F2] transition-colors group-hover:text-[#7289da]">
        Join the server
      </span>
    </a>
  );
}
