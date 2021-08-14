import React from 'react'
import styles from '../../../styles/components/deleteConfirm.module.css';
// import Alert from "../../alert";


const ConfirmationModal = ({ continueAction, loading, setLoading, message, btnColor }) => {
    return (
        <div id="confirmationModal" className={"modal fade"}>
            <div className={"modal-dialog modal-dialog-centered " + styles.modalConfirm}>
                <div className={"modal-content " + styles.modalContent}>

                    <div className={"modal-body " + styles.modalBody}>
                        <span>{message}</span> <br />
                    </div>
                    <div className={"modal-footer justify-content-center " + styles.modalFooter}>
                        <button type="button" className={"btn btn-secondary " + styles.btnSecondary + " " + styles.btn}
                            data-dismiss="modal" onClick={() => continueAction(false)}>Cancel
                        </button>
                        <button type="button" className={"btn " + styles.btnSuccess + " " + styles.btn + " " + btnColor}
                            onClick={() => {
                                continueAction(true);
                                setLoading(true)
                            }}>
                            {loading ? (
                                <img
                                    style={{ width: "2.5em", height: "2.5em" }}
                                    src={"/app-imgs/spinner.gif"}
                                    alt={"Loading"}
                                    className={"loader"}
                                />
                            ) : "Yes"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ConfirmationModal;