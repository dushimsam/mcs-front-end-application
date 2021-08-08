import { PlusCircleFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import ChooseReciever from "./ChooseReciever";
import Compose from "./Compose";

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
        id: "221a",
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
        {
          content: "Test, which is a new approach to have",
          datedone: new Date().toString().split(" "),
          status: "REVERSE",
        },
        {
          content: "Test, which is a new approach to have",
          datedone: new Date().toString().split(" "),
          status: "FORWARD",
        },
        {
          content: "Test, which is a new approach to have",
          datedone: new Date().toString().split(" "),
          status: "REVERSE",
        },
        {
          content: "Test, which is a new approach to have",
          datedone: new Date().toString().split(" "),
          status: "FORWARD",
        },
        {
          content: "Test, which is a new approach to have",
          datedone: new Date().toString().split(" "),
          status: "REVERSE",
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
            "Second Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.",
          datedone: new Date().toString().split(" "),
          status: "FORWARD",
        },
        {
          content: "Test, which is a new approach to have",
          datedone: new Date().toString().split(" "),
          status: "REVERSE",
        },
        {
          content: "Test, which is a new approach to have",
          datedone: new Date().toString().split(" "),
          status: "FORWARD",
        },
        {
          content: "Test, which is a new approach to have",
          datedone: new Date().toString().split(" "),
          status: "REVERSE",
        },
        {
          content: "Test, which is a new approach to have",
          datedone: new Date().toString().split(" "),
          status: "FORWARD",
        },
        {
          content: "Test, which is a new approach to have",
          datedone: new Date().toString().split(" "),
          status: "REVERSE",
        },
      ],
    },
    {
      sender: "uid",
      receiver: {
        id: "221c",
        fname: "Jason",
        lname: "Doe",
        profile: "/images/user.jpg",
      },
      messages: [
        {
          content:
            "Third Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.",
          datedone: new Date().toString().split(" "),
          status: "FORWARD",
        },
        {
          content: "Test, which is a new approach to have",
          datedone: new Date().toString().split(" "),
          status: "REVERSE",
        },
        {
          content: "Test, which is a new approach to have",
          datedone: new Date().toString().split(" "),
          status: "FORWARD",
        },
        {
          content: "Test, which is a new approach to have",
          datedone: new Date().toString().split(" "),
          status: "REVERSE",
        },
        {
          content: "Test, which is a new approach to have",
          datedone: new Date().toString().split(" "),
          status: "FORWARD",
        },
        {
          content: "Test, which is a new approach to have",
          datedone: new Date().toString().split(" "),
          status: "REVERSE",
        },
      ],
    },
    {
      sender: "uid",
      receiver: {
        id: "221d",
        fname: "Jason",
        lname: "Doe",
        profile: "/images/user.jpg",
      },
      messages: [
        {
          content:
            "Fourth Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.",
          datedone: new Date().toString().split(" "),
          status: "FORWARD",
        },
        {
          content: "Test, which is a new approach to have",
          datedone: new Date().toString().split(" "),
          status: "REVERSE",
        },
        {
          content: "Test, which is a new approach to have",
          datedone: new Date().toString().split(" "),
          status: "FORWARD",
        },
        {
          content: "Test, which is a new approach to have",
          datedone: new Date().toString().split(" "),
          status: "REVERSE",
        },
        {
          content: "Test, which is a new approach to have",
          datedone: new Date().toString().split(" "),
          status: "FORWARD",
        },
        {
          content: "Test, which is a new approach to have",
          datedone: new Date().toString().split(" "),
          status: "REVERSE",
        },
      ],
    },
  ]);

  const [message, setMessage] = useState("");

  const [currentChatId, setCurrentChatId] = useState("221a");

  const [currentChat, setCurrentChat] = useState([]);

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

  const filterMessages = () => {
    let temp = [...chats];
    temp = temp.filter((c) => c.receiver.id === currentChatId);
    setCurrentChat(temp);
  };

  const newChat = () => {
    let new_c = {
      sender: "uid",
      receiver: { ...receivers[0] },
      messages: [],
    };

    let temp = [...chats];
    temp = [new_c].concat(temp);
    setChats(temp);
    setShowMsg(true);
    return new_c;
  };

  const composeMessage = (e) => {
    e.preventDefault();
    // if (e.key === "Enter") {
    //   if (message !== "") {
    //     console.log("Message sent");
    //   }
    // }
    /* TODO: Check if reverse or forward */
    let temp = { ...currentChat[0] };
    let newMessage = {
      content: message,
      datedone: new Date().toString().split(" "),
      status: "FORWARD",
    };
    temp.messages = temp.messages.concat(newMessage);
    console.log(temp);
    setCurrentChat([temp]);
  };

  useEffect(() => {
    filterMessages();
  }, [currentChatId]);

  useEffect(() => {
    if (compose) {
      // //new chat
      let chat = newChat();
      setCurrentChatId(chat.receiver.id);
    }
  }, [compose]);

  // useEffect(() => {
  //   composeMessage();
  // }, [message]);
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
                  <div
                    className={`list-group-item list-group-item-action list-group-item-light rounded-0 ${
                      currentChatId === chat.receiver.id ? "active" : null
                    }`}
                    key={chat.receiver.id}
                    onClick={() => setCurrentChatId(chat.receiver.id)}
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
                          {chat.messages.length !== 0 && (
                            <small className="small font-weight-bold">
                              {chat.messages[0].datedone[2]}{" "}
                              {chat.messages[0].datedone[1]}
                            </small>
                          )}
                        </div>
                        <p className="font-sm mb-0 text-small">
                          {chat.messages.length !== 0 &&
                            chat.messages[0].content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Chat Box--> */}
        {showMsg ? (
          <div className="col-8 px-0 chat-box">
            <div
              className="pr-4 py-5 content bg-white"
              style={{ height: "100vh" }}
            >
              {currentChat.length !== 0 ? (
                currentChat[0].messages.length !== 0 ? (
                  currentChat[0].messages.map((msg, index) => (
                    <div
                      className={`media w-50 mb-3 ${
                        msg.status === "FORWARD" && "ml-auto"
                      }`}
                      key={index}
                    >
                      {msg.status === "REVERSE" ? (
                        <img
                          src={currentChat[0].receiver.profile}
                          alt="user"
                          width="50"
                          height="50"
                          className="rounded-circle"
                        />
                      ) : null}
                      <div className="media-body ml-3">
                        <div
                          className={`rounded py-2 px-3 mb-2 ${
                            msg.status === "FORWARD" ? "bg-blue" : "bg-light"
                          } `}
                        >
                          <p
                            className={`text-small mb-0 ${
                              msg.status === "FORWARD"
                                ? "text-white"
                                : "text-muted"
                            }`}
                          >
                            {msg.content}
                          </p>
                        </div>
                        <p className="small text-muted">
                          {msg.datedone[4].split(":")[0]}:
                          {msg.datedone[4].split(":")[1]} | {msg.datedone[1]}{" "}
                          {msg.datedone[2]}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ height: "100vh" }}>
                    Send and receive messages
                  </div>
                )
              ) : (
                <div>Start chatting</div>
              )}
            </div>

            {/* <!-- Typing area --> */}
            <form
              action="#"
              className="bg-light position-fixed type-message"
              // onKeyDown={composeMessage}
            >
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Type a message"
                  aria-describedby="button-addon2"
                  className="form-control rounded-0 border-0 py-4 bg-light pl-4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div className="input-group-append pr-2">
                  <button
                    id="button-addon2"
                    type="submit"
                    className="btn btn-link"
                    onClick={composeMessage}
                  >
                    {" "}
                    <i className="fa fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
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
