import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Source_Sans_3, Space_Grotesk } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollEffects } from "@/components/ScrollEffects";
import { site } from "@/lib/site";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const heading = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const text = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.intro,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.intro,
  },
};

export const viewport: Viewport = {
  themeColor: "#111310",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${heading.variable} ${display.variable} ${text.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <a href="#main" className="skip-link">
          Lewati ke konten
        </a>
        <Nav />
        <main id="main" className="wrap">
          {children}
        </main>
        <Footer />
        <ScrollEffects />
      </body>
    </html>
  );
}
