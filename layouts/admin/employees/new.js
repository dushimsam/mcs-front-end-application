import EmployeesService from "../../../services/users/school-employee-service"
import React, { useEffect, useState } from "react";
import userService from "../../../services/users/user.service";
import FormLayout from "../../../components/forms/FormLayout"
import SingleSubModuleLayout from "../../../layouts/admin-layouts/SingleSubModule";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import { employeeSchema } from "../../../utils/validations/schemas/employee";
import TextField from "../../../components/forms/TextField";
import SelectField from "../../../components/forms/SelectField";
import { ALERT_EXPIRATION_PERIOD } from "../../../utils/constants";

const Content = () => {

    const [ showMessage, setShowMessage ] = useState(1);

    const [ message, setMessage ] = useState({
        title: "Successfully created an employee",
        color: "success"
    })
    
    
    const router = useRouter()
    
    
    const subMitForm = async (values) => {
        try {

            let userFormData = {
                userName: values.username,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phone: values.phone,
                password: values.password,
                gender: values.gender
            }
            
           const res =  await userService.create(userFormData)
           let employeeFormData = {
            userId:res.data.id,
            residence: values.residence,
            }

            await EmployeesService.create(employeeFormData)

            setShowMessage(showMessage + 1)
            setMessage({
                title: "Successfully created an employee",
                color: "success"
            })

            window.setTimeout(function () {
                router.push('/admin/employees');
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
                    userName: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    category: SCHOOL_EMPLOYEE,
                    password: "",
                    gender: "",
                    residence: "",
                }}
                onSubmit={subMitForm}
                validationSchema={employeeSchema}
            >
                {(formik) => (
                    <Form>
                        <FormLayout showMessage={showMessage} message={message} title="New Employee">
                            <div className="row row-cols-2">
                                <div className="col"><TextField label="First Name" name="firstName"
                                                                type="text"/>
                                </div>
                                <div className="col"><TextField label="Last Name" name="lastName" type="text"/>
                                </div>
                                <div className="col"><TextField label="User Name" name="username" type="text"/>
                                </div>
                                <div className="col"><TextField label="Email" name="email" type="email"/></div>
                                <div className="col"><TextField label="Phone" name="phone" type="tel"/></div>
                                
                                <div className="col">
                                    <SelectField label="Gender" name="gender" type="string">
                                        <option value="">- select the gender -</option>
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                    </SelectField>
                                </div>
                                <div className="col"><SelectField label="Employee category"
                                                                  name="employeeCategory">
                                    <option value="">Select Category</option>
                                    {["SCHOOL_ADMIN","SCHOOL_ADMIN"].map((category) => {
                                        return (
                                            <option
                                                value={category}
                                                key={category}
                                            >
                                                {category}
                                            </option>
                                        );
                                    })}
                                </SelectField></div>
                        
                                <div className="col"><TextField label="Password" name="password" type="text"/>
                                </div>
                            </div>
                            <div className="mt-5">
                                <button
                                    className="btn btn-danger px-4 mr-5 pr-"
                                    type="submit"
                                >
                                    CREATE
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

const NewEmployee = () => {
    const [ total, setTotal ] = useState(0);
    
    // useEffect(() => {
    //     EmployeesDataService.getPaginated().then(res => {
    //         setTotal(res.data.totalDocs);
    //     }).catch(error => {
    //         console.log(error)
    //     })
    // }, [])
    
    return (
        <SingleSubModuleLayout name={"Employees"} route={"/admin/employees"} count={total} Content={<Content/>}/>
    )
};

export default NewEmployee;