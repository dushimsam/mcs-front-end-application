import About from "../components/Home/About";
import HeroSection from "../components/Home/HeroSection";
import WhatWeOffer from "../components/Home/WhatWeOffer";
import Navbar from "../components/public/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <WhatWeOffer />
      <About />
    </div>
  );
}
