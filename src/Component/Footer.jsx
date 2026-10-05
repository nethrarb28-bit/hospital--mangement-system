import React from 'react';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#008080',
        color: '#ffffff',
        textAlign: 'center',
        padding: '15px 0',
        marginTop: '40px',
        width: '100%',
      }}
    >
      <p style={{ margin: 0, fontSize: '0.9rem' }}>
        © {new Date().getFullYear()} MediPulse Hospital. All rights reserved.
      </p>
    </footer>
  );
}