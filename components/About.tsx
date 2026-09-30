import { Manifesto } from "./Manifesto";
import styles from "./About.module.css";

const TOOLS = [
  {
    group: "membangun",
    items: ["Next.js", "React", "TypeScript", "Motion", "Three.js", "Node.js"],
  },
  {
    group: "mendesain",
    items: ["Figma", "Blender", "After Effects", "Tipografi variabel"],
  },
  {
    group: "terbuka untuk",
    items: ["Full-time (remote/hybrid)", "Freelance & agensi", "Kolaborasi eksperimen"],
  },
];

export function About() {
  return (
    <section id="tentang" className={styles.about} aria-labelledby="tentang-title">
      <h2 id="tentang-title" className={styles.label}>
        tentang
      </h2>
      <Manifesto />
      <div className={styles.tools}>
        {TOOLS.map(({ group, items }) => (
          <div key={group}>
            <h3 className={styles.group}>{group}</h3>
            <ul className={styles.items}>
              {items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
