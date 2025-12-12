import { useEffect, useState } from "react";
import api from "../services/api";
import Button from "../components/Button";

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
  
    api.get("/reservations")
      .then((res) => setReservations(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: "30px", textAlign: "center" }}>MES RÉSERVATIONS</h2>

      {reservations.length === 0 ? (
        <div className="card" style={{ textAlign: "center" }}>
            <p>Vous n'avez aucune réservation en cours.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {reservations.map((resa) => (
            <div key={resa.id} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                
                <h3 style={{ margin: 0 }}>{resa.Material ? resa.Material.name : "Matériel supprimé"}</h3>
                <p>Du {new Date(resa.startDate).toLocaleDateString()} au {new Date(resa.endDate).toLocaleDateString()}</p>
                <p style={{ fontWeight: "bold", color: resa.status === 'CONFIRMED' ? 'green' : 'orange' }}>
                    Statut : {resa.status === 'PENDING' ? 'En attente' : resa.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}