import { BsCheck, BsCheckAll, BsClock } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import axios from "axios";
import useConversation from "../../statemanage/useConversation";
import toast from "react-hot-toast";

function Message({ message }) {
  const { messages, setMessage } = useConversation();
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser.user._id;

  const chatColor = itsMe ? "bg-[#dcf8c6] text-gray-800" : "bg-white text-gray-800";

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const getFileUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("blob:")) return url;
    return `${import.meta.env.VITE_API_URL.replace("/api/v1", "")}${url}`;
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/message/delete/${message._id}`, {
        withCredentials: true,
      });
      setMessage(messages.filter((m) => m._id !== message._id));
      toast.success("Message deleted");
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  return (
    <div className={`p-1 flex ${itsMe ? "justify-end" : "justify-start"}`}>
      <div className={`flex flex-col ${itsMe ? "items-end" : "items-start"} max-w-[75%] relative group`}>
        {itsMe && (
          <button
            onClick={handleDelete}
            className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-gray-400 hover:text-red-500"
            title="Delete message"
          >
            <FiTrash2 size={14} />
          </button>
        )}
        
        <div
          className={`px-3 py-2 rounded-2xl shadow-sm relative ${chatColor} ${
            itsMe ? "rounded-tr-none" : "rounded-tl-none"
          }`}
        >
          {/* Media Content */}
          {message.fileUrl && (
            <div className="mb-2 rounded-lg overflow-hidden">
              {message.fileType === "image" ? (
                <img 
                  src={getFileUrl(message.fileUrl)} 
                  alt="Attachment" 
                  className="max-w-full h-auto max-h-60 object-cover cursor-pointer hover:opacity-95 transition-opacity"
                  onClick={() => window.open(getFileUrl(message.fileUrl), '_blank')}
                />
              ) : message.fileType === "video" ? (
                <video 
                  src={getFileUrl(message.fileUrl)} 
                  controls 
                  className="max-w-full h-auto max-h-60"
                />
              ) : null}
            </div>
          )}

          {/* Text Content */}
          {message.message && (
            <div className="text-sm leading-relaxed break-words whitespace-pre-wrap pr-1">
              {message.message}
            </div>
          )}
          
          <div className="mt-1 flex items-center justify-end px-1 text-[10px] text-gray-500 gap-1">
            {formattedTime}
            {itsMe && (
              <span className="ml-1 flex items-center">
                {message.status === "sending" && <BsClock size={12} className="text-gray-400" />}
                {message.status === "sent" && <BsCheck size={16} className="text-gray-400" />}
                {message.status === "delivered" && <BsCheckAll size={16} className="text-gray-400" />}
                {message.status === "read" && <BsCheckAll size={16} className="text-blue-500" />}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
