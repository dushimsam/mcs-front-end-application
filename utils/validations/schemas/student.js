import * as Yup from "yup";

export const studentSchema = Yup.object({
    firstName: Yup.string().min(3).max(100).required().label("First name"),
    lastName: Yup.string().min(3).max(100).required().label("Last name"),
    studetClass: Yup.string().min(3).max(20).required().label("Student Class"),
    studentCode: Yup.string().email().min(3).max(100).required().label("Student Code"),
    gender: Yup.string().min(4).required().label("Gender")
});