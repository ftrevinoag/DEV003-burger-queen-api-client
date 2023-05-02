/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/logo-bq.png';

const Header = ({ title }) => {
  const [display, setDisplay] = useState(false);
  // Obteniendo el rol y correo electrónico del usuario que inició sesión
  const currentUSerRol = sessionStorage.getItem('currentRol');
  const currentUSerEmail = sessionStorage.getItem('currentEmail');
  return (
    <header className="header-menu">
      <div className="principal-menu">
        <img src={img} alt="logo" className="logo-Header" />
        <p className="title">{title}</p>
        <div className="user-logged">
        {/ Mostrando el correo electrónico del usuario que inició sesión /}
          <p className="user-name">{currentUSerEmail}</p>
          <i className="user-icon fas fa-user" />
          <div className={display ? 'active menu-icon-container' : 'menu-icon-container'}>
            <i className="menu-icon fas fa-bars" onClick={() => (display ? setDisplay(false) : setDisplay(true))} role="button" tabIndex={0} />
          </div>
        </div>
      </div>
      { display
      && (
      <nav className="nav">
        <ul>
          <Link to="/menu">
            <li>MENU</li>
          </Link>
          <Link to="/orders">
            <li>PROCESSED ORDERS</li>
          </Link>
          <Link to="/kitchen">
            <li>KITCHEN</li>
          </Link>
          {/ Si el usuario que inició sesión es un administrador /}
          {currentUSerRol === 'true'
          && (
          <>
          {/ Enlace a la página de administración de usuarios /}
            <Link to="/userlist">
              <li>Admin users</li>
            </Link>
            <Link to="/productlist">
              <li>Admin products</li>
            </Link>
          </>
          )}
        </ul>
      </nav>
      )}

    </header>
  );
};

export default Header;