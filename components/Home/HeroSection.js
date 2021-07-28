import Link from "next/link";
import Image from "next/image";
import { TrophyOutlined, BookOutlined, EditOutlined } from "@ant-design/icons";

export default function HeroSection() {
  return (
    <div className="container-fluid mb-3" id="home">
      <div className="d-flex flex-column flex-md-row">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          <h4 className="mt-5 mt-md-1">Welcome to </h4>
          <h1 className="mt-2 text-center">Mount Carmel Primary School</h1>
          <Link href="#contact">
            <a className="nav-link green-btn rounded-pill hero_btn mt-5">
              Learn More
            </a>
          </Link>
        </div>
        <div className="col">
          <Image
            src="/images/temp-hero.png"
            alt="Welcome picture"
            width={600}
            height={500}
          />
        </div>
      </div>

      <div className="row" style={{ color: "#fff" }}>
        <div
          className="col d-flex flex-column align-items-center justify-content-center pt-4 pb-4 "
          style={{ background: "#60CD96" }}
        >
          <div>
            <BookOutlined />
          </div>
          <div className="pt-3">Special Education</div>
        </div>
        <div
          className="col d-flex flex-column align-items-center justify-content-center pt-4 pb-4 "
          style={{ background: "#69D2E7" }}
        >
          <div>
            <TrophyOutlined />
          </div>
          <div className="pt-3">Qualified Teachers</div>
        </div>
        <div
          className="col d-flex flex-column align-items-center justify-content-center pt-4 pb-4 "
          style={{ background: "#F98F6F" }}
        >
          <div>
            <EditOutlined />
          </div>
          <div className="pt-3">Interactive Calcula-Activities</div>
        </div>
        <div
          className="col d-flex flex-column align-items-center justify-content-center pt-4 pb-4 "
          style={{ background: "#9D87C4" }}
        >
          <div>
            IN GOD <br /> We hope Wisdom & Knowledge{" "}
          </div>
          <Link href="#contact">
            <a className=" border rounded-pill px-4 py-1 mt-3">Learn More</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
