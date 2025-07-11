import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/codelogo.png"
export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleTitleClick = () => {
    token ? navigate("/home") : navigate("/");
  };

  // Single button handler: login if not authenticated, logout if authenticated
  const handleAuthButton = () => {
    if (token) {
      handleLogout();
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="flex items-center justify-between py-6 px-8 bg-white shadow-md sticky top-0 z-50">
      {/* Logo / Title */}
      <div
        className="text-2xl font-bold gap-2 cursor-pointer flex items-center justify-center"
        onClick={handleTitleClick}
      >
        <span className="text-blue-800">PickCP</span> 
        <img src={logo} alt="" />
      </div>

  

      {/* Single Auth button */}
      <div>
        <button
          onClick={handleAuthButton}
          className="px-4 py-2 bg-blue-700 text-white font-medium rounded-full hover:bg-blue-500 transition"
        >
          {token ? "Logout" : "Get Started"}
        </button>
      </div>
    </nav>
  );
}
