import About from "../components/Home/About";
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
      <div className="mt-5 container pt-5 pb-5">
        <h3 className="numan text-center">Latest School Events</h3>
      </div>
    </div>
  );
}
