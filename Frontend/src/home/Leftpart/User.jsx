import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { FaUserCircle } from "react-icons/fa";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);
  return (
    <div
      className={`transition-colors duration-200 cursor-pointer ${
        isSelected ? "bg-blue-50" : "hover:bg-gray-50"
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 px-6 py-3 items-center">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 h-12 rounded-full text-gray-400 bg-gray-200 flex items-center justify-center text-3xl overflow-hidden">
            <FaUserCircle />
          </div>
        </div>
        <div className="flex-1 border-b border-gray-100 pb-3 pt-1">
          <h1 className="font-medium text-gray-900 text-base">{user.fullname}</h1>
          <span className="text-gray-500 text-sm truncate">{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
