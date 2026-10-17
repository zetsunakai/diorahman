import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero/Hero";
import { PlaygroundSection } from "@/components/Playground/PlaygroundSection";
import { ProjectGallery } from "@/components/Works/ProjectGallery";
import { TechStack } from "@/components/TechStack";
import { getFeatured } from "@/lib/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <TechStack />
      <ProjectGallery projects={getFeatured()} />
      <Experience />
      <About />
      <PlaygroundSection />
      <Contact />
    </>
  );
}
