import React, { createContext, useContext } from 'react';
import { useDoctors } from '../hooks/useDoctors';
import { useAppointments } from '../hooks/useAppointments';
export const AppointmentContext = createContext();
export const AppointmentProvider = ({ children }) => {
  const doctorHook = useDoctors();
  const appointmentHook = useAppointments();
return (
    <AppointmentContext.Provider
      value={{
        ...doctorHook,
        ...appointmentHook,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
export const useAppointmentContext = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointmentContext must be used within an AppointmentProvider');
  }
  return context;
};