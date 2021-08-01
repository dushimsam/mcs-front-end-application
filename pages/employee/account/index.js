import AccountDetails from "../../../components/shared/account";
import EmployeeDashboard from '../../../components/dashboards/EmployeeDashboard';

export default function EmployeeAccountDetails(){
    return (
        <EmployeeDashboard>
            <AccountDetails link={"/employee/account/settings"}/>
        </EmployeeDashboard>
    )
}