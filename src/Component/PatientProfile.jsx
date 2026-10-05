import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
export default function PatientProfile() {
  const navStyle = ({ isActive }) => ({
    padding: '8px 16px',
    borderRadius: '4px',
    textDecoration: 'none',
    color: isActive ? '#008080' : '#555',
    backgroundColor: isActive ? '#e6f2f2' : 'transparent',
    fontWeight: isActive ? 'bold' : 'normal',
  });
  return (
    <div style={{ padding: '20px' }}>
      <h2>Patient Dashboard</h2>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          borderBottom: '2px solid #ddd',
          paddingBottom: '10px',
          marginBottom: '20px',
        }}
      >
        <NavLink to="/patient/appointments" style={navStyle}>
          All Appointments
        </NavLink>
        <NavLink to="/patient/upcoming" style={navStyle}>
          Upcoming
        </NavLink>
        <NavLink to="/patient/history" style={navStyle}>
          History
        </NavLink>
        <NavLink to="/patient/profile" style={navStyle}>
          Profile
        </NavLink>
      </div>
      <div
        style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #eee',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}