import type { Metadata } from "next";
import { PlaygroundSection } from "@/components/Playground/PlaygroundSection";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Eksperimen parallax interaktif Dio Rahman Alfateh. Gerakkan kursor untuk mengubah sudut pandang dengan tulisan DIO tetap di tengah.",
  alternates: { canonical: "/playground" },
};

export default function PlaygroundPage() {
  return <PlaygroundSection standalone />;
}
