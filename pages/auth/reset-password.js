import styles from '../../styles/components/forms.module.css';
import Head from 'next/head';
import AuthService from "../../services/auth/auth.service";
import React from "react";
import Router from "next/router";
import * as Validator from "validatorjs";
import Alert from "../../components/alert";
import { isEmpty } from "../../utils/functions";
import Link from 'next/link';


export default function ResetPassword() {
    const validations = {
        token: 'required',
        email: 'required|email',
        password: 'required|min:5'
    };

    const [form, setForm] = React.useState({
        token: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = React.useState({
        token: null,
        email: null,
        password: null,
        confirmPassword: null,
    });

    const [confirmPassword, setConfirmPassword] = React.useState(null);

    const [loading, setLoading] = React.useState(false);
    const [alertData, setAlertData] = React.useState({ alert: false, message: '', class: '' });

    const resetPassword = async () => {
        setAlertData({ alert: false, message: '', class: '' });
        setLoading(true);

        try {
            await AuthService.resetPassword(form);
            await Router.push('/auth/login');
        }
        catch (e) {
            const error = e.response.data;
            setAlertData({ alert: true, message: error.message, class: 'alert-danger' });
        }

        setLoading(false);
    }


    const handleFormChange = (prop) => (event) => {
        setForm({ ...form, [prop]: event.target.value });
        const validator = new Validator(form, validations);
        if (validator.fails(null))
            setErrors({ ...errors, [prop]: validator.errors.get(prop) });
        else
            setErrors({ ...errors, [prop]: null });

    }

    const handleConfirmPassword = () => (event) => {
        setConfirmPassword(event.target.value);
        if (event.target.value !== form.password)
            setErrors({ ...errors, ['confirmPassword']: ["Passwords don't match"] });
        else
            setErrors({ ...errors, ['confirmPassword']: null });
    }


    return (
        <div className={styles.root}>
            <Head>
                <title>Reset Password | KAR</title>
            </Head>
            <div
                className={
                    styles.container +
                    " col-xs-12 col-sm-12 col-md-8 col-lg-6 col-xl-5 mt-4"
                }
            >
                <div className={styles.pageHeader + " mb-5"}>
                    <div className={"mb-5"}>
                        {alertData.alert ? (
                            <Alert
                                message={alertData.message}
                                className={alertData.class}
                            />
                        ) : null}
                    </div>

                    <Link href="/" passHref>
                        <div className="text-center mb-4 c-pointer">
                            <img src={"/favicon_io/android-chrome-192x192.png"} alt="" width={100} height={100} />
                        </div>
                    </Link>
                    <h3 className={styles.pageHeaderTitle + " text-center"}>
                        Reset your password
                    </h3>
                    <hr className={styles.pageHeaderLineBottom} />
                </div>

                <form autoComplete={"off"} className={"container"}>
                    <div className="form-group row">
                        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <label
                                htmlFor={"activation-code"}
                                className={styles.inputLabels}
                            >
                                Activation Code
                            </label>
                            <input
                                type="text"
                                id={"activation-code"}
                                onChange={handleFormChange("token")}
                                value={form.token}
                                className={
                                    !isEmpty(errors.token)
                                        ? "form-control form-control-sm is-invalid"
                                        : !form.token
                                            ? "form-control form-control-sm "
                                            : "form-control form-control-sm is-valid"
                                }
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <label
                                htmlFor="email"
                                className={styles.inputLabels}
                            >
                                Email
                            </label>
                            <input
                                type="text"
                                id={"email"}
                                onChange={handleFormChange("email")}
                                value={form.email}
                                className={
                                    !isEmpty(errors.email)
                                        ? "form-control form-control-sm is-invalid"
                                        : !form.email
                                            ? "form-control form-control-sm "
                                            : "form-control form-control-sm is-valid"
                                }
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <label
                                htmlFor="user-name"
                                className={styles.inputLabels}
                            >
                                New Password
                            </label>
                            <input
                                type="password"
                                id={"new-password"}
                                onChange={handleFormChange("password")}
                                value={form.password}
                                className={
                                    !isEmpty(errors.password)
                                        ? "form-control form-control-sm is-invalid"
                                        : !form.password
                                            ? "form-control form-control-sm "
                                            : "form-control form-control-sm is-valid"
                                }
                            />
                            <div className="invalid-feedback">Too Short</div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <label
                                htmlFor="user-name"
                                className={styles.inputLabels}
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id={"confirm-password"}
                                onChange={handleConfirmPassword()}
                                value={confirmPassword}
                                className={
                                    !isEmpty(errors.confirmPassword)
                                        ? "form-control form-control-sm is-invalid"
                                        : !confirmPassword
                                            ? "form-control form-control-sm "
                                            : "form-control form-control-sm is-valid"
                                }
                            />
                            <div className="invalid-feedback">
                                Passwords don't match
                            </div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <button
                                type={"submit"}
                                className={
                                    styles.submitBtn +
                                    " btn btn-danger w-100 mt-4"
                                }
                                disabled={
                                    !Object.values(errors).some(
                                        (o) => o === null
                                    ) ||
                                    Object.values(form).some((o) => o === "") ||
                                    loading
                                }
                                onClick={resetPassword}
                            >
                                {loading ? (
                                    <img
                                        src={"/img/loader.gif"}
                                        alt={"Loading"}
                                        className={"loader"}
                                    />
                                ) : (
                                    "Reset Password"
                                )}
                            </button>
                        </div>
                    </div>

                    <div className={"meta-info-area"}>
                        <Link href={"/auth/login"}>
                            <a className={styles.metaInfoLink}>
                                Just remembered your password?{" "}
                            </a>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
