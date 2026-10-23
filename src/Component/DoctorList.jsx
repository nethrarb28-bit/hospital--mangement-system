// --- UPDATED DOCTOR DATASET WITH QUALIFICATIONS, RATINGS, & FEES ---
const sampleDoctors = [
  { 
    id: '1', 
    name: 'Dr. Sarah Jenkins', 
    qualification: 'MBBS, MD - Cardiology', 
    specialty: 'Cardiologist', 
    experience: '12 years', 
    rating: '4.9 ★ (120 reviews)', 
    fee: '$150', 
    availability: 'Mon - Fri' 
  },
  { 
    id: '2', 
    name: 'Dr. Rajesh Kumar', 
    qualification: 'MBBS, DM - Neurology', 
    specialty: 'Neurologist', 
    experience: '15 years', 
    rating: '4.8 ★ (95 reviews)', 
    fee: '$180', 
    availability: 'Mon - Sat' 
  },
  { 
    id: '3', 
    name: 'Dr. Emily Chen', 
    qualification: 'MBBS, DCH - Pediatrics', 
    specialty: 'Pediatrician', 
    experience: '8 years', 
    rating: '4.9 ★ (150 reviews)', 
    fee: '$120', 
    availability: 'Tue - Sun' 
  },
  { 
    id: '4', 
    name: 'Dr. Michael Brown', 
    qualification: 'MBBS, MS - Orthopedics', 
    specialty: 'Orthopedic', 
    experience: '10 years', 
    rating: '4.7 ★ (80 reviews)', 
    fee: '$140', 
    availability: 'Mon - Fri' 
  }
];

// --- UPDATED DOCTOR LIST COMPONENT ---
export function DoctorList() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <div style={{ maxWidth: '850px', margin: '20px auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
      <h2 style={{ color: '#008080', borderBottom: '2px solid #008080', paddingBottom: '10px' }}>Find a Specialist Doctor</h2>
      
      {/* Date Selection Bar */}
      <div style={{ marginBottom: '20px', background: '#e6f2f2', padding: '15px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label style={{ fontWeight: 'bold', color: '#008080' }}>Select Preferred Date:</label>
        <input 
          type="date" 
          value={selectedDate} 
          onChange={(e) => setSelectedDate(e.target.value)} 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer' }}
        />
      </div>

      {/* Doctors Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {sampleDoctors.map((doc) => (
          <div key={doc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', background: '#fcfcfc', flexWrap: 'wrap', gap: '15px' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <h3 style={{ margin: 0, color: '#333', fontSize: '1.2rem' }}>{doc.name}</h3>
                <span style={{ background: '#e8f5e9', color: '#2e7d32', padding: '4px 10px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                  {doc.rating}
                </span>
              </div>
              
              <p style={{ margin: '3px 0', color: '#008080', fontWeight: 'bold' }}>
                {doc.specialty} — <span style={{ color: '#555', fontWeight: 'normal', fontSize: '0.9rem' }}>{doc.qualification}</span>
              </p>
              
              <div style={{ display: 'flex', gap: '15px', marginTop: '10px', color: '#666', fontSize: '0.9rem', flexWrap: 'wrap' }}>
                <span><strong>Experience:</strong> {doc.experience}</span>
                <span><strong>Fee:</strong> <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>{doc.fee}</span></span>
                <span><strong>Availability:</strong> {doc.availability}</span>
              </div>
            </div>

            <button 
              onClick={() => navigate(`/book/${doc.id}`, { state: { selectedDate } })} 
              style={{ padding: '10px 20px', background: '#008080', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.95rem' }}
            >
              Book Slot
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}