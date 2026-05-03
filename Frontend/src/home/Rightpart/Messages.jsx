import { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../components/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";
function Messages() {
  const { loading, messages, hasMore, loadMore } = useGetMessage();
  useGetSocketMessage(); 

  const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current && messages.length <= 20) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-[#efeae2] relative">
      {hasMore && !loading && messages.length > 0 && (
        <div className="flex justify-center mb-4">
          <button 
            onClick={loadMore} 
            className="text-xs bg-white text-gray-600 px-3 py-1.5 rounded-full shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors z-10"
          >
            Load previous messages
          </button>
        </div>
      )}
      
      {loading && Array.isArray(messages) && messages.length === 0 ? (
        <Loading />
      ) : (
        Array.isArray(messages) && messages.length > 0 &&
        messages.map((message, index) => (
          <div key={message._id || index} ref={index === messages.length - 1 ? lastMsgRef : null}>
            <Message message={message} />
          </div>
        ))
      )}

      {!loading && (!Array.isArray(messages) || messages.length === 0) && (
        <div>
          <p className="text-center mt-[20%] text-slate-900">
            Say Hi! to start the conversation
          </p>
        </div>
      )}
    </div>
  );
}

export default Messages;
