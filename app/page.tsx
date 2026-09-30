import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero/Hero";
import { HorizontalGallery } from "@/components/Works/HorizontalGallery";
import { getFeatured } from "@/lib/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <HorizontalGallery projects={getFeatured()} />
      <About />
      <Contact />
    </>
  );
}
