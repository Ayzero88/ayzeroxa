import { FiLogOut } from "react-icons/fi";
function LogOut({ handleLogout }) {
  return (
        <FiLogOut onClick={handleLogout}/>
  );
}

export default LogOut;
