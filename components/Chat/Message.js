export default function Message({ msg, index }) {
  return (
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
            msg.messageDirection === "FORWARD" ? "bg-blue" : "bg-light"
          } `}
        >
          <p
            className={`text-small mb-0 ${
              msg.messageDirection === "FORWARD" ? "text-white" : "text-muted"
            }`}
          >
            {msg.message}
          </p>
        </div>
        <p className="small text-muted">
          {msg.lastModifiedAt[4].split(":")[0]}:
          {msg.lastModifiedAt[4].split(":")[1]} | {msg.lastModifiedAt[1]}{" "}
          {msg.lastModifiedAt[2]}
        </p>
      </div>
    </div>
  );
}
