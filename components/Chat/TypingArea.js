export default function TypingArea({
  message,
  setMessage,
  composeMessage,
  receiverId,
}) {
  return (
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
            onClick={(e) => composeMessage(e, message, receiverId)}
          >
            {" "}
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </form>
  );
}
