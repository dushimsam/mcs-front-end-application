import { dateFormat } from "../../../utils/functions"
import styles from "../../../styles/components/table.module.css";

const StudentTable = ({ students }) => {
    console.log("here students", students)
    return (
        <table className="table table-hover" style={{ fontSize: "0.8em" }}>
            <thead>
                <tr>
                    <th scope="col" className={styles.th}>#</th>
                    <th scope="col" className={styles.th}>Student Names</th>
                    <th scope="col" className={styles.th}>Student Code</th>
                    <th scope="col" className={styles.th}>Student Class</th>
                    <th scope="col" className={styles.th}>GENDER</th>
                    <th scope="col" className={styles.th}>Create At</th>
                </tr>
            </thead>
            {
                students.map((student, index) => {
                    return (<tr key={index} className="border-bottom">
                        <td title="Index" style={{ fontWeight: "lighter", fontSize: "1.2em" }}>{index + 1}</td>
                        <td title="Student Names" style={{ fontSize: "1.2em" }}>{student?.studentNames}</td>
                        <td title="Student Code" style={{ fontSize: "1.2em" }}>{student?.studentCode}</td>
                        <td title="Student Class" style={{ fontSize: "1.2em" }}>{student?.studentClass}</td>
                        <td title="Student Gender" style={{ fontSize: "1.2em" }}>{student?.gender}</td>
                        <td title="Student Added At" style={{ fontSize: "1.2em" }}>{dateFormat(student?.createdAt).onlyDate()}</td>
                    </tr>)
                })
            }
        </table>)
}

export default StudentTable;