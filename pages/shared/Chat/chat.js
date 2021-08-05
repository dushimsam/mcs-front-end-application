import { PlusCircleFilled } from "@ant-design/icons";
export default function chat() {
  return (
    <div className="container-fluid position-relative">
      {/* <!-- For demo purpose--> */}

      <div className="row rounded-lg overflow-hidden shadow">
        {/* <!-- Users box--> */}
        <div className="col-4 px-0 position-relative">
          <div className="bg-white position-fixed chat-sidebar">
            {/* <div classNameName="position-fixed "> */}
            {/* <MessageFilled className="position-fixed new-message" /> */}
            <PlusCircleFilled className="position-fixed new-message-btn" />
            {/* </div> */}
            <div className="bg-gray px-4 py-2 bg-light">
              <p className="h5 mb-0 py-1">Chat</p>
            </div>

            <div className="messages-box">
              <div className="list-group rounded-0">
                <a
                  href="#"
                  className="list-group-item list-group-item-action list-group-item-light rounded-0"
                >
                  <div className="media">
                    <img
                      src="/images/user.jpg"
                      alt="user"
                      width="50"
                      height="50"
                      className="rounded-circle"
                    />
                    <div className="media-body ml-4">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <h6 className="mb-0 user-name">Jason Doe</h6>
                        <small className="small font-weight-bold">25 Dec</small>
                      </div>
                      <p className="font-sm mb-0 text-small">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore.
                      </p>
                    </div>
                  </div>
                </a>

                <a
                  href="#"
                  className="list-group-item list-group-item-action list-group-item-light rounded-0"
                >
                  <div className="media">
                    <img
                      src="/images/user.jpg"
                      alt="user"
                      width="50"
                      height="50"
                      className="rounded-circle"
                    />
                    <div className="media-body ml-4">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <h6 className="mb-0 user-name">Jason Doe</h6>
                        <small className="small font-weight-bold">14 Dec</small>
                      </div>
                      <p className="font-sm text-muted mb-0 text-small">
                        Lorem ipsum dolor sit amet, consectetur. incididunt ut
                        labore.
                      </p>
                    </div>
                  </div>
                </a>

                <a
                  href="#"
                  className="list-group-item list-group-item-action list-group-item-light rounded-0"
                >
                  <div className="media">
                    <img
                      src="/images/user.jpg"
                      alt="user"
                      width="50"
                      height="50"
                      className="rounded-circle"
                    />
                    <div className="media-body ml-4">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <h6 className="mb-0 user-name">Jason Doe</h6>
                        <small className="small font-weight-bold">9 Nov</small>
                      </div>
                      <p className="font-sm text-muted mb-0 text-small">
                        consectetur adipisicing elit, sed do eiusmod tempor
                        incididunt ut labore.
                      </p>
                    </div>
                  </div>
                </a>

                <a
                  href="#"
                  className="list-group-item list-group-item-action list-group-item-light rounded-0"
                >
                  <div className="media">
                    <img
                      src="/images/user.jpg"
                      alt="user"
                      width="50"
                      height="50"
                      className="rounded-circle"
                    />
                    <div className="media-body ml-4">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <h6 className="mb-0 user-name">Jason Doe</h6>
                        <small className="small font-weight-bold">18 Oct</small>
                      </div>
                      <p className="font-sm text-muted mb-0 text-small">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore.
                      </p>
                    </div>
                  </div>
                </a>

                <a
                  href="#"
                  className="list-group-item list-group-item-action list-group-item-light rounded-0"
                >
                  <div className="media">
                    <img
                      src="/images/user.jpg"
                      alt="user"
                      width="50"
                      height="50"
                      className="rounded-circle"
                    />
                    <div className="media-body ml-4">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <h6 className="mb-0 user-name">Jason Doe</h6>
                        <small className="small font-weight-bold">17 Oct</small>
                      </div>
                      <p className="font-sm text-muted mb-0 text-small">
                        consectetur adipisicing elit, sed do eiusmod tempor
                        incididunt ut labore.
                      </p>
                    </div>
                  </div>
                </a>

                <a
                  href="#"
                  className="list-group-item list-group-item-action list-group-item-light rounded-0"
                >
                  <div className="media">
                    <img
                      src="/images/user.jpg"
                      alt="user"
                      width="50"
                      height="50"
                      className="rounded-circle"
                    />
                    <div className="media-body ml-4">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <h6 className="mb-0 user-name">Jason Doe</h6>
                        <small className="small font-weight-bold">2 Sep</small>
                      </div>
                      <p className="font-sm text-muted mb-0 text-small">
                        Quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                      </p>
                    </div>
                  </div>
                </a>

                <a
                  href="#"
                  className="list-group-item list-group-item-action list-group-item-light rounded-0"
                >
                  <div className="media">
                    <img
                      src="/images/user.jpg"
                      alt="user"
                      width="50"
                      height="50"
                      className="rounded-circle"
                    />
                    <div className="media-body ml-4">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <h6 className="mb-0 user-name">Jason Doe</h6>
                        <small className="small font-weight-bold">30 Aug</small>
                      </div>
                      <p className="font-sm text-muted mb-0 text-small">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore.
                      </p>
                    </div>
                  </div>
                </a>

                <a
                  href="#"
                  className="list-group-item list-group-item-action list-group-item-light rounded-0"
                >
                  <div className="media">
                    <img
                      src="/images/user.jpg"
                      alt="user"
                      width="50"
                      height="50"
                      className="rounded-circle"
                    />
                    <div className="media-body ml-4">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6 className="mb-0 user-name">Jason Doe</h6>
                        <small className="small font-weight-bold">21 Aug</small>
                      </div>
                      <p className="font-sm text-muted mb-0 text-small">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore.
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Chat Box--> */}
        <div className="col-8 px-0 chat-box">
          <div className="pr-4 py-5 content bg-white">
            {/* <!-- Sender Message--> */}
            <div className="media w-50 mb-3">
              <img
                src="/images/user.jpg"
                alt="user"
                width="50"
                height="50"
                className="rounded-circle"
              />
              <div className="media-body ml-3">
                <div className="bg-light rounded py-2 px-3 mb-2">
                  <p className="text-small mb-0 text-muted">
                    Test which is a new approach all solutions
                  </p>
                </div>
                <p className="small text-muted">12:00 PM | Aug 13</p>
              </div>
            </div>

            {/* <!-- Reciever Message--> */}
            <div className="media w-50 ml-auto mb-3">
              <div className="media-body">
                <div className="bg-blue rounded py-2 px-3 mb-2">
                  <p className="text-small mb-0 text-white">
                    Test which is a new approach to have all solutions
                  </p>
                </div>
                <p className="small text-muted">12:00 PM | Aug 13</p>
              </div>
            </div>

            {/* <!-- Sender Message--> */}
            <div className="media w-50 mb-3">
              <img
                src="/images/user.jpg"
                alt="user"
                width="50"
                height="50"
                className="rounded-circle"
              />
              <div className="media-body ml-3">
                <div className="bg-light rounded py-2 px-3 mb-2">
                  <p className="text-small mb-0 text-muted">
                    Test, which is a new approach to have
                  </p>
                </div>
                <p className="small text-muted">12:00 PM | Aug 13</p>
              </div>
            </div>

            {/* <!-- Reciever Message--> */}
            <div className="media w-50 ml-auto mb-3">
              <div className="media-body">
                <div className="bg-blue rounded py-2 px-3 mb-2">
                  <p className="text-small mb-0 text-white">
                    Apollo University, Delhi, India Test
                  </p>
                </div>
                <p className="small text-muted">12:00 PM | Aug 13</p>
              </div>
            </div>

            {/* <!-- Sender Message--> */}
            <div className="media w-50 mb-3">
              <img
                src="/images/user.jpg"
                alt="user"
                width="50"
                height="50"
                className="rounded-circle"
              />
              <div className="media-body ml-3">
                <div className="bg-light rounded py-2 px-3 mb-2">
                  <p className="text-small mb-0 text-muted">
                    Test, which is a new approach
                  </p>
                </div>
                <p className="small text-muted">12:00 PM | Aug 13</p>
              </div>
            </div>

            {/* <!-- Reciever Message--> */}
            <div className="media w-50 ml-auto mb-3">
              <div className="media-body">
                <div className="bg-blue rounded py-2 px-3 mb-2">
                  <p className="text-small mb-0 text-white">
                    Apollo University, Delhi, India Test
                  </p>
                </div>
                <p className="small text-muted">12:00 PM | Aug 13</p>
              </div>
            </div>
          </div>

          {/* <!-- Typing area --> */}
          <form action="#" className="bg-light position-fixed type-message">
            <div className="input-group">
              <input
                type="text"
                placeholder="Type a message"
                aria-describedby="button-addon2"
                className="form-control rounded-0 border-0 py-4 bg-light pl-4"
              />
              <div className="input-group-append pr-2">
                <button
                  id="button-addon2"
                  type="submit"
                  className="btn btn-link"
                >
                  {" "}
                  <i className="fa fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
