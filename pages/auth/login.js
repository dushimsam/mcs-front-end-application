import styles from "../../styles/components/forms.module.css";
import Head from "next/head";
import React, { useEffect } from "react";
import AuthService from "../../services/auth/auth.service";
import Alert from "../../components/alert";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../../store/actions";
import jwt from "jwt-decode";
import Router, { useRouter } from "next/router";
import globalStyles from "../../styles/global-colors.module.css"
import { system_users } from "../../utils/constants";


export default function Login() {

  const [form, setForm] = React.useState({
    login: "",
    password: "",
  });

  const authUser = useSelector(state => state.authUser)

  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);
  const [alertData, setAlertData] = React.useState({
    alert: false,
    message: "",
    class: "",
  });

  const getUserHref = () => {
    if (authUser.category) {
      switch (authUser.category) {
        case "SCHOOL_ADMIN":
          return "/admin/dashboard";
        case "SCHOOL_EMPLOYEE":
          return "/employee/dashboard";
        default:
          return "/parent/dashboard";
      }
    }
    return "/404";
  };



  useEffect(() => {
    if (authUser.category) {
      Router.push(getUserHref()).then()
    }
  }, [authUser])

  const login = async () => {
    setAlertData({ alert: false, message: "", class: "" });
    setLoading(true);

    try {

      const res = await AuthService.login(form);
      AuthService.setToken(res.data.token);

      let user = jwt(res.data.token).User;
      user.fullNames = res.data.firstName + " " + res.data.lastName
      user.imageUrl = "https://picsum.photos/200"
      dispatch(setAuthUser(user))

      setAlertData({
        alert: true,
        message: "Logged In Successfully",
        class: "alert-success",
      });

      setTimeout(() => {
        setAlertData({ alert: false, message: "", class: "" });
        if (user.category == system_users.PARENT) {
          Router.push("/parent/dashboard")
        } else if (user.category == system_users.EMPLOYEE) {
          Router.push("/employee/dashboard")
        } else {
          Router.push("/admin/dashboard")
        }
      }, 1000);
    } catch (e) {
      const ERROR_MESSAGE = e.response ? e.response.data.message : e.message;
      setAlertData({
        alert: true,
        message: ERROR_MESSAGE,
        class: "alert-danger",
      });
    }
    setLoading(false);
  };

  const handleFormChange = (property) => (event) => {
    setForm({ ...form, [property]: event.target.value });
  };

  const router = useRouter()
  return (
    <div className={styles.root}>
      <Head>
        <title>Login | KAR</title>
      </Head>
      <div
        className={
          styles.container + " col-xs-12 col-sm-12 col-md-8 col-lg-6 col-xl-5"
        }
      >
        <div className={styles.pageHeader + " my-5"}>
          <Link href="/" passHref>
            <div className="text-center mb-4 c-pointer">
              <img
                src={"/logo.png"}
                alt=""
                width={100}
                height={100}
              />
            </div>
          </Link>
          <h3
            className={styles.pageHeaderTitle + " text-center cursor-pointer"}
            onClick={() => router.push("/")}
          >
            Log in to MOUNT CARMEL SCHOOL System
          </h3>
          <hr className={styles.pageHeaderLineBottom} />
        </div>
        <div className={"mb-5"}>
          {alertData.alert ? (
            <Alert
              message={alertData.message}
              className={alertData.class}
              setAlert={setAlertData}
            />
          ) : null}
        </div>
        <form autoComplete={"off"} className={"container"}>
          <div className="form-group row">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <label htmlFor="user-name" className={styles.inputLabels}>
                Email or Username
              </label>
              <input
                type="text"
                onChange={handleFormChange("login")}
                value={form.login}
                id={"email"}
                className={"form-control form-control-sm"}
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <label htmlFor="password" className={styles.inputLabels}>
                Password
              </label>
              <input
                type="password"
                onChange={handleFormChange("password")}
                value={form.password}
                id={"password"}
                className={"form-control form-control-sm"}
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <button
                type={"submit"}
                className={styles.submitBtn + " btn w-100 mt-4 text-white " + globalStyles.globalBackColor}
                disabled={Object.values(form).some((x) => x === "") || loading}
                onClick={login}
              >
                {loading ? (
                  <img
                    width={20}
                    height={20}
                    src={"/app-imgs/loader.gif"}
                    alt={"Loading"}
                    className={"loader"}
                  />
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </div>

          <div className={"meta-info-area"}>
            <Link href={"/auth/register"}>
              <a className={styles.metaInfoLink}>Don't have an account?</a>
            </Link>
            <Link href={"/auth/forgot-password"}>
              <a className={styles.metaInfoLink + " float-right"}>
                Forgot Password?{" "}
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}