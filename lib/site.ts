export const site = {
  name: "Dio Rahman Alfateh",
  role: "Full-Stack Developer",
  intro:
    "Saya Dio. Saya mengembangkan aplikasi web dengan React/Next.js dan Python, dari antarmuka hingga database. Pengalaman Odoo membantu saya memahami alur bisnis di baliknya.",
  url: "https://diorahman.vercel.app",
  // Hanya isi kanal pribadi yang sudah dikonfirmasi untuk dipublikasikan.
  email: "",
  github: "https://github.com/zetsunakai",
  linkedin: "https://www.linkedin.com/in/dio-rahman-alfateh-50740a273/",
  instagram: "https://www.instagram.com/diirall_/",
  // PDF saat ini adalah placeholder. Aktifkan setelah CV asli diperiksa.
  cv: null as string | null,
};

export type ContactChannelId = "email" | "github" | "linkedin" | "instagram";

type ContactChannel = {
  id: ContactChannelId;
  label: string;
  href: string;
};

export const contactChannels: ContactChannel[] = (
  [
    {
      id: "email",
      label: "Email",
      href: site.email ? `mailto:${site.email}` : "",
    },
    { id: "github", label: "GitHub", href: site.github },
    { id: "linkedin", label: "LinkedIn", href: site.linkedin },
    { id: "instagram", label: "Instagram", href: site.instagram },
  ] satisfies ContactChannel[]
).filter((channel) => channel.href.trim().length > 0);

export const primaryContact = contactChannels[0];
