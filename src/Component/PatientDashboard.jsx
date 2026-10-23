import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  cancelAppointment,
  rescheduleAppointment,
} from '../redux/appointmentSlice';

export function PatientDashboard() {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments.appointments);

  // Modal / Inline Reschedule State
  const [editingId, setEditingId] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTimeSlot, setNewTimeSlot] = useState('09:00 AM');

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      dispatch(cancelAppointment(id));
    }
  };

  const handleStartReschedule = (app) => {
    setEditingId(app.id);
    setNewDate(app.date);
    setNewTimeSlot(app.timeSlot);
  };

  const handleSaveReschedule = (id) => {
    if (!newDate) {
      alert('Please select a valid date.');
      return;
    }
    dispatch(
      rescheduleAppointment({
        id,
        newDate,
        newTimeSlot,
      })
    );
    setEditingId(null);
    alert('Appointment rescheduled successfully!');
  };

  return (
    <div
      style={{
        maxWidth: '900px',
        margin: '30px auto',
        padding: '20px',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      }}
    >
      <h2
        style={{
          color: '#008080',
          borderBottom: '2px solid #008080',
          paddingBottom: '10px',
        }}
      >
        Patient Dashboard & Bookings
      </h2>

      {appointments.length === 0 ? (
        <p
          style={{
            textAlign: 'center',
            color: '#666',
            padding: '30px',
            fontSize: '1.1rem',
          }}
        >
          No active appointments found.
        </p>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            marginTop: '20px',
          }}
        >
          {appointments.map((app) => (
            <div
              key={app.id}
              style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '20px',
                background: '#fcfcfc',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '15px',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '8px',
                  }}
                >
                  <span
                    style={{
                      background: '#008080',
                      color: '#fff',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                    }}
                  >
                    Token: {app.tokenNumber || `TK-${app.id}`}
                  </span>
                  <span
                    style={{
                      color: '#2e7d32',
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                    }}
                  >
                    ● {app.status || 'Confirmed'}
                  </span>
                </div>

                <h3 style={{ margin: '5px 0', color: '#333' }}>
                  Patient: {app.patientName}
                </h3>
                <p style={{ margin: '3px 0', color: '#555' }}>
                  <strong>Doctor:</strong> {app.doctorName || 'Dr. Specialist'}
                </p>
                <p style={{ margin: '3px 0', color: '#555' }}>
                  <strong>Phone:</strong> {app.phoneNumber}
                </p>
                <p style={{ margin: '3px 0', color: '#555' }}>
                  <strong>Date:</strong> {app.date} | <strong>Time:</strong>{' '}
                  {app.timeSlot}
                </p>
              </div>

              {/* Action Buttons & Reschedule Mode */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  minWidth: '200px',
                }}
              >
                {editingId === app.id ? (
                  <div
                    style={{
                      background: '#edf7f7',
                      padding: '10px',
                      borderRadius: '6px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <label style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
                      New Date:
                    </label>
                    <input
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />

                    <label style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
                      New Slot:
                    </label>
                    <select
                      value={newTimeSlot}
                      onChange={(e) => setNewTimeSlot(e.target.value)}
                      style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                    </select>

                    <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                      <button
                        onClick={() => handleSaveReschedule(app.id)}
                        style={{
                          flex: 1,
                          padding: '6px',
                          background: '#2e7d32',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        style={{
                          flex: 1,
                          padding: '6px',
                          background: '#777',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => handleStartReschedule(app)}
                      style={{
                        padding: '8px 14px',
                        background: '#008080',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                    >
                      Reschedule
                    </button>
                    <button
                      onClick={() => handleCancel(app.id)}
                      style={{
                        padding: '8px 14px',
                        background: '#d9534f',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                    >
                      Cancel Appointment
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}