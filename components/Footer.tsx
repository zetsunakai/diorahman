import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer>
      <div className="wrap footer-inner">
        <Link className="logo" href="/#home" aria-label="Dio beranda">
          dio<span>.</span>
        </Link>
        <span>
          © {new Date().getFullYear()} {site.name}. Crafted with purpose.
        </span>
        <Link href="/#home">
          Kembali ke atas <span aria-hidden="true">↑</span>
        </Link>
      </div>
    </footer>
  );
}
