import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginForm from "./views/LoginForm";
import RegisterForm from "./views/RegisterForm";
import MaterialList from "./views/MaterialList";
import Button from "./components/Button";
import "./index.css";

function App() {
  const [user, setUser] = useState(null);

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
      <nav style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        padding: "1rem 2rem", 
        backgroundColor: "#1a1a1a", 
        color: "white",
        marginBottom: "40px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
            <h1 style={{ margin: 0, fontSize: "1.8rem", color: "#ffcf00", letterSpacing: "-1px" }}>MATOS-LOC</h1>
        </Link>
        
        <div>
          {!user ? (
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <Link to="/login" style={{ color: "white", textDecoration: "none", fontWeight: "500" }}>Connexion</Link>
              <Link to="/register">
                  <Button text="Créer un compte" styleType="primary" />
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <span style={{ fontSize: "0.9rem", color: "#ccc" }}>Bonjour, {user.role === 'ADMIN' ? 'Admin' : 'Utilisateur'}</span>
              <Button text="DÉCONNEXION" onClick={handleLogout} styleType="danger" />
            </div>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<MaterialList user={user} />} />
        <Route path="/login" element={<LoginForm setUser={setUser} />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;