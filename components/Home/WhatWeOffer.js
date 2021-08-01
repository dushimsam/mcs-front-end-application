import {
  SecurityScanOutlined,
  TrophyOutlined,
  BookOutlined,
  LaptopOutlined,
} from "@ant-design/icons";

export default function WhatWeOffer() {
  return (
    <div className="mt-10 container-fluid">
      <h3 className="numan text-center">What We Offer</h3>
      <div className="container-fluid d-flex flex-column flex-md-row justify-content-sm-center align-items-center mt-2">
        <div className="w-100 d-flex flex-column justify-content-center align-items-center mt-5 mr-md-5">
          <SecurityScanOutlined style={{ fontSize: "22px" }} />
          <div className="offer-md mt-4">Safest First</div>
          <div className="offer-sm mt-1 text-center">
            We priotize the kids security
          </div>
        </div>
        <div className="w-100 d-flex flex-column justify-content-center align-items-center mt-5 mr-md-5">
          <TrophyOutlined style={{ fontSize: "22px" }} />
          <div className="offer-md mt-4">International Certified Teachers</div>
          <div className="offer-sm mt-1 text-center">
            We hire only the most experienced and certified teachers for your
            children.
          </div>
        </div>
        <div className="w-100 d-flex flex-column justify-content-center align-items-center mt-5 mr-md-5">
          <BookOutlined style={{ fontSize: "22px" }} />
          <div className="offer-md mt-4">Interactive courses</div>
          <div className="offer-sm mt-1 text-center">
            We provide students with interactive courses that help them gain
            skills and knowledge both theoritically and also in practice
          </div>
        </div>
        <div className="w-100 d-flex flex-column justify-content-center align-items-center mt-5 mr-md-5">
          <LaptopOutlined style={{ fontSize: "22px" }} />
          <div className="offer-md mt-4">Digitilized learning</div>
          <div className="offer-sm mt-1 text-center">
            We hire only the most experienced and certified teachers for your
            children.
          </div>
        </div>
      </div>
    </div>
  );
}
