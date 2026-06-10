"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import fallbackPfp from "../../assets/pfp.png";
import idleArt from "../../assets/idle.png";

//lanyard tracking id
const DISCORD_USER_ID = "417513482502799361";
const POLL_MS = 30_000;

const STATUS_META = {
  online: { color: "#23A55A", label: "Online" },
  idle: { color: "#F0B232", label: "Idle" },
  dnd: { color: "#F23F43", label: "Do Not Disturb" },
  offline: { color: "#80848E", label: "Offline" },
} as const;

type StatusKey = keyof typeof STATUS_META;

type LanyardActivity = {
  type: number;
  name: string;
  details?: string;
  state?: string;
  timestamps?: { start?: number };
  application_id?: string;
  assets?: { large_image?: string; small_image?: string };
};

type Presence = {
  status: StatusKey;
  username: string;
  avatarUrl: string | null;
  activity: LanyardActivity | null;
  spotify: { song: string; artist: string; albumArt: string | null } | null;
};

//prefer playing, skip custom status and spotify
function pickActivity(activities: LanyardActivity[]): LanyardActivity | null {
  return (
    activities.find((a) => a.type === 0) ??
    activities.find((a) => a.type !== 4 && a.type !== 2) ??
    null
  );
}

//activity art comes through discord's media proxy
function activityImageUrl(activity: LanyardActivity): string | null {
  const img = activity.assets?.large_image ?? activity.assets?.small_image;
  if (!img) return null;
  if (img.startsWith("mp:")) return `https://media.discordapp.net/${img.slice(3)}`;
  if (img.startsWith("spotify:")) return `https://i.scdn.co/image/${img.slice(8)}`;
  if (activity.application_id)
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${img}.png`;
  return null;
}

function formatElapsed(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

export default function DiscordActivity() {
  const [presence, setPresence] = useState<Presence | null>(null);
  const [now, setNow] = useState(() => Date.now());

  //poll lanyard
  useEffect(() => {
    if (!DISCORD_USER_ID) return;
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
        if (!res.ok) return;
        const json = await res.json();
        if (!json?.success || cancelled) return;
        const d = json.data;
        //animated avatars start with a_
        const avatarExt = d.discord_user?.avatar?.startsWith("a_") ? "gif" : "png";
        setPresence({
          status: (d.discord_status in STATUS_META ? d.discord_status : "offline") as StatusKey,
          username: d.discord_user?.global_name || d.discord_user?.username || "swasive",
          avatarUrl: d.discord_user?.avatar
            ? `https://cdn.discordapp.com/avatars/${d.discord_user.id}/${d.discord_user.avatar}.${avatarExt}?size=80`
            : null,
          activity: pickActivity(d.activities ?? []),
          spotify:
            d.listening_to_spotify && d.spotify
              ? {
                  song: d.spotify.song,
                  artist: d.spotify.artist,
                  albumArt: d.spotify.album_art_url ?? null,
                }
              : null,
        });
      } catch {
        //keep last state
      }
    }

    function tickIfVisible() {
      if (!document.hidden) load();
    }

    load();
    const poll = setInterval(tickIfVisible, POLL_MS);
    //refresh when tab comes back
    document.addEventListener("visibilitychange", tickIfVisible);
    return () => {
      cancelled = true;
      clearInterval(poll);
      document.removeEventListener("visibilitychange", tickIfVisible);
    };
  }, []);

  //tick elapsed counter between polls
  const hasTimer = Boolean(presence?.activity?.timestamps?.start);
  useEffect(() => {
    if (!hasTimer) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [hasTimer]);

  const status = STATUS_META[presence?.status ?? "offline"];
  const username = presence?.username ?? "swasive";
  const activity = presence?.activity ?? null;
  const spotify = presence?.spotify ?? null;
  const start = activity?.timestamps?.start;

  const headline = activity
    ? `Playing ${activity.name}`
    : spotify
      ? "Listening to Spotify"
      : status.label;

  const art = activity ? activityImageUrl(activity) : (spotify?.albumArt ?? null);

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="springy group block h-full cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-[#111214] hover:border-[#5865F2]/50"
    >
      <div className="flex items-center gap-3 p-4">
        <div className="relative shrink-0">
          {presence?.avatarUrl ? (
            <Image
              unoptimized
              src={presence.avatarUrl}
              alt={`${username}'s Discord avatar`}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <Image
              src={fallbackPfp}
              alt="Discord avatar"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
          )}
          <span
            aria-hidden
            title={status.label}
            className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-[3px] border-[#111214] transition-colors"
            style={{ backgroundColor: status.color }}
          />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-tight text-white">@{username}</p>
          <p className="truncate font-mono text-[11px] text-zinc-400">{headline}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-white/[0.06] bg-[#0d0e12] p-4">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-white/[0.06] bg-[#1e1f22]">
          {art ? (
            <Image
              unoptimized
              src={art}
              alt={activity?.name ?? "album art"}
              width={56}
              height={56}
              className="h-full w-full object-cover"
            />
          ) : !activity && !spotify ? (
            <Image
              src={idleArt}
              alt="idle"
              width={56}
              height={56}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-7 w-7 text-[#8aa0ff]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="min-w-0 text-xs leading-relaxed">
          {activity ? (
            <>
              <p className="text-sm font-semibold text-white">{activity.name}</p>
              {activity.details && <p className="truncate text-zinc-400">{activity.details}</p>}
              {activity.state && <p className="truncate text-zinc-400">{activity.state}</p>}
              {start && (
                <p className="font-mono text-[#23A55A]">
                  {formatElapsed(now - start)} elapsed
                </p>
              )}
            </>
          ) : spotify ? (
            <>
              <p className="text-sm font-semibold text-white">{spotify.song}</p>
              <p className="truncate text-zinc-400">by {spotify.artist}</p>
              <p className="font-mono text-[#23A55A]">Spotify</p>
            </>
          ) : (
            <>
              <p className="text-sm font-semibold text-white">{status.label}</p>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/[0.06] px-4 py-3">
        <span className="text-xs text-zinc-500">@{username} on Discord</span>
        
      </div>
    </a>
  );
}
