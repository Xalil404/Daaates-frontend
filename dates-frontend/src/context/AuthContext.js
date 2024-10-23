// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API calls

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/profile/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Use the access token stored in local storage
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
