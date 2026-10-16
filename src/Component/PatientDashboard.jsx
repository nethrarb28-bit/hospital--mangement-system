import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export function PatientDashboard() {
  const { appointments, token } = useSelector((state) => state.appointments);

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '30px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <h2 style={{ color: '#008080', marginBottom: '10px' }}>Patient Portal & Dashboard</h2>
      <p style={{ color: '#666', marginBottom: '25px' }}>Manage your profile, view health summaries, and track your active hospital appointments.</p>

      {/* Profile & Token Status Card */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: '#f4f7f6', padding: '20px', borderRadius: '6px', borderLeft: '4px solid #008080' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#008080' }}>Patient Profile</h4>
          <p style={{ margin: '5px 0', fontSize: '0.9rem', color: '#444' }}><strong>Role:</strong> Authenticated Patient</p>
          <p style={{ margin: '5px 0', fontSize: '0.9rem', color: '#444' }}><strong>Status:</strong> Active Session</p>
        </div>
        <div style={{ background: '#f4f7f6', padding: '20px', borderRadius: '6px', borderLeft: '4px solid #f0ad4e' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#d9534f' }}>API Security Token</h4>
          <p style={{ margin: '5px 0', fontSize: '0.8rem', color: '#555', wordBreak: 'break-all' }}>
            <strong>Token:</strong> {token ? token : 'No active token'}
          </p>
        </div>
      </div>

      {/* Active Appointments Section */}
      <h3 style={{ color: '#008080', borderBottom: '2px solid #e0f2f1', paddingBottom: '8px', marginBottom: '15px' }}>
        Your Active Appointments ({appointments.length})
      </h3>

      {appointments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '30px', background: '#fafafa', borderRadius: '6px', border: '1px dashed #ccc' }}>
          <p style={{ color: '#666', marginBottom: '15px' }}>You have no active appointments booked yet.</p>
          <Link to="/doctors" style={{ padding: '10px 20px', background: '#008080', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
            Browse Doctors & Book Now
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {appointments.map((appt) => (
            <div key={appt.id} style={{ border: '1px solid #ddd', padding: '15px 20px', borderRadius: '6px', background: '#f9f9f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: '0 0 5px 0', color: '#008080' }}>{appt.doctorName} ({appt.specialty})</h4>
                <p style={{ margin: '3px 0', fontSize: '0.9rem', color: '#444' }}><strong>Patient:</strong> {appt.patientName}</p>
                <p style={{ margin: '3px 0', fontSize: '0.9rem', color: '#444' }}><strong>Date:</strong> {appt.date} | <strong>Slot:</strong> {appt.timeSlot}</p>
              </div>
              <Link to="/appointments" style={{ padding: '8px 14px', background: '#008080', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                Manage
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PatientDashboard;