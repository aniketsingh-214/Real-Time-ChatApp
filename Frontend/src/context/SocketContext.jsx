import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";
const socketContext = createContext();

export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [authUser] = useAuth();

  useEffect(() => {
    if (authUser) {
      const apiUrl = import.meta.env.VITE_API_URL;
      const socketUrl = apiUrl.replace("/api/v1", "");
      const socket = io(socketUrl, {
        query: {
          userId: authUser.user._id,
        },
      });
      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      socket.on("typing", ({ senderId }) => {
        setTypingUsers((prev) => [...new Set([...prev, senderId])]);
      });
      socket.on("stopTyping", ({ senderId }) => {
        setTypingUsers((prev) => prev.filter((id) => id !== senderId));
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);
  return (
    <socketContext.Provider value={{ socket, onlineUsers, typingUsers }}>
      {children}
    </socketContext.Provider>
  );
};
