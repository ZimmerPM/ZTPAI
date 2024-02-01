import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        try {
          const userResponse = await axios.get('http://localhost:8000/get_user_info/');
          setUser({
            id: userResponse.data.id,
            username: userResponse.data.username,
            firstName: userResponse.data.first_name,
            lastName: userResponse.data.last_name,
            isStaff: userResponse.data.is_staff,
            token: accessToken,
          });
        } catch (error) {
          // Obsługa błędu, gdy nie można pobrać danych użytkownika
          console.error("Błąd podczas pobierania informacji o użytkowniku:", error);
        }
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const tokenResponse = await axios.post('http://localhost:8000/token/', { username: email, password });
      if (tokenResponse.data.access) {
        localStorage.setItem('access_token', tokenResponse.data.access);
        localStorage.setItem('refresh_token', tokenResponse.data.refresh);
        axios.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.access}`;

        const userResponse = await axios.get('http://localhost:8000/get_user_info/');
        setUser({
          id: userResponse.data.id,
          username: userResponse.data.username,
          firstName: userResponse.data.first_name,
          lastName: userResponse.data.last_name,
          isStaff: userResponse.data.is_staff,
          token: tokenResponse.data.access,
        });
      }
    } catch (error) {
      console.error("Błąd podczas logowania:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
