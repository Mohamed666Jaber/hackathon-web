import { HeroSection } from "@/components/element/hero-section";
import { Navbar1 } from "@/components/element/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full mx-auto">
      <Navbar1 />
      <HeroSection />
    </main>
  );
}
