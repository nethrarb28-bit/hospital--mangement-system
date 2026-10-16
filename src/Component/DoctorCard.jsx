import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DoctorCard({ doctor }) {
  const navigate = useNavigate();

  return (
    <div style={{ 
      backgroundColor: '#fff', 
      border: '1px solid #e0e0e0', 
      borderRadius: '8px', 
      padding: '16px', 
      marginBottom: '12px',
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between', 
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)' 
    }}>
      <div>
        {/* Optimized image with native lazy loading */}
        <img 
          src={doctor.imageUrl || 'https://via.placeholder.com/100'} 
          alt={`Profile photo of ${doctor.name}`} 
          loading="lazy" 
          width="80" 
          height="80"
          style={{ borderRadius: '50%', objectFit: 'cover', marginBottom: '10px' }}
        />
        <h3 style={{ margin: '0 0 8px 0' }}>{doctor.name}</h3>
        <p style={{ margin: '0 0 12px 0', color: '#666' }}>{doctor.specialty}</p>
      </div>
      
      <button 
        onClick={() => navigate(`/book/${doctor.id}`)}
        aria-label={`Book appointment with ${doctor.name}`}
        style={{
          backgroundColor: '#0066cc',
          color: '#fff',
          border: 'none',
          padding: '10px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Book Appointment
      </button>
    </div>
  );
}