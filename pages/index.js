import About from "../components/Home/About";
import Events from "../components/Home/Events";
import HeroSection from "../components/Home/HeroSection";
import Team from "../components/Home/Team";
import Testimonials from "../components/Home/Testimonials";
import WhatWeOffer from "../components/Home/WhatWeOffer";
import Navbar from "../components/public/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <WhatWeOffer />
      <About />
      <Testimonials />
      <Team />
      <Events />
    </div>
  );
}
