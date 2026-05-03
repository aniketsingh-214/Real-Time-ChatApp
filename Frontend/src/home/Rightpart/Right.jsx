import { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../statemanage/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className="w-full bg-[#f0f2f5] text-gray-900 flex flex-col h-screen">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <Chatuser />
          <div className="flex-1 overflow-y-auto">
            <Messages />
          </div>
          <Typesend />
        </>
      )}
    </div>
  );
}

export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();
  return (
  <div className="relative flex-1 bg-[#f0f2f5] text-gray-900 border-l border-gray-200">
    {/* Mobile Menu Icon */}
    <label
      htmlFor="my-drawer-2"
      className="btn btn-ghost drawer-button lg:hidden absolute left-5 top-5"
    >
      <CiMenuFries className="text-xl text-gray-700" />
    </label>

    {/* Centered Welcome Message */}
    <div className="h-full flex flex-col items-center justify-center text-center px-6 py-6">
      <div className="space-y-4 max-w-md mx-auto">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <BiMessageSquareDetail className="text-4xl text-blue-500" />
        </div>
        <h1 className="text-2xl md:text-3xl font-light text-gray-800">
          Welcome, <span className="font-semibold text-blue-600">{authUser.user.fullname}</span>
        </h1>
        <p className="text-gray-500">
          Select a chat from the sidebar to start messaging.
        </p>
      </div>
    </div>
  </div>
);


};
