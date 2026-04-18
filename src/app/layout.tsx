import type { Metadata } from "next";
import content from "@/data/wedding-content.json";
import Navbar from "@/components/Navbar";
import CurtainReveal from "@/components/CurtainReveal";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: content.site.title,
    template: `%s | ${content.site.title}`,
  },
  description: content.site.seoDescription,
  keywords: ["South Indian Wedding", "Tamil Wedding", "Wedding Ceremony", content.couple.bride.firstName, content.couple.groom.firstName],
  openGraph: {
    title: content.site.title,
    description: content.site.seoDescription,
    type: "website",
    locale: content.site.locale,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Dancing+Script:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <CurtainReveal />
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
