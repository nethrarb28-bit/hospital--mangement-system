import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppointmentContext } from './AppointmentContext';

export default function AppointmentBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctors, addAppointment } = useAppointmentContext();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('mediPulse_isLoggedIn');
    if (!isLoggedIn) {
      alert('Please login to your account before booking an appointment!');
      navigate('/login');
    }
  }, [navigate]);
  const passedDoctorId = location.state?.doctorId || doctors[0]?.id;
  const [step, setStep] = useState(1);
  const [selectedDoctorId, setSelectedDoctorId] = useState(passedDoctorId);
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [patient, setPatient] = useState({ name: '', phone: '', email: '' });
  const [paymentMethod, setPaymentMethod] = useState('Credit/Debit Card');
  const [errors, setErrors] = useState({});

  const selectedDoctor = doctors.find(
    (d) => d.id === parseInt(selectedDoctorId, 10)
  );

  const validateStep = () => {
    let errs = {};
    if (step === 1 && !selectedDoctorId) errs.doctor = 'Please select a doctor.';
    if (step === 2 && !date) errs.date = 'Please select an appointment date.';
    if (step === 3 && !slot) errs.slot = 'Please select a time slot.';
    if (step === 4) {
      if (!patient.name.trim()) errs.name = 'Patient name is required.';
      if (!/^\d{10}$/.test(patient.phone))
        errs.phone = 'Enter a valid 10-digit phone number.';
      if (!/\S+@\S+\.\S+/.test(patient.email))
        errs.email = 'Enter a valid email address.';
    }
    if (step === 5 && !paymentMethod) errs.payment = 'Please select a payment method.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handleFinalBooking = () => {
    if (!validateStep()) return;

    const newAppointmentId = addAppointment({
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      fee: selectedDoctor.fee,
      date,
      slot,
      patientName: patient.name,
      phone: patient.phone,
      email: patient.email,
      paymentMethod,
      paymentStatus: 'Paid',
    });

    alert('Appointment booked successfully!');
    navigate(`/appointment/${newAppointmentId}`);
  };

  return (
    <div
      style={{
        maxWidth: '550px',
        margin: '20px auto',
        padding: '25px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <h2
        style={{
          color: '#008080',
          borderBottom: '2px solid #eee',
          paddingBottom: '10px',
        }}
      >
        Book Appointment
      </h2>

      <p style={{ fontSize: '0.85rem', color: '#666' }}>Step {step} of 6</p>

      {step === 1 && (
        <div>
          <h3>1. Doctor Selected</h3>
          <select
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          >
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} - {d.specialty} (${d.fee})
              </option>
            ))}
          </select>
          {errors.doctor && (
            <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.doctor}</p>
          )}
        </div>
      )}

      {step === 2 && (
        <div>
          <h3>2. Select Date</h3>
          <p>
            Doctor: <strong>{selectedDoctor?.name}</strong> ({selectedDoctor?.specialty})
          </p>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
          {errors.date && (
            <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.date}</p>
          )}
        </div>
      )}

      {step === 3 && (
        <div>
          <h3>3. Select Time Slot</h3>
          <p>Available slots for {date}:</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {selectedDoctor?.availableSlots.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSlot(s)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '4px',
                  border: slot === s ? '2px solid #008080' : '1px solid #ccc',
                  backgroundColor: slot === s ? '#008080' : '#fff',
                  color: slot === s ? '#fff' : '#333',
                  cursor: 'pointer',
                }}
              >
                {s}
              </button>
            ))}
          </div>
          {errors.slot && (
            <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.slot}</p>
          )}
        </div>
      )}

      {step === 4 && (
        <div>
          <h3>4. Patient Details</h3>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Full Name"
              value={patient.name}
              onChange={(e) => setPatient({ ...patient, name: e.target.value })}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
            {errors.name && (
              <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.name}</p>
            )}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="tel"
              placeholder="10-digit Phone Number"
              value={patient.phone}
              onChange={(e) => setPatient({ ...patient, phone: e.target.value })}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
            {errors.phone && (
              <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.phone}</p>
            )}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="email"
              placeholder="Email Address"
              value={patient.email}
              onChange={(e) => setPatient({ ...patient, email: e.target.value })}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
            {errors.email && (
              <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.email}</p>
            )}
          </div>
        </div>
      )}

      {step === 5 && (
        <div>
          <h3>5. Payment Method</h3>
          <p>
            Consultation Fee: <strong>${selectedDoctor?.fee}</strong>
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            {['Credit/Debit Card', 'UPI / GPay', 'Net Banking', 'Cash at Clinic'].map((method) => (
              <label
                key={method}
                style={{
                  padding: '10px',
                  border: paymentMethod === method ? '2px solid #008080' : '1px solid #ccc',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                {method}
              </label>
            ))}
          </div>
          {errors.payment && (
            <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.payment}</p>
          )}
        </div>
      )}

      {step === 6 && (
        <div>
          <h3>6. Appointment Summary</h3>
          <p>
            <strong>Doctor:</strong> {selectedDoctor?.name} ({selectedDoctor?.specialty})
          </p>
          <p>
            <strong>Date & Time:</strong> {date} at {slot}
          </p>
          <p>
            <strong>Patient Name:</strong> {patient.name} ({patient.phone})
          </p>
          <p>
            <strong>Consultation Fee:</strong> ${selectedDoctor?.fee}
          </p>
          <p>
            <strong>Payment Method:</strong> {paymentMethod}
          </p>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        {step > 1 && (
          <button
            onClick={handleBack}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Back
          </button>
        )}
        {step < 6 ? (
          <button
            onClick={handleNext}
            style={{
              padding: '8px 16px',
              backgroundColor: '#008080',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginLeft: 'auto',
            }}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleFinalBooking}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginLeft: 'auto',
            }}
          >
            Confirm & Pay ${selectedDoctor?.fee}
          </button>
        )}
      </div>
    </div>
  );
}