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
            Mount Carmel School' graduates are prepared for college and career to enable them to become productive citizens and successful members of the workforce.  Mount Carmel School recognizes that when families are engaged in their children's education, the students achieve higher grades, have better attendance and behavior, complete more homework and demonstrate a more positive attitude toward school. We believe that building meaningful and authentic partnerships with our families and communities is the best way to ensure our students' success in school, careers and life.
          </p>
        </div>
      </div>
    </div>
  );
}
