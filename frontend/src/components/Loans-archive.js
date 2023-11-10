import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header'; // Import komponentu Header

// Komponent LoansArchive
const LoansArchive = () => {
  const [archivedLoans, setArchivedLoans] = useState([]);

  useEffect(() => {
    // Zapytanie do API, aby pobrać archiwalne wypożyczenia
    axios.get('/api/loans/archived')
      .then(response => {
        setArchivedLoans(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="loans-archive">
      <Header /> {/* Użycie komponentu Header */}
      <section>
        <div className="archive-reverse-container">
          <a href="/loans" className="archive-reverse-link">Wstecz</a>
        </div>

        <h2>Wypożyczenia archiwalne</h2>
        <table className="loans-table" id="loans-archive-table">
          <thead>
            <tr>
              <th>ID Użytkownika</th>
              <th>Imię i Nazwisko</th>
              <th>ID Egzemplarza</th>
              <th>Tytuł Książki</th>
              <th>Data Wypożyczenia</th>
              <th>Data Zwrotu</th>
            </tr>
          </thead>
          <tbody>
            {archivedLoans.length > 0 ? (
              archivedLoans.map((loan, index) => (
                <tr key={index}>
                  <td>{loan.userId}</td>
                  <td>{loan.userName}</td>
                  <td>{loan.copyId}</td>
                  <td>{loan.title}</td>
                  <td>{loan.borrowedDate}</td>
                  <td>{loan.returnDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-results-message">Tabela archiwalnych wypożyczeń jest pusta</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default LoansArchive;
