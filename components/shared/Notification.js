export default function Notification({ notifications }) {
  return (
    <div className="container mt-5 d-flex justify-content-center flex-column w-100">
      <h5 className="numan mt-5">Notifications</h5>
      <div className="mt-5 notifications">
        <div className="shadow-sm px-5 py-3 mt-4 position-relative">
          <div style={{ fontSize: 15 }}>New parent registered</div>
          <small style={{ color: "" }}>2 months ago</small>
          <div className="position-absolute more">
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className="shadow-sm px-5 py-3 mt-4 position-relative">
          <div style={{ fontSize: 15 }}>New parent registered</div>
          <small style={{ color: "" }}>2 months ago</small>
          <div className="position-absolute more">
            <i className="fas fa-times"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
