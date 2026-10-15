import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer>
      <div className="wrap footer-inner">
        <Logo />
        <span>
          © {new Date().getFullYear()} {site.name}.
        </span>
        <div className="footer-links">
          <Link href="/#home">
            Ke atas <span aria-hidden="true">↑</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
