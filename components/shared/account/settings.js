import React, { useEffect, useRef, useState } from 'react'
import jwt from 'jwt-decode';
import AuthService from "../../../services/auth/auth.service";
import UserService from "../../../services/users/user-service";
import { setAuthUser } from "../../../store/actions";
import { useDispatch, useSelector } from 'react-redux';
import { PasswordChangeSchema } from "../../../utils/validations/schemas/passwordChange";
import { updateJavaScriptObject } from '../../../utils/functions'
import { notifyError, notifySuccess } from "../../../utils/alerts"
import { Form, Formik } from "formik";
import TextField from "../forms/TextField";
import globalStyles from "../../../styles/global-colors.module.css"
import EmployeesService from "../../../services/users/school-employee-service";
import ParentService from "../../../services/users/parent-service"
import { useRouter } from 'next/router';

const UpdatePassword = () => {

    const user = useSelector(state => state.authUser)
    const changePassword = async (values) => {
        try {
            const { current_password, new_password } = values
            await UserService.changePassword(user.id, { current_password, new_password })
            notifySuccess("Successfully updated password")
        } catch (e) {
            notifyError(e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.")
        }
    }

    return (
        <div>
            <h5 className="font-weight-bold">Change password</h5>
            <Formik
                initialValues={{
                    current_password: "",
                    new_password: "",
                    confirm: ""
                }}
                onSubmit={changePassword}
                validationSchema={PasswordChangeSchema}
            >
                {(formik) => (
                    <Form>
                        <div className="row row-cols-1 row-cols-lg-3">
                            <div className="col">
                                <TextField label="Current password" name="current_password" type="password" />
                            </div>
                            <div className="col">
                                <TextField label="New password" name="new_password" type="password" />
                            </div>
                            <div className="col">
                                <TextField label="Confirm password" name="confirm" type="password" />
                            </div>
                        </div>
                        <div className="mt-5">
                            <button className={"btn px-4 mr-5 text-white pr- " + globalStyles.globalBackColor}
                                type="submit">Update password
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

const BasicInformation = () => {
    const imageContainer = useRef(null)
    const [passwordValues, setPasswordValues] = useState({
        "current_password": "",
        "new_password": "",
        "confirm": ""
    });

    const [userDetails, setUserDetails] = useState("")

    const [values, setValues] = useState({
        email: "",
        userName: "",
        firstName: "",
        category: "",
        lastName: "",
        phone: "",
        gender: ""
    });
    const [residence, setResidence] = useState(null)

    const [defaultValues, setDefaultValues] = useState({
        email: "",
        userName: "",
        firstName: "",
        category: "",
        lastName: "",
        phone: "",
        gender: ""
    })
    const handleChange = (prop) => (event) => {
        setUpdateState(updateState === "IMAGE" ? "BOTH" : "DETAILS")
        setValues({ ...values, [prop]: event.target.value });
    };


    const handlePasswordChange = (prop) => (event) => {
        setPasswordValues({ ...passwordValues, [prop]: event.target.value });
    };

    let user = useSelector(state => state.authUser);

    const updateStore = () => {
        UserService.get(user.id)
            .then((res) => {
                user = updateJavaScriptObject(user, res.data)
                user.fullNames = res.data.firstName + " " + res.data.lastName
                useRouter.imageUrl = "https://picsum.photos/200"
                dispatch(setAuthUser(user))
            }).catch(e => console.log(e))
    }

    useEffect(() => {

        UserService.get(user.id)
            .then((res) => {
                setValues({
                    email: res.data.email,
                    userName: res.data.username,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    category: res.data.category,
                    phone: res.data.phone,
                    gender: res.data.gender
                });
                setDefaultValues({
                    email: res.data.email,
                    userName: res.data.username,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    category: res.data.category,
                    phone: res.data.phone,
                    gender: res.data.gender
                })
                setUserDetails(res.data);

                if (user.category === "EMPLOYEE") {
                    EmployeesService.getByUserId(user.id)
                        .then((res) => {
                            setResidence(res.data.residence)
                        }).catch(e => console.log(e))
                } else if (user.category === "PARENT") {
                    ParentService.getByUserId(user.id)
                        .then((res) => {
                            setResidence(res.data.residence)
                        }).catch(e => console(e))
                }

            }).catch(e => console.log(e))
    }, [])

    const [alert, setAlert] = useState({ message: "", class: "", status: "", show: false })
    const [updateState, setUpdateState] = useState(null)

    const dispatch = useDispatch();

    const updateRecords = async () => {

        if (!updateState) {
            notifyError("No profile update required");
            setLoading({ load: false, status: "" });
        } else {
            if (updateState === "BOTH" || updateState === "IMAGE") {
                let formData = new FormData()
                formData.append("profile", imageContainer.current.files[0])
                setUpdateState(updateState === "IMAGE" ? setUpdateState(null) : updateState)
                try {
                    await UserService.uploadImage(userDetails._id, formData)
                    updateState === "IMAGE" ? notifySuccess("Profile updated Successfully") : ""
                    setLoading({ load: false, status: "" })
                    updateStore()
                } catch (e) {
                    notifyError(e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.")
                    setLoading({ load: false, status: "" })
                }
            }

            if (updateState === "BOTH" || updateState === "DETAILS") {
                UserService.update(userDetails.id, values)
                    .then((res) => {
                        setDefaultValues(values)

                        notifySuccess("Profile updated Successfully")
                        updateStore()
                    })
                    .catch((e) => {
                        notifyError(e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.")
                    }).finally(() => {
                        setLoading({ load: false, status: "" })
                        setUpdateState(null)
                    })
            }
        }
    }

    const uploadAnImage = (event) => {
        event.preventDefault();
        document.getElementById("imageControl").click()
    }


    const handleImageChange = () => {
        setUpdateState(updateState === "DETAILS" ? "BOTH" : "IMAGE")
        let file = imageContainer.current.files[0]

        if (file) {
            if (file) {
                let reader = new FileReader();
                reader.onload = function (evt) {
                    document.getElementById("imageContainer").setAttribute("src", evt.target.result)
                }
                reader.onerror = function (evt) {
                    console.log(evt)
                    document.getElementById("holla").innerText = "error reading file";
                }

                reader.readAsDataURL(imageContainer.current.files[0])
            }
        }
    }

    const [loading, setLoading] = useState({ load: false, status: "" })

    return (
        <div>
            <h5>Basic information</h5>
            <div className="row mt-3">

                <div className="col-sm-6 col-md-4 mt-2">

                    <div className="form-group">
                        <label htmlFor="your-name">First name:</label>
                        <input className="form-control" id="your-name" value={values.firstName}
                            onChange={handleChange("firstName")} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input className="form-control" id="userName" value={values.userName}
                            onChange={handleChange("userName")} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input className="form-control" id="phone" value={values.phone}
                            onChange={handleChange("phone")} />
                    </div>
                    {
                        user.category == "SCHOOL_EMPLOYEE" || user.category == "PARENT" ?
                            <div className="form-group">
                                <label htmlFor="residence">Residence:</label>
                                <input className="form-control" id="residence" value={user.residence} />
                            </div> : null
                    }
                </div>
                <div className="col-sm-6 col-md-6 mt-2 ">
                    <div className="p-0 col-md-9 mx-auto">
                        <div className="form-group">
                            <label htmlFor="lastname">Last name:</label>
                            <input className="form-control" id="lastname" value={values.lastName}
                                onChange={handleChange("lastName")} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input className="form-control" id="email" value={values.email}
                                onChange={handleChange("email")} />
                        </div>


                        <div className="form-group col-5">
                            <label htmlFor="gender">Gender:</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="exampleRadios"
                                    id="exampleRadios1"
                                    checked={values.gender !== "" && values.gender === "MALE"}
                                    onClick={handleChange("gender")} value="MALE" />
                                <label className="form-check-label" htmlFor="exampleRadios1">
                                    Male
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="exampleRadios"
                                    id="exampleRadios2" onClick={handleChange("gender")}
                                    checked={values.gender !== "" && values.gender === "FEMALE"}
                                    value="FEMALE" />
                                <label className="form-check-label" htmlFor="exampleRadios2">
                                    Female </label>
                            </div>
                        </div>


                    </div>
                </div>
                <div className="d-none d-md-block col-sm-6 col-md-2 mt-2 text-center">
                    <div id="holla" />
                    <img
                        id={"imageContainer"}
                        className="nav-bar-avatar rounded-circle shadow"
                        src={userDetails.imageUrl}
                        height={150}
                        width={150}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                                "https://ui-avatars.com/api/?name=" +
                                userDetails.userName;
                        }}
                        alt={userDetails.userName}
                        title={userDetails.userName}
                    />
                    <div className="text-center mt-3">
                        <input type="file" id="imageControl" hidden ref={imageContainer} onChange={handleImageChange} />
                        <a href="#" className="text-primary" onClick={uploadAnImage}>Change</a>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <button className={"btn bg-app-red text-white " + globalStyles.globalBackColor} onClick={() => {
                    setLoading({ load: true, status: "profile" });
                    updateRecords().then();
                }}>
                    {loading.load && loading.status === "profile" ? (
                        <img
                            src={"/img/loader.gif"}
                            alt={"Loading"}
                            className={"loader"}
                        />
                    ) : (
                        "Update profile"
                    )}
                </button>
            </div>
        </div>
    )
}

const ProfileSettings = () => {

    return (
        <div>
            <div className="border rounded">
                <div className="bg-light px-4 py-3">
                    <h5 className={"font-weight-bold"}>Profile settings</h5>
                </div>
                <div className="bg-white px-4 py-4">
                    <BasicInformation />
                    <hr />
                    <UpdatePassword />
                </div>
            </div>
        </div>
    )
}

export default ProfileSettings;