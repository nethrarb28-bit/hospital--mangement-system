import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Navbar() {
  const linkStyle = ({ isActive }) => ({
    padding: '8px 16px',
    borderRadius: '4px',
    textDecoration: 'none',
    color: isActive ? '#ffffff' : '#333333',
    backgroundColor: isActive ? '#008080' : 'transparent',
    fontWeight: isActive ? 'bold' : 'normal',
    transition: 'all 0.2s ease',
  });

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 30px',
        backgroundColor: '#ffffff',
        borderBottom: '2px solid #eaeaea',
        marginBottom: '20px',
      }}
    >
      <Link
        to="/"
        style={{
          fontSize: '1.4rem',
          fontWeight: 'bold',
          color: '#008080',
          textDecoration: 'none',
        }}
      >
        MediPulse Hospital
      </Link>
      <div style={{ display: 'flex', gap: '10px' }}>
        <NavLink to="/" style={linkStyle}>
          Home
        </NavLink>
        <NavLink to="/doctors" style={linkStyle}>
          Doctors
        </NavLink>
        <NavLink to="/appointments" style={linkStyle}>
          Appointments
        </NavLink>
        <NavLink to="/patient" style={linkStyle}>
          Patient Dashboard
        </NavLink>
        <NavLink to="/login" style={linkStyle}>
          Login
        </NavLink>
      </div>
    </nav>
  );
}