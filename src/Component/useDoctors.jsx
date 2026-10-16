import { useState, useEffect } from 'react';

export function useDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Failed to fetch doctor data.');
        const data = await response.json();
        
        const formattedDoctors = data.map((doc, index) => ({
          id: doc.id,
          name: `Dr. ${doc.name}`,
          specialty: index % 2 === 0 ? 'Cardiologist' : index % 3 === 0 ? 'Dermatologist' : 'Pediatrician',
          location: doc.address.city,
        }));

        setDoctors(formattedDoctors);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return {
    doctors: filteredDoctors,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedSpecialty,
    setSelectedSpecialty,
  };
}