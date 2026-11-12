
import React from 'react';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">

        <a href="#home" className="brand">
          <img src="/assets/logo.png" alt="FitFlex Logo" />
        </a>

        <nav className="nav-links">
          <a href="#home">HOME</a>
          <a href="#about">ABOUT</a>
          <a href="#membership">MEMBERSHIP</a>
          <a href="#contact">CONTACT</a>
        </nav>

        <div className="nav-right">
          <a href="#login" className="login-link">LOGIN</a>
          <a href="#membership" className="join-link">
            JOIN NOW
          </a>
        </div>

      </div>
    </header>
  );
}

export default Navbar;
