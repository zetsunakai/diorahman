import { site } from "@/lib/site";
import { ArchitectureHero } from "./ArchitectureHero";

export function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div>
        <div className="eyebrow mono">{site.name}</div>
        <p className="hero-role">{site.role}</p>
        <h1 id="hero-title">
          Aplikasi web.
          <br />
          <span>Alur kerja yang jelas.</span>
        </h1>
        <p>{site.intro}</p>
        <div className="actions">
          <a className="primary" href="#projects">
            Lihat Proyek <span aria-hidden="true">↗</span>
          </a>
          {site.cv && (
            <a className="secondary" href={site.cv} download>
              Download CV <span aria-hidden="true">↓</span>
            </a>
          )}
          <a className="text-link" href="#about">
            Kenali saya <span aria-hidden="true">↓</span>
          </a>
        </div>
        <p className="hero-note">React / Next.js · Python · Pengalaman Odoo</p>
      </div>
      <ArchitectureHero />
    </section>
  );
}
