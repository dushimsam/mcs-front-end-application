import EmployeesDataService from "../../../services/employees/employees";


import EmployeeCategoriesDataService from "../../../services/employees/employee-categories";
import React, { useEffect, useState } from "react";
import userService from "../../../services/users/user.service";
import FormLayout from "../../../components/forms/FormLayout"
import SingleSubModuleLayout from '../../../layouts/parent/SingleSubModule';

import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import { employeeSchema } from "../../../utils/validations/schemas/employee";
import TextField from "../../../components/forms/TextField";
import SelectField from "../../../components/forms/SelectField";
import { ALERT_EXPIRATION_PERIOD, employeeUserTypeId } from "../../../utils/constants";
import studentService from "../../../services/users/student-service";

const Content = ({ parent }) => {
    const [showMessage, setShowMessage] = useState(1);
    const [message, setMessage] = useState({
        title: "Successfully created an employee",
        color: "success"
    })

    const router = useRouter()

    const subMitForm = async (values) => {
        try {
            let formData = {
                studentNames: values.firstName + " " + values.lastName,
                studentClass: values.studentClass,
                studentCode: values.studentCode,
                gender: values.gender,
                parentId: parent.id
            }
            await studentService.create(formData)

            setShowMessage(showMessage + 1)
            setMessage({
                title: "Successfully added a student",
                color: "success"
            })
            window.setTimeout(function () {
                router.push('/parent/my-students');
            }, ALERT_EXPIRATION_PERIOD);

        } catch (e) {
            setShowMessage(showMessage + 1)
            setMessage({ title: e.response.data.message || "An error occured .. ", color: "danger" })
        }
    };

    return (
        <div className="card-body px-5 py-4">
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    studentClass: "",
                    studentCode: "",
                    gender: ""
                }}
                onSubmit={subMitForm}
                validationSchema={studentSchema}
            >
                {(formik) => (
                    <Form>
                        <FormLayout showMessage={showMessage} message={message} title="New Student">
                            <div className="row row-cols-2">
                                <div className="col"><TextField label="First Name" name="firstName"
                                    type="text" />
                                </div>
                                <div className="col"><TextField label="Last Name" name="lastName" type="text" />
                                </div>
                                <div className="col"><TextField label="Student Code" name="studentCode" type="text" />
                                </div>
                                <div className="col"><TextField label="Student Class" name="studentClass" type="text" /></div>

                                <div className="col">
                                    <SelectField label="Gender" name="gender" type="string">
                                        <option value="">- select the gender -</option>
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                    </SelectField>
                                </div>
                            </div>
                            <div className="mt-5">
                                <button
                                    className="btn btn-danger px-4 mr-5 pr-"
                                    type="submit"
                                >
                                    ADD
                                </button>
                                <button className="btn btn-outline-danger px-4" type="reset">
                                    CLEAR
                                </button>
                            </div>
                        </FormLayout>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

const NewStudent = () => {
    const [parent, setParent] = useState([]);
    const user = useSelector(state => state.authUser);
    useEffect(() => {
        ParentService.getByUser(user.id)
            .then((res) => {
                setParent(res.data)
            }).catch(error => {
                console.log(error)
            })
    }, []);

    return (
        <SingleSubModuleLayout name={"My Students"} route={"/parent/my-students"} count={parent.students.length} Content={<Content parent={parent} />} />
    )
};

export default NewStudent;



