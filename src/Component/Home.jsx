import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const navigate = useNavigate();
return (
    <div
      style={{
        padding: '40px 20px',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
      }}
    >
      <h1 style={{ color: '#008080', fontSize: '2.5rem', marginBottom: '15px' }}>
        Welcome to MediPulse Speciality Hospital
      </h1>
      <p
        style={{
          fontSize: '1.1rem',
          color: '#555',
          maxWidth: '600px',
          margin: '0 auto 25px auto',
        }}
      >
        Schedule appointments with top specialist doctors quickly and easily.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
        <button
          onClick={() => navigate('/doctors')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#008080',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Find a Doctor
        </button>
        <button
          onClick={() => navigate('/patient')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#e6f2f2',
            color: '#008080',
            border: '1px solid #008080',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Patient Portal
        </button>
      </div>
    </div>
  );
}