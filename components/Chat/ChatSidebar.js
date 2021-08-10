import { PlusCircleFilled } from "@ant-design/icons";

export default function ChatSidebar({
  showOptions,
  setShowOptions,
  toAll,
  toOneOrMany,
  setCurrentChatId,
  currentChatId,
  messages,
  chats,
  type,
  setShowMsg,
}) {
  return (
    <div className="col-4 px-0 position-relative">
      <div className="bg-white position-fixed chat-sidebar">
        {type !== "PARENT" && (
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
              <a
                href="#general"
                style={{ textDecoration: "none", color: "#000000" }}
              >
                All Parents
              </a>
            </div>
          </div>
        )}
        <PlusCircleFilled
          className="position-fixed new-message-btn"
          onClick={() =>
            type !== "PARENT" ? setShowOptions(!showOptions) : setShowMsg(false)
          }
        />
        {/* </div> */}
        <div className="bg-gray px-4 py-2 bg-light">
          <p className="h5 mb-0 py-1">Chat</p>
        </div>

        <div className="messages-box">
          <div className="list-group rounded-0">
            {/* ALL part */}
            {type !== "PARENT" && (
              <div
                id="general"
                className={`list-group-item list-group-item-action list-group-item-light rounded-0 ${
                  currentChatId === "all" ? "active" : null
                }`}
                key="all"
                onClick={() => setCurrentChatId("all")}
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
                      <h6 className="mb-0 user-name">All Parents</h6>
                      To all
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* ALL part end */}
            {messages.length !== 0 ? (
              chats.map((chat) => (
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
                          chat.messages[chat.messages.length - 1].message}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center mt-4">
                All the receivers will appear here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
