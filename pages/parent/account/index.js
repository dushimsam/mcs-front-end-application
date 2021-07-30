import AccountDetails from "../../../components/shared/account";
import ParentDashboard from '../../../components/dashboards/ParentDashboard';

export default function EmployeeAccountDetails(){
    return (
        <ParentDashboard>
            <AccountDetails link={"/parent/account/settings"}/>
        </ParentDashboard>
    )
}