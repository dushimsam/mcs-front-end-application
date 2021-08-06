export default function ChooseReciever({ setShowMsg }) {
  return (
    <div className="choose-receiver pt-5 position-relative pl-md-4">
      <i
        className="fas fa-times position-absolute"
        onClick={() => setShowMsg(true)}
      ></i>

      <div className="d-flex ">
        <div className="mr-4 font-bold mt-1">Send Message to: </div>
        <div className="parent border px-2 py-1 shadow-sm mx-1">Kagabo</div>
        <div className="parent border px-2 py-1 shadow-sm mx-1">Murenzi</div>
      </div>
      <div className="mt-5">
        <form className="form-inline mt-5 my-lg-0 w-100">
          <input
            className="form-control mr-sm-2 w-100"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
      </div>
      <div className="mt-5 d-flex flex-column">
        <div className="d-flex mt-3">
          <img
            src="/images/user.jpg"
            alt="user"
            width="30"
            height="30"
            className="rounded-circle"
          />
          <div className="name mt-1 ml-3">Josen Doe</div>
        </div>
        <div className="d-flex mt-3">
          <img
            src="/images/user.jpg"
            alt="user"
            width="30"
            height="30"
            className="rounded-circle"
          />
          <div className="name mt-1 ml-3">Josen Doe</div>
        </div>
        <div className="d-flex mt-3">
          <img
            src="/images/user.jpg"
            alt="user"
            width="30"
            height="30"
            className="rounded-circle"
          />
          <div className="name mt-1 ml-3">Josen Doe</div>
        </div>
      </div>
      <button className="btn rounded-pill compose-btn">Compose</button>
    </div>
  );
}
