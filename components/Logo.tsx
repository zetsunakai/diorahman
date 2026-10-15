import Link from "next/link";

export function Logo() {
  return (
    <Link className="logo" href="/#home" aria-label="Dio beranda">
      <span className="logo-code logo-open" aria-hidden="true">
        &lt;
      </span>
      <span className="logo-word" aria-hidden="true">
        <span className="logo-letter">d</span>
        <span className="logo-letter">i</span>
        <span className="logo-letter">o</span>
        <span className="logo-dot">.</span>
      </span>
      <span className="logo-code logo-close" aria-hidden="true">
        /&gt;
      </span>
    </Link>
  );
}
