import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // d) Fetch individual doctor details dynamically & c) Retrieve available slots via async API call
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        setLoading(true);
        // Fetch specific doctor info
        const docResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!docResponse.ok) throw new Error('Could not fetch doctor profile.');
        const docData = await docResponse.json();

        setDoctor({
          id: docData.id,
          name: `Dr. ${docData.name}`,
          specialty: id % 2 === 0 ? 'Cardiologist' : 'Dermatologist',
          email: docData.email,
          phone: docData.phone,
        });

        // Mocking API fetch for available dates and time slots (c)
        setSlots(['09:00 AM', '10:30 AM', '02:00 PM', '04:00 PM']);
        setSelectedDate(new Date().toISOString().split('T')[0]);
        
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', padding: '40px' }}>Loading doctor profile...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '25px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #ddd' }}>
      <h2 style={{ color: '#008080' }}>{doctor.name}</h2>
      <p style={{ fontWeight: 'bold', color: '#555' }}>Specialty: {doctor.specialty}</p>
      <p>Email: {doctor.email}</p>
      <p>Phone: {doctor.phone}</p>

      <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #eee' }} />

      <h3>Available Time Slots</h3>
      <div style={{ display: 'flex', gap: '10px', margin: '15px 0', flexWrap: 'wrap' }}>
        {slots.map((slot, index) => (
          <button
            key={index}
            onClick={() => setSelectedSlot(slot)}
            style={{
              padding: '10px 15px',
              backgroundColor: selectedSlot === slot ? '#008080' : '#f0f0f0',
              color: selectedSlot === slot ? '#fff' : '#333',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {slot}
          </button>
        ))}
      </div>

      <button
        onClick={() => navigate('/book-appointment', { state: { doctorId: doctor.id, doctorName: doctor.name, slot: selectedSlot, date: selectedDate } })}
        disabled={!selectedSlot}
        style={{
          width: '100%',
          padding: '12px',
          marginTop: '20px',
          backgroundColor: selectedSlot ? '#008080' : '#ccc',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          fontWeight: 'bold',
          cursor: selectedSlot ? 'pointer' : 'not-allowed',
        }}
      >
        Proceed to Book Appointment
      </button>
    </div>
  );
}