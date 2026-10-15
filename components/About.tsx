import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import portrait from "@/public/images/dio-rahman.png";

const skills = [
  {
    title: "Frontend",
    tools: "React · Next.js · TypeScript · Tailwind CSS",
    description:
      "Saya membangun galeri, halaman layanan, dan formulir booking MUA Ranni.",
    project: "MUA Ranni",
    slug: "mua-ranni",
  },
  {
    title: "Backend & Database",
    tools: "Python · Django · PostgreSQL · Drizzle ORM · Supabase",
    description:
      "Saya mengerjakan query stok dan akses gudang di IT Inventory, serta autentikasi admin MUA Ranni.",
    project: "IT Inventory",
    slug: "it-inventory",
  },
  {
    title: "Business Applications",
    tools: "Odoo · HMX · Custom Module · Workflow",
    description:
      "Saya menyesuaikan integrasi CEISA, laporan inventory, dan alur approval pada modul Odoo.",
    project: "Penyesuaian Integrasi CEISA",
    slug: "integrasi-ceisa",
  },
  {
    title: "Tools",
    tools: "Docker · Git · Vite · Linux",
    description:
      "Saya memakai Docker Compose untuk PostgreSQL lokal di IT Inventory, serta Vitest dan Playwright untuk pengujian.",
    project: "IT Inventory",
    slug: "it-inventory",
  },
];

export function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="about-heading">
        <h2 id="about-title">
          Tentang
          <br />
          saya
        </h2>
        <p className="about-aside">
          React/Next.js, Python, Odoo, dan HMX.
        </p>
        <figure className="about-portrait">
          <div className="portrait-frame">
            <Image
              src={portrait}
              alt={`Potret ${site.name} dari kepala hingga dada`}
              fill
              sizes="(max-width: 720px) 600px, (max-width: 1000px) 64vw, 680px"
              placeholder="blur"
            />
          </div>
          <figcaption>
            <span>{site.name}</span>
            <span>{site.role}</span>
          </figcaption>
        </figure>
      </div>
      <div>
        <div className="about-copy">
          <p>
            Saya <strong>{site.name}</strong>. Pekerjaan saya mencakup website
            layanan, aplikasi inventory, dan pengembangan ERP.
          </p>
          <p>
            MUA Ranni dan IT Inventory adalah dua proyek web yang saya
            kerjakan. MUA Ranni menampilkan layanan makeup dan menerima detail
            booking lewat WhatsApp. IT Inventory menangani pencatatan stok dan
            transaksi gudang.
          </p>
          <p>
            Di HashMicro, saya berkontribusi pada modul Odoo dan HMX.
            Pekerjaannya meliputi laporan inventory, integrasi CEISA,
            perencanaan produksi, dan alur persetujuan.
          </p>
        </div>
        <div className="skills">
          {skills.map((skill, index) => (
            <div className="skill" key={skill.title}>
              <h3>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {skill.title}
              </h3>
              <p className="skill-tools">{skill.tools}</p>
              <p>{skill.description}</p>
              <Link className="text-link" href={`/karya/${skill.slug}`}>
                {skill.project} <span aria-hidden="true">↗</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
