import Image from "next/image";

export default function About() {
  return (
    <div className="mt-10 container-fluid bg-gray pt-5 pb-5" id="about">
      <h3 className="numan text-center">About Us</h3>
      <div className="container mt-5 d-flex flex-column flex-md-row flex-wrap">
        <div className="about-us-img">
          <Image
            src="/images/school-img.png"
            alt="Welcome picture"
            width={500}
            height={300}
          />
        </div>
        <div className="ml-md-5 about-us-content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis
            sagittis odio, faucibus gravida sem. Suspendisse potenti. Donec
            tellus orci, dignissim quis bibendum id, vehicula ut mauris. Donec
            maximus ipsum dolor, id vehicula mauris lobortis ut. Nunc diam
            lorem, gravida nec lacus at, luctus faucibus dui. Phasellus
            dignissim velit erat, vel lacinia metus consectetur sed. Vivamus sit
            amet libero feugiat, vestibulum libero vel, posuere orci.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis
            sagittis odio, faucibus gravida sem. Suspendisse potenti. Donec
            tellus orci, dignissim quis bibendum id, vehicula ut mauris. Donec
            maximus ipsum dolor, id vehicula mauris lobortis ut. Nunc diam
            lorem, gravida nec lacus at, luctus faucibus dui.
          </p>
        </div>
      </div>
    </div>
  );
}
