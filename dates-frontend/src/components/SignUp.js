// src/components/SignUp.js
import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/registration/', {
        email,
        password1,
        password2,
      });
      localStorage.setItem('token', response.data.key);  // Save the token in local storage
      alert('Sign up successful!');
    } catch (err) {
      setError('Error during sign up');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          placeholder="Password"
        />
        <input
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          placeholder="Confirm Password"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
