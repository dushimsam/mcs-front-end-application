import Head from "next/head";
import "../styles/globals.css";
import "../styles/faq.css";
import "../styles/footer.css";
import "../styles/chat.css";

import Snack from "../components/snackbar";

import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "../services/auth/auth.service";
import "../styles/loading.css";
import UserService from "../services/users/user-service";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import jwt from "jwt-decode";
import Router from "next/router";
import { Provider, useDispatch } from "react-redux";
import reducer from "../store/reducers";
import { setAuthUser } from "../store/actions";
import { createStore } from "redux";
import { updateJavaScriptObject } from "../utils/functions";
import { useEffect } from "react";
import { app_info } from "../utils/constants";

import "react-image-gallery/styles/css/image-gallery.css";
// import "node_modules/react-image-gallery/styles/css/image-gallery.css";

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

let store = createStore(reducer);

if (typeof window !== "undefined") {
  require("jquery");
  require("popper.js");
  require("bootstrap");

  store = createStore(
    reducer /* preloadedState, */,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

function AppMeta() {
  useEffect(() => {
    setUser();
  });
  const dispatch = useDispatch();

  const setUser = () => {
    if (AuthService.isLoggedIn()) {
      if (!AuthService.tokenExpired()) {
        // console.log(AuthService.getEncToken())
        const token = AuthService.getDecToken();
        UserService.get(jwt(token).User.id)
          .then((res) => {
            let curr_user = res.data;
            curr_user.fullNames = res.data.firstName + " " + res.data.lastName;
            curr_user.imageUrl = "https://picsum.photos/200";
            dispatch(setAuthUser(curr_user));
          })
          .catch((e) => console.log(e));
      }
    }
  };

  return (
    <div>
      <Head>
        <link rel="icon" href="/logo.png" />
        <title>{app_info.APP_NAME}</title>
      </Head>
    </div>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
            crossOrigin="anonymous"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Numans&display=swap"
            rel="stylesheet"
          />

          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
            referrerPolicy="no-referrer"
          />

          {/* <script
            src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
            crossorigin="anonymous"
          />
          <script
            src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
            crossorigin="anonymous"
          />
          <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
            crossorigin="anonymous"
          /> */}
        </Head>
        <Snack />
        <AppMeta />
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
