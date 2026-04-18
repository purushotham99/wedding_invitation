"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function CurtainReveal() {
  const [showCurtain, setShowCurtain] = useState(true);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    // Start the opening animation after a brief delay
    const openTimer = setTimeout(() => {
      setIsOpening(true);
    }, 1000); // 1 second anticipation delay

    // Unmount the component entirely after the animation completes
    // The CSS transition takes 1.5s (1500ms), so we wait 1.5s after it starts
    const removeTimer = setTimeout(() => {
      setShowCurtain(false);
    }, 1000 + 1500 + 100); // 100ms buffer

    return () => {
      clearTimeout(openTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!showCurtain) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] pointer-events-none flex bg-[#2a0808]"
      aria-hidden="true"
      style={{
        transition: "background-color 1.5s ease-in-out",
        backgroundColor: isOpening ? "transparent" : "#2a0808"
      }}
    >
      {/* LEFT HALF */}
      <div 
        className="w-1/2 h-full relative overflow-hidden transition-transform duration-[1500ms] ease-in-out"
        style={{
          transform: isOpening ? "translateX(-100%)" : "translateX(0)",
          boxShadow: isOpening ? "none" : "2px 0 20px rgba(0,0,0,0.5)",
        }}
      >
        <div className="absolute top-0 left-0 w-[200%] h-full pointer-events-auto">
          <Image
            src="/curtain-pure.png"
            alt="Red Velvet Curtain (Left)"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </div>

      {/* RIGHT HALF */}
      <div 
        className="w-1/2 h-full relative overflow-hidden transition-transform duration-[1500ms] ease-in-out"
        style={{
          transform: isOpening ? "translateX(100%)" : "translateX(0)",
          boxShadow: isOpening ? "none" : "-2px 0 20px rgba(0,0,0,0.5)",
        }}
      >
        <div className="absolute top-0 right-0 w-[200%] h-full pointer-events-auto">
          <Image
            src="/curtain-pure.png"
            alt="Red Velvet Curtain (Right)"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </div>
    </div>
  );
}
