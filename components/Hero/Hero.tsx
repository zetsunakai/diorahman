import { site } from "@/lib/site";
import { SplitName } from "./SplitName";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <p className={styles.kicker}>
        {site.role} <span aria-hidden="true">·</span> portofolio 2026
      </p>
      <SplitName label={site.name} lines={site.display} />
      <div className={styles.footer}>
        <p className={styles.intro}>{site.intro}</p>
        <a href="#karya" className={styles.hint}>
          gulir untuk melihat karya <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
