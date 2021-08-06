import { useEffect, useState } from "react";

export default function ChooseReciever({ setShowMsg }) {
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
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);

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

  const searchParent = () => {
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

  useEffect(() => {
    searchParent();
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
      <button className="btn rounded-pill compose-btn">Compose</button>
    </div>
  );
}
