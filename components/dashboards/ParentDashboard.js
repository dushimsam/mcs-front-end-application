import Header from "../../components/dashboards/Header";
import Navbar from "../../components/dashboards/Navbar";
import RouteProtector from "../../middlewares/RouteProtector";
import { system_users } from "../../utils/constants";
import Footer from "../../components/dashboards/Footer";
import { parentLinks } from "../../utils/sidebar-links";

export default function ParentDashboard({ children }) {
  return (
    <RouteProtector only={[system_users.PARENT]}>
      <div className="page min-vh-100 d-flex flex-column justify-content-between">
        <div className="mb-5">
          <Header />
          <Navbar navList={parentLinks} />
          <div className="main container py-5">{children}</div>
        </div>
        <Footer />
      </div>
    </RouteProtector>
  );
}