import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { FaUserCircle } from "react-icons/fa";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const getOnlineUsersStatus = (userId) => {
    if (!userId || onlineUsers.length === 0) return "Offline";
    return onlineUsers.some((id) => id.toString() === userId.toString())
      ? "Online"
      : "Offline";
  };

  return (
    <div className=" pl-5 pt-3 h-[12vh] flex space-x-4 bg-blue-600">
      <div>
        <div className="avatar online">
          <div className="w-12 h-12 rounded-full text-gray-400 bg-gray-100 flex items-center justify-center text-3xl">
            <FaUserCircle />
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-xl">{selectedConversation.name}</h1>
        <span
          className={`text-sm font-bold ${
            getOnlineUsersStatus(selectedConversation?._id) === "Online"
              ? "text-green-500"
              : "text-white"
          }`}
        >
          {onlineUsers.length === 0
            ? "Loading..."
            : getOnlineUsersStatus(selectedConversation?._id)}
        </span>
      </div>
    </div>
  );
}

export default Chatuser;
