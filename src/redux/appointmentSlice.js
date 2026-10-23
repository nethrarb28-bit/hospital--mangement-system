import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appointments: [
    {
      id: 101,
      doctorId: '1',
      doctorName: 'Dr. Sarah Jenkins',
      specialty: 'Cardiologist',
      patientName: 'John Doe',
      phoneNumber: '9876543210',
      date: '2026-10-25',
      timeSlot: '09:00 AM',
      tokenNumber: 'TK-101',
      status: 'Confirmed',
    },
  ],
  isAuthenticated: true,
};

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    addAppointment: (state, action) => {
      const token = `TK-${Math.floor(100 + Math.random() * 900)}`;
      state.appointments.push({
        ...action.payload,
        tokenNumber: token,
      });
    },
    cancelAppointment: (state, action) => {
      state.appointments = state.appointments.filter(
        (app) => app.id !== action.payload
      );
    },
    rescheduleAppointment: (state, action) => {
      const { id, newDate, newTimeSlot } = action.payload;
      const appointment = state.appointments.find((app) => app.id === id);
      if (appointment) {
        appointment.date = newDate;
        appointment.timeSlot = newTimeSlot;
      }
    },
  },
});

export const {
  login,
  logout,
  addAppointment,
  cancelAppointment,
  rescheduleAppointment,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;