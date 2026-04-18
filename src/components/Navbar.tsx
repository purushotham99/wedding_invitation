"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import content from "@/data/wedding-content.json";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Gallery", href: "/gallery" },
    { name: "Location", href: "/location" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 py-4"
      style={{
        background: "rgba(253,248,235,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(201,146,42,0.12)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">

          {/* Logo / Names */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="font-accent text-2xl md:text-3xl transition-colors duration-300"
              style={{ color: "var(--peacock)" }}
            >
              {content.couple.bride.firstName} &amp; {content.couple.groom.firstName}
            </Link>
          </div>

          {/* Desktop Nav Tabs */}
          <div className="hidden md:flex items-center gap-x-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const activeColor = "var(--gold-bright)";
              const inactiveColor = "var(--text-mid)";
              const hoverColor = "var(--peacock)";

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative text-sm font-ui tracking-[0.2em] uppercase px-1 py-2 transition-all duration-300 group"
                  style={{ color: isActive ? activeColor : inactiveColor }}
                  onMouseEnter={(e) => { if (!isActive) (e.target as HTMLElement).style.color = hoverColor; }}
                  onMouseLeave={(e) => { if (!isActive) (e.target as HTMLElement).style.color = inactiveColor; }}
                >
                  {link.name}
                  {/* Active underline */}
                  <span
                    className="absolute bottom-0 left-0 w-full h-px transition-all duration-300 origin-left"
                    style={{
                      background: "var(--gold)",
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                    }}
                  />
                  {/* Hover underline */}
                  {!isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-px bg-gold/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Nav */}
          <div className="flex md:hidden items-center gap-x-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs font-ui tracking-widest uppercase transition-colors px-3 py-1.5 rounded-full border"
                  style={
                    isActive
                      ? {
                          background: "rgba(201,146,42,0.2)",
                          color: "var(--gold-bright)",
                          borderColor: "rgba(201,146,42,0.4)",
                        }
                      : {
                          color: "var(--text-mid)",
                          borderColor: "transparent",
                        }
                  }
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </nav>
  );
}
