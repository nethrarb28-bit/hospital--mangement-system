import React from 'react';
import { render as rtlRender, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// Import your hospital components
import DoctorCard from '../Component/DoctorCard';
import DoctorList from '../Component/DoctorList';
import AppointmentBooking from '../Component/AppointmentBooking';
import AppointmentManager from '../Component/AppointmentManager';

// Mock Redux store for tests
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      appointments: (state = { doctors: [], selectedDate: '', loading: false, error: null, ...initialState }) => state
    }
  });
};

// Custom render helper with Redux Provider and Router wrapper
function render(ui, { initialState, store = createTestStore(initialState), ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

const mockDoctor = {
  id: 1,
  name: 'Dr. Leanne Graham',
  specialty: 'Cardiologist',
  availableSlots: ['09:00 AM', '10:30 AM', '02:00 PM']
};

const mockDoctorsList = [
  mockDoctor,
  { id: 2, name: 'Dr. Ervin Howell', specialty: 'Neurologist', availableSlots: ['11:00 AM'] }
];

describe('Hospital Appointment Booking - Experiment 1', () => {

  describe('a) Doctor Cards, Details & Appointment Forms', () => {
    test('renders doctor card and profile details correctly', () => {
      render(<DoctorCard doctor={mockDoctor} />);
      expect(screen.getByText('Dr. Leanne Graham')).toBeInTheDocument();
      expect(screen.getByText(/Cardiologist/i)).toBeInTheDocument();
    });

    test('renders appointment form input fields', () => {
      render(<AppointmentBooking doctor={mockDoctor} />);
      expect(screen.getByLabelText(/Patient Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    });
  });

  describe('b) Doctor Search and Specialty Filtering', () => {
    test('filters doctors by name search', async () => {
      render(<DoctorList />, { initialState: { doctors: mockDoctorsList } });
      const searchInput = screen.getByPlaceholderText(/Search doctor by name/i);
      await userEvent.type(searchInput, 'Leanne');

      expect(screen.getByText('Dr. Leanne Graham')).toBeInTheDocument();
      expect(screen.queryByText('Dr. Ervin Howell')).not.toBeInTheDocument();
    });
  });

  describe('c) Date and Time-Slot Selection', () => {
    test('allows user to select date and time slot', async () => {
      render(<AppointmentBooking doctor={mockDoctor} />);
      
      const dateInput = screen.getByLabelText(/Select Date/i);
      fireEvent.change(dateInput, { target: { value: '2026-11-30' } });
      expect(dateInput.value).toBe('2026-11-30');

      const slotSelect = screen.getByLabelText(/Select Time Slot/i);
      await userEvent.selectOptions(slotSelect, '10:30 AM');
      expect(slotSelect.value).toBe('10:30 AM');
    });
  });

  describe('d) Appointment Booking and Cancellation', () => {
    test('submits appointment successfully', async () => {
      const handleBookMock = jest.fn();
      render(<AppointmentBooking doctor={mockDoctor} onBookAppointment={handleBookMock} />);

      await userEvent.type(screen.getByLabelText(/Patient Name/i), 'Nethra R');
      await userEvent.click(screen.getByRole('button', { name: /Confirm & Book Appointment/i }));

      expect(handleBookMock).toHaveBeenCalledTimes(1);
    });

    test('triggers cancellation handler', async () => {
      const handleCancelMock = jest.fn();
      const mockAppt = { id: 101, doctorName: 'Dr. Leanne Graham', patientName: 'Nethra R' };
      
      render(<AppointmentManager appointments={[mockAppt]} onCancel={handleCancelMock} />);
      await userEvent.click(screen.getByRole('button', { name: /Cancel/i }));

      expect(handleCancelMock).toHaveBeenCalledWith(101);
    });
  });

  describe('e) Loading and Error States', () => {
    test('displays loading state', () => {
      render(<DoctorList />, { initialState: { loading: true, doctors: [] } });
      expect(screen.getByText(/Loading doctors list.../i)).toBeInTheDocument();
    });

    test('displays error state', () => {
      render(<DoctorList />, { initialState: { error: 'Failed to load doctors', doctors: [] } });
      expect(screen.getByText(/Failed to load doctors/i)).toBeInTheDocument();
    });
  });

  describe('f) Core Jest and RTL Framework', () => {
    test('renders components in virtual DOM successfully', () => {
      render(<DoctorCard doctor={mockDoctor} />);
      expect(screen.getByRole('heading')).toBeInTheDocument();
    });
  });

});