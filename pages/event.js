import Footer from "../components/public/Footer";
import Navbar from "../components/public/Navbar";
import Image from "next/image";
import Event from "../components/public/Event";

export default function event() {
  return (
    <div className="w-100">
      <Navbar />
      <div className="mt-5 container w-100" style={{ marginBottom: "10rem" }}>
        <div>
          <h2>The 2021 Graduation</h2>
          <Image
            src="/images/school-img.png"
            alt="Welcome picture"
            width={2000}
            height={1050}
            className="mt-5"
          />
          <p className="mt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis
            sagittis odio, faucibus gravida sem. Suspendisse potenti. Donec
            tellus orci, dignissim quis bibendum id, vehicula ut mauris. Donec
            maximus ipsum dolor, id vehicula mauris lobortis ut. Nunc diam
            lorem, gravida nec lacus at, luctus faucibus dui. Phasellus
            dignissim velit erat, vel lacinia metus consectetur sed. Vivamus sit
            amet libero feugiat, vestibulum libero vel, posuere orci.
          </p>
        </div>
        <div className="mt-5">
          <div className="numan text-center font-weight-bold">
            More School Events
          </div>
          <div className="mt-5 d-flex flex-wrap justify-content-center align-items-center team">
            <Event />
            <Event />
            <Event />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
