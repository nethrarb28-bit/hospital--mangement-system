import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from './appointmentSlice';

export const store = configureStore({
  reducer: {
    appointments: appointmentReducer,
  },
});