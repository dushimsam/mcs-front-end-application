import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import chatService from "../../services/messaging/chat.service";
import parentService from "../../services/users/parent-service";
import schoolEmployeeService from "../../services/users/school-employee-service";
import ChatSidebar from "./ChatSidebar";
import ChooseReciever from "./ChooseReciever";
import Message from "./Message";
import TypingArea from "./TypingArea";

export default function Chat() {
  const authUser = useSelector((state) => state.authUser);
  const [messages, setMessages] = useState([]);
  const [toAllMessages, setToAllMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [getChats, setGetChats] = useState(true);
  const [currentChatId, setCurrentChatId] = useState("");
  const [currentChat, setCurrentChat] = useState(undefined);

  const [message, setMessage] = useState("");
  const [receivers, setReceivers] = useState([]);
  const [receivingUsers, setReceivingUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const [searchResults, setSearchResults] = useState(null);

  const [showMsg, setShowMsg] = useState(true);
  const [showOptions, setShowOptions] = useState(true);
  const [offset, setOffset] = useState(0);

  const messagesEndRef = useRef(null);
  const boxRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toOneOrMany = () => {
    setShowMsg(false);
    setShowOptions(true);
  };
  const toAll = () => {
    setCurrentChatId("all");
    setShowMsg(true);
    setShowOptions(true);
  };

  const composeMessage = async (e, msg, receiverId) => {
    e.preventDefault();
    /* Send Message */
    let newMessage = {
      user_senderId: authUser.id,
      message: msg,
      messageDirection: authUser.category === "PARENT" ? "REVERSE" : "FORWARD",
      messageStatus: currentChatId === "all" ? "ALL" : "PARTICULAR",
    };

    if (receiverId !== "all") newMessage.user_receiverId = receiverId;

    await chatService
      .sendMessage(newMessage)
      .then(async (res) => {
        if (currentChatId === "all")
          setToAllMessages(toAllMessages.concat(res.data));
        else {
          let temp = [...messages];
          await chatService
            .getParentMessageReceiver(res.data.id)
            .then((response) => {
              console.log(response.data[0]);
              temp.push({
                ...response.data[0],
                message: {
                  ...response.data[0].message,
                  lastModifiedAt: new Date(
                    response.data[0].message.lastModifiedAt
                  )
                    .toString()
                    .split(" "),
                },
              });

              let i = users.findIndex((u) => u.user.id === receiverId);
              let usersCopy = [...users];
              usersCopy[i].pos.push(temp.length - 1);
              setMessages(temp);
              setUsers(usersCopy);

              if (receiverId === currentChatId) {
                setCurrentChat(
                  currentChat.concat({
                    ...response.data[0].message,
                    lastModifiedAt: new Date(
                      response.data[0].message.lastModifiedAt
                    )
                      .toString()
                      .split(" "),
                  })
                );
              }
            });
        }
      })
      .catch((err) => console.log(err));

    setMessage("");
  };

  const addReciever = (index, pId) => {
    let temp = [...receivers];
    let pIndex = receivers.findIndex((r) => r.id === pId);
    if (pIndex > -1) return;
    temp.push(receivingUsers[index]);
    setReceivers(temp);
  };

  const removeReceiver = (pId) => {
    let temp = [...receivers];
    temp = temp.filter((p) => p.id !== pId);
    setReceivers(temp);
  };

  const searchUser = (search) => {
    if (search !== " " && search !== "") {
      let temp = [...receivingUsers];
      let term = search.toLowerCase();
      let results = temp.filter(
        (p) =>
          p.firstName.toLowerCase().startsWith(term) ||
          p.lastName.toLowerCase().startsWith(term)
      );
      setSearchResults(results);
    } else setSearchResults(null);
  };
  const getParents = () => {
    parentService.getAll().then((data) => {
      let all_parents = [];
      data.data.map((d) => all_parents.push(d.user));
      // setParents(all_parents);
      setReceivingUsers(all_parents);
    });
  };

  const getEmployees = () => {
    schoolEmployeeService.getSchoolEmployees().then((data) => {
      console.log(data);
      let all_employees = [];
      data.data.map((d) => all_employees.push(d.user));
      // setEmployees(all_employees);
      setReceivingUsers(all_employees);
    });
    setReceivingUsers([]);
  };

  const getUserChat = async () => {
    let results = [...messages];
    let to_all = [...toAllMessages];
    let to_users = [...users];
    await chatService.getUserChat(authUser.id).then((data) => {
      // console.log("Docs", data.data.docs);
      data.data.map((d, index) => {
        //check if the receiver is the current user
        if (d.receiver.id === authUser.id) {
          console.log("Receiver!!!!!!!");
          //check if the sender is already added on the list
          let i = to_users.findIndex((x) => x.user.id === d.message.sender.id);
          //if the user is not on the list
          if (i === -1) to_users.push({ user: d.message.sender, pos: [index] });
          else {
            //push other indexes
            to_users[i].pos.push(index);
          }
        } else {
          //here the current user is the sender
          //check if the receiver already on the list
          let i = to_users.findIndex((x) => x.user.id === d.receiver.id);
          //if user not on the list
          if (i === -1) to_users.push({ user: d.receiver, pos: [index] });
          else {
            //push other indexes
            to_users[i].pos.push(index);
          }
        }
        return d.message.messageStatus === "ALL"
          ? to_all.push({
              ...d.message,
              lastModifiedAt: new Date(d.message.lastModifiedAt)
                .toString()
                .split(" "),
            })
          : results.push({
              ...d,
              message: {
                ...d.message,
                lastModifiedAt: new Date(d.message.lastModifiedAt)
                  .toString()
                  .split(" "),
              },
            });
      });
    });

    setPage(page + 1);
    setUsers(to_users);
    setMessages(results);
    setGetChats(false);
    setToAllMessages(to_all);
    if (currentChatId === "") setCurrentChatId(to_users[0].user.id);
    console.log("Done!");
  };

  const handleScroll = () => {
    const scrollTop = boxRef.current.scrollTop;
    // if (scrollTop === 0) getUserChat();
  };

  useEffect(() => {
    if (getChats && authUser.id) {
      getUserChat();
      if (authUser.category === "PARENT") {
        getEmployees();
      } else if (
        authUser.category === "SCHOOL_ADMIN" ||
        authUser.category === "SCHOOL_EMPLOYEE"
      ) {
        getParents();
      }
    }
  }, [authUser]);

  const changeCurrentChat = () => {
    if (currentChatId !== "all") {
      let user = users.find((u) => u.user.id === currentChatId);
      let newChat = [];
      messages.map((msg, index) =>
        user.pos.map((p) => (p === index ? newChat.push(msg.message) : null))
      );

      setCurrentChat(newChat);
    }
  };

  useEffect(() => {
    changeCurrentChat();
  }, [currentChatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="container-fluid position-relative">
      <div className="row rounded-lg overflow-hidden shadow">
        {/* <!-- Users box--> */}
        <ChatSidebar
          showOptions={showOptions}
          setShowOptions={setShowOptions}
          toAll={toAll}
          toOneOrMany={toOneOrMany}
          setCurrentChatId={setCurrentChatId}
          currentChatId={currentChatId}
          type={authUser.category}
          setShowMsg={setShowMsg}
          users={users}
          messages={messages}
        />
        {/* <!-- Chat Box--> */}
        {showMsg && messages.length > 0 ? (
          <div className="col-8 px-0 chat-box">
            <div
              className="pr-4 py-5 content bg-white"
              style={{ height: "100vh", overflowY: "scroll" }}
              onScroll={handleScroll}
              ref={boxRef}
            >
              {currentChatId === "all" ? (
                toAllMessages.length > 0 &&
                toAllMessages.map((msg, index) => (
                  <div className="media w-50 mb-3 ml-auto" key={index}>
                    <div className="media-body ml-3">
                      <div className="rounded py-2 px-3 mb-2 bg-light">
                        <p className="text-small mb-0 text-muted">
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
              ) : currentChat ? (
                currentChat.length !== 0 ? (
                  currentChat.map((msg, index) => (
                    <Message
                      msg={msg}
                      index={index}
                      userId={authUser.id}
                      key={index}
                    />
                  ))
                ) : (
                  <div style={{ height: "100vh" }}>
                    Send and receive messages
                  </div>
                )
              ) : (
                <div>Start chatting</div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* <!-- Typing area --> */}
            <TypingArea
              message={message}
              setMessage={setMessage}
              composeMessage={composeMessage}
              receiverId={currentChatId}
            />
          </div>
        ) : (
          <ChooseReciever
            receivingUsers={receivingUsers}
            receivers={receivers}
            addReciever={addReciever}
            removeReceiver={removeReceiver}
            searchUser={searchUser}
            searchResults={searchResults}
            setShowMsg={setShowMsg}
            composeMessage={composeMessage}
          />
        )}
      </div>
    </div>
  );
}
