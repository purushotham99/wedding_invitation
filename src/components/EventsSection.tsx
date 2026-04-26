"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import content from "@/data/wedding-content.json";
import { Calendar, MapPin, Clock, ChevronDown } from "lucide-react";

type Event = (typeof content.events)[0] & { image?: string };

const EVENTS = content.events as Event[];

export default function EventsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track which slide is active via IntersectionObserver
  useEffect(() => {
    const slides = containerRef.current?.querySelectorAll<HTMLDivElement>("[data-slide]");
    if (!slides) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.slide);
            setActiveIndex(idx);
          }
        });
      },
      { root: containerRef.current, threshold: 0.5 }
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  const scrollToSlide = (idx: number) => {
    const slide = containerRef.current?.querySelector<HTMLDivElement>(`[data-slide="${idx}"]`);
    slide?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const totalSlides = EVENTS.length + 1; // header + events

  return (
    <div
      className="relative"
      style={{ height: "100dvh" }}
    >
      {/* Scroll-snap container */}
      <div
        ref={containerRef}
        className="h-full overflow-y-scroll"
        style={{ scrollSnapType: "y mandatory", scrollBehavior: "smooth" }}
      >
        {/* ── Slide 0: Header ── */}
        <div
          data-slide={0}
          className="relative flex flex-col items-center justify-center bg-ivory-deep"
          style={{
            height: "100dvh",
            scrollSnapAlign: "start",
            backgroundImage: "url('/wedding_divider_motif.png')",
            backgroundSize: "180px",
            backgroundRepeat: "repeat",
          }}
        >
          {/* Ivory tint overlay on pattern */}
          <div className="absolute inset-0 bg-ivory-deep/95" />

          <div className="relative z-10 text-center px-6">
            <p
              className="text-xs tracking-[0.5em] uppercase mb-4 font-ui"
              style={{ color: "var(--peacock)" }}
            >
              ✦ &nbsp; Celebrations &nbsp; ✦
            </p>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading mb-6"
              style={{ color: "var(--text-dark)" }}
            >
              Wedding Events
            </h1>
            <div className="ornament-divider w-64 mx-auto mb-8">
              <div className="ornament-diamond" />
            </div>
            <p
              className="text-lg md:text-xl font-body italic mb-12"
              style={{ color: "var(--text-light)" }}
            >
              Scroll to explore each celebration
            </p>

            {/* Event quick nav pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {EVENTS.map((event, i) => (
                <button
                  key={event.id}
                  onClick={() => scrollToSlide(i + 1)}
                  className="px-5 py-2 rounded-full text-sm font-ui tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: i % 2 === 0
                      ? "linear-gradient(135deg, var(--peacock), var(--peacock-mid))"
                      : "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                    color: "#fff",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  {event.name}
                </button>
              ))}
            </div>

            <div className="flex justify-center w-full">
              <button
                onClick={() => scrollToSlide(1)}
                className="flex flex-col items-center gap-2 group"
                aria-label="Scroll to first event"
              >
                <span
                  className="text-xs tracking-[0.3em] uppercase font-ui"
                  style={{ color: "var(--text-light)" }}
                >
                  Scroll to begin
                </span>
                <ChevronDown
                  className="w-6 h-6 transition-transform group-hover:translate-y-1"
                  style={{ color: "var(--gold)", animation: "floatUp 1.5s ease-in-out infinite" }}
                />
              </button>
            </div>
          </div>
        </div>

        {/* ── Slides 1–N: One card per event ── */}
        {EVENTS.map((event, index) => {
          const isEven = index % 2 === 0;
          const date = new Date(event.date + "T00:00:00+05:30");

          return (
            <div
              key={event.id}
              data-slide={index + 1}
              className="relative flex items-center justify-center"
              style={{
                height: "100dvh",
                scrollSnapAlign: "start",
                background: isEven
                  ? "linear-gradient(160deg, #061820 0%, #004455 100%)"
                  : "linear-gradient(160deg, #1a0a00 0%, #5a3000 100%)",
              }}
            >
              {/* Background image — very subtle */}
              {event.image && (
                <div className="absolute inset-0">
                  <Image
                    src={event.image}
                    alt={event.name}
                    fill
                    className="object-cover opacity-15"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                </div>
              )}

              {/* Content — two column on desktop */}
              <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">

                {/* Left: event image card */}
                {event.image && (
                  <div
                    className="hidden md:block rounded-3xl overflow-hidden shadow-2xl border-2"
                    style={{
                      borderColor: isEven ? "rgba(201,146,42,0.3)" : "rgba(0,150,180,0.3)",
                      aspectRatio: "4/3",
                      position: "relative",
                      animation: "fadeInScale 0.8s ease-out both",
                    }}
                  >
                    <Image
                      src={event.image}
                      alt={event.name}
                      fill
                      className="object-cover"
                      sizes="50vw"
                    />
                    {/* Inner gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                )}

                {/* Right: text content */}
                <div style={{ animation: "fadeInUp 0.8s ease-out 0.1s both" }}>
                  {/* Event number */}
                  <p
                    className="text-xs tracking-[0.4em] uppercase font-ui mb-4"
                    style={{ color: isEven ? "var(--peacock-light)" : "var(--gold-light)" }}
                  >
                    Event {index + 1} of {EVENTS.length}
                  </p>

                  <h2
                    className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-tight"
                    style={{ color: "var(--gold-bright)" }}
                  >
                    {event.name}
                  </h2>

                  {/* Divider */}
                  <div
                    className="h-0.5 w-16 mb-8 rounded-full"
                    style={{
                      background: isEven ? "var(--gradient-gold)" : "linear-gradient(90deg, var(--peacock-light), var(--peacock))",
                    }}
                  />

                  {/* Meta */}
                  <div className="flex flex-col gap-4 mb-8">
                    <div className="flex items-center gap-4">
                      <div
                        className="p-2.5 rounded-full shrink-0"
                        style={{ background: "rgba(255,255,255,0.08)" }}
                      >
                        <Calendar className="w-5 h-5" style={{ color: "var(--gold-light)" }} />
                      </div>
                      <span className="font-ui text-base" style={{ color: "var(--pearl)" }}>
                        {date.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div
                        className="p-2.5 rounded-full shrink-0"
                        style={{ background: "rgba(255,255,255,0.08)" }}
                      >
                        <Clock className="w-5 h-5" style={{ color: "var(--gold-light)" }} />
                      </div>
                      <span className="font-ui text-base" style={{ color: "var(--pearl)" }}>
                        {event.time}
                      </span>
                    </div>
                    <div className="flex items-start gap-4">
                      <div
                        className="p-2.5 rounded-full shrink-0"
                        style={{ background: "rgba(255,255,255,0.08)" }}
                      >
                        <MapPin className="w-5 h-5" style={{ color: "var(--gold-light)" }} />
                      </div>
                      <span className="font-body italic text-base leading-snug" style={{ color: "var(--pearl)" }}>
                        {event.venue}
                        <br />
                        <span style={{ color: "var(--pearl-dark)", fontSize: "0.9em" }}>{event.city}</span>
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className="font-body text-lg leading-relaxed mb-8"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    {event.description}
                  </p>

                  {/* Dresscode + Next btn */}
                  <div className="flex flex-wrap items-center gap-4">

                    {index < EVENTS.length - 1 && (
                      <button
                        onClick={() => scrollToSlide(index + 2)}
                        className="flex items-center gap-2 text-sm font-ui tracking-widest uppercase transition-all duration-300 hover:gap-3"
                        style={{ color: isEven ? "var(--gold-light)" : "var(--peacock-light)" }}
                      >
                        Next event
                        <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Slide number dot (bottom center) */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {[...Array(totalSlides)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToSlide(i)}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width: activeIndex === i ? "24px" : "8px",
                      height: "8px",
                      background: activeIndex === i ? "var(--gold)" : "rgba(255,255,255,0.3)",
                    }}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Fixed dot nav on the side (desktop) */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        {[...Array(totalSlides)].map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSlide(i)}
            className="transition-all duration-300 rounded-full border-2"
            style={{
              width: "12px",
              height: activeIndex === i ? "32px" : "12px",
              background: activeIndex === i ? "var(--gold)" : "transparent",
              borderColor: activeIndex === i ? "var(--gold)" : "rgba(255,255,255,0.4)",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
