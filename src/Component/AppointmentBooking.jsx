import React, { useState } from 'react';

export default function AppointmentBooking({ doctor = { name: 'Dr. Leanne Graham' }, onBookAppointment }) {
  const [patientName, setPatientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onBookAppointment) {
      onBookAppointment({ patientName, email, phone, date, slot });
    } else {
      alert(`Appointment confirmed with ${doctor.name} for ${patientName} on ${date} at ${slot}!`);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Appointment Booking Form" style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>
      <h2>Book Appointment with {doctor.name}</h2>
      
      <div>
        <label htmlFor="patientName" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Patient Name</label>
        <input 
          id="patientName"
          type="text" 
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          required
          aria-required="true"
          placeholder="Enter full name"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>

      <div>
        <label htmlFor="emailAddress" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email Address</label>
        <input 
          id="emailAddress"
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-required="true"
          placeholder="name@example.com"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>

      <div>
        <label htmlFor="phoneNumber" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone Number</label>
        <input 
          id="phoneNumber"
          type="tel" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          aria-required="true"
          placeholder="10-digit mobile number"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>

      <div>
        <label htmlFor="selectDate" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Select Date</label>
        <input 
          id="selectDate"
          type="date" 
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          aria-required="true"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>

      <div>
        <label htmlFor="selectTimeSlot" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Select Time Slot</label>
        <select 
          id="selectTimeSlot"
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
          required
          aria-required="true"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        >
          <option value="">-- Choose a slot --</option>
          <option value="09:00 AM">09:00 AM</option>
          <option value="10:30 AM">10:30 AM</option>
          <option value="02:00 PM">02:00 PM</option>
        </select>
      </div>
      
      <button 
        type="submit" 
        aria-label="Confirm and Book Appointment"
        style={{
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          padding: '12px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '16px'
        }}
      >
        Confirm & Book Appointment
      </button>
    </form>
  );
}