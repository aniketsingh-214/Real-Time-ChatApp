import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [authUser, setAuthUser] = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    axios
      .post("/api/user/login", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Login successful");
        }
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      });
  };
  return (
  <>
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-sky-100 to-indigo-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-2xl rounded-2xl px-10 py-8 w-full max-w-md border border-blue-100 space-y-5 font-sans"
      >
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-indigo-600 tracking-wide">
          Tappy
        </h1>

        {/* Subheading */}
        <h2 className="text-xl text-center text-gray-700 font-medium">
          Login with your{" "}
          <span className="text-blue-500 font-semibold">Account</span>
        </h2>

        {/* Email */}
        <label className="flex items-center gap-3 bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-5 h-5 text-blue-500"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="w-full bg-transparent outline-none text-gray-800"
            placeholder="Email"
            {...register("email", { required: true })}
          />
        </label>
        {errors.email && (
          <span className="text-red-500 text-xs font-semibold">
            This field is required
          </span>
        )}

        {/* Password */}
        <label className="flex items-center gap-3 bg-purple-50 border border-purple-200 px-4 py-2 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-purple-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-5 h-5 text-purple-500"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="w-full bg-transparent outline-none text-gray-800"
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </label>
        {errors.password && (
          <span className="text-red-500 text-xs font-semibold">
            This field is required
          </span>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          <input
            type="submit"
            value="Login"
            className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 hover:brightness-110 text-white py-2 rounded-xl font-semibold shadow-md transition duration-200 cursor-pointer"
          />
        </div>

        {/* Link to Signup */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?
          <Link
            to="/signup"
            className="text-indigo-500 ml-1 hover:underline font-medium"
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  </>
);

}

export default Login;
