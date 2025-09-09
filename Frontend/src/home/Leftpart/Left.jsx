import Search from "./Search";
import Users from "./Users";
import { BiMessageSquareDetail } from "react-icons/bi";
 

function Left() {
  return (
  <div className="w-full sm:w-[40%] md:w-[30%] bg-white text-gray-900 h-screen flex flex-col border-r border-gray-200">
    {/* Header */}
    <div className="flex items-center justify-start px-6 py-4 border-b border-gray-200 bg-[#f8f9fd]">
      <BiMessageSquareDetail className="text-2xl mr-2 text-blue-500" />
      <h1 className="font-semibold text-lg tracking-wide">Tappy Chats</h1>
    </div>

    {/* Search */}
    <div className="px-4 py-3 border-b border-gray-100 bg-[#f9fafe]">
      <Search />
    </div>

    {/* Users */}
    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent bg-[#fdfdff]">
      <Users />
    </div>
  </div>
);

}

export default Left;
