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
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    authors: [''],
    publicationYear: '',
    genre: '',
    isbn: '',
    stock: '',
    image: null
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/app/books/');
      setBooks(response.data || []);
      setFilteredBooks(response.data || []);
    } catch (error) {
      console.error('Error fetching books', error);
    }
  };

  const handleSearch = () => {
    if (searchTerm === '') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
        book.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.includes(searchTerm)
      );
      setFilteredBooks(filtered);
    }
  };

  const handleChange = (e, index) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewBook({ ...newBook, image: files[0] });
    } else if (name === "authors") {
      const authors = [...newBook.authors];
      authors[index] = value;
      setNewBook({ ...newBook, authors });
    } else {
      setNewBook({ ...newBook, [name]: value });
    }
  };

  const handleAddAuthor = () => {
    setNewBook({ ...newBook, authors: [...newBook.authors, ''] });
  };

  const handleRemoveAuthor = index => {
    const authors = [...newBook.authors];
    authors.splice(index, 1);
    setNewBook({ ...newBook, authors });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', newBook.title);
    newBook.authors.forEach(author => formData.append('authors', author));
    formData.append('publicationYear', newBook.publicationYear);
    formData.append('genre', newBook.genre);
    formData.append('isbn', newBook.isbn);
    formData.append('stock', newBook.stock);
    if (newBook.image) formData.append('image', newBook.image);

    try {
      const response = await axios.post('http://localhost:8000/app/addBook/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200 || response.status === 201) {
        setShowAddBookModal(false);
        fetchBooks();
      } else {
        console.error('Failed to add book');
      }
    } catch (error) {
      console.error('Error adding book', error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:8000/app/books/delete/${bookId}/`);
      fetchBooks(); // Odśwież listę książek po usunięciu
    } catch (error) {
      console.error('Error deleting book', error);
    }
  };

  return (
    <>
      <Header />
      <div className="admin-panel">
        <div className="admin-head-container">
          <div className="admin-button-container">
            <a href="/usersManagement" className="users-management-link">Zarządzanie użytkownikami</a>
            <button className="add-button" onClick={() => setShowAddBookModal(true)}>Dodaj pozycję do katalogu</button>
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
                         <button className="delete-btn" onClick={() => handleDeleteBook(book.id)}>Usuń</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {showAddBookModal && (
          <div className="modal" id="addBookModal">
            <div className="modal-content">
              <span className="close-button" onClick={() => setShowAddBookModal(false)}>&times;</span>
              <h2>Dodaj nową książkę</h2>
              <form onSubmit={handleSubmit}>
                <input name="title" type="text" placeholder="Tytuł" value={newBook.title} onChange={handleChange} required />
                {newBook.authors.map((author, index) => (
                  <div key={index}>
                    <input name="authors" type="text" placeholder={`Autor ${index + 1}`} value={author} onChange={(e) => handleChange(e, index)} required />
                    {newBook.authors.length > 1 && <button type="button" onClick={() => handleRemoveAuthor(index)}>Usuń autora</button>}
                  </div>
                ))}
                <button type="button" onClick={handleAddAuthor}>Dodaj autora</button>
                <input name="publicationYear" type="text" placeholder="Rok wydania" value={newBook.publicationYear} onChange={handleChange} required />
                <input name="genre" type="text" placeholder="Gatunek" value={newBook.genre} onChange={handleChange} required />
                <input name="isbn" type="text" placeholder="ISBN" value={newBook.isbn} onChange={handleChange} required />
                <input name="stock" type="number" placeholder="Liczba egzemplarzy" value={newBook.stock} onChange={handleChange} required />
                <input name="image" type="file" onChange={handleChange} />
                <button type="submit">Dodaj książkę</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminPanel;