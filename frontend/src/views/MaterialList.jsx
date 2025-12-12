import { useEffect, useState } from "react";
import api from "../services/api";
import Button from "../components/Button";
 
export default function MaterialList({ user }) {
  const [materials, setMaterials] = useState([]);
 

  useEffect(() => {
    api.get("/materials")
      .then((res) => setMaterials(res.data))
      .catch((err) => console.error("Erreur chargement", err));
  }, []);
 
  const handleDelete = async (id) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce matériel ?")) {
      try {
        await api.delete(`/materials/${id}`);

        setMaterials((prev) => prev.filter((m) => m.id !== id));
      } catch (e) {
        alert("Erreur: Action réservée aux Admins !");
      }
    }
  };
 
  const handleReserve = (materialName) => {
    alert(`Demande de réservation envoyée pour : ${materialName}`);

  };
 
  return (
<div>
<h2 style={{ marginBottom: '30px' }}>NOS ÉQUIPEMENTS DISPONIBLES</h2>

<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
        {materials.map((mat) => (
<div key={mat.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
<div>
<h3 style={{ margin: "0 0 10px 0", color: "#1a1a1a" }}>{mat.name}</h3>
<p style={{ color: "#666", fontSize: "0.9em", margin: "5px 0" }}>Catégorie : <strong>{mat.category}</strong></p>

<p style={{ fontWeight: "800", fontSize: "1.4em", color: "#ffcf00", margin: "15px 0" }}>
                {mat.pricePerDay} € <span style={{fontSize: "0.6em", color: "#666", fontWeight: "normal"}}>/ jour</span>
</p>
</div>
<div style={{ display: "flex", gap: "10px", marginTop: "auto", borderTop: "1px solid #eee", paddingTop: "15px" }}>

              {user && (
<div style={{ flex: 1 }}>
<Button text="Réserver" onClick={() => handleReserve(mat.name)} styleType="primary" style={{width: '100%'}} />
</div>
              )}
 

              {user?.role === "ADMIN" && (
<div style={{ flex: 1 }}>
<Button text="Supprimer" onClick={() => handleDelete(mat.id)} styleType="danger" style={{width: '100%'}} />
</div>
              )}
</div>
</div>
        ))}
</div>
      {materials.length === 0 && (
<div style={{ textAlign: "center", color: "#666", marginTop: "50px" }}>
<p>Le catalogue est vide ou en cours de chargement...</p>
</div>
      )}
</div>
  );
}