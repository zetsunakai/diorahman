import Link from "next/link";
import { contactChannels, site } from "@/lib/site";

export function Footer() {
  return (
    <footer>
      <div className="wrap footer-inner">
        <Link className="logo" href="/#home" aria-label="Dio beranda">
          dio<span>.</span>
        </Link>
        <span>
          © {new Date().getFullYear()} {site.name}. Dibangun dengan perhatian
          pada detail.
        </span>
        <div className="footer-links">
          {contactChannels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.label === "Email" ? undefined : "_blank"}
              rel={channel.label === "Email" ? undefined : "noreferrer"}
            >
              {channel.label}
            </a>
          ))}
          <Link href="/#home">
            Ke atas <span aria-hidden="true">↑</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
