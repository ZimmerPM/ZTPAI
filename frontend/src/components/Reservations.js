import React, { useState, useEffect } from 'react';
import '../css/style.css';
import '../css/table-styles.css';
import '../css/modal-styles.css';
import Header from './Header'; // Zakładając, że Header jest już komponentem React

const Reservations = () => {
  const [role, setRole] = useState('');
  const [reservations, setReservations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    // Załaduj dane użytkownika i rezerwacji
    // setRole(POBIERZ_ROLE_UZYTKOWNIKA);
    // setReservations(POBIERZ_REZERWACJE);
  }, []);

  const handleCancelClick = (reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const confirmCancel = () => {
    // LOGIKA ANULOWANIA REZERWACJI
    setIsModalOpen(false);
  };

  const renderTable = (isAdmin) => (
    <table className="reservations-table">
      <thead>
        <tr>
          {isAdmin && <th>ID Użytkownika</th>}
          {isAdmin && <th>Imię i Nazwisko</th>}
          <th>ID Egzemplarza</th>
          <th>Autor</th>
          <th>Tytuł Książki</th>
          <th>Data Rezerwacji</th>
          <th>Rezerwacja Do</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map(reservation => (
          <tr key={reservation.id}>
            {isAdmin && <td>{reservation.userId}</td>}
            {isAdmin && <td>{reservation.userName}</td>}
            <td>{reservation.copyId}</td>
            <td>{reservation.author}</td>
            <td>{reservation.title}</td>
            <td>{reservation.reservationDate}</td>
            <td>{reservation.reservationEnd}</td>
            <td>
              {isAdmin && <button onClick={() => handleCancelClick(reservation)}>Wypożycz</button>}
              <button onClick={() => handleCancelClick(reservation)}>Anuluj</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="reservations">
      <Header />
      <section>
        {role === 'admin' && <h2>Bieżące rezerwacje</h2>}
        {role === 'admin' && renderTable(true)}
        {role === 'user' && <h2>Twoje rezerwacje</h2>}
        {role === 'user' && renderTable(false)}
      </section>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={() => setIsModalOpen(false)}>&times;</span>
            <p>Czy na pewno chcesz anulować rezerwację książki "{selectedReservation?.title}"?</p>
            <div className="cancel-confirmation">
              <button onClick={confirmCancel}>Tak</button>
              <button onClick={() => setIsModalOpen(false)}>Cofnij</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservations;
