export default function Team() {
  return (
    <div className="mt-5 container pt-5 pb-5">
      <h3 className="numan text-center">Our wonderful teachers</h3>
      <div className="mt-5 d-flex flex-wrap justify-content-center align-items-center team">
        <div className="card mr-md-5 mt-5" style={{ width: "15rem" }}>
          <img
            src="https://images.unsplash.com/photo-1534361960057-19889db9621e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGhhcHB5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
            className="card-img-top"
            alt="Teacher Picture"
            style={{ borderRadius: 10, height: "14rem" }}
          />
          <div className="card-body">
            <h5
              className="card-title pt-4"
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#220651",
              }}
            >
              Marie Hanson
            </h5>
            <h6 className="card-title" style={{ fontSize: "14px" }}>
              English Teacher
            </h6>
            <p className="card-text" style={{ fontSize: "15px" }}>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <div className="d-flex justify-content-center mt-4">
              <i className="fab fa-twitter mr-3"></i>
              <i className="fab fa-facebook-f mr-3"></i>
              <i className="fab fa-linkedin-in mr-3"></i>
              <i className="fab fa-whatsapp"></i>
            </div>
          </div>
        </div>

        <div className="card mr-md-5 mt-5" style={{ width: "15rem" }}>
          <img
            src="https://images.unsplash.com/photo-1534361960057-19889db9621e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGhhcHB5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
            className="card-img-top"
            alt="Teacher Picture"
            style={{ borderRadius: 10, height: "14rem" }}
          />
          <div className="card-body">
            <h5
              className="card-title pt-4"
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#220651",
              }}
            >
              Marie Hanson
            </h5>
            <h6 className="card-title" style={{ fontSize: "14px" }}>
              English Teacher
            </h6>
            <p className="card-text" style={{ fontSize: "15px" }}>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <div className="d-flex justify-content-center mt-4">
              <i className="fab fa-twitter mr-3"></i>
              <i className="fab fa-facebook-f mr-3"></i>
              <i className="fab fa-linkedin-in mr-3"></i>
              <i className="fab fa-whatsapp"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
