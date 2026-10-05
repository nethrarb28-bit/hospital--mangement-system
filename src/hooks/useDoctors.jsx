import { useState, useMemo } from 'react';
const INITIAL_DOCTORS = [
  {
    id: 101,
    name: 'Dr. John Doe',
    specialty: 'Cardiology',
    qualification: 'MD, FACC',
    experience: 10,
    fee: 100,
    rating: 4.8,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    availableSlots: ['09:00 AM', '10:30 AM', '02:00 PM'],
  },
  {
    id: 102,
    name: 'Dr. Jane Smith',
    specialty: 'Dermatology',
    qualification: 'MBBS, MD',
    experience: 6,
    fee: 80,
    rating: 4.5,
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    availableSlots: ['10:00 AM', '01:30 PM', '04:00 PM'],
  },
  {
    id: 103,
    name: 'Dr. Alex Adams',
    specialty: 'Cardiology',
    qualification: 'MD, DM',
    experience: 12,
    fee: 120,
    rating: 4.9,
    availableDays: ['Monday', 'Tuesday', 'Thursday'],
    availableSlots: ['11:00 AM', '03:00 PM', '05:30 PM'],
  },
  {
    id: 104,
    name: 'Dr. Sarah Connor',
    specialty: 'Pediatrics',
    qualification: 'MD (Pediatrics)',
    experience: 8,
    fee: 90,
    rating: 4.6,
    availableDays: ['Wednesday', 'Friday', 'Saturday'],
    availableSlots: ['09:30 AM', '12:00 PM', '03:30 PM'],
  },
];
export const useDoctors = () => {
  const [doctors] = useState(INITIAL_DOCTORS);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('All');
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        doc.name.toLowerCase().includes(term) ||
        doc.specialty.toLowerCase().includes(term) ||
        doc.qualification.toLowerCase().includes(term);
      const matchesSpecialty =
        specialtyFilter === 'All' || doc.specialty === specialtyFilter;
      return matchesSearch && matchesSpecialty;
    });
  }, [doctors, searchTerm, specialtyFilter]);
  const specialties = useMemo(() => {
    return Array.from(new Set(doctors.map((d) => d.specialty)));
  }, [doctors]);
return {
    doctors,
    filteredDoctors,
    specialties,
    searchTerm,
    setSearchTerm,
    specialtyFilter,
    setSpecialtyFilter,
  };
};