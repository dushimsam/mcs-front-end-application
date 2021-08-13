import Link from "next/link";
export default function Event({ event }) {
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html)
    }
  }
  return (
    <Link href={"/event/" + event?.id} passHref>
      <div
        className="card shadow-sm event mr-md-5 mt-4"
        style={{ width: "15rem" }}
      >
        <img
          src={event?.mainPicPath}
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
            {event?.title}
          </h5>
          <p className="card-text pt-1 px-3 pb-3" style={{ fontSize: "14px" }}>
            {event?.title + " " + event?.title}
          </p>
        </div>
      </div>
    </Link>
  );
}
