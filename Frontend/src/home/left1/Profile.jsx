import { useAuth } from "../../context/AuthProvider";
import { FiX, FiMail, FiUser, FiInfo, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function Profile({ onClose }) {
  const [authUser] = useAuth();
  const user = authUser?.user;

  const handleDeleteAccount = async () => {
    if (!window.confirm("ARE YOU SURE? This will permanently delete your account and all messages!")) return;
    if (!window.confirm("LAST WARNING: This action is irreversible.")) return;
    
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/user/delete`, {
        withCredentials: true,
      });
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      toast.success("Account deleted successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete account");
    }
  };

  return (
    <div className="absolute inset-0 bg-white z-50 flex flex-col animate-in slide-in-from-left duration-300">
      {/* Header */}
      <div className="flex items-center px-6 py-5 bg-blue-600 text-white">
        <button onClick={onClose} className="mr-6 hover:bg-blue-700 p-1 rounded-full transition-colors">
          <FiX className="text-2xl" />
        </button>
        <h1 className="text-xl font-semibold">Profile</h1>
      </div>

      {/* Profile Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {/* Avatar Section */}
        <div className="flex flex-col items-center py-8 bg-white shadow-sm mb-6">
          <div className="w-40 h-40 rounded-full bg-blue-100 flex items-center justify-center border-4 border-white shadow-md relative overflow-hidden group">
            <span className="text-6xl font-bold text-blue-600 uppercase">
              {user?.fullname?.charAt(0)}
            </span>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">{user?.fullname}</h2>
          <p className="text-gray-500 text-sm">Available</p>
        </div>

        {/* Details Section */}
        <div className="px-6 space-y-6 pb-10">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center text-blue-600 mb-2">
              <FiUser className="mr-2" />
              <span className="text-xs font-bold uppercase tracking-wider">Full Name</span>
            </div>
            <p className="text-gray-800 font-medium">{user?.fullname}</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center text-blue-600 mb-2">
              <FiMail className="mr-2" />
              <span className="text-xs font-bold uppercase tracking-wider">Email Address</span>
            </div>
            <p className="text-gray-800 font-medium">{user?.email}</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center text-blue-600 mb-2">
              <FiInfo className="mr-2" />
              <span className="text-xs font-bold uppercase tracking-wider">About</span>
            </div>
            <p className="text-gray-600 italic">Hey there! I am using Tappy.</p>
          </div>

          {/* Delete Account */}
          <div className="pt-4">
            <button 
              onClick={handleDeleteAccount}
              className="w-full flex items-center justify-center space-x-2 py-4 px-4 bg-red-50 text-red-600 rounded-xl border border-red-100 hover:bg-red-100 transition-all font-semibold"
            >
              <FiTrash2 />
              <span>Delete My Account</span>
            </button>
            <p className="text-center text-xs text-gray-400 mt-4 px-4">
              Deleting your account will remove all messages and profile data. This cannot be undone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
