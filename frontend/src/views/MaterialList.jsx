import { useEffect, useState } from "react";
import api from "../services/api";
import Button from "../components/Button";

export default function MaterialList({ user, searchTerm }) {
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [dates, setDates] = useState({ startDate: "", endDate: "" });

  useEffect(() => {
    api.get("/materials")
      .then((res) => setMaterials(res.data))
      .catch((err) => console.error(err));
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

  const openReservationModal = (material) => {
    setSelectedMaterial(material);
    const today = new Date().toISOString().split('T')[0];
    setDates({ startDate: today, endDate: today });
  };

  const confirmReservation = async (e) => {
    e.preventDefault();
    try {
      await api.post("/reservations", {
        materialId: selectedMaterial.id,
        startDate: dates.startDate,
        endDate: dates.endDate
      });
      
      alert("✅ Réservation confirmée ! Retrouvez-la dans 'Mon Devis'");
      setSelectedMaterial(null);
    } catch (error) {
      alert("❌ Erreur : Ce matériel est peut-être déjà réservé à ces dates.");
    }
  };

  const filteredMaterials = materials.filter((mat) => 
    mat.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    mat.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>
          {searchTerm ? `RÉSULTATS POUR : "${searchTerm}"` : "NOS ÉQUIPEMENTS DISPONIBLES"}
      </h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
        
        {filteredMaterials.map((mat) => (
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
                    <Button text="Réserver" onClick={() => openReservationModal(mat)} styleType="primary" style={{width: '100%'}} />
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

      {filteredMaterials.length === 0 && materials.length > 0 && (
          <p style={{textAlign: "center", marginTop: "40px", fontSize: "1.2em"}}>
              😕 Aucun matériel ne correspond à votre recherche.
          </p>
      )}

      {materials.length === 0 && (
        <div style={{ textAlign: "center", color: "#666", marginTop: "50px" }}>
            <p>Le catalogue est vide ou en cours de chargement...</p>
        </div>
      )}

      {selectedMaterial && (
        <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
        }}>
            <div className="card" style={{ width: "400px", maxWidth: "90%" }}>
                <h3 style={{ marginTop: 0 }}>Réserver : {selectedMaterial.name}</h3>
                
                <form onSubmit={confirmReservation} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "5px" }}>Date de début</label>
                        <input type="date" required value={dates.startDate} 
                               onChange={(e) => setDates({...dates, startDate: e.target.value})} style={{ width: "100%" }} />
                    </div>
                    <div>
                        <label style={{ display: "block", marginBottom: "5px" }}>Date de fin</label>
                        <input type="date" required value={dates.endDate} 
                               onChange={(e) => setDates({...dates, endDate: e.target.value})} style={{ width: "100%" }} />
                    </div>

                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                        <Button text="Confirmer" type="submit" styleType="primary" />
                        <Button text="Annuler" onClick={() => setSelectedMaterial(null)} styleType="secondary" />
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
}