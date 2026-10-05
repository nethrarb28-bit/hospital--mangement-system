import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppointmentContext } from './AppointmentContext';
export default function AppointmentHistory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { appointments, cancelAppointment } = useAppointmentContext();
  if (id) {
    const record = appointments.find((a) => a.id === id);
  if (!record) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h3>Appointment Not Found</h3>
          <button
            onClick={() => navigate('/appointments')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#008080',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            View All Appointments
          </button>
        </div>
      );
    }
  return (
      <div
        style={{
          maxWidth: '500px',
          margin: '20px auto',
          padding: '25px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
        }}
      >
        <h2 style={{ color: '#008080' }}>Booking Details</h2>
        <p style={{ fontSize: '0.85rem', color: '#888' }}>
          Appointment ID: #{record.id}
        </p>

        <div
          style={{
            margin: '20px 0',
            padding: '15px',
            backgroundColor: record.status === 'Cancelled' ? '#ffe4e6' : '#dcfce7',
            borderRadius: '6px',
          }}
        >
          <strong>Status:</strong>{' '}
          <span
            style={{
              color: record.status === 'Cancelled' ? '#e11d48' : '#15803d',
              fontWeight: 'bold',
            }}
          >
            {record.status}
          </span>
        </div>

        <p>
          <strong>Doctor:</strong> {record.doctorName} ({record.specialty})
        </p>
        <p>
          <strong>Date & Slot:</strong> {record.date} at {record.slot}
        </p>
        <p>
          <strong>Patient Name:</strong> {record.patientName}
        </p>
        <p>
          <strong>Phone:</strong> {record.phone}
        </p>
        <p>
          <strong>Email:</strong> {record.email}
        </p>
        <p>
          <strong>Fee Paid:</strong> ${record.fee}
        </p>

        {record.status !== 'Cancelled' && (
          <button
            onClick={() => cancelAppointment(record.id)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f90f27',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '15px',
            }}
          >
            Cancel Appointment
          </button>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '15px',
            marginTop: '15px',
          }}
        >
          {appointments.map((a) => (
            <div
              key={a.id}
              style={{
                border: '1px solid #ccc',
                padding: '15px',
                borderRadius: '6px',
                backgroundColor: '#fff',
              }}
            >
              <h4 style={{ margin: '0 0 5px 0' }}>{a.doctorName}</h4>
              <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}>
                {a.date} | {a.slot}
              </p>
              <p style={{ margin: '0 0 10px 0', fontSize: '0.85rem' }}>
                Patient: {a.patientName}
              </p>
              <button
                onClick={() => navigate(`/appointment/${a.id}`)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#008080',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                }}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}