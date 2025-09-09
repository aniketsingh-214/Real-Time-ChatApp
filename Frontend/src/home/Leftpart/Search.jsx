import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../statemanage/useConversation";
import toast from "react-hot-toast";
function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();
  console.log(allUsers);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = allUsers.find((user) =>
      user.fullname?.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };
  return (
  <div className="h-[10vh] flex items-center px-4 sm:px-6">
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center gap-3">
        <label className="flex items-center w-full px-4 py-[6px] rounded-md bg-royalblue-800 border border-slate-600 focus-within:ring-2 focus-within:ring-indigo-500 transition">
          <FiSearch className="text-lg text-gray-800" />
          <input
            type="text"
            className="ml-3 w-full bg-transparent text-sm outline-none placeholder-gray-800 text-grey-900"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>
    </form>
  </div>
);
}

export default Search;
