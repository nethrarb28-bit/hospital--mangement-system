import React from 'react';
import { useAppointmentContext } from './AppointmentContext';
export default function Header() {
  const { setSelectedDoctor } = useAppointmentContext();

const handleShowDoctors = () => {
    setSelectedDoctor(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowAppointments = () => {
    // Scroll down to the appointments section
    const appointmentSection = document.getElementById('appointment-history');
    if (appointmentSection) {
      appointmentSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <header style={{ 
      background: 'var(--primary-gradient)', 
      color: '#fff', 
      padding: '1rem 2rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center' 
    }}>
      <div 
        onClick={handleShowDoctors} 
        style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
      >
        <span style={{ fontSize: '1.5rem' }}>🏥</span>
        <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '800' }}>
          MediPulse Speciality Hospital
        </h1>
      </div>

      <nav style={{ display: 'flex', gap: '1.5rem', fontWeight: '600' }}>
       
        <span 
          onClick={handleShowAppointments} 
          style={{ cursor: 'pointer', padding: '4px 8px', borderRadius: '4px' }}
        >
          Appointments
        </span>
      </nav>
    </header>
  );
}