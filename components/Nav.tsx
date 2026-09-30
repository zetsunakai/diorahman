import Link from "next/link";
import { site } from "@/lib/site";
import styles from "./Nav.module.css";

/** F1: always-visible top bar, with the CV one click away on every page. */
export function Nav() {
  return (
    <header className={styles.nav}>
      <Link href="/" className={styles.logo}>
        <span className={styles.full}>{site.name.toLowerCase()}</span>
        <span className={styles.short} aria-hidden="true">
          dio.
        </span>
      </Link>
      <nav aria-label="Utama">
        <ul className={styles.links}>
          <li>
            <Link href="/#karya">Karya</Link>
          </li>
          <li>
            <Link href="/#tentang">Tentang</Link>
          </li>
          <li>
            <Link href="/#kontak">Kontak</Link>
          </li>
          <li>
            <a href={site.cv} download className={styles.cv}>
              Unduh CV
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
