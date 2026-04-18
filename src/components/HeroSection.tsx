"use client";

import Image from "next/image";
import content from "@/data/wedding-content.json";

export default function HeroSection() {
  const { couple, site, gallery } = content;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden -mt-20 md:-mt-24"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* ── Background Image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src={gallery.hero}
          alt="South Indian wedding decorative background"
          fill
          priority
          className="object-cover opacity-25 mix-blend-luminosity"
          sizes="100vw"
        />
      </div>

      {/* ── Texture Overlay ── */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: "var(--gradient-overlay)" }}
      />

      {/* ── Main Content ── */}
      <div
        className="relative z-30 flex flex-col items-center text-center px-6 py-20"
        style={{ animation: "fadeInUp 1.2s ease-out both" }}
      >
        {/* Sanskrit / Tamil Welcome */}
        <p
          className="text-gold-shimmer text-sm md:text-base tracking-[0.4em] uppercase mb-6 font-ui"
          style={{ fontFamily: "var(--font-ui)", letterSpacing: "0.4em" }}
        >
          ✦ &nbsp; Together With Their Families &nbsp; ✦
        </p>

        {/* Decorative top divider */}
        <div className="ornament-divider w-48 md:w-80 mb-8">
          <div className="ornament-diamond" />
        </div>

        {/* Bride Name */}
        <h1
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-none"
          style={{
            fontFamily: "var(--font-accent)",
            color: "var(--ivory)",
            textShadow: "0 0 60px rgba(201,146,42,0.6), 0 2px 4px rgba(0,0,0,0.5)",
            animation: "floatUp 4s ease-in-out infinite",
          }}
        >
          {couple.bride.firstName}
        </h1>

        {/* Ampersand */}
        <div
          className="text-gold-shimmer text-3xl md:text-5xl my-2 md:my-4"
          style={{
            fontFamily: "var(--font-heading)",
            fontStyle: "italic",
            fontWeight: 400,
          }}
        >
          &amp;
        </div>

        {/* Groom Name */}
        <h2
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-none"
          style={{
            fontFamily: "var(--font-accent)",
            color: "var(--ivory)",
            textShadow: "0 0 60px rgba(201,146,42,0.6), 0 2px 4px rgba(0,0,0,0.5)",
            animation: "floatUp 4s ease-in-out infinite 0.5s",
          }}
        >
          {couple.groom.firstName}
        </h2>

        {/* Tagline */}
        <p
          className="mt-8 text-lg md:text-2xl italic"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--pearl)",
            fontWeight: 300,
            opacity: 0.9,
            letterSpacing: "0.06em",
          }}
        >
          {site.tagline}
        </p>

        {/* Decorative bottom divider */}
        <div className="ornament-divider w-48 md:w-80 my-8">
          <div className="ornament-diamond" />
        </div>

        {/* Event date teaser */}
        <div
          className="mt-4 px-8 py-4 rounded-full border text-sm md:text-base tracking-widest uppercase"
          style={{
            borderColor: "rgba(201,146,42,0.6)",
            color: "var(--gold-light)",
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(8px)",
            fontFamily: "var(--font-ui)",
            letterSpacing: "0.2em",
            animation: "pearlGlow 3s ease-in-out infinite",
          }}
        >
          27 · May · 2026
        </div>


      </div>

      {/* Divider image at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-24 w-full overflow-hidden opacity-40">
        <Image
          src={gallery.divider}
          alt="Decorative divider"
          fill
          className="object-cover object-top"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
