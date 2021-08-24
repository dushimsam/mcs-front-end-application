import Image from "next/image";

export default function About() {
  return (
    <div className="mt-5 container-fluid bg-gray pt-5 pb-5" id="about">
      <h3 className="numan text-center">About Us</h3>
      <div className="container mt-5 d-flex flex-column flex-md-row flex-wrap">
        <div className="about-us-img">
          <Image
            src="/app-imgs/about.jpg"
            alt="Welcome picture"
            width={500}
            height={270}
          />
        </div>
        <div className="ml-md-5 about-us-content">
            <p>
                Mt. Carmel School offers a college-preparatory program that qualifies students to attend the college or university of their choice. Recent graduates have been accepted at numerous schools including Asbury University, Calvin College, Purdue University, the University of Michigan, the University of Kentucky, and others.  </p>
        </div>
      </div>
    </div>
  );
}
