import About from "../components/Home/About";
import Events from "../components/Home/Events";
import FAQ from "../components/Home/FAQ";
import HeroSection from "../components/Home/HeroSection";
import Team from "../components/Home/Team";
import Testimonials from "../components/Home/Testimonials";
import WhatWeOffer from "../components/Home/WhatWeOffer";
import Navbar from "../components/public/Navbar";
import Image from "next/image";
import Footer from "../components/public/Footer";

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
      <div className="mt-5 container-fluid bg-gray pt-5 pb-5">
        <div className="d-flex flex-wrap">
          <div>Get in Touch</div>
          <div className="">
            <Image
              src="/images/map.PNG"
              alt="Welcome picture"
              width={600}
              height={500}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
