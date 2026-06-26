"use client";
import { useEffect, useRef } from 'react';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

  
    audioRef.current = new Audio('/audio/music.opus');
    audioRef.current.loop = true;

  
    const handleFirstInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.warn("Audio interrupted:", err);
        });
      }
      window.removeEventListener('click', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  return null;
}