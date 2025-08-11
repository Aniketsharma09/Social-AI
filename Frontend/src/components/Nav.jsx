import { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import API from "../utils/axiosConfig";

const Nav = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // detects route change

  const getUserData = async () => {
    try {
      const response = await API.get("auth/user");
      setUserName(response.data.user?.username || "");
    } catch (err) {
      console.error("Auth check failed:", err.response?.data?.message);
      setUserName("");
    }
  };

  useEffect(() => {
    getUserData(); 
  }, [location.pathname]); // re-check login whenever route changes

  return (
    <div className="w-full h-full bg-gray-800 flex items-center justify-between px-5 py-3">
      {/* Logo */}
      <div className="logo w-[33%] font-mono text-3xl tracking-wide">
        Social <span className="text-blue-500 font-bold tracking-widest">AI</span>
      </div>

      {/* Links */}
      <div className="w-[20%] flex items-center justify-between">
        <NavLink className="text-xl tracking-widest" to="/">
          Home
        </NavLink>
        <NavLink className="text-xl tracking-widest" to="/about">
          About
        </NavLink>
      </div>

      {/* Profile or Login */}
      <div className="w-[33%] flex justify-end">
        {userName ? (
          <div
            onClick={() => navigate("/user-profile")}
            className="cursor-pointer h-fit w-fit rounded-full"
          >
            <i className="ri-user-2-line text-2xl font-black"></i>
          </div>
        ) : (
          <div className="flex items-center justify-end">
            <NavLink
              className="px-3 py-1 rounded-md bg-blue-500 text-md tracking-widest"
              to="/login"
            >
              Login
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
