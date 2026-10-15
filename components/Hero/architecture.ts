export const architectureLayers = [
  {
    id: "frontend",
    label: "Frontend",
    stack: "React / Next.js",
    description:
      "Saya mengerjakan galeri dan formulir booking WhatsApp di MUA Ranni.",
    href: "/karya/mua-ranni",
    linkLabel: "Baca studi kasus MUA Ranni",
  },
  {
    id: "backend",
    label: "Backend",
    stack: "Python / Django",
    description:
      "Saya mengerjakan validasi, approval, dan proses produksi pada modul Odoo dan HMX.",
    href: "/#experience",
    linkLabel: "Lihat pengalaman backend",
  },
  {
    id: "database",
    label: "Database",
    stack: "PostgreSQL",
    description:
      "Saya mengerjakan query stok dan pembatasan akses gudang di IT Inventory.",
    href: "/karya/it-inventory",
    linkLabel: "Baca studi kasus IT Inventory",
  },
] as const;

export type ArchitectureLayer = (typeof architectureLayers)[number]["id"];
