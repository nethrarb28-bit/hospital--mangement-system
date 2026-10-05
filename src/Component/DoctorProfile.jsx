import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppointmentContext } from './AppointmentContext';

export default function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { doctors } = useAppointmentContext();

  const doctor = doctors.find((doc) => doc.id === parseInt(id, 10));

  const handleBookNow = () => {
    // Navigate to login page first before booking
    navigate('/login', { state: { doctorId: doctor.id } });
  };

  if (!doctor) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3>Doctor Not Found</h3>
        <button
          onClick={() => navigate('/doctors')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#008080',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Back to Doctors List
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <button
        onClick={() => navigate('/doctors')}
        style={{
          marginBottom: '15px',
          padding: '6px 12px',
          border: 'none',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        ← Back to Doctors
      </button>

      <h2 style={{ color: '#008080', margin: '0 0 10px 0' }}>{doctor.name}</h2>
      <p><strong>Specialty:</strong> {doctor.specialty}</p>
      <p><strong>Qualification:</strong> {doctor.qualification}</p>
      <p><strong>Experience:</strong> {doctor.experience} years</p>
      <p><strong>Rating:</strong> {doctor.rating} ★</p>
      <p><strong>Consultation Fee:</strong> ${doctor.fee}</p>

      <button
        onClick={handleBookNow}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#008080',
          color: '#ffffff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginTop: '15px',
        }}
      >
        Proceed to Login & Book
      </button>
    </div>
  );
}