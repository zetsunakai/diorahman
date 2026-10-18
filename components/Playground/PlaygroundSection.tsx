import { CursorPlayground } from "@/components/Playground/CursorPlayground";
import { DinoPlayground } from "@/components/Playground/DinoPlayground";
import "./playground.css";

// Set to true to show the 3D playground again.
const SHOW_3D_PLAYGROUND = false;

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
      </div>
      {SHOW_3D_PLAYGROUND && <CursorPlayground />}
      <DinoPlayground />
    </section>
  );
}
