import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
function Signup() {
  const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    await axios
    .post("https://real-timechatapp214.vercel.app/api/user/signup", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Signup successful");
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
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-rose-100 via-sky-100 to-indigo-100 px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-2xl rounded-2xl px-10 py-8 w-full max-w-md border border-blue-100 space-y-5 font-sans"
        >
          {/* Brand Title */}
          <h1 className="text-4xl font-extrabold text-center text-indigo-600 tracking-wide">
            Tappy
          </h1>

          {/* Subheading */}
          <h2 className="text-xl text-center text-gray-700 font-medium">
            Create a new{" "}
            <span className="text-pink-500 font-semibold">Account</span>
          </h2>

          {/* Fullname */}
          <label className="flex items-center gap-3 bg-sky-50 border border-blue-200 px-4 py-2 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
            <svg
              className="w-5 h-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              placeholder="Fullname"
              className="w-full bg-transparent outline-none text-gray-800"
              {...register("fullname", { required: true })}
            />
          </label>
          {errors.fullname && (
            <span className="text-red-500 text-xs font-semibold">
              This field is required
            </span>
          )}

          {/* Email */}
          <label className="flex items-center gap-3 bg-pink-50 border border-pink-200 px-4 py-2 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-pink-400">
            <svg
              className="w-5 h-5 text-pink-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-transparent outline-none text-gray-800"
              {...register("email", { required: true })}
            />
          </label>
          {errors.email && (
            <span className="text-red-500 text-xs font-semibold">
              This field is required
            </span>
          )}

          {/* Password */}
          <label className="flex items-center gap-3 bg-indigo-50 border border-indigo-200 px-4 py-2 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-indigo-400">
            <svg
              className="w-5 h-5 text-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent outline-none text-gray-800"
              {...register("password", { required: true })}
            />
          </label>
          {errors.password && (
            <span className="text-red-500 text-xs font-semibold">
              This field is required
            </span>
          )}

          {/* Confirm Password */}
          <label className="flex items-center gap-3 bg-purple-50 border border-purple-200 px-4 py-2 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-purple-400">
            <svg
              className="w-5 h-5 text-purple-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full bg-transparent outline-none text-gray-800"
              {...register("confirmPassword", {
                required: true,
                validate: validatePasswordMatch,
              })}
            />
          </label>
          {errors.confirmPassword && (
            <span className="text-red-500 text-xs font-semibold">
              {errors.confirmPassword.message}
            </span>
          )}

          {/* Submit Button */}
          <div>
            <input
              type="submit"
              value="Sign Up"
              className="w-full bg-gradient-to-r from-pink-500 to-indigo-500 hover:brightness-110 text-white py-2 rounded-xl font-semibold shadow-md transition duration-200 cursor-pointer"
            />
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?
            <Link
              to="/login"
              className="text-indigo-500 ml-1 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Signup;
