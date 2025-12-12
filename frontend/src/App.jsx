import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import LoginForm from "./views/LoginForm";
import RegisterForm from "./views/RegisterForm";
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
  };
 
  return (
<BrowserRouter>
<nav style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        padding: "1rem", 
        backgroundColor: "#1a1a1a", 
        color: "white",
        marginBottom: "20px"
      }}>
<h1 style={{ margin: 0, fontSize: "1.5rem", color: "#ffcf00" }}>MATOS-LOC</h1>
<div>
          {!user ? (
<>
<Link to="/login" style={{ marginRight: "10px", color: "white", textDecoration: "none" }}>Connexion</Link>
<Link to="/register" style={{ color: "#ffcf00", textDecoration: "none", fontWeight: "bold" }}>Inscription</Link>
</>
          ) : (
<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
<span>Bonjour, Utilisateur</span>
<Button text="Déconnexion" onClick={handleLogout} styleType="danger" />
</div>
          )}
</div>
</nav>
 

<Routes>
<Route path="/" element={<div className="card"><h2>Bienvenue sur le catalogue</h2><p>Connectez-vous pour réserver.</p></div>} />
<Route path="/login" element={<LoginForm setUser={setUser} />} />
<Route path="/register" element={<RegisterForm />} />
</Routes>
</BrowserRouter>
  );
}
 
export default App;