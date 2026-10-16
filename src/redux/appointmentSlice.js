import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

// a) Implement patient authentication using a login API
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      if (email && password) {
        const mockToken = 'mock-jwt-token-sec-998877';
        // b) Store and manage the authentication token
        localStorage.setItem('hospital_auth_token', mockToken);
        return { email, token: mockToken };
      }
      return rejectWithValue('Invalid credentials');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDoctorsAndAvailability = createAsyncThunk(
  'appointments/fetchDoctors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/users');
      return response.data.slice(0, 5).map((doc, idx) => ({
        id: doc.id,
        name: doc.name,
        specialty: idx % 2 === 0 ? 'Cardiologist' : 'Dermatologist',
        email: doc.email,
        phone: doc.phone,
        availableSlots: ['09:00 AM', '10:30 AM', '02:00 PM', '04:00 PM'],
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// d) Protect booking operation
export const bookAppointment = createAsyncThunk(
  'appointments/bookAppointment',
  async (appointmentData, { rejectWithValue }) => {
    try {
      await axiosInstance.post('/posts', appointmentData);
      return { ...appointmentData, id: Date.now() };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// d) Protect rescheduling operation
export const rescheduleAppointment = createAsyncThunk(
  'appointments/rescheduleAppointment',
  async ({ id, newDate, newSlot }, { rejectWithValue }) => {
    try {
      await axiosInstance.patch(`/posts/${id}`, { date: newDate, timeSlot: newSlot });
      return { id, newDate, newSlot };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// d) Protect cancellation operation
export const cancelAppointment = createAsyncThunk(
  'appointments/cancelAppointment',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/posts/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: {
    doctors: [],
    appointments: [],
    token: localStorage.getItem('hospital_auth_token') || null,
    isAuthenticated: !!localStorage.getItem('hospital_auth_token'),
    selectedDate: new Date().toISOString().split('T')[0],
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    // e) Implement logout functionality reducer
    logout: (state) => {
      localStorage.removeItem('hospital_auth_token');
      state.token = null;
      state.isAuthenticated = false;
      state.appointments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(fetchDoctorsAndAvailability.fulfilled, (state, action) => {
        state.doctors = action.payload;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.appointments.push(action.payload);
      })
      .addCase(rescheduleAppointment.fulfilled, (state, action) => {
        const { id, newDate, newSlot } = action.payload;
        const appt = state.appointments.find((a) => a.id === id);
        if (appt) {
          appt.date = newDate;
          appt.timeSlot = newSlot;
        }
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.appointments = state.appointments.filter((a) => a.id !== action.payload);
      });
  },
});

export const { setSelectedDate, logout } = appointmentSlice.actions;
export default appointmentSlice.reducer;