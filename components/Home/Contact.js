import Image from "next/image";
export default function Contact() {
  return (
    <div className="mt-5 container-fluid bg-gray pt-5 pb-5">
      <div className="d-flex flex-wrap pb-5">
        <div className="contact-part px-md-5 px-2 w-100 pt-md-5">
          <h4>Get in Touch</h4>
          <form className="mt-4 pb-5">
            <div className="form-group">
              <input
                type="text"
                className="form-control border-0"
                id="name"
                placeholder="Name"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control border-0"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <textarea
                type="text"
                className="form-control border-0"
                id="message"
                placeholder="Message"
              />
            </div>

            <button type="submit" className="btn green-btn rounded-pill px-3">
              Send
            </button>
          </form>
        </div>
        <div className="pl-md-4">
          <Image
            src="/images/map.PNG"
            alt="Welcome picture"
            width={600}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
