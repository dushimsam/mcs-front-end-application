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
        <div className="d-flex flex-wrap pb-5">
          <div className="contact-part px-md-5 px-2 w-100 pt-md-5">
            <h4>Get in Touch</h4>
            <form className="mt-4 pb-5">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control border-0"
                  id="name"
                  placeholder="Name"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control border-0"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <textarea
                  type="text"
                  className="form-control border-0"
                  id="message"
                  placeholder="Message"
                />
              </div>

              <button type="submit" className="btn green-btn rounded-pill px-3">
                Send
              </button>
            </form>
          </div>
          <div className="pl-md-4">
            <Image
              src="/images/map.PNG"
              alt="Welcome picture"
              width={600}
              height={400}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
