import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import portrait from "@/public/images/dio-rahman.png";

const skills = [
  {
    title: "Frontend",
    tools: "React · Next.js · TypeScript · Tailwind CSS",
    description:
      "Antarmuka publik, galeri, dan formulir booking pada MUA Ranni.",
    project: "MUA Ranni",
    slug: "mua-ranni",
  },
  {
    title: "Backend & Database",
    tools: "Python · Django · PostgreSQL · Drizzle ORM · Supabase",
    description:
      "Data stok dan akses pengguna di IT Inventory; autentikasi admin di MUA Ranni.",
    project: "IT Inventory",
    slug: "it-inventory",
  },
  {
    title: "Business Applications",
    tools: "Odoo · HMX · Custom Module · Workflow",
    description:
      "Menghubungkan sales order, penjadwalan tim, dan work order dalam alur Odoo.",
    project: "Booking & Work Order",
    slug: "booking-work-order",
  },
  {
    title: "Tools",
    tools: "Docker · Git · Vite · Linux",
    description:
      "Docker Compose untuk database lokal IT Inventory, dengan pengujian Vitest dan Playwright di repo.",
    project: "IT Inventory",
    slug: "it-inventory",
  },
];

export function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="about-heading">
        <h2 id="about-title">
          Memahami proses,
          <br />
          baru menulis kode.
        </h2>
        <p className="about-aside">
          Antarmuka yang jelas perlu ditopang alur dan data yang bisa
          diandalkan.
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
            Saya <strong>{site.name}</strong>. Hal yang saya suka dari
            pengembangan web adalah mengurai kebutuhan menjadi bagian yang bisa
            dikerjakan: apa yang dilihat pengguna, apa yang diproses aplikasi,
            dan bagaimana datanya disimpan.
          </p>
          <p>
            Di MUA Ranni, fokusnya mempertemukan portofolio, jadwal, dan
            pemesanan. Di IT Inventory, saya berhadapan dengan transaksi gudang
            dan hak akses. Kontribusi pada Odoo dan HMX mengasah pemahaman saya
            terhadap produksi, inventory, dan proses bisnis di balik layar.
          </p>
          <p>
            Saya membawa pendekatan itu ke pekerjaan full-stack: membangun
            antarmuka dengan React/Next.js sambil menjaga hubungan antara
            interaksi, logika aplikasi, dan database.
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
