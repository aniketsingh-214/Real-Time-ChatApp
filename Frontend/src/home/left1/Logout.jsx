import { useState } from "react";
import { FiLogOut, FiUser } from "react-icons/fi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthProvider";

function Logout({ onProfileClick }) {
  const [loading, setLoading] = useState(false);
  const [authUser] = useAuth();
  const handleLogout = async () => {
    setLoading(true);
    try {
      const result = await axios.post(`${import.meta.env.VITE_API_URL}/user/logout`, {}, { withCredentials: true });
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logged out successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Error in logging out");
    }
  };
  return (
  <>
    <div className="w-14 sm:w-[5%] bg-gray-50 border-r border-gray-200 text-gray-800 flex flex-col items-center justify-between h-screen py-6">
      <div className="flex flex-col items-center gap-6">
        {/* Profile Avatar Trigger */}
        <button
          onClick={onProfileClick}
          className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shadow-md hover:bg-blue-600 transition-all"
          title="My Profile"
        >
          {authUser?.user?.fullname?.charAt(0).toUpperCase()}
        </button>
      </div>

      <div className="p-2">
        <button
          onClick={handleLogout}
          className="group relative flex items-center justify-center w-10 h-10 hover:bg-gray-200 rounded-lg transition duration-300"
          aria-label="Logout"
        >
          <FiLogOut className="text-xl text-gray-600 group-hover:scale-110 group-hover:text-red-500 transition duration-300" />

          <span className="absolute left-full ml-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50">
            Logout
          </span>
        </button>
      </div>
    </div>
  </>
);


}
export default Logout;