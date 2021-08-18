export default function Message({ msg, index, userId }) {
  return (
    <div
      className={`media w-50 mb-3 ${msg.sender.id === userId && "ml-auto"}`}
      key={index}
    >
      {msg.messageDirection === "REVERSE" ? (
        <img
          src={
            msg.sender.profile === "htttp:..."
              ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              : user.user.profile
          }
          alt="user"
          width="40"
          height="40"
          className="rounded-circle"
        />
      ) : null}
      <div className="media-body ml-3">
        <div
          className={`rounded py-2 px-3 mb-2 
          
          ${msg.sender.id === userId ? "bg-blue" : "bg-light"}
          `}
        >
          <p
            className={`text-small mb-0 ${
              msg.sender.id === userId ? "text-white" : "text-muted"
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
