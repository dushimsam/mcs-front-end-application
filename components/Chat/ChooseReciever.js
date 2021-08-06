import { useEffect, useState } from "react";

export default function ChooseReciever({
  parents,
  receivers,
  addReciever,
  removeReceiver,
  searchParent,
  searchResults,
  setCompose,
}) {
  const [search, setSearch] = useState("");

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
            {receiver.fname} {receiver.lname}
          </div>
        ))}
      </div>
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
                src={parent.profile}
                alt="user"
                width="40"
                height="40"
                className="rounded-circle"
              />
              <div
                className="name mt-1 ml-3"
                onClick={() => addReciever(index, parent.id)}
              >
                {parent.fname} {parent.lname}
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
                src={parent.profile}
                alt="user"
                width="40"
                height="40"
                className="rounded-circle"
              />
              <div
                className="name mt-1 ml-3"
                onClick={() => addReciever(index, parent.id)}
              >
                {parent.fname} {parent.lname}
              </div>
            </div>
          ))}
        </div>
      )}
      <button
        className="btn rounded-pill compose-btn"
        onClick={() => setCompose(true)}
      >
        Compose
      </button>
    </div>
  );
}
