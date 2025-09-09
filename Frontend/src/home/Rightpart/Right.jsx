import { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../statemanage/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className="w-full bg-grey-100 text-gray-300">
      <div>
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <Chatuser />
            <div
              className=" flex-1 overflow-y-auto"
              style={{ maxHeight: "calc(84vh - 6vh)" }}
            >
              <Messages />
            </div>
            <Typesend />
          </>
        )}
      </div>
    </div>
  );
}

export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();
  return (
  <div className="relative flex-1 bg-gradient-to-tr from-gray-100 via-gray-100 to-gray-200 text-gray-900">
    {/* Mobile Menu Icon */}
    <label
      htmlFor="my-drawer-2"
      className="btn btn-ghost drawer-button lg:hidden absolute left-5 top-5"
    >
      <CiMenuFries className="text-xl text-gray-700" />
    </label>

    {/* Centered Welcome Message */}
    <div className="h-full flex flex-col items-center justify-center text-center px-6 py-6">
      <div className="space-y-4">
        <h1 className="text-xl md:text-3xl font-semibold leading-relaxed text-gray-800 drop-shadow-md">
          Welcome
          <br />
          <span className="font-bold text-indigo-600 drop-shadow-lg">
            {authUser.user.fullname}
          </span>
        </h1>
        <p className="text-sm md:text-base text-gray-600 drop-shadow-sm max-w-md mx-auto">
          No chat selected. Start a conversation by selecting someone from your contacts.
        </p>
      </div>
    </div>
  </div>
);


};
