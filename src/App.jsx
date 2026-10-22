import React, { lazy, Suspense } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/appointmentSlice';

// Lazy loaded components for Experiment 2 (Performance & Code Splitting)
const DoctorList = lazy(() => import('./Component/DoctorList').then(module => ({ default: module.DoctorList })));
const AppointmentBooking = lazy(() => import('./Component/AppointmentBooking').then(module => ({ default: module.AppointmentBooking })));
const AppointmentManager = lazy(() => import('./Component/AppointmentManager').then(module => ({ default: module.AppointmentManager })));
const PatientDashboard = lazy(() => import('./Component/PatientDashboard').then(module => ({ default: module.PatientDashboard })));
const Login = lazy(() => import('./Component/Login').then(module => ({ default: module.Login })));

function Home() {
  return (
    <div style={{ maxWidth: '800px', margin: '60px auto', padding: '40px', background: '#fff', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <h1 style={{ color: '#008080', fontSize: '2.2rem', marginBottom: '15px' }}>Welcome to MediPulse Speciality Hospital</h1>
      <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '30px' }}>Schedule appointments with top specialist doctors quickly and securely.</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
        <Link to="/doctors" style={{ padding: '12px 24px', backgroundColor: '#008080', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}>Find a Doctor</Link>
        <Link to="/dashboard" style={{ padding: '12px 24px', border: '1px solid #008080', color: '#008080', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}>Patient Portal</Link>
      </div>
    </div>
  );
}

// Protected Route Wrapper
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.appointments);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.appointments);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f4f7f6', minHeight: '100vh', margin: '0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      {/* Navigation Bar */}
      <nav style={{ background: '#fff', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 style={{ margin: 0, color: '#008080', fontSize: '1.5rem' }}>MediPulse Hospital</h2>
        <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#333', textDecoration: 'none', fontWeight: '500' }}>Home</Link>
          <Link to="/doctors" style={{ color: '#333', textDecoration: 'none', fontWeight: '500' }}>Doctors</Link>
          <Link to="/appointments" style={{ color: '#333', textDecoration: 'none', fontWeight: '500' }}>Appointments</Link>
          <Link to="/dashboard" style={{ color: '#333', textDecoration: 'none', fontWeight: '500' }}>Patient Dashboard</Link>
          {isAuthenticated ? (
            <button 
              onClick={() => dispatch(logout())} 
              style={{ padding: '6px 12px', background: '#d9534f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" style={{ color: '#333', textDecoration: 'none', fontWeight: '500' }}>Login</Link>
          )}
        </div>
      </nav>

      {/* Routes Setup wrapped in Suspense for Code Splitting */}
      <div style={{ flex: 1, padding: '20px' }}>
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '50px', color: '#008080', fontSize: '1.2rem', fontWeight: 'bold' }}>Loading module...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<DoctorList />} />
            <Route path="/book/:doctorId" element={<ProtectedRoute><AppointmentBooking /></ProtectedRoute>} />
            <Route path="/appointments" element={<ProtectedRoute><AppointmentManager /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>
      </div>

      {/* Footer */}
      <footer style={{ background: '#008080', color: '#fff', textAlign: 'center', padding: '15px', fontSize: '0.9rem' }}>
        © 2026 MediPulse Hospital. All rights reserved.
      </footer>
    </div>
  );
}