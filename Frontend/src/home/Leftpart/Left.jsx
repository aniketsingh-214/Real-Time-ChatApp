import Search from "./Search";
import Users from "./Users";
import { BiMessageSquareDetail } from "react-icons/bi";
import Profile from "../left1/Profile";

function Left({ showProfile, onProfileClose }) {
  return (
    <div className="relative w-full sm:w-[40%] md:w-[30%] bg-white text-gray-900 h-screen flex flex-col border-r border-gray-200 shadow-sm overflow-hidden">
      {showProfile && <Profile onClose={onProfileClose} />}
      
      {/* Header */}
      <div className="flex items-center justify-start px-6 py-[1.125rem] border-b border-gray-200 bg-gray-50">
        <BiMessageSquareDetail className="text-3xl mr-3 text-blue-500" />
        <h1 className="font-bold text-xl text-gray-800 tracking-tight">Chats</h1>
      </div>

      {/* Search */}
      <div className="px-4 py-2 border-b border-gray-100 bg-white">
        <Search />
      </div>

      {/* Users */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent bg-white">
        <Users />
      </div>
    </div>
  );
}

export default Left;
