import { PlusCircleFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import chatService from "../../services/messaging/chat.service";
import ChooseReciever from "./ChooseReciever";
import Data from "./data.json";

export default function Chat() {
  // const authUser = useSelector((state) => state.authUser);
  const [messages, setMessages] = useState([...Data]);
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState("");
  const [currentChat, setCurrentChat] = useState(undefined);

  const [message, setMessage] = useState("");

  const [showMsg, setShowMsg] = useState(true);
  const [showOptions, setShowOptions] = useState(true);

  const makeChats = () => {
    let messageCopy = [...messages];

    //get receivers
    let newChats = messageCopy.map((msg) => {
      return {
        receiver: { ...msg.receiver },
        messages: [],
      };
    });

    let newChatsUnique = newChats.filter((c, index) => {
      return (
        newChats.findIndex((x) => x.receiver.id === c.receiver.id) === index
      );
    });

    //get messages for each receiver
    messageCopy.map((msg) => {
      let index = newChatsUnique.findIndex(
        (x) => x.receiver.id === msg.receiver.id
      );
      newChatsUnique[index].messages.push({
        ...msg.message,
        lastModifiedAt: new Date(msg.message.lastModifiedAt)
          .toString()
          .split(" "),
      });
    });

    setChats(newChatsUnique);
    setCurrentChatId(newChatsUnique[0].receiver.id);
    setCurrentChat(newChatsUnique[0]);
  };

  const toOneOrMany = () => {};
  const toAll = () => {};

  const filterMessages = () => {
    let temp = [...chats];
    temp = temp.filter((c) => c.receiver.id === currentChatId);
    setCurrentChat(temp[0]);
  };

  const composeMessage = (e) => {
    e.preventDefault();
    /* Send Message */
    console.log("Send message");
  };

  useEffect(() => {
    makeChats();
  }, []);

  useEffect(() => {
    filterMessages();
  }, [currentChatId]);

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
                            {chat.receiver.firstName} {chat.receiver.lastName}
                          </h6>
                          {chat.messages.length !== 0 && (
                            <small className="small font-weight-bold">
                              {chat.messages[0].lastModifiedAt[2]}{" "}
                              {chat.messages[0].lastModifiedAt[1]}
                            </small>
                          )}
                        </div>
                        <p className="font-sm mb-0 text-small">
                          {chat.messages.length !== 0 &&
                            chat.messages[0].message}
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
              {chats.length !== 0 && currentChat ? (
                currentChat.messages.length !== 0 ? (
                  currentChat.messages.map((msg, index) => (
                    <div
                      className={`media w-50 mb-3 ${
                        msg.messageDirection === "FORWARD" && "ml-auto"
                      }`}
                      key={index}
                    >
                      {msg.messageDirection === "REVERSE" ? (
                        <img
                          src="/images/user.jpg"
                          alt="user"
                          width="50"
                          height="50"
                          className="rounded-circle"
                        />
                      ) : null}
                      <div className="media-body ml-3">
                        <div
                          className={`rounded py-2 px-3 mb-2 ${
                            msg.messageDirection === "FORWARD"
                              ? "bg-blue"
                              : "bg-light"
                          } `}
                        >
                          <p
                            className={`text-small mb-0 ${
                              msg.messageDirection === "FORWARD"
                                ? "text-white"
                                : "text-muted"
                            }`}
                          >
                            {msg.message}
                          </p>
                        </div>
                        <p className="small text-muted">
                          {msg.lastModifiedAt[4].split(":")[0]}:
                          {msg.lastModifiedAt[4].split(":")[1]} |{" "}
                          {msg.lastModifiedAt[1]} {msg.lastModifiedAt[2]}
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
                    // onClick={composeMessage}
                  >
                    {" "}
                    <i className="fa fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div>Choose</div>
          // <ChooseReciever
          //   parents={parents}
          //   receivers={receivers}
          //   addReciever={addReciever}
          //   removeReceiver={removeReceiver}
          //   searchParent={searchParent}
          //   searchResults={searchResults}
          //   setCompose={setCompose}
          //   setShowMsg={setShowMsg}
          // />
        )}
      </div>
    </div>
  );
}
