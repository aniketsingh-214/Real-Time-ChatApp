function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser.user._id;

  const chatName = itsMe ? " chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-blue-500" : "";

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="p-4 flex justify-start">
      <div
        className={`chat ${chatName} max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl`}
      >
        <div
          className={`
          inline-block px-4 py-3 rounded-2xl text-gray-800 shadow-lg
          backdrop-blur-sm border border-white/10
          transition-all duration-200 hover:shadow-xl
          ${chatColor}
          ${
            message.message.length > 100
              ? "max-w-md"
              : message.message.length > 50
              ? "max-w-sm"
              : "max-w-xs"
          }
        `}
          style={{
            minWidth: "fit-content",
            width: "max-content",
            maxWidth:
              message.message.length > 150
                ? "20rem"
                : message.message.length > 100
                ? "16rem"
                : message.message.length > 50
                ? "12rem"
                : "8rem",
          }}
        >
          <div className="text-sm leading-relaxed break-words whitespace-pre-wrap">
            {message.message}
          </div>
        </div>
        <div className="mt-1 px-1 text-xs text-gray-400 opacity-75">
          {formattedTime}
        </div>
      </div>
    </div>
  );
}

export default Message;
