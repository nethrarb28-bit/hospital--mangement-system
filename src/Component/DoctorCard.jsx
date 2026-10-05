import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
export default function DoctorCard({ doctor }) {
  const navigate = useNavigate();
return (
    <div style={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <div>
        <h3 style={{ margin: '0 0 4px 0', color: '#138496', fontSize: '1.1rem' }}>{doctor.name}</h3>
        <p style={{ margin: '0 0 6px 0', color: '#555', fontSize: '0.9rem' }}>{doctor.specialty}</p>
        <p style={{ margin: '0 0 4px 0', fontSize: '0.85rem', color: '#666' }}>Qual: {doctor.qualification}</p>
        <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: '#666' }}>Exp: {doctor.experience} yrs | Fee: ${doctor.fee}</p>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Link 
          to={`/doctor/${doctor.id}`} 
          style={{ flex: 1, textAlign: 'center', backgroundColor: '#e6f2f2', color: '#0c9c9c', border: 'none', padding: '8px', borderRadius: '4px', fontWeight: 'bold', textDecoration: 'none', fontSize: '0.85rem' }}>
          Profile
        </Link>
        <button 
          onClick={() => navigate('/book-appointment', { state: { doctorId: doctor.id } })}
          style={{ flex: 1, backgroundColor: '#008080', color: '#fff', border: 'none', padding: '8px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' }}>
          Book
        </button>
      </div>
    </div>
  );
}