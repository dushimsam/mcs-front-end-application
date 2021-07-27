import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="container">
      <div className="row">
        <div className="col"> Welcome to Mount Carmel Primary School </div>
        <div className="col">
          <Image
            src="/images/temp-hero.png"
            alt="Welcome picture"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}
