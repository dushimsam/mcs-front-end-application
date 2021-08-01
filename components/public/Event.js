import Link from "next/link";
export default function Event() {
  return (
    <Link href="/event">
      <div
        className="card shadow-sm event mr-md-5 mt-4"
        style={{ width: "15rem" }}
      >
        <img
          src="/images/school-img.png"
          className="card-img-top"
          alt="Event picture"
        />
        <div className="card-body">
          <h5
            className="card-title text-center pt-4"
            style={{
              fontSize: "16px",
              fontWeight: "700",
            }}
          >
            The 2021 Graduation
          </h5>
          <p className="card-text pt-1 px-3 pb-3" style={{ fontSize: "14px" }}>
            Some quick example text to bui on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
    </Link>
  );
}
