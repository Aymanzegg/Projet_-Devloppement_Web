import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginForm from "./views/LoginForm";
import RegisterForm from "./views/RegisterForm";
import MaterialList from "./views/MaterialList";
import MyReservations from "./views/MyReservations";
import "./index.css";

function App() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser(payload);
      } catch (e) {
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <BrowserRouter>
      <Header 
        user={user} 
        logout={handleLogout} 
        setSearchTerm={setSearchTerm} 
      />

      <Routes>
        <Route 
          path="/" 
          element={<MaterialList user={user} searchTerm={searchTerm} />} 
        />
        <Route path="/my-reservations" element={<MyReservations />} />
        <Route path="/login" element={<LoginForm setUser={setUser} />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;