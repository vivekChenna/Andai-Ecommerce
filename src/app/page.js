import { Carousel } from "@/components/carousel";
import { ThreeItemGrid } from "@/components/grid/three-items";
import Features from "@/components/Home/Features";
import Hero from "@/components/Home/Hero";
import Marketplace from "@/components/Home/Marketplace";
import SearchFeature from "@/components/Home/SearchFeature";
import Footer from "@/components/layout/footer";
import Search from "@/components/layout/navbar/search";

export default function Home() {
  return (
    <main className="bg-[#FFF8E3]">
      <Hero />
      <Features />
      <SearchFeature />
      <Marketplace />
      <Footer />
    </main>
  );
}
