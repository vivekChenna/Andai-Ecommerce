import { Carousel } from "@/components/carousel";
import { ThreeItemGrid } from "@/components/grid/three-items";
import Features from "@/components/Home/Features";
import Hero from "@/components/Home/Hero";
import Marketplace from "@/components/Home/Marketplace";
import SearchFeature from "@/components/Home/SearchFeature";
import Footer from "@/components/layout/footer";
import Search, { SearchSkeleton } from "@/components/layout/navbar/search";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <Features />
      <Suspense fallback={<SearchSkeleton />}>
        <SearchFeature />
      </Suspense>
      <Marketplace />
      <Footer />
    </main>
  );
}
