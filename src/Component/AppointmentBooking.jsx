import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addAppointment } from '../redux/appointmentSlice';

export function AppointmentBooking() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Retrieve selected date passed from previous step (or default to today)
  const selectedDate = location.state?.selectedDate || new Date().toISOString().split('T')[0];

  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [timeSlot, setTimeSlot] = useState('09:00 AM');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientName || !phoneNumber) {
      alert('Please fill in all details.');
      return;
    }

    const newAppointment = {
      id: Date.now(),
      doctorId: doctorId || '1',
      patientName,
      phoneNumber,
      date: selectedDate,
      timeSlot,
      status: 'Confirmed'
    };

    dispatch(addAppointment(newAppointment));
    alert('Appointment Booked Successfully!');
    navigate('/appointments');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '30px', background: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', color: '#333' }}>
      <h2 style={{ color: '#008080', marginTop: 0, textAlign: 'center' }}>Book Appointment Slot</h2>
      
      <div style={{ background: '#e6f2f2', padding: '12px', borderRadius: '6px', marginBottom: '20px', fontSize: '0.95rem' }}>
        <p style={{ margin: '4px 0' }}><strong>Doctor ID:</strong> {doctorId || 'Selected Specialist'}</p>
        <p style={{ margin: '4px 0' }}><strong>Selected Date:</strong> {selectedDate}</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Patient Full Name:</label>
          <input 
            type="text" 
            placeholder="Enter your full name" 
            value={patientName} 
            onChange={(e) => setPatientName(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Phone Number:</label>
          <input 
            type="tel" 
            placeholder="Enter 10-digit phone number" 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Select Time Slot:</label>
          <select 
            value={timeSlot} 
            onChange={(e) => setTimeSlot(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          >
            <option value="09:00 AM">09:00 AM - 10:00 AM</option>
            <option value="11:00 AM">11:00 AM - 12:00 PM</option>
            <option value="02:00 PM">02:00 PM - 03:00 PM</option>
            <option value="04:00 PM">04:00 PM - 05:00 PM</option>
          </select>
        </div>

        <button 
          type="submit" 
          style={{ marginTop: '10px', padding: '12px', background: '#008080', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}
        >
          Confirm & Book Slot
        </button>
      </form>
    </div>
  );
}