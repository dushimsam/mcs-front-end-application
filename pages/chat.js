import Chat from "../components/Chat/Chat";
import RouteProtector from "../middlewares/RouteProtector";
import { system_users } from "../utils/constants";

export default function chat() {
  return (
    <RouteProtector
      only={[system_users.ADMIN, system_users.EMPLOYEE, system_users.PARENT]}
    >
      <Chat />
    </RouteProtector>
  );
}
