import React from 'react';

export default function PatientProfileDetails() {
  const user = JSON.parse(localStorage.getItem('mediPulse_user')) || { patientId: 'PAT-101', email: 'patient@example.com' };

  return (
    <div>
      <h3 style={{ color: '#008080', marginBottom: '15px' }}>Patient Account Details</h3>
      <div style={{ padding: '15px', border: '1px solid #e0e0e0', borderRadius: '6px', backgroundColor: '#f9f9f9' }}>
        <p style={{ margin: '0 0 10px 0' }}><strong>Patient ID:</strong> {user.patientId}</p>
        <p style={{ margin: 0 }}><strong>Email Address:</strong> {user.email}</p>
      </div>
    </div>
  );
}