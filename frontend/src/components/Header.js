// Header.js
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import logo from '../img/logo.svg';
import '../css/style.css'; // Zaimportowane style CSS

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Załaduj skrypt fontawesome tylko jeśli nie jest już załadowany
    if (!document.querySelector('script[src="https://kit.fontawesome.com/faceb1bdbd.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://kit.fontawesome.com/faceb1bdbd.js';
      script.crossOrigin = 'anonymous';
      document.body.appendChild(script);
    }
  }, []);

  const isActive = (path) => window.location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/'); // Przekierowanie do strony logowania po wylogowaniu
  };

  return (
    <>
      <div className="top-bar">
        <img className="logo" src={logo} alt="Logo LibrApp" />
        <span className="user-info">
          {user ? `${user.firstName} ${user.lastName}` : 'Przeglądasz jako Gość'}
        </span>
      </div>
      <nav>
        <Link to="/catalog" className={`nav-button ${isActive('/catalog') ? 'active' : ''}`}>
          <i className="fa-solid fa-list"></i> <span>Katalog</span>
        </Link>

        {user && user.isStaff && (
          <Link to="/admin-panel" className={`admin-panel-button ${isActive('/admin-panel') ? 'active' : ''}`}>
            <i className="fa-solid fa-cog"></i> <span>Panel administracyjny</span>
          </Link>
        )}

        {user && (
          <>
            <Link to="/reservations" className={`nav-button ${isActive('/reservations') ? 'active' : ''}`}>
              <i className="fa-regular fa-calendar-check"></i> <span>Rezerwacje</span>
            </Link>
            <Link to="/loans" className={`nav-button ${isActive('/loans') ? 'active' : ''}`}>
              <i className="fa-solid fa-book-open"></i> <span>Wypożyczenia</span>
            </Link>
            <Link to="/profile" className={`nav-button ${isActive('/profile') ? 'active' : ''}`}>
              <i className="fa-solid fa-user"></i> <span>Moje konto</span>
            </Link>
            <button onClick={handleLogout} className="nav-button">
              <i className="fa-solid fa-arrow-right-from-bracket"></i> <span>Wyloguj</span>
            </button>
          </>
        )}

        {!user && (
          <>
            <Link to="/" className={`nav-button ${isActive('/') ? 'active' : ''}`}>
              <i className="fa-solid fa-user-circle"></i> <span>Logowanie</span>
            </Link>
            <Link to="/register" className={`nav-button ${isActive('/register') ? 'active' : ''}`}>
              <i className="fa-solid fa-user-plus"></i> <span>Rejestracja</span>
            </Link>
          </>
        )}
      </nav>
    </>
  );
};

export default Header;
