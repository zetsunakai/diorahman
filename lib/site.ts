export const site = {
  name: "Dio Rahman Alfateh",
  role: "Full-Stack Developer",
  intro:
    "Saya Dio. Saya mengembangkan aplikasi web dengan React/Next.js dan Python, dari antarmuka hingga database. Pengalaman Odoo membantu saya memahami alur bisnis di baliknya.",
  url: "https://diorahman.vercel.app",
  // Hanya isi kanal pribadi yang sudah dikonfirmasi untuk dipublikasikan.
  email: "",
  github: "https://github.com/zetsunakai",
  linkedin: "",
  // PDF saat ini adalah placeholder. Aktifkan setelah CV asli diperiksa.
  cv: null as string | null,
};

export const contactChannels = [
  { label: "Email", href: site.email ? `mailto:${site.email}` : "" },
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
].filter((channel) => channel.href.trim().length > 0);

export const primaryContact = contactChannels[0];
