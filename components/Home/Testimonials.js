import { StarFilled, StarOutlined } from "@ant-design/icons";

export default function Testimonials() {
  return (
    <div className="mt-1 container pt-5 pb-5">
      <h3 className="numan text-center font-weight-bold">Testimonials</h3>
      <div className="mt-5 d-flex flex-wrap">
        <div className="container-fluid shadow px-4 py-4 testimonial-card mt-4">
          <div className="row">
            <div className="col">
              <StarFilled style={{ color: "#FFD600", fontSize: "12px" }} />
              <StarFilled style={{ color: "#FFD600", fontSize: "12px" }} />
              <StarFilled style={{ color: "#FFD600", fontSize: "12px" }} />
              <StarFilled style={{ color: "#FFD600", fontSize: "12px" }} />
              <StarOutlined style={{ fontSize: "12px" }} />
            </div>
            <div
              className="col text-right"
              style={{ fontStyle: "italic", fontSize: "12px" }}
            >
              2 days ago
            </div>
          </div>
          <p className="mt-4">
            “Words cannot express the thanks that my family has for each and
            every Mount Camel early childhood teacher. Since my son enrolled, he
            has grown and matured into an amazing, intelligent young man”.
          </p>
          <div className="d-flex">
            <img
              src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
              alt="Welcome picture"
              className="rounded-circle"
              width={52}
              height={52}
            />
            <div className="mt-1 ml-3">
              <div style={{ fontSize: 15, fontWeight: "700" }}>
                Marie Hanson
              </div>
              <div style={{ fontSize: 13, fontStyle: "italic" }}>Parent</div>
            </div>
          </div>
        </div>
        <div className="container-fluid shadow px-4 py-4 testimonial-card mt-4">
          <div className="row">
            <div className="col">
              <StarFilled style={{ color: "#FFD600", fontSize: "12px" }} />
              <StarFilled style={{ color: "#FFD600", fontSize: "12px" }} />
              <StarFilled style={{ color: "#FFD600", fontSize: "12px" }} />
              <StarFilled style={{ color: "#FFD600", fontSize: "12px" }} />
              <StarOutlined style={{ fontSize: "12px" }} />
            </div>
            <div
              className="col text-right"
              style={{ fontStyle: "italic", fontSize: "12px" }}
            >
              2 days ago
            </div>
          </div>
          <p className="mt-4">
            “Words cannot express the thanks that my family has for each and
            every Mount Camel early childhood teacher. Since my son enrolled, he
            has grown and matured into an amazing, intelligent young man”.
          </p>
          <div className="d-flex">
            <img
              src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
              alt="Welcome picture"
              className="rounded-circle"
              width={52}
              height={52}
            />
            <div className="mt-1 ml-3">
              <div style={{ fontSize: 15, fontWeight: "700" }}>
                Marie Hanson
              </div>
              <div style={{ fontSize: 13, fontStyle: "italic" }}>Parent</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
