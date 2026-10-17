import type { Metadata } from "next";
import { PlaygroundSection } from "@/components/Playground/PlaygroundSection";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Eksperimen model Emilia 3D dengan kamera parallax interaktif di playground Dio Rahman Alfateh.",
  alternates: { canonical: "/playground" },
};

export default function PlaygroundPage() {
  return <PlaygroundSection standalone />;
}
