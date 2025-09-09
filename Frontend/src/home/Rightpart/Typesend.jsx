import { useState } from "react";
import useSendMessage from "../../context/useSendMessage.js";
import { FiSend } from "react-icons/fi"; 

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    await sendMessages(message);
    setMessage("");
  };
  return (
  <form onSubmit={handleSubmit} className="px-2 sm:px-6 mt-auto mb-2">
    <div className="flex items-center gap-2 h-[8vh] border-2 border-[#4169e1] bg-white rounded-xl px-3 sm:px-4 shadow-sm">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 bg-transparent text-gray-900 text-sm sm:text-base py-[10px] px-3 outline-none placeholder-gray-500"
      />
      <button
        type="submit"
        className="p-2 rounded-md hover:bg-blue-100 transition duration-300"
      >
        <FiSend className="text-xl text-blue-600 hover:text-blue-800" />
      </button>
    </div>
  </form>
);


}

export default Typesend;
