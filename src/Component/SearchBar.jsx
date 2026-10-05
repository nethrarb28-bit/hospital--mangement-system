import React from 'react';
const SearchBar = ({ searchTerm, searchRef, onChange }) => {
  return (
    <div className="mb-3">
      <input
        id="doctor-search"
        ref={searchRef}
        value={searchTerm}
        placeholder="Search by doctor name or quality"
        type="text"
        onChange={onChange}
      />
    </div>
  );
};
export default SearchBar;
