import { useEffect, useState } from "react"
import styles from "../../styles/components/profile-details.module.css"
import UserService from "../../services/users/user-service"
import { notifySuccess, notifyError } from "../../utils/alerts"
import $ from "jquery"
import globalStyles from "../../styles/global-colors.module.css"
import { dateFormat } from "../../utils/functions"

export const AppUserProfile = ({ UserObj, category, item }) => {
    const [loading, setLoading] = useState(false)

    const [isUser, setIsUser] = useState(false);

    const checkIsUser = (isUser) => {
        if (isUser)
            deactivateUser()
        else
            alert("NOT USER")
    }

    const showModal = () => {
        $(function () {
            $('#checkUserModal').modal('show');
        });
    }

    const deactivateUser = () => {
        UserService.toggleDisable(UserObj._id)
            .then((res) => {
                notifySuccess("User is Deactivated Succesffully")
                setLoading(false);
                $(function () {
                    $('#checkUserModal').modal('hide');
                });
                $(function () {
                    $('#profileModalDetails').modal('hide');
                });
            })
            .catch((e) => {
                setLoading(false)
                notifyError(e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.")
                $(function () {
                    $('#checkUserModal').modal('hide');
                });
                $(function () {
                    $('#profileModalDetails').modal('hide');
                });
            });
    }
    return (
        <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className={"modal-content"}>
                <button type="button" className={"close " + styles.close} data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div>
                    <div className="mb-3 row mx-0 px-5 py-5">
                        <div className={"col-4 " + styles.cardBody}>
                            <div className="d-flex flex-column">

                                <img
                                    id={"imageContainer"}
                                    src={UserObj?.profile}
                                    className="rounded-circle shadow-sm" width="100"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src =
                                            "https://ui-avatars.com/api/?name=" +
                                            UserObj.username;
                                    }}
                                    alt={UserObj.username}
                                    title={UserObj.username}
                                />

                                <div className="mt-3">
                                    <h4>{`${UserObj.firstName} ${UserObj.lastName}`}</h4>
                                    <p className="text-secondary mb-1">{category}</p>
                                    <p className="text-muted font-size-sm">{dateFormat(UserObj.createdAt).onlyDate()}</p>
                                    {/* <button className="btn btn-outline-primary">Message</button> */}
                                    <button className={"btn text-white btn-danger"}
                                        onClick={() => {
                                            showModal();
                                        }} data-toggle="modal" data-target="#userConfirmationModal"
                                        disabled={UserObj.category !== "SCHOOL_ADMIN"}>

                                        {loading ?
                                            (<img
                                                src={"/img/loader.gif"}
                                                alt={"Loading"}
                                                className={"loader"}
                                            />
                                            ) : (
                                                "DEACTIVATE"
                                            )}</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-8">
                            <div className="row justify-content-center">


                                <div className={"card mt-3 col-12 p-3"}>

                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0">Full Names</h6>
                                            <span
                                                className="text-secondary">{`${UserObj.firstName} ${UserObj.lastName}`}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0">Email</h6>
                                            <span className="text-secondary">{`${UserObj.email}`}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0">Telephone</h6>
                                            <span className="text-secondary">{`${UserObj.phone}`}</span>
                                        </li>

                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0">Gender</h6>
                                            <span className="text-secondary">{`${UserObj.gender}`}</span>
                                        </li>

                                        <li className={"list-group-item d-flex justify-content-between align-items-center flex-wrap text-white"}>
                                            <h6 className="mb-0">STATUS</h6>
                                            <span className="text-white">{UserObj.isLocked}</span>
                                        </li>

                                    </ul>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
            {/* <CheckUserModal  callFn={deactivateUser} loading={loading} setLoading={setLoading}/>  */}
        </div>


    )
}


const ModalProfileDetails = ({ item, category }) => {
    const [UserObj, setUserObj] = useState("")
    useEffect(() => {
        setUserObj(item.user)
    }, [item])

    return (
        <div className="modal fade bd-example-modal-lg" id="profileModalDetails" tabIndex="-1" role="dialog"
            aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <AppUserProfile UserObj={UserObj} category={category} item={item} />
        </div>

    )
}

export default ModalProfileDetails;