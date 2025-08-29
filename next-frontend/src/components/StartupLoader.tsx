"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
 duration?: number;
};

export default function StartupLoader({ children, duration = 700 }: Props) {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let fadeTimer: ReturnType<typeof setTimeout> | undefined;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;

    const timer = setTimeout(() => {
   
      setFadeOut(true);
      fadeTimer = setTimeout(() => {
        setLoading(false); 
      }, 300); 
    }, duration);

    return () => {
      clearTimeout(timer);
      if (fadeTimer) clearTimeout(fadeTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [duration]);

  if (loading) {
    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-theme text-theme transition-opacity duration-300 ${
          fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="flex flex-col items-center">
          <div className="relative h-24 w-24">
            <Image
              src="/assets/photos/logo.png"
              alt="ARK PLAYZONE"
              fill
              priority
              className="object-contain animate-bounce"
            />
          </div>
          <h1 className="mt-4 text-2xl font-bold animate-pulse">ARK PLAYZONE</h1>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
