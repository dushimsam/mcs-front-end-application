import { useEffect, useState } from "react";
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
  const [chats, setChats] = useState([]);
  const [getChats, setGetChats] = useState(true);
  const [currentChatId, setCurrentChatId] = useState("");
  const [currentChat, setCurrentChat] = useState(undefined);

  const [message, setMessage] = useState("");
  const [receivers, setReceivers] = useState([]);
  // const [parent, setParent]
  // const [employees, setEmployees] = useState([]);
  const [receivingUsers, setReceivingUsers] = useState([]);

  const [searchResults, setSearchResults] = useState(null);

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

    if (newChatsUnique.length > 0) {
      setChats(newChatsUnique);
      if (currentChatId === "") {
        setCurrentChatId(newChatsUnique[0].receiver.id);
        setCurrentChat(newChatsUnique[0]);
      } else {
        let newindex = newChatsUnique.findIndex(
          (x) => x.receiver.id === currentChatId
        );
        if (newindex > -1) setCurrentChat(newChatsUnique[newindex]);
      }
    }
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

  const filterMessages = () => {
    if (currentChatId !== "all") {
      let temp = [...chats];
      temp = temp.filter((c) => c.receiver.id === currentChatId);
      setCurrentChat(temp[0]);
    }
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
          await chatService
            .getParentMessageReceiver(res.data.id)
            .then((result) => {
              setMessages(messages.concat(result.data));
            })
            .catch((err) => console.log(err));
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

  const retriveChats = async () => {
    let result1;
    let userChats = [];
    let to_all = [];
    await chatService
      .getUserSentMessages(authUser.id)
      .then((data) => (result1 = data.data));
    for (let i = 0; i < result1.length; i++) {
      if (result1[i].messageStatus === "ALL") {
        to_all.push(result1[i]);
      } else {
        await chatService
          .getParentMessageReceiver(result1[i].id)
          .then((data) => {
            data.data.map((d) => userChats.push(d));
          });
      }
    }
    setMessages(userChats);
    setGetChats(false);
    setToAllMessages(to_all);
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

  useEffect(() => {
    if (getChats && authUser.id) {
      retriveChats();
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

  useEffect(() => {
    filterMessages();
  }, [currentChatId]);

  useEffect(() => {
    makeChats();
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
          messages={messages}
          chats={chats}
          type={authUser.category}
          setShowMsg={setShowMsg}
        />
        {/* <!-- Chat Box--> */}
        {showMsg && messages.length > 0 ? (
          <div className="col-8 px-0 chat-box">
            <div
              className="pr-4 py-5 content bg-white"
              style={{ height: "100vh" }}
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
                    </div>
                  </div>
                ))
              ) : chats.length !== 0 && currentChat ? (
                currentChat.messages.length !== 0 ? (
                  currentChat.messages.map((msg, index) => (
                    <Message msg={msg} index={index} key={index} />
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
