import { useState, useEffect, useCallback } from 'react';
export const useAppointments = () => {
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('mediPulse_appointments');
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem('mediPulse_appointments', JSON.stringify(appointments));
  }, [appointments]);
  const addAppointment = useCallback((newAppt) => {
    const record = {
      ...newAppt,
      id: Date.now().toString(),
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };
    setAppointments((prev) => [...prev, record]);
    return record.id;
  }, []);
  const cancelAppointment = useCallback((id) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Cancelled' } : a))
    );
  }, []);
  return {
    appointments,
    addAppointment,
    cancelAppointment,
  };
};