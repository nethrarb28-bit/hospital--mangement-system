import React from 'react';
import { useAppointmentContext } from './AppointmentContext';

export default function FilterPanel() {
  const { specialties = [], specialtyFilter, setSpecialtyFilter, searchTerm, setSearchTerm } = useAppointmentContext();

  return (
    <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      {/* Search Input */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '5px' }}>Search Doctor:</label>
        <input 
          type="text" 
          placeholder="Search by doctor name or qualification..." 
          value={searchTerm || ''} 
          onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.9rem' }}
        />
      </div>

      {/* Specialty Filter Buttons */}
      <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '8px' }}>Filter Specialty:</label>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setSpecialtyFilter('All')} 
          style={{ padding: '6px 14px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: specialtyFilter === 'All' ? '#138496' : '#e9ecef', color: specialtyFilter === 'All' ? '#fff' : '#000' }}
        >
          All
        </button>
        {specialties.map((specialty) => (
          <button 
            key={specialty} 
            onClick={() => setSpecialtyFilter(specialty)}
            style={{ padding: '6px 14px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: specialtyFilter === specialty ? '#138496' : '#e9ecef', color: specialtyFilter === specialty ? '#fff' : '#000' }}
          >
            {specialty}
          </button>
        ))}
      </div>
    </div>
  );
}