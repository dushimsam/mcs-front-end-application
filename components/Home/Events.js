import Event from "../public/Event";

export default function Events() {
  return (
    <div className="mt-5 container pt-5 pb-5">
      <h3 className="numan text-center">Latest School Events</h3>
      <div className="mt-5 d-flex flex-wrap justify-content-center align-items-center team">
        <Event />
        <Event />
        <Event />
      </div>
    </div>
  );
}
