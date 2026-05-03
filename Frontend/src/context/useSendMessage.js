import { useState } from "react";
import useConversation from "../statemanage/useConversation.js";
import axios from "axios";
import { useAuth } from "./AuthProvider";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();
  const [authUser] = useAuth();

  const sendMessages = async (messageData) => {
    setLoading(true);
    
    const tempId = Date.now().toString();
    const isFormData = messageData instanceof FormData;
    const messageText = isFormData ? messageData.get("message") : messageData;
    
    const optimisticMessage = {
      _id: tempId,
      message: messageText,
      senderId: authUser?.user?._id,
      receiverId: selectedConversation._id,
      status: "sending",
      createdAt: new Date().toISOString(),
    };

    if (isFormData && messageData.get("file")) {
        const file = messageData.get("file");
        optimisticMessage.fileType = file.type.startsWith("image/") ? "image" : "video";
        optimisticMessage.fileUrl = URL.createObjectURL(file); // Local preview URL
    }
    
    setMessage([...messages, optimisticMessage]);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/message/send/${selectedConversation._id}`,
        isFormData ? messageData : { message: messageData },
        { withCredentials: true }
      );
      setMessage((prev) => 
        prev.map((msg) => (msg._id === tempId ? res.data : msg))
      );
    } catch (error) {
      setMessage((prev) => prev.filter((msg) => msg._id !== tempId));
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessages };
};

export default useSendMessage;
