import React, { useState, lazy, Suspense } from 'react';
import { Routes, Route, Link, Navigate, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, addAppointment, cancelAppointment, rescheduleAppointment } from './redux/appointmentSlice';

// --- MOCK DOCTOR DATA WITH QUALIFICATIONS, RATINGS & FEES ---
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

// --- 1. HOME COMPONENT ---
function Home() {
  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '40px', background: '#fff', borderRadius: '10px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
      <h1 style={{ color: '#008080', fontSize: '2.2rem', marginBottom: '15px' }}>Welcome to MediPulse Specialty Hospital</h1>
      <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '30px' }}>Schedule appointments with top specialist doctors quickly and manage your tokens online.</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
        <Link to="/doctors" style={{ padding: '12px 24px', backgroundColor: '#008080', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold' }}>Find a Doctor</Link>
        <Link to="/dashboard" style={{ padding: '12px 24px', border: '1px solid #008080', color: '#008080', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold' }}>Patient Dashboard</Link>
      </div>
    </div>
  );
}

// --- 2. DOCTOR LIST COMPONENT ---
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

// --- 3. APPOINTMENT BOOKING FORM COMPONENT ---
export function AppointmentBooking() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const selectedDate = location.state?.selectedDate || new Date().toISOString().split('T')[0];
  const doctor = sampleDoctors.find((d) => d.id === doctorId) || { name: 'Dr. Specialist', specialty: 'General' };

  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [timeSlot, setTimeSlot] = useState('09:00 AM');

  // Handle phone input: digits only, max 10
  const handlePhoneChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(numericValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientName.trim()) {
      alert('Please enter patient full name.');
      return;
    }
    if (phoneNumber.length !== 10) {
      alert('Phone number must be exactly 10 digits.');
      return;
    }

    const newAppointment = {
      id: Date.now(),
      doctorId,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      patientName,
      phoneNumber,
      date: selectedDate,
      timeSlot,
      status: 'Confirmed'
    };

    dispatch(addAppointment(newAppointment));
    alert('Appointment Booked Successfully!');
    navigate('/dashboard');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '30px auto', padding: '30px', background: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#008080', marginTop: 0, textAlign: 'center' }}>Book Appointment Slot</h2>
      
      <div style={{ background: '#e6f2f2', padding: '12px', borderRadius: '6px', marginBottom: '20px', fontSize: '0.95rem' }}>
        <p style={{ margin: '4px 0' }}><strong>Doctor:</strong> {doctor.name} ({doctor.specialty})</p>
        <p style={{ margin: '4px 0' }}><strong>Selected Date:</strong> {selectedDate}</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Patient Full Name:</label>
          <input 
            type="text" 
            placeholder="Enter full name" 
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
            onChange={handlePhoneChange} 
            maxLength="10"
            required 
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
          <small style={{ color: phoneNumber.length === 10 ? '#2e7d32' : '#666', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
            {phoneNumber.length}/10 digits entered
          </small>
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

        <button type="submit" style={{ marginTop: '10px', padding: '12px', background: '#008080', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>
          Confirm & Book Slot
        </button>
      </form>
    </div>
  );
}

// --- 4. PATIENT DASHBOARD COMPONENT ---
export function PatientDashboard() {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments.appointments);

  const [editingId, setEditingId] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTimeSlot, setNewTimeSlot] = useState('09:00 AM');

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
    dispatch(rescheduleAppointment({ id, newDate, newTimeSlot }));
    setEditingId(null);
    alert('Appointment rescheduled successfully!');
  };

  return (
    <div style={{ maxWidth: '900px', margin: '20px auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
      <h2 style={{ color: '#008080', borderBottom: '2px solid #008080', paddingBottom: '10px' }}>Patient Dashboard & Token Status</h2>

      {appointments.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', padding: '30px', fontSize: '1.1rem' }}>No active appointments found.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          {appointments.map((app) => (
            <div key={app.id} style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px', background: '#fcfcfc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ background: '#008080', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                    Token: {app.tokenNumber || `TK-${app.id}`}
                  </span>
                  <span style={{ color: '#2e7d32', fontSize: '0.85rem', fontWeight: 'bold' }}>● {app.status || 'Confirmed'}</span>
                </div>

                <h3 style={{ margin: '5px 0', color: '#333' }}>Patient: {app.patientName}</h3>
                <p style={{ margin: '3px 0', color: '#555' }}><strong>Doctor:</strong> {app.doctorName || 'Dr. Specialist'} ({app.specialty})</p>
                <p style={{ margin: '3px 0', color: '#555' }}><strong>Phone:</strong> {app.phoneNumber}</p>
                <p style={{ margin: '3px 0', color: '#555' }}><strong>Date:</strong> {app.date} | <strong>Time:</strong> {app.timeSlot}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '200px' }}>
                {editingId === app.id ? (
                  <div style={{ background: '#edf7f7', padding: '10px', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>New Date:</label>
                    <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }} />

                    <label style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>New Slot:</label>
                    <select value={newTimeSlot} onChange={(e) => setNewTimeSlot(e.target.value)} style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                    </select>

                    <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                      <button onClick={() => handleSaveReschedule(app.id)} style={{ flex: 1, padding: '6px', background: '#2e7d32', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Save</button>
                      <button onClick={() => setEditingId(null)} style={{ flex: 1, padding: '6px', background: '#777', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <button onClick={() => handleStartReschedule(app)} style={{ padding: '8px 14px', background: '#008080', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Reschedule</button>
                    <button onClick={() => { if(window.confirm('Cancel this appointment?')) dispatch(cancelAppointment(app.id)) }} style={{ padding: '8px 14px', background: '#d9534f', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Cancel Appointment</button>
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

// --- 5. LOGIN / SIGN UP COMPONENT ---
export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      alert('Registration Successful! You can now log in.');
      setIsSignUp(false);
      setPassword('');
      setConfirmPassword('');
    } else {
      dispatch(login());
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '30px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
      <h2 style={{ color: '#008080', marginTop: 0 }}>
        {isSignUp ? 'Patient Portal Sign Up' : 'Patient Portal Login'}
      </h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <input 
          type="text" 
          placeholder="Username or Email" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required 
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} 
        />

        {isSignUp && (
          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required 
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} 
          />
        )}

        <button 
          type="submit" 
          style={{ padding: '10px', background: '#008080', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          {isSignUp ? 'Create Account' : 'Login'}
        </button>
      </form>

      <div style={{ marginTop: '20px', fontSize: '0.9rem', color: '#666' }}>
        {isSignUp ? (
          <p>
            Already have an account?{' '}
            <button 
              onClick={() => setIsSignUp(false)} 
              style={{ background: 'none', border: 'none', color: '#008080', fontWeight: 'bold', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
            >
              Login here
            </button>
          </p>
        ) : (
          <p>
            Don't have an account?{' '}
            <button 
              onClick={() => setIsSignUp(true)} 
              style={{ background: 'none', border: 'none', color: '#008080', fontWeight: 'bold', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
            >
              Sign up
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

// Protected Route Guard
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.appointments);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// --- MAIN APP COMPONENT WITH ROUTING ---
export default function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.appointments);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f4f7f6', minHeight: '100vh', margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <nav style={{ background: '#fff', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 style={{ margin: 0, color: '#008080', fontSize: '1.5rem' }}>MediPulse Hospital</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#333', textDecoration: 'none', fontWeight: '500' }}>Home</Link>
          <Link to="/doctors" style={{ color: '#333', textDecoration: 'none', fontWeight: '500' }}>Doctors</Link>
          <Link to="/dashboard" style={{ color: '#333', textDecoration: 'none', fontWeight: '500' }}>Patient Dashboard</Link>
          {isAuthenticated ? (
            <button onClick={() => dispatch(logout())} style={{ padding: '6px 12px', background: '#d9534f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
          ) : (
            <Link to="/login" style={{ color: '#333', textDecoration: 'none', fontWeight: '500' }}>Login</Link>
          )}
        </div>
      </nav>

      <div style={{ flex: 1, padding: '20px' }}>
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '50px', color: '#008080', fontSize: '1.2rem', fontWeight: 'bold' }}>Loading module...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<DoctorList />} />
            <Route path="/book/:doctorId" element={<ProtectedRoute><AppointmentBooking /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>
      </div>

      <footer style={{ background: '#008080', color: '#fff', textAlign: 'center', padding: '15px', fontSize: '0.9rem' }}>
        © 2026 MediPulse Specialty Hospital. All rights reserved.
      </footer>
    </div>
  );
}