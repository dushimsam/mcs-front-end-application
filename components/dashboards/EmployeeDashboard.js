import Sidebar from "../../components/dashboards/Sidebar";
import AdminNavbar from "../../components/dashboards/AdminNavbar";
import { EmployeeLinks } from "../../utils/sidebar-links";
import RouteProtector from "../../middlewares/RouteProtector";
import { system_users } from "../../utils/constants";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const QuickActions = () => {
  return (
    <Link href={"/chat"} passHref>
      <button
        className="btn btn-sm d-none d-sm-block pr-3"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        style={{
          color: "#ff5555",
          borderColor: "#ff5555",
        }}
      >
        <div className="d-flex">
          <div className="d-inline-block" style={{ marginTop: -1 }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-briefcase"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          </div>
          <div>
            <span className="pl-2">Send A Message</span>
          </div>
        </div>
      </button>
    </Link>
  );
};

export default function EmployeeDashboard({
  children,
  setShowNotifications,
  showNotifications,
}) {
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 776) {
      setShowSidebar(false);
    }
  }, []);

  return (
    <RouteProtector only={[system_users.EMPLOYEE]}>
      <div className="row mx-0 page min-vh-100">
        <div
          className={
            "px-0 " + (showSidebar ? "col-12 col-md-3 col-lg-2" : "d-none")
          }
        >
          <div style={{ position: "sticky", top: 0 }}>
            <div
              className="d-md-none bg-danger p-2 rounded-circle position-fixed shadow"
              onClick={() => setShowSidebar(false)}
              style={{ zIndex: 12, top: 5, right: 5 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  fill="white"
                  d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"
                />
              </svg>
            </div>
            <Sidebar navList={EmployeeLinks} />
          </div>
        </div>
        <div
          className={
            "px-0 " + (showSidebar ? "col-12 col-md-9 col-lg-10" : "col-12")
          }
        >
          <div style={{ position: "sticky", top: 0, zIndex: 10 }}>
            <AdminNavbar
              setShowSidebar={setShowSidebar}
              sidebarState={showSidebar}
              quickActions={<QuickActions />}
              setShowNotifications={setShowNotifications}
              showNotifications={showNotifications}
            />
          </div>
          <div className="main my-5 px-3">{children}</div>
          {/* <Footer /> */}
        </div>
      </div>
    </RouteProtector>
  );
}
