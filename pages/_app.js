import 'bootstrap/dist/css/bootstrap.min.css';
// import '../styles/globals.css'
import "../styles/loading.css";
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import jwt from "jwt-decode";
import Head from "next/head";
import Router from 'next/router';

NProgress.configure({showSpinner: false});
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


if (typeof window !== "undefined") {
  require('jquery');
  require('popper.js');
  require('bootstrap');

  // store = createStore(
  //     reducer, /* preloadedState, */
  //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // );
}


function AppMeta() {

  // useEffect(() => {
  //     setUser();
  // })
  // const dispatch = useDispatch();

  // const setUser = () => {

  //     if (AuthService.isLoggedIn()) {
  //         if (!AuthService.tokenExpired()) {
  //             // console.log(AuthService.getEncToken())
  //             const token = AuthService.getDecToken()
  //             UserService.get(jwt(token).id).then((res)=>{
  //                 const curr_user = updateJavaScriptObject(jwt(token), res.data)
  //                curr_user.fullNames = res.data.firstName+" "+res.data.lastName
  //                dispatch(setAuthUser(curr_user))
  //             }).catch(e=>console.log(e))
  //         }
  //     }
  // }

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon_io/favicon.ico" />
        <title>Korea Auto Rwanda</title>
      </Head>
    </div>
  );
}


function MyApp({ Component, pageProps }) {
  return (
    <div>
      <AppMeta />
      <Component {...pageProps} />
    </div>
  )
}


export default MyApp
