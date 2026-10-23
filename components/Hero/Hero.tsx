import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title">
          Dari Kebutuhan Bisnis,
          <br />
          Saya Wujudkan
          <br />
          <span>Jadi aplikasi web.</span>
        </h1>
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
      </div>
    </section>
  );
}
