import styles from "../../styles/components/forms.module.css";
import Head from "next/head";
import React from "react";
import UserService from "../../services/users/user-service";
import ParentService from "../../services/users/parent-service";
import StudentService from "../../services/users/student-service";
import * as Validator from "validatorjs";
import { isEmpty } from "../../utils/functions";
import Alert from "../../components/alert";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { userTypes } from "../../utils/user-types";
import globalStyles from "../../styles/global-colors.module.css";
import { app_info } from "../../utils/constants";
import { __esModule } from "next";

export default function Register() {
  const [parent_form, setParentForm] = React.useState({
    residence: "",
  });

  const [errors, setErrors] = React.useState({
    userName: null,
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    password: null,
    category: null,
    residence: null,
    confirmPassword: null,
    stdFirstName: null,
    stdLastName: null,
    studentClass: null,
  });

  const validations = {
    userName: "required|min:5",
    firstName: "required|min:3",
    lastName: "required|min:3",
    email: "email",
    phone: ["min:9", "max:12", "regex:/^(0|[0-9][0-9]*)$/"],
    password: "required|min:5",
    category: "required",
    residence: "required",
    stdFirstName: "required",
    stdLastName: "required",
    studentClass: "required",
  };

  const [user_form, setUserForm] = React.useState({
    userName: "",
    firstName: "",
    lastName: "",
    category: userTypes.parent,
    email: "",
    phone: "",
    password: "",
  });

  const [student_form, setStudentForm] = React.useState({
    stdFirstName: "",
    stdLastName: "",
    studentClass: "",
    studentCode: "",
  });

  const [confirmPassword, setConfirmPassword] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [asyncLoader, setAsyncLoader] = React.useState({
    userName: false,
    email: false,
  });

  const [alertData, setAlertData] = React.useState({
    alert: false,
    message: "",
    class: "",
  });

  const register = async () => {
    setAlertData({ alert: false, message: "", class: "" });
    setLoading(true);

    try {
      const user_res = await UserService.create(user_form);
      let new_par_form = Object.assign(parent_form);
      new_par_form.userId = user_res.id;
      new_par_form.phone = user_res.phone;

      const parent_res = await ParentService.create(new_par_form);

      let new_std_form = Object.assign(student_form);
      new_std_form.studentNames =
        new_std_form.stdFirstName + " " + new_std_form.stdLastName;
      new_std_form.gender = "N/A";

      delete new_std_form.stdFirstName;
      delete new_std_form.stdLastName;

      new_std_form.parentId = parent_res.id;

      await StudentService.create(new_std_form);

      setAlertData({
        alert: true,
        message: "Account Created Successfully",
        class: "alert-success",
      });
      setTimeout(() => {
        setAlertData({ alert: false, message: "", class: "" });
        Router.push("/auth/login");
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

  const handleFormChange = (prop) => async (event) => {
    setAsyncLoader({ userName: false, email: false });

    setUserForm({ ...user_form, [prop]: event.target.value });
    setParentForm({ ...parent_form, [prop]: event.target.value });
    setStudentForm({ ...student_form, [prop]: event.target.value });

    const validator = new Validator(user_form, validations);

    if (validator.fails(null))
      setErrors({ ...errors, [prop]: validator.errors.get(prop) });
    else setErrors({ ...errors, [prop]: null });

    if (prop === "userName" && isEmpty(validator.errors.get(prop))) {
      setAsyncLoader({ ...asyncLoader, ["userName"]: true });
      try {
        const res = await UserService.getByUsername(event.target.value);
        if (res.data.id) {
          setErrors({ ...errors, [prop]: "Username already taken" });
        } else {
          setErrors({ ...errors, [prop]: null });
        }
        setAsyncLoader({ ...asyncLoader, ["userName"]: false });
      } catch (e) {
        console.error(e);
        const ERROR_MESSAGE = e.response ? e.response.data.message : e.message;
        setAlertData({
          alert: true,
          message: ERROR_MESSAGE,
          class: "alert-danger",
        });
      }
    }
    if (prop === "email" && isEmpty(validator.errors.get(prop))) {
      setAsyncLoader({ ...asyncLoader, ["email"]: true });
      try {
        const res = await UserService.getByEmail(event.target.value);
        if (res.data.id) {
          setErrors({ ...errors, [prop]: "Email already taken" });
        } else {
          setErrors({ ...errors, [prop]: null });
        }
        setAsyncLoader({ ...asyncLoader, ["email"]: false });
      } catch (e) {
        console.error(e);
        const ERROR_MESSAGE = e.response ? e.response.data.message : e.message;
        setAlertData({
          alert: true,
          message: ERROR_MESSAGE,
          class: "alert-danger",
        });
      }
    }
  };

  const handleConfirmPassword = () => (event) => {
    setConfirmPassword(event.target.value);
    if (event.target.value !== user_form.password)
      setErrors({ ...errors, ["confirmPassword"]: ["Passwords don't match"] });
    else setErrors({ ...errors, ["confirmPassword"]: null });
  };

  const router = useRouter();
  return (
    <div className={styles.root}>
      <Head>
        <title>Register | MCS</title>
      </Head>
      <div
        className={" col-xs-12 col-sm-12 col-md-8 col-lg-6 col-xl-5 mt-0 mb-4"}
      >
        <div className={styles.pageHeader + " my-5"}>
          <Link href="/" passHref>
            <div className="text-center mb-4 c-pointer">
              <img src={app_info.LOGO} alt="" width={100} height={100} />
            </div>
          </Link>

          <h3
            className={styles.pageHeaderTitle + " text-center cursor-pointer"}
            onClick={() => router.push("/")}
          >
            A PARENT AT {`${app_info.APP_NAME} `} ? register here
          </h3>
          <hr className={styles.pageHeaderLineBottom} />
        </div>

        <div className={"mb-5"}>
          {alertData.alert ? (
            <Alert message={alertData.message} className={alertData.class} />
          ) : (
            <></>
          )}
        </div>
        <form autoComplete={"off"} className={"container"}>
          <div className="form-group row">
            <div className="justify-content-center col-12 mb-3">
              <h6> PARENT INFORMATION </h6>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <label htmlFor="user-name" className={styles.inputLabels}>
                Username
              </label>
              <input
                type="text"
                id={"user-name"}
                onChange={handleFormChange("userName")}
                value={user_form.userName}
                className={
                  !isEmpty(errors.userName)
                    ? "form-control form-control-sm is-invalid"
                    : !user_form.userName
                    ? "form-control form-control-sm "
                    : "form-control form-control-sm is-valid"
                }
              />
              {asyncLoader.userName ? (
                <img
                  src={"/app-imgs/spinner.gif"}
                  alt="Loading"
                  className={"loading-spinner"}
                />
              ) : null}
              <div className="invalid-feedback">Username not available</div>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <label htmlFor="first-name" className={styles.inputLabels}>
                First name
              </label>
              <input
                type="text"
                id={"first-name"}
                onChange={handleFormChange("firstName")}
                value={user_form.firstName}
                className={
                  !isEmpty(errors.firstName)
                    ? "form-control form-control-sm  is-invalid"
                    : !user_form.firstName
                    ? "form-control form-control-sm "
                    : "form-control form-control-sm  is-valid"
                }
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <label htmlFor="last-name" className={styles.inputLabels}>
                Last name
              </label>
              <input
                type="text"
                id={"last-name"}
                onChange={handleFormChange("lastName")}
                value={user_form.lastName}
                className={
                  !isEmpty(errors.lastName)
                    ? "form-control form-control-sm  is-invalid"
                    : !user_form.lastName
                    ? "form-control form-control-sm "
                    : "form-control form-control-sm is-valid"
                }
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <label htmlFor="first-name" className={styles.inputLabels}>
                Email
              </label>
              <input
                type="text"
                id={"email"}
                onChange={handleFormChange("email")}
                value={user_form.email}
                className={
                  !isEmpty(errors.email)
                    ? "form-control form-control-sm is-invalid"
                    : !user_form.email
                    ? "form-control form-control-sm "
                    : "form-control form-control-sm is-valid"
                }
              />
              {asyncLoader.email ? (
                <img
                  src={"/img/spinner.gif"}
                  alt="Loading"
                  className={"loading-spinner"}
                />
              ) : null}
              <div className="invalid-feedback">Email not available</div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <label htmlFor="last-name" className={styles.inputLabels}>
                Phone number
              </label>
              <input
                type="text"
                id={"phone"}
                onChange={handleFormChange("phone")}
                value={user_form.phone}
                className={
                  !isEmpty(errors.phone)
                    ? "form-control form-control-sm is-invalid"
                    : !user_form.phone
                    ? "form-control form-control-sm "
                    : "form-control form-control-sm is-valid"
                }
              />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <label htmlFor="last-name" className={styles.inputLabels}>
                Residence
              </label>
              <input
                type="text"
                id={"residence"}
                onChange={handleFormChange("residence")}
                value={parent_form.residence}
                className={
                  !isEmpty(errors.residence)
                    ? "form-control form-control-sm is-invalid"
                    : !parent_form.residence
                    ? "form-control form-control-sm "
                    : "form-control form-control-sm is-valid"
                }
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <label htmlFor="first-name" className={styles.inputLabels}>
                Password
              </label>
              <input
                type="password"
                id={"password"}
                onChange={handleFormChange("password")}
                value={user_form.password}
                className={
                  !isEmpty(errors.password)
                    ? "form-control form-control-sm is-invalid"
                    : !user_form.password
                    ? "form-control form-control-sm "
                    : "form-control form-control-sm is-valid"
                }
              />
              <div className="invalid-feedback">Too Short</div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <label htmlFor="last-name" className={styles.inputLabels}>
                Confirm
              </label>
              <input
                type="password"
                id={"confirm-password"}
                onChange={handleConfirmPassword()}
                value={confirmPassword || ""}
                className={
                  !isEmpty(errors.confirmPassword)
                    ? "form-control form-control-sm is-invalid"
                    : !confirmPassword
                    ? "form-control form-control-sm "
                    : "form-control form-control-sm is-valid"
                }
              />
              <div className="invalid-feedback">Passwords don&apos;t match</div>
            </div>
          </div>

          <div className="form-group row mt-5">
            <div className="justify-content-center col-12  mb-3">
              <h6> STUDENT INFORMATION </h6>
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <label htmlFor="last-name" className={styles.inputLabels}>
                FirstName
              </label>
              <input
                type="text"
                id={"stdFirstName"}
                onChange={handleFormChange("stdFirstName")}
                value={student_form.stdFirstName}
                className={
                  !isEmpty(errors.stdFirstName)
                    ? "form-control form-control-sm is-invalid"
                    : !student_form.stdFirstName
                    ? "form-control form-control-sm "
                    : "form-control form-control-sm is-valid"
                }
              />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <label htmlFor="last-name" className={styles.inputLabels}>
                LastName
              </label>
              <input
                type="text"
                id={"stdLastName"}
                onChange={handleFormChange("stdLastName")}
                value={student_form.stdLastName}
                className={
                  !isEmpty(errors.stdLastName)
                    ? "form-control form-control-sm is-invalid"
                    : !student_form.stdLastName
                    ? "form-control form-control-sm "
                    : "form-control form-control-sm is-valid"
                }
              />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <label htmlFor="last-name" className={styles.inputLabels}>
                Class
              </label>
              <input
                type="text"
                id={"studentClass"}
                onChange={handleFormChange("studentClass")}
                value={parent_form.studentClass}
                className={
                  !isEmpty(errors.studentClass)
                    ? "form-control form-control-sm is-invalid"
                    : !student_form.studentClass
                    ? "form-control form-control-sm "
                    : "form-control form-control-sm is-valid"
                }
              />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <label htmlFor="last-name" className={styles.inputLabels}>
                Code
              </label>
              <input
                type="text"
                id={"studentCode"}
                onChange={handleFormChange("studentCode")}
                value={parent_form.studentCode}
                className={
                  !isEmpty(errors.studentCode)
                    ? "form-control form-control-sm is-invalid"
                    : !student_form.studentCode
                    ? "form-control form-control-sm "
                    : "form-control form-control-sm is-valid"
                }
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <button
                type={"submit"}
                className={
                  styles.submitBtn +
                  " btn text-white w-100 mt-4 " +
                  globalStyles.globalBackColor
                }
                disabled={
                  !Object.values(errors).some((o) => o === null) ||
                  Object.values(user_form).some((o) => o === "") ||
                  loading
                }
                onClick={register}
              >
                {loading ? (
                  <img
                    src={"/app-imgs/loader.gif"}
                    alt={"Loading"}
                    className={"loader"}
                  />
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </div>

          <div className={"meta-info-area mb-5"}>
            <Link href={"/auth/login"}>
              <a className={styles.metaInfoLink}>Already have an account? </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
