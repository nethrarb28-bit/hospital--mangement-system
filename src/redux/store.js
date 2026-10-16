import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from './appointmentSlice'; // <-- Fix the filename here
import { appointmentLoggerMiddleware } from './middleware';

export const store = configureStore({
  reducer: {
    appointments: appointmentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appointmentLoggerMiddleware),
});