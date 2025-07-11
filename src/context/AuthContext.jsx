import { createContext, useContext, useState, useEffect } from "react";
import API from "../utils/api"; // axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  // Set token to Axios headers if exists
  useEffect(() => {
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete API.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const loginContext = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);

    API.defaults.headers.common["Authorization"] = `Bearer ${tokenData}`;
  };

  const logoutContext = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    delete API.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, token, loginContext, logoutContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
