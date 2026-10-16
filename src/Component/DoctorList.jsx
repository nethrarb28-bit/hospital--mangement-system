import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorsAndAvailability, setSelectedDate } from "../redux/appointmentSlice";
import { useNavigate } from "react-router-dom";

export function DoctorList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { doctors, selectedDate, loading, error } = useSelector((state) => state.appointments);

  useEffect(() => {
    if (doctors.length === 0) {
      dispatch(fetchDoctorsAndAvailability());
    }
  }, [dispatch, doctors.length]);

  const handleBookClick = (doctorId) => {
    navigate(`/book/${doctorId}`);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <h2 style={{ color: '#008080', marginBottom: '20px' }}>Our Doctors & Availability (Redux Store)</h2>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '15px', alignItems: 'center' }}>
        <label style={{ fontWeight: '500' }}>Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => dispatch(setSelectedDate(e.target.value))}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      {loading && <p style={{ color: '#008080' }}>Loading doctors from REST API...</p>}
      {error && <p style={{ color: 'red' }}>Error loading doctors: {error}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
        {doctors.map((doc) => (
          <div key={doc.id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '6px', background: '#fafafa', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 5px 0', color: '#008080' }}>{doc.name}</h3>
            <p style={{ margin: '3px 0', color: '#666', fontWeight: 'bold' }}>{doc.specialty}</p>
            <p style={{ margin: '3px 0 15px 0', fontSize: '0.85rem', color: '#555' }}>Email: {doc.email}</p>
            
            <div style={{ marginBottom: '15px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '500', display: 'block', marginBottom: '5px' }}>Available Slots:</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {doc.availableSlots?.map((slot, idx) => (
                  <span key={idx} style={{ background: '#e0f2f1', color: '#00695c', padding: '3px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>
                    {slot}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleBookClick(doc.id)}
              style={{ width: '100%', padding: '10px', background: '#008080', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Proceed to Book Slot
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorList;