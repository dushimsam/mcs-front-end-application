import About from "../components/Home/About";
import Events from "../components/Home/Events";
import FAQ from "../components/Home/FAQ";
import HeroSection from "../components/Home/HeroSection";
import Team from "../components/Home/Team";
import Testimonials from "../components/Home/Testimonials";
import WhatWeOffer from "../components/Home/WhatWeOffer";
import Navbar from "../components/public/Navbar";

import Footer from "../components/public/Footer";
import Contact from "../components/Home/Contact";

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
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
