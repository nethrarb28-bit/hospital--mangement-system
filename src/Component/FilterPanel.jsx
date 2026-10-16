import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppointmentContext } from './AppointmentContext';
import FilterPanel from './FilterPanel'; // Import your filter panel

export default function DoctorList() {
  const { filteredDoctors } = useAppointmentContext(); // Use filtered doctors from context
  const navigate = useNavigate();

  const handleBookNow = (doctorId) => {
    navigate('/login', { state: { doctorId } });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2>Specialist Doctors Directory</h2>

      {/* Render the FilterPanel component */}
      <FilterPanel />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
        }}
      >
        {filteredDoctors.length === 0 ? (
          <p>No doctors found matching your search or filter criteria.</p>
        ) : (
          filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              }}
            >
              <span
                style={{
                  fontSize: '0.75rem',
                  backgroundColor: '#e6f2f2',
                  color: '#008080',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                }}
              >
                ID: #{doc.id}
              </span>
              <h3 style={{ margin: '8px 0 5px 0', color: '#008080' }}>{doc.name}</h3>
              <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#555' }}>
                {doc.specialty}
              </p>
              <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#777' }}>
                Qual: {doc.qualification}
              </p>
              <p style={{ margin: '0 0 15px 0', fontSize: '0.9rem', color: '#f39c12' }}>
                Rating: {doc.rating} ★
              </p>

              <div style={{ display: 'flex', gap: '10px' }}>
                <Link
                  to={`/doctor/${doc.id}`}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '8px',
                    backgroundColor: '#e6f2f2',
                    color: '#008080',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                  }}
                >
                  View Profile
                </Link>
                <button
                  onClick={() => handleBookNow(doc.id)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    backgroundColor: '#008080',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}