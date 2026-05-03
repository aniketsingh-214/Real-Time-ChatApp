import { useState } from "react";
import Left from "./home/Leftpart/Left";
import Right from "./home/Rightpart/Right";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useAuth } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import Logout from "./home/left1/Logout";

import { Navigate, Route, Routes } from "react-router-dom";
function App() {
  const [authUser, setAuthUser] = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <div className="flex h-screen overflow-hidden">
                <Logout onProfileClick={() => setShowProfile(true)} />
                <Left showProfile={showProfile} onProfileClose={() => setShowProfile(false)} />
                <Right />
              </div>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;













 