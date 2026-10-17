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
    tools: "Odoo · Django · Manufacturing/Production · Workflow",
    description:
      "Saya mengembangkan modul Manufacturing/Production di Odoo dan Django, termasuk perencanaan produksi, reservasi material, dan approval.",
    project: "Manufacturing Approval",
    slug: "manufacturing-approval",
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
        <h2 id="about-title">Tentang Saya</h2>
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
            Halo! Saya <strong>Dio</strong>. Pekerjaan saya mencakup website
            layanan, aplikasi inventory, dan pengembangan ERP.
          </p>
          <p>
            MUA Ranni dan IT Inventory adalah contoh dua proyek web yang saya
            kerjakan. Di proyek MUA Ranni saya membuat web untuk layanan makeup
            dan menerima detail booking lewat WhatsApp. Di proyek IT Inventory saya
            menangani pencatatan stok dan transaksi gudang untuk dokumen BEACUKAI.
          </p>
          <p>
            Di HashMicro, saya bekerja sebagai ERP Developer dengan fokus pada
            modul Manufacturing/Production di Odoo dan Django. Saya mengerjakan
            perencanaan produksi, reservasi material, dan alur persetujuan,
            serta laporan inventory dan integrasi CEISA.
          </p>
        </div>
        <div className="skills">
          {skills.map((skill) => (
            <div className="skill" key={skill.title}>
              <h3>{skill.title}</h3>
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
