import About from "../components/Home/About";
import HeroSection from "../components/Home/HeroSection";
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
      <div className="mt-5 container pt-5 pb-5">
        <h3 className="numan text-center">Our wonderful teachers</h3>
        <div className="mt-5 d-flex">
          <div className="testimonial-card">
            <img
              src="https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHBlcnNvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
              alt="teacher picture"
              style={{ borderRadius: 10 }}
              width="100%"
              height="80%"
            />
            <div>
              <div style={{ fontSize: 15, fontWeight: "700" }}>
                Marie Hanson
              </div>
              <div style={{ fontSize: 13, fontStyle: "italic" }}>Parent</div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                quis sagittis odio, faucibus gravida sem. Suspendisse potenti.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
