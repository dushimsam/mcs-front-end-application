import ProfileSettings from "../../../../components/shared/account/settings";
import AdminDashboard from "../../../../components/dashboards/AdminDashboard";

export default function AccoutnSettings(){
    return (
        <AdminDashboard>
           <div className="px-3">
               <ProfileSettings />
           </div>
        </AdminDashboard>
    )
}