import { useState, useEffect, useRef } from "react";
import useSendMessage from "../../context/useSendMessage.js";
import { FiSend, FiPaperclip, FiX } from "react-icons/fi"; 
import { useSocketContext } from "../../context/SocketContext.jsx";
import useConversation from "../../statemanage/useConversation.js";

function Typesend() {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  
  const { loading, sendMessages } = useSendMessage();
  const { socket } = useSocketContext();
  const { selectedConversation } = useConversation();

  const handleTyping = (e) => {
    setMessage(e.target.value);
    if (socket && selectedConversation?._id) {
      socket.emit("typing", { receiverId: selectedConversation._id });
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (selectedFile.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(selectedFile));
      } else {
        setPreview(null); // No preview for non-images for now
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (socket && selectedConversation?._id) {
        socket.emit("stopTyping", { receiverId: selectedConversation._id });
      }
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [message, socket, selectedConversation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() && !file) return;
    
    if (socket && selectedConversation?._id) {
      socket.emit("stopTyping", { receiverId: selectedConversation._id });
    }

    const formData = new FormData();
    if (message.trim()) formData.append("message", message);
    if (file) formData.append("file", file);

    await sendMessages(formData);
    setMessage("");
    removeFile();
  };

  return (
    <div className="mt-auto">
      {/* File Preview */}
      {file && (
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 flex items-center gap-3">
          <div className="relative group">
            {preview ? (
              <img src={preview} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-gray-300" />
            ) : (
              <div className="w-16 h-16 bg-blue-100 flex items-center justify-center rounded-lg border border-gray-300">
                <span className="text-[10px] font-bold text-blue-600 uppercase text-center px-1">
                  {file.name.split('.').pop()}
                </span>
              </div>
            )}
            <button 
              onClick={removeFile}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
            >
              <FiX size={12} />
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-700 truncate">{file.name}</p>
            <p className="text-[10px] text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="px-4 py-3 bg-[#f0f2f5] border-t border-gray-200">
        <div className="flex items-center gap-3 bg-white rounded-full px-4 shadow-sm border border-gray-300 h-[8vh]">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-500 hover:text-blue-500 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiPaperclip className="text-xl" />
          </button>
          
          <input 
            type="file" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileChange}
            accept="image/*,video/*"
          />

          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={handleTyping}
            className="flex-1 bg-transparent text-gray-900 text-sm py-2 outline-none placeholder-gray-500"
          />
          
          <button
            type="submit"
            disabled={loading}
            className={`p-2 rounded-full transition-colors ${
              loading ? "text-gray-300" : "text-gray-500 hover:text-blue-500 hover:bg-gray-100"
            }`}
          >
            <FiSend className="text-xl" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Typesend;
