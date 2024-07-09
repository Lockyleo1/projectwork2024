// src/components/Navbar.js

import React from 'react';
import './Navbar.css';
import profileImage from '../assets/logo.jpg'; // Assicurati di avere il percorso corretto per la tua immagine

const Navbar = () => {
  return (
    <nav className="navbar navbar-fixed">
      <div className="navbar-left">
        <img src={profileImage} alt="Profile" className="profile-image" />
      </div>
      <div className="navbar-center">
        <h2>Progetto BUL</h2>
      </div>
      <div className="navbar-right">
        <h1 className="profile-name">Leonardo Costa</h1>
      </div>
      <div className="navbar-links">
      </div>
    </nav>
  );
};

export default Navbar;
