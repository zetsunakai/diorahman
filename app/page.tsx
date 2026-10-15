import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero/Hero";
import { ProjectGallery } from "@/components/Works/ProjectGallery";
import { TechStack } from "@/components/TechStack";
import { getFeatured } from "@/lib/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <TechStack />
      <ProjectGallery projects={getFeatured()} />
      <About />
      <Contact />
    </>
  );
}
