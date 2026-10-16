import React from 'react';
import { useAppointmentContext } from './AppointmentContext';

export default function PatientAppointments() {
  const { appointments } = useAppointmentContext();

  return (
    <div>
      <h3 style={{ color: '#008080', marginBottom: '15px' }}>Patient Appointments Overview</h3>
      {appointments.length === 0 ? (
        <p style={{ color: '#666' }}>No appointments booked yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {appointments.map((a) => (
            <div key={a.id} style={{ padding: '12px', border: '1px solid #e0e0e0', borderRadius: '6px', backgroundColor: '#f9f9f9' }}>
              <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#333' }}>Doctor: {a.doctorName}</p>
              <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#555' }}>Date & Slot: {a.date} at {a.slot}</p>
              <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 'bold', color: a.status === 'Cancelled' ? '#d9534f' : '#28a745' }}>
                Status: {a.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}