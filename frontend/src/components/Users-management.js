import React, { useState, useEffect } from 'react';
import Header from './Header'; // Zakładając, że komponent nagłówka nazywa się Header i został odpowiednio zaimplementowany
import '../css/style.css';
import '../css/modal-styles.css';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Tymczasowa symulacja pobierania danych użytkowników
    setUsers([
      { id: 1, email: 'jan@example.com', name: 'Jan', lastname: 'Kowalski', role: 'user' },
      { id: 2, email: 'anna@example.com', name: 'Anna', lastname: 'Nowak', role: 'admin' },
      // Dodaj więcej użytkowników według potrzeb
    ]);
  }, []);

  // Tymczasowa symulacja edycji użytkownika
  const handleEdit = (userId) => {
    console.log(`Edytowanie użytkownika o ID: ${userId}`);
    // Tutaj logika edycji
  };

  // Tymczasowa symulacja usuwania użytkownika
  const handleDelete = (userId) => {
    console.log(`Usuwanie użytkownika o ID: ${userId}`);
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <>
      <Header />
      <div className="users-management-container">
        <a href="/adminPanel" className="backwards-link">Wstecz</a>
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>E-mail</th>
              <th>Imię i nazwisko</th>
              <th>Rola</th>
              <th>Operacje</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.name} {user.lastname}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleEdit(user.id)}>Edytuj</button>
                  <button onClick={() => handleDelete(user.id)}>Usuń</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersManagement;
