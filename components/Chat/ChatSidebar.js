import { PlusCircleFilled } from "@ant-design/icons";

export default function ChatSidebar({
  showOptions,
  setShowOptions,
  toAll,
  toOneOrMany,
  setCurrentChatId,
  currentChatId,
  type,
  setShowMsg,
  users,
  messages,
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
                onClick={() => (setCurrentChatId("all"), setShowMsg(true))}
              >
                <div className="media">
                  <img
                    src="https://lh3.googleusercontent.com/proxy/bsjsUs6UVEXR7pDzXkKPmQq9yal2n8-gfXLJ9C2IqzRIVfKHloqoYIt9buxLowdcOqnWDkKR54JCJplZC2XBgpDv1ar2enlk4Jdy6W_9OHA"
                    alt="user"
                    width="40"
                    height="40"
                    className="rounded-circle"
                  />
                  <div className="media-body ml-3">
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <h6 className="mt-2 user-name">All Parents</h6>
                      To all
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* ALL part end */}
            {users.length !== 0 ? (
              users.map((user) => (
                <div
                  className={`list-group-item list-group-item-action list-group-item-light rounded-0 ${
                    currentChatId === user.user.id ? "active" : null
                  }`}
                  key={user.user.id}
                  onClick={() => (
                    setCurrentChatId(user.user.id), setShowMsg(true)
                  )}
                >
                  <div className="media">
                    <img
                      src={
                        user.user.profile === "htttp:..."
                          ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                          : user.user.profile
                      }
                      alt="user"
                      width="40"
                      height="40"
                      className="rounded-circle"
                    />
                    <div className="media-body ml-3">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <h6 className="mt-2 user-name">
                          {user.user.firstName} {user.user.lastName}
                        </h6>
                        {/* {users.length > 0 && messages.length > 0 && (
                          <small className="small font-weight-bold">
                            {messages[user.pos[0]].message.lastModifiedAt[2]}{" "}
                            {messages[user.pos[0]].message.lastModifiedAt[1]}
                          </small>
                        )} */}
                      </div>
                      <p className="font-sm mb-0 text-small">
                        {/* {users.length > 0 &&
                          messages.length > 0 &&
                          messages[user.pos[0]].message.message} */}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">Start sending direct messages</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
