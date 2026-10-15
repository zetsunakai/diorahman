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
        TOOLS OF
        <br />
        THE TRADE
      </span>
      <div className="stackitems">
        {technologies.map((technology) => (
          <span key={technology}>{technology}</span>
        ))}
      </div>
    </div>
  );
}
