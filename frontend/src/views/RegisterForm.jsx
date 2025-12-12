import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Button from "../components/Button";

export default function RegisterForm() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      
      await api.post("/auth/signup", values);
      alert("Compte créé avec succès ! Connectez-vous.");
      navigate("/login"); 
    } catch (e) {
      console.error(e);
      alert("Erreur lors de l'inscription (Email déjà pris ?)");
    }
  };

  return (
    <div className="form-container">
      <h2>Nouveau Compte</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <label>Prénom</label>
          <input type="text" name="firstName" required />
          
          <label>Nom</label>
          <input type="text" name="lastName" required />
          
          <label>Email</label>
          <input type="email" name="email" required />
          
          <label>Mot de passe</label>
          <input type="password" name="password" required />
        </div>

        <div style={{ marginTop: "20px" }}>
          <Button type="submit" text="Créer mon compte" styleType="primary" />
        </div>
      </form>
    </div>
  );
}