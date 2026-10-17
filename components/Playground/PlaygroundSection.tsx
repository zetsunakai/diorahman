import { CursorPlayground } from "@/components/Playground/CursorPlayground";
import "./playground.css";

export function PlaygroundSection({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  const Heading = standalone ? "h1" : "h2";

  return (
    <section
      className={`playground${standalone ? "" : " playground-home"}`}
      id="playground"
      aria-labelledby="playground-title"
    >
      <div className="playground-heading">
        <div>
          <p className="mono eyebrow">Eksperimen interaksi</p>
          <Heading id="playground-title">Playground</Heading>
        </div>
        <p>
          Gerakkan kursor untuk mengubah sudut pandang. Tulisan DIO tetap di
          tengah saat Anda melihatnya dari arah yang berbeda.
        </p>
      </div>
      <CursorPlayground />
    </section>
  );
}
