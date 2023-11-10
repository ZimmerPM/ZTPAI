import React, {useEffect }from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../img/logo.svg';

const Header = ({ user }) => {
  const location = useLocation();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://kit.fontawesome.com/faceb1bdbd.js';
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);
  }, []);


  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="top-bar">
       <img className="logo" src={logo} alt="mark logo" />
        <span className="user-info">
          {user ? `${user.name} ${user.lastname}` : 'Przeglądasz jako Gość'}
        </span>
      </div>

      <nav>
        <Link to="/catalog" className={`nav-button ${isActive('/catalog') ? 'active' : ''}`}>
          <i className="fa-solid fa-list"></i> <span>Katalog</span>
        </Link>

        {user && user.role === 'admin' && (
          <Link to="/adminPanel" className={`admin-panel-button ${isActive('/adminPanel') || isActive('/usersManagement') ? 'active' : ''}`}>
            <i className="fa-solid fa-cog"></i> <span>Panel administracyjny</span>
          </Link>
        )}

        {user && (
          <>
            <Link to="/reservations" className={`nav-button ${isActive('/reservations') ? 'active' : ''}`}>
              <i className="fa-regular fa-calendar-check"></i> <span>Rezerwacje</span>
            </Link>

            <Link to="/loans" className={`nav-button ${isActive('/loans') || isActive('/loansArchive') ? 'active' : ''}`}>
              <i className="fa-solid fa-book-open"></i> <span>Wypożyczenia</span>
            </Link>

            <Link to="/profile" className={`nav-button ${isActive('/profile') ? 'active' : ''}`}>
              <i className="fa-solid fa-user"></i> <span>Moje konto</span>
            </Link>

            <Link to="/logout" className="nav-button">
              <i className="fa-solid fa-arrow-right-from-bracket"></i> <span>Wyloguj</span>
            </Link>
          </>
        )}

        {!user && (
          <>
            <Link to="/login" className={`nav-button ${isActive('/login') ? 'active' : ''}`}>
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
