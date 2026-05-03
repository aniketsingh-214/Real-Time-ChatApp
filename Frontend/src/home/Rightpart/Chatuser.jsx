import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { FaUserCircle } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";

function Chatuser() {
  const { selectedConversation, setMessage } = useConversation();
  const { onlineUsers, typingUsers } = useSocketContext();

  const isOnline = onlineUsers.some(
    (id) => id.toString() === selectedConversation?._id?.toString()
  );
  
  const isTyping = typingUsers?.some(
    (id) => id.toString() === selectedConversation?._id?.toString()
  );

  const statusText = isTyping ? "Typing..." : (isOnline ? "Online" : "Offline");

  const handleClearChat = async () => {
    if (!window.confirm("Clear all messages with this user?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/message/clear/${selectedConversation._id}`, {
        withCredentials: true,
      });
      setMessage([]);
      toast.success("Chat cleared");
    } catch (error) {
      toast.error("Failed to clear chat");
    }
  };

  return (
    <div className="px-6 py-3 h-[10vh] flex items-center justify-between bg-gray-50 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-10 h-10 rounded-full text-gray-400 bg-gray-200 flex items-center justify-center text-2xl overflow-hidden shadow-sm">
            <FaUserCircle />
          </div>
        </div>
        <div>
          <h1 className="text-lg font-medium text-gray-900">{selectedConversation.fullname}</h1>
          <span
            className={`text-xs ${
              isOnline || isTyping ? "text-green-500" : "text-gray-500"
            }`}
          >
            {statusText}
          </span>
        </div>
      </div>

      <button
        onClick={handleClearChat}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-full transition-colors"
        title="Clear Chat"
      >
        <FiTrash2 size={18} />
      </button>
    </div>
  );
}

export default Chatuser;
