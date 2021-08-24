import Chat from "../components/Chat/Chat";
import RouteProtector from "../middlewares/RouteProtector";
import {system_users} from "../utils/constants";
import {useSelector} from "react-redux";
import EmployeeDashboard from "../components/dashboards/EmployeeDashboard";
import AdminDashboard from "../components/dashboards/AdminDashboard";
import ParentDashboard from "../components/dashboards/ParentDashboard";

export default function chat() {
    return (
        <RouteProtector
            only={[system_users.ADMIN, system_users.EMPLOYEE, system_users.PARENT]}
        >
            <Chat/>
        </RouteProtector>
    );
}
