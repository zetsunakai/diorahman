const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Python",
  "PostgreSQL",
  "Docker",
  "Vite",
  "Odoo",
];

export function TechStack() {
  return (
    <div className="stackstrip" aria-label="Teknologi yang digunakan">
      <span className="mono">
        TEKNOLOGI
        <br />
        YANG DIGUNAKAN
      </span>
      <div className="stackitems">
        {technologies.map((technology) => (
          <span key={technology}>{technology}</span>
        ))}
      </div>
    </div>
  );
}
