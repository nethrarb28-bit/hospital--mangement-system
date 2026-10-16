import { useState } from 'react';

export function useAppointments() {
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('mediPulse_appointments');
    return saved ? JSON.parse(saved) : [];
  });

  const addAppointment = (appointmentData) => {
    const newAppointments = [...appointments, { id: Date.now(), ...appointmentData, status: 'Confirmed' }];
    setAppointments(newAppointments);
    localStorage.setItem('mediPulse_appointments', JSON.stringify(newAppointments));
  };

  const cancelAppointment = (id) => {
    const updated = appointments.map(a => a.id === id ? { ...a, status: 'Cancelled' } : a);
    setAppointments(updated);
    localStorage.setItem('mediPulse_appointments', JSON.stringify(updated));
  };

  return {
    appointments,
    addAppointment,
    cancelAppointment,
  };
}