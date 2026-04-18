"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryImage } from "@/lib/gallery";

interface PhotoCarouselProps {
  photos: GalleryImage[];
}

export default function PhotoCarousel({ photos }: PhotoCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="pt-8 pb-20 px-4 bg-ivory min-h-screen flex flex-col justify-center items-center">
      <div className="text-center mb-12">
        <p className="text-sm tracking-[0.4em] uppercase mb-3 text-peacock font-ui">
          ✦ &nbsp; Gallery &nbsp; ✦
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading text-text-dark">
          Captured Moments
        </h1>
        <div className="ornament-divider w-48 mx-auto">
          <div className="ornament-diamond" />
        </div>
      </div>

      <div className="relative max-w-5xl w-full mx-auto">
        {/* Carousel Viewport */}
        <div className="overflow-hidden rounded-2xl shadow-card" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {photos.map((photo) => (
              <div key={photo.id} className="flex-[0_0_100%] min-w-0 relative aspect-[16/9] md:aspect-[21/9]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1024px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none flex items-end p-8">
                  <p className="text-white font-ui tracking-wide drop-shadow-md">
                    {photo.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur text-peacock hover:bg-gold hover:text-white transition-colors shadow-lg z-10"
          onClick={scrollPrev}
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur text-peacock hover:bg-gold hover:text-white transition-colors shadow-lg z-10"
          onClick={scrollNext}
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-6">
          {photos.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === selectedIndex ? "bg-gold" : "bg-gold/30 hover:bg-gold/50"
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <p className="mt-12 text-text-light font-ui text-sm text-center max-w-md">
        Photos will be updated here after the events.
      </p>
    </section>
  );
}
