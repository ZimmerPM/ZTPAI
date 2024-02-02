import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/table-styles.css';
import '../css/admin-styles.css';
import '../css/modal-styles.css';
import Header from './Header';

function AdminPanel() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/app/books/');
        setBooks(response.data || []);
        setFilteredBooks(response.data || []);
      } catch (error) {
        console.error('Error fetching books', error);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = () => {
    if (searchTerm === '') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(book => {
        const titleMatch = book.title ? book.title.toLowerCase().includes(searchTerm.toLowerCase()) : false;
        const authorsMatch = book.authors ? book.authors.some(author => author && author.toLowerCase().includes(searchTerm.toLowerCase())) : false;
        const genreMatch = book.genre ? book.genre.toLowerCase().includes(searchTerm.toLowerCase()) : false;
        const isbnMatch = book.isbn ? book.isbn.includes(searchTerm) : false;
        return titleMatch || authorsMatch || genreMatch || isbnMatch;
      });
      setFilteredBooks(filtered);
    }
  };

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
            <input
              type="text"
              className="search-input"
              placeholder="Wyszukaj..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter') { handleSearch(); } }}
            />
            <button className="search-button" onClick={handleSearch}>Szukaj</button>
          </div>
        </div>

        <div className="books-container">
          {filteredBooks.map((book, index) => (
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
