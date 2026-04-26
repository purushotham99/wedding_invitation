import content from "@/data/wedding-content.json";
import { MapPin, ExternalLink } from "lucide-react";

export default function LocationSection() {
  const { location } = content;

  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    location.venue + " " + location.address
  )}`;

  return (
    <section className="w-full min-h-screen bg-ivory-deep flex flex-col justify-center items-center py-12">

      {/* ── Header ── */}
      <div className="text-center mb-10 px-6">
        <p className="text-xs tracking-[0.5em] uppercase mb-3 font-ui" style={{ color: "var(--peacock)" }}>
          ✦ &nbsp; Venue &nbsp; ✦
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 font-heading" style={{ color: "var(--text-dark)" }}>
          Location &amp; Travel
        </h1>
        <div className="ornament-divider w-48 mx-auto">
          <div className="ornament-diamond" />
        </div>
      </div>

      {/* ── Card row — horizontally and vertically centered ── */}
      <div className="w-full max-w-4xl mx-auto px-8 flex flex-col lg:flex-row gap-8 items-stretch">

        {/* ── Venue Card — minimalistic ── */}
        <div
          className="w-full lg:w-72 lg:flex-shrink-0 rounded-2xl bg-white flex flex-col gap-6"
          style={{
            boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(201,146,42,0.12)",
            padding: "2.5rem"
          }}
        >
          {/* Icon */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: "var(--peacock)", opacity: 0.9 }}
          >
            <MapPin className="w-5 h-5 text-white" />
          </div>

          {/* Name */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase font-ui mb-1.5" style={{ color: "var(--text-light)" }}>
              Wedding Venue
            </p>
            <h2 className="text-xl md:text-2xl font-bold font-heading leading-snug" style={{ color: "var(--text-dark)" }}>
              {location.venue}
            </h2>
          </div>

          {/* Thin gold rule */}
          <div className="h-px w-full" style={{ background: "rgba(201,146,42,0.2)" }} />

          {/* Address */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase font-ui mb-2" style={{ color: "var(--text-light)" }}>
              Address
            </p>
            <p className="font-body text-sm leading-relaxed" style={{ color: "var(--text-mid)" }}>
              {location.address}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2.5 mt-auto pt-2">
            <a
              href={directionsUrl}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-ui text-xs tracking-widest uppercase font-medium transition-all duration-200 hover:bg-black/5"
              style={{
                border: "1px solid rgba(0,0,0,0.1)",
                color: "var(--text-mid)",
              }}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open in Maps
            </a>
          </div>
        </div>

        {/* ── Map Panel ── */}
        <div
          className="flex-[2] min-h-[380px] lg:min-h-0 rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.1), 0 0 0 1px rgba(201,146,42,0.12)" }}
        >
          <iframe
            src={location.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "380px", display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Wedding Venue Map"
            className="w-full h-full"
          />
        </div>

      </div>
    </section>
  );
}
