// src/components/Profile.js
import React from 'react';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching user data
  }

  return (
    <div>
      <h1>Profile Page</h1>
      {user ? <p>Welcome, {user.username || user.email}!</p> : <p>Please log in.</p>}
    </div>
  );
}

export default Profile;
