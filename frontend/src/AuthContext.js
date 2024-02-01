import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const tokenResponse = await axios.post('http://localhost:8000/token/', { username: email, password });
      if (tokenResponse.data.access) {
        // Przechowywanie tokenów w localStorage
        localStorage.setItem('access_token', tokenResponse.data.access);
        localStorage.setItem('refresh_token', tokenResponse.data.refresh);
        // Ustawienie nagłówka autoryzacji
        axios.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.access}`;

        // Pobieranie informacji o użytkowniku
        const userResponse = await axios.get('http://localhost:8000/get_user_info/', {
          headers: {
            Authorization: `Bearer ${tokenResponse.data.access}`
          }
        });

        // Ustawienie stanu użytkownika w kontekście
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
      throw error; // Rzucenie wyjątku lub zwrócenie błędu
    }
  };

  const logout = () => {
    setUser(null);
    // Usuń tokeny z localStorage i nagłówki autoryzacji
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