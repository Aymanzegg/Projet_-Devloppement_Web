import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; 
import Button from "../components/Button";

export default function LoginForm({ setUser }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      
      const response = await api.post("/auth/login", values);
      
      
      const { token, userId, role } = response.data;
      
      
      localStorage.setItem("token", token);
      
      
      setUser({ userId, role });
      
      
      navigate("/");
      
    } catch (e) {
      console.error(e);
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="form-container">
      <h2>Espace Pro</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <label>Email professionnel</label>
          <input type="email" name="email" required placeholder="ex: jean.dupont@entreprise.com" />
          
          <label>Mot de passe</label>
          <input type="password" name="password" required placeholder="Votre mot de passe" />
        </div>
        
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        
        <div style={{ marginTop: "20px" }}>
          <Button type="submit" text="Se connecter" styleType="primary" />
        </div>
      </form>
    </div>
  );
}