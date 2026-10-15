export const architectureLayers = [
  {
    id: "frontend",
    label: "Frontend",
    stack: "React / Next.js",
    description:
      "Antarmuka, galeri, dan alur pemesanan yang menghubungkan pengguna dengan layanan.",
    href: "/karya/mua-ranni",
    linkLabel: "Baca studi kasus MUA Ranni",
  },
  {
    id: "backend",
    label: "Backend",
    stack: "Python / Django",
    description:
      "Aturan bisnis, validasi, dan workflow dari pengalaman pengembangan Odoo dan HMX.",
    href: "/#experience",
    linkLabel: "Lihat pengalaman backend",
  },
  {
    id: "database",
    label: "Database",
    stack: "PostgreSQL",
    description:
      "Data stok, transaksi, dan hak akses yang menopang operasional aplikasi inventory.",
    href: "/karya/it-inventory",
    linkLabel: "Baca studi kasus IT Inventory",
  },
] as const;

export type ArchitectureLayer = (typeof architectureLayers)[number]["id"];
