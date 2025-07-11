import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Register from "./pages/Register";
import Login from "./pages/Login";
import About from "./pages/About.jsx";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <AuthProvider>
      <Router> {/* ✅ This is now BrowserRouter */}
        <ToastContainer />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<About />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
