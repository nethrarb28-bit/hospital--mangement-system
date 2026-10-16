import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cancelAppointment, rescheduleAppointment } from '../redux/appointmentSlice';

export function AppointmentManager() {
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector((state) => state.appointments);

  const handleReschedule = (id) => {
    const newDate = prompt('Enter new appointment date (YYYY-MM-DD):');
    const newSlot = prompt('Enter new time slot (e.g., 02:00 PM):');
    if (newDate && newSlot) {
      dispatch(rescheduleAppointment({ id, newDate, newSlot }));
      alert('Appointment rescheduled successfully via API PUT/PATCH!');
    }
  };

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      dispatch(cancelAppointment(id));
      alert('Appointment canceled successfully via API DELETE!');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', padding: '30px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#008080', marginBottom: '20px' }}>Appointment History & Management</h2>

      {loading && <p style={{ color: '#008080' }}>Processing request...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {appointments.length === 0 ? (
        <p style={{ color: '#666' }}>No active appointments found. Book one from the Doctors page.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {appointments.map((appt) => (
            <div key={appt.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '6px', background: '#f9f9f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: '0 0 5px 0', color: '#008080' }}>{appt.doctorName} ({appt.specialty})</h4>
                <p style={{ margin: '3px 0', fontSize: '0.9rem', color: '#444' }}><strong>Patient:</strong> {appt.patientName}</p>
                <p style={{ margin: '3px 0', fontSize: '0.9rem', color: '#444' }}><strong>Date:</strong> {appt.date} | <strong>Time:</strong> {appt.timeSlot}</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => handleReschedule(appt.id)} style={{ padding: '8px 12px', background: '#f0ad4e', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Reschedule</button>
                <button onClick={() => handleCancel(appt.id)} style={{ padding: '8px 12px', background: '#d9534f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Cancel</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AppointmentManager;