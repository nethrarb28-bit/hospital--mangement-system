import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/appointmentSlice';

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (isRegistering && !name)) {
      alert('Please fill out all required fields.');
      return;
    }

    if (isRegistering) {
      alert('Account registered successfully! You can now sign in.');
      setIsRegistering(false);
    } else {
      dispatch(loginUser({ email, password }));
      alert('Authentication successful! Token stored and attached to API headers.');
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ maxWidth: '420px', margin: '60px auto', padding: '35px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
      <h2 style={{ color: '#008080', marginBottom: '25px', textAlign: 'center' }}>
        {isRegistering ? 'Create an Account' : 'Sign In (Protected API)'}
      </h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {isRegistering && (
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '500' }}>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
        )}

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '500' }}>Email Address</label>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '500' }}>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <button
          type="submit"
          style={{ marginTop: '10px', padding: '12px', background: '#008080', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
        >
          {isRegistering ? 'Register' : 'Login & Generate Token'}
        </button>
      </form>

      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
        {isRegistering ? (
          <p>
            Already have an account?{' '}
            <span
              onClick={() => setIsRegistering(false)}
              style={{ color: '#008080', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Sign In
            </span>
          </p>
        ) : (
          <p>
            Don't have an account?{' '}
            <span
              onClick={() => setIsRegistering(true)}
              style={{ color: '#008080', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Create one
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;