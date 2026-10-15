import { site } from "@/lib/site";

const skills = [
  {
    title: "Frontend Development",
    description: "React · Next.js · TypeScript · Tailwind CSS",
  },
  {
    title: "Backend & Database",
    description: "Python · PostgreSQL · Drizzle ORM · Supabase",
  },
  {
    title: "Business Applications",
    description: "Odoo · Custom Module · Inventory Workflow",
  },
  { title: "Tools & Workflow", description: "Docker · Git · Vite · Linux" },
];

export function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div>
        <div className="eyebrow mono">02 / DI BALIK KODE</div>
        <h2 id="about-title">
          Memahami proses.
          <br />
          Membangun solusi.
        </h2>
      </div>
      <div>
        <p className="about-copy">
          Saya <strong>{site.name}</strong>, seorang {site.role} yang
          mengerjakan antarmuka, logika aplikasi, dan database. Saya membangun
          website layanan hingga aplikasi operasional dengan React, Next.js,
          TypeScript, dan Tailwind CSS, didukung PostgreSQL dan Docker.
          <br />
          <br />
          Lewat MUA Ranni, saya mengerjakan website portofolio, alur booking,
          dan panel admin. Di IT Inventory, saya membangun pengelolaan stok dan
          transaksi gudang. Pengalaman Python dan Odoo juga membantu saya
          memahami proses bisnis dan menerjemahkannya menjadi aplikasi yang
          mudah digunakan.
        </p>
        <div className="skills">
          {skills.map((skill, index) => (
            <div className="skill" key={skill.title}>
              <h3>
                <span>{String(index + 1).padStart(2, "0")}</span> {skill.title}
              </h3>
              <p>{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
