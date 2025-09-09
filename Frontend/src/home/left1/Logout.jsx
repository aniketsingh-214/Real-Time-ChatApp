import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function Logout() {
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logged out successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Error in logging out");
    }
  };
  return (
  <>
    <div className="w-14 sm:w-[4%] bg-[#3b8dff] text-white flex flex-col items-center justify-between h-screen py-6">
      
      {/* Top Placeholder (for spacing / avatar in future if needed) */}
      <div></div>
      <div className="p-2">
        <button
          onClick={handleLogout}
          className="group relative flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg transition duration-300"
          aria-label="Logout"
        >
          <FiLogOut className="text-xl text-white group-hover:scale-110 transition duration-300" />

          <span className="absolute bottom-full mb-2 hidden group-hover:block bg-white/20 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
            Logout
          </span>
        </button>
      </div>
    </div>
  </>
);


}
export default Logout;