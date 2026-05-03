import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";

function Users() {
  const [allUsers, loading] = useGetAllUsers();

  return (
    <div>
      <h1 className="px-6 pt-4 pb-2 text-gray-500 font-semibold text-xs uppercase tracking-wider bg-white">
        All Messages
      </h1>
      <div
        className="py-1 flex-1 overflow-y-auto"
        style={{ maxHeight: "calc(84vh - 10vh)" }}
      >
        {allUsers.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Users;
