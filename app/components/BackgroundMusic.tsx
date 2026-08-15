"use client";
import { useEffect, useRef } from 'react';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!audioRef.current) {
        audioRef.current = new Audio('/audio/music.opus');
        audioRef.current.loop = true;
      }
      audioRef.current.play().catch((err) => {
        console.warn("Audio interrupted:", err);
      });
      window.removeEventListener('click', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      audioRef.current?.pause();
    };
  }, []);

  return null;
}