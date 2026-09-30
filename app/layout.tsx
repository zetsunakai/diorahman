import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Newsreader } from "next/font/google";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import { Providers } from "@/components/Providers";
import { site } from "@/lib/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-display",
  display: "swap",
});

const text = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500"],
  variable: "--font-text",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.role}`, template: `%s — ${site.name}` },
  description: site.intro,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.intro,
  },
};

export const viewport: Viewport = {
  themeColor: "#2231e8",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${display.variable} ${text.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Lewati ke konten
        </a>
        <Providers>
          <Nav />
          <main id="main">{children}</main>
          <Cursor />
        </Providers>
      </body>
    </html>
  );
}
