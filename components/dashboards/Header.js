import {useSelector} from "react-redux";
import Link from "next/link";
import {getDashboardLink} from "../../utils/sidebar-links";
import React from "react";
import { app_info } from "../../utils/constants";

export default function Header() {
    const user = useSelector(state => state.authUser)
    const notifications = 10;

    const logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("mcs-auth-token");
        window.location.href = "/auth/login";
    };

    return (
      <div
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage:
            "linear-gradient(to left, #400101F0, #400101FA),url('https://i.pinimg.com/originals/41/5f/12/415f128daaa416ff3a35826932211ae5.jpg')",
          height: 100,
        }}
        className="text-white"
      >
        <div className="d-flex px-2 px-md-5 justify-content-between align-items-center h-100">
          <Link href="/" passHref>
            <div>
              <h4 className="font-weight-bolder cursor-pointer">
                {app_info.APP_NAME}
              </h4>
            </div>
          </Link>
          <div className="d-flex align-items-center">
            <div className="notifications cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28.6"
                height="33.875"
                viewBox="0 0 28.6 33.875"
              >
                <g
                  id="Group_174"
                  data-name="Group 174"
                  transform="translate(-1233.4 -13)"
                >
                  <g
                    id="Group_175"
                    data-name="Group 175"
                    transform="translate(-60 7)"
                  >
                    <g
                      id="Group_172"
                      data-name="Group 172"
                      transform="translate(-35 2)"
                    >
                      <path
                        id="Icon_material-notifications-none"
                        data-name="Icon material-notifications-none"
                        d="M16,28.75a2.54,2.54,0,0,0,2.5-2.564h-5A2.54,2.54,0,0,0,16,28.75Zm7.5-7.692v-6.41c0-3.936-2.037-7.231-5.625-8.1V5.673a1.876,1.876,0,1,0-3.75,0v.872C10.55,7.417,8.5,10.7,8.5,14.647v6.41L6,23.622V24.9H26V23.622ZM21,22.34H11V14.647c0-3.179,1.888-5.769,5-5.769s5,2.59,5,5.769Z"
                        transform="translate(1322.4 9.125)"
                        fill="#fff"
                      />
                    </g>
                    <g
                      id="Group_173"
                      data-name="Group 173"
                      transform="translate(-32)"
                    >
                      <circle
                        id="Ellipse_41"
                        data-name="Ellipse 41"
                        cx="8.5"
                        cy="8.5"
                        r="8.5"
                        transform="translate(1337 6)"
                        fill="#fcda9f"
                      />
                      <text
                        id="_12"
                        data-name="12"
                        transform="translate(1341 19)"
                        fill="#666"
                        fontSize="11"
                        fontFamily="Larsseit-Medium, Larsseit"
                        fontWeight="700"
                      >
                        <tspan x="0" y="0">
                          {notifications}
                        </tspan>
                      </text>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <div className="dropdown">
              <div
                className="account d-flex pl-4 align-items-center cursor-pointer dropdown-toggle"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  width={30}
                  height={30}
                  className={"rounded-circle"}
                  src={user.imageUrl}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://ui-avatars.com/api/?name=" + user.username;
                  }}
                  alt={user.username}
                />
                <span className="pl-3">{user.fullNames}</span>
              </div>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <Link
                  href={getDashboardLink(user) + "/account/settings"}
                  passHref
                >
                  <a className="dropdown-item" href="#">
                    Account settings
                  </a>
                </Link>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#" onClick={logOut}>
                  Log out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}