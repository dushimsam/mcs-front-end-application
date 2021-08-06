import { PlusCircleFilled } from "@ant-design/icons";
import { useState } from "react";
import ChooseReciever from "../components/Chat/ChooseReciever";
import Compose from "../components/Chat/Compose";

export default function Chat() {
  const [showOptions, setShowOptions] = useState(true);
  const [showMsg, setShowMsg] = useState(true);
  const [receiverNum, setRecieverNum] = useState(0);
  const [compose, setCompose] = useState(false);
  const [receivers, setReceivers] = useState([
    {
      id: 1,
      fname: "Jason",
      lname: "Porker",
      profile:
        "https://i.pinimg.com/originals/70/e8/a0/70e8a0258a9bb5c0be5f10b5a7646733.jpg",
    },
    {
      id: 2,
      fname: "Jason",
      lname: "Porker",
      profile: "https://wallpaperaccess.com/full/2068794.jpg",
    },
  ]);
  const [parents, setParents] = useState([
    {
      id: 1,
      fname: "Blue",
      lname: "Lark",
      profile:
        "https://i.pinimg.com/originals/70/e8/a0/70e8a0258a9bb5c0be5f10b5a7646733.jpg",
    },
    {
      id: 2,
      fname: "Jason",
      lname: "Porker",
      profile: "https://wallpaperaccess.com/full/2068794.jpg",
    },
    {
      id: 3,
      fname: "Jason",
      lname: "Porker",
      profile:
        "https://i.pinimg.com/originals/66/41/18/664118c62dc574f2eeff8690225bb9a1.jpg",
    },
    {
      id: 4,
      fname: "Jason",
      lname: "Porker",
      profile:
        "https://i.pinimg.com/originals/70/e8/a0/70e8a0258a9bb5c0be5f10b5a7646733.jpg",
    },
    {
      id: 5,
      fname: "Jason",
      lname: "Porker",
      profile: "https://wallpaperaccess.com/full/2068794.jpg",
    },
  ]);
  const [searchResults, setSearchResults] = useState(null);

  const [chats, setChats] = useState([
    {
      sender: "uid",
      receiver: {
        id: "221b",
        fname: "Jason",
        lname: "Doe",
        profile: "/images/user.jpg",
      },
      messages: [
        {
          content:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.",
          datedone: new Date().toString().split(" "),
          status: "FORWARD",
        },
      ],
    },
    {
      sender: "uid",
      receiver: {
        id: "221b",
        fname: "Jason",
        lname: "Doe",
        profile: "/images/user.jpg",
      },
      messages: [
        {
          content:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.",
          datedone: new Date().toString().split(" "),
          status: "FORWARD",
        },
      ],
    },
  ]);

  const [message, setMessage] = useState("");

  const addReciever = (index, pId) => {
    let temp = [...receivers];
    let pIndex = receivers.findIndex((r) => r.id === pId);
    if (pIndex > -1) return;
    temp.push(parents[index]);
    setReceivers(temp);
  };

  const removeReceiver = (pId) => {
    let temp = [...receivers];
    temp = temp.filter((p) => p.id !== pId);
    setReceivers(temp);
  };

  const searchParent = (search) => {
    if (search !== " " && search !== "") {
      let temp = [...parents];
      let term = search.toLowerCase();
      let results = temp.filter(
        (p) =>
          p.fname.toLowerCase().startsWith(term) ||
          p.lname.toLowerCase().startsWith(term)
      );
      setSearchResults(results);
    } else setSearchResults(null);
  };

  const toOneOrMany = () => {
    setRecieverNum(1);
    setShowMsg(false);
    setShowOptions(true);
  };
  const toAll = () => {
    setRecieverNum(2);
    setShowMsg(false);
    setShowOptions(true);
  };

  //   const composeMsg = (details) =>{

  //   }
  return (
    <div className="container-fluid position-relative">
      <div className="row rounded-lg overflow-hidden shadow">
        {/* <!-- Users box--> */}
        <div className="col-4 px-0 position-relative">
          <div className="bg-white position-fixed chat-sidebar">
            <div
              className="new-chat-option position-fixed shadow py-3"
              hidden={showOptions}
            >
              <div
                className="chat-option px-4 py-2 add-border"
                onClick={toOneOrMany}
              >
                One or Many Parent(s)
              </div>
              <div className="chat-option px-4 pt-2" onClick={toAll}>
                All Parents
              </div>
            </div>
            <PlusCircleFilled
              className="position-fixed new-message-btn"
              onClick={() => setShowOptions(!showOptions)}
            />
            {/* </div> */}
            <div className="bg-gray px-4 py-2 bg-light">
              <p className="h5 mb-0 py-1">Chat</p>
            </div>

            <div className="messages-box">
              <div className="list-group rounded-0">
                {chats.map((chat) => (
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
                          <h6 className="mb-0 user-name">
                            {chat.receiver.fname} {chat.receiver.lname}
                          </h6>
                          <small className="small font-weight-bold">
                            {chat.messages[0].datedone[2]}{" "}
                            {chat.messages[0].datedone[1]}
                          </small>
                        </div>
                        <p className="font-sm mb-0 text-small">
                          {chat.messages[0].content}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}

                {/* <a
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
                </a> */}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Chat Box--> */}
        {showMsg ? (
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
        ) : compose ? (
          <Compose receivers={receivers} />
        ) : (
          <ChooseReciever
            parents={parents}
            receivers={receivers}
            addReciever={addReciever}
            removeReceiver={removeReceiver}
            searchParent={searchParent}
            searchResults={searchResults}
            setCompose={setCompose}
            setShowMsg={setShowMsg}
          />
        )}
      </div>
    </div>
  );
}
