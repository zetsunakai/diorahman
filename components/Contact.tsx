"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { MagneticButton } from "./MagneticButton";
import styles from "./Contact.module.css";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section id="kontak" className={styles.contact} aria-labelledby="kontak-title">
      <p className={styles.label}>kontak</p>
      <h2 id="kontak-title" className={styles.title}>
        punya ide yang ingin bergerak? ayo ngobrol.
      </h2>

      <div className={styles.actions}>
        <MagneticButton href={`mailto:${site.email}`} className={styles.magnetic}>
          kirim email <span aria-hidden="true">→</span>
        </MagneticButton>
        <button type="button" className={styles.copy} onClick={copy}>
          {site.email}
          <span className={styles.copyHint}>{copied ? "tersalin!" : "salin"}</span>
        </button>
        <span className={styles.srOnly} aria-live="polite">
          {copied ? "Alamat email tersalin" : ""}
        </span>
      </div>

      <footer className={styles.footer}>
        <ul className={styles.socials}>
          {site.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a href={site.cv} download>
              Unduh CV
            </a>
          </li>
        </ul>
        <p>© 2026 {site.name}</p>
      </footer>
    </section>
  );
}
