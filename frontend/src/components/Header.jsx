import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../index.css';


const Header = ({ user, logout, setSearchTerm }) => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value); 
    
    
    if (value.length > 0) {
        navigate("/"); 
    }
  };

  return (
    <header className="header-container">
      <Link to="/" className="header-logo" onClick={() => setSearchTerm("")}>
        MATOS-LOC
      </Link>

      <div className="header-search">
        <input 
            type="text" 
            placeholder="Que recherchez-vous ? (ex: Perceuse)" 
            onChange={handleSearch} 
        />
        <button>🔍</button>
      </div>

      <div className="header-actions">
        <Link to="/my-reservations" className="user-menu">
            <span className="icon">📅</span>
            <span>Mes Réservations</span>
        </Link>

        {!user ? (
          <>
            <Link to="/login" className="user-menu">
              <span className="icon">👤</span>
              <span>Me connecter</span>
            </Link>
            <Link to="/register" className="user-menu" style={{ fontWeight: 'bold' }}>
              <span className="icon">📝</span>
              <span>Créer un compte</span>
            </Link>
          </>
        ) : (
          <div onClick={logout} className="user-menu">
            <span className="icon">🚪</span>
            <span>Déconnexion</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;