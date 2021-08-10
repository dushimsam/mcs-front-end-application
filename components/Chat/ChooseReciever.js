import { useEffect, useState } from "react";
import TypingArea from "./TypingArea";

export default function ChooseReciever({
  parents,
  receivers,
  addReciever,
  removeReceiver,
  searchParent,
  searchResults,
  setShowMsg,
  composeMessage,
}) {
  const [search, setSearch] = useState("");
  const [composing, setComposing] = useState("");
  const [message, setMessage] = useState("");

  const writeMessage = (e) => {
    e.preventDefault();
    if (receivers.length > 0) {
      setComposing(true);
    }
  };

  const sendMessageToMany = (e) => {
    e.preventDefault();
    for (let i = 0; i < receivers.length; i++) {
      composeMessage(e, message, receivers[i].id);
    }
  };

  useEffect(() => {
    searchParent(search);
  }, [search]);

  return (
    <div className="choose-receiver pt-5 position-relative pl-md-4">
      <i
        className="fas fa-times position-absolute"
        onClick={() => setShowMsg(true)}
      ></i>

      <div className="d-flex flex-wrap">
        <div className="mr-4 font-bold mt-2">Send Message to: </div>
        {receivers.map((receiver) => (
          <div
            className="parent border px-2 py-1 shadow-sm mx-1 mt-2"
            key={receiver.id}
            onClick={() => removeReceiver(receiver.id)}
          >
            {receiver.firstName} {receiver.lastName}
          </div>
        ))}
      </div>
      {!composing ? (
        <div>
          <div className="mt-5">
            {/* <form className="form-inline mt-5 my-lg-0 w-100"> */}
            <input
              className="form-control mr-sm-2 w-100 mt-5 my-lg-0 w-100"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* </form> */}
          </div>
          {searchResults === null ? (
            <div className="mt-5 d-flex flex-column">
              {parents.map((parent, index) => (
                <div className="d-flex mt-3" key={parent.id}>
                  <img
                    src="/images/user.jpg"
                    alt="user"
                    width="40"
                    height="40"
                    className="rounded-circle"
                  />
                  <div
                    className="name mt-1 ml-3"
                    onClick={() => addReciever(index, parent.id)}
                  >
                    {parent.firstName} {parent.lastName}
                  </div>
                </div>
              ))}
            </div>
          ) : searchResults.length === 0 ? (
            <div className="mt-5">😢 Sorry, No matching results</div>
          ) : (
            <div className="mt-5 d-flex flex-column">
              {searchResults.map((parent, index) => (
                <div className="d-flex mt-3" key={parent.id}>
                  <img
                    src="/images/user.jpg"
                    alt="user"
                    width="40"
                    height="40"
                    className="rounded-circle"
                  />
                  <div
                    className="name mt-1 ml-3"
                    onClick={() => addReciever(index, parent.id)}
                  >
                    {parent.firstName} {parent.lastName}
                  </div>
                </div>
              ))}
            </div>
          )}
          <button
            className="btn rounded-pill compose-btn"
            onClick={writeMessage}
          >
            Compose
          </button>
        </div>
      ) : (
        <TypingArea
          message={message}
          setMessage={setMessage}
          composeMessage={sendMessageToMany}
        />
      )}
    </div>
  );
}
