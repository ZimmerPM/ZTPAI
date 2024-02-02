import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/table-styles.css';
import '../css/admin-styles.css';
import '../css/modal-styles.css';
import Header from './Header';

function AdminPanel() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/app/books/');
        setBooks(response.data || []);
      } catch (error) {
        console.error('Error fetching books', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      <Header />
      <div className="admin-panel">
        <div className="admin-head-container">
          <div className="admin-button-container">
            <a href="/usersManagement" className="users-management-link">Zarządzanie użytkownikami</a>
            <button className="add-button">Dodaj pozycję do katalogu</button>
          </div>
          <div className="search-container">
            <input type="text" className="search-input" placeholder="Wyszukaj..."/>
            <button className="search-button">Szukaj</button>
          </div>
        </div>

        <div className="header-container">
          <div className="empty-field"></div>
          <table className="catalog-table" id="admin-catalog">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tytuł</th>
                <th>Autorzy</th>
                <th>Rok wydania</th>
                <th>Gatunek</th>
                <th>ISBN</th>
                <th>Liczba dostępnych egzemplarzy</th>
                <th>Akcja</th>
              </tr>
            </thead>
          </table>
        </div>

        <div className="books-container">
          {books.map((book, index) => (
            <div className="book-entry" key={book.id}>
              <div className="book-cover">
                <img src={book.image} alt={book.title} />
              </div>
              <table className="catalog-table">
                <tbody>
                  <tr className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.authors.join(', ')}</td>
                    <td>{book.publicationYear}</td>
                    <td>{book.genre}</td>
                    <td>{book.isbn}</td>
                    <td>{book.stock}</td>
                    <td>
                      <div className="btn-container">
                        <button className="edit-btn">Edytuj</button>
                        <button className="delete-btn">Usuń</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AdminPanel;
