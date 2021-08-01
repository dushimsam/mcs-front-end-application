import AccountDetails from "../../../components/shared/account";
import AdminDashboard from "../../../components/dashboards/AdminDashboard";

export default function AdminAccountDetails () {
    return (
        <AdminDashboard>
            <AccountDetails link={"/admin/account/settings"}/>
        </AdminDashboard>
    )
}