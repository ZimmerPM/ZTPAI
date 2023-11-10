import React, { useState, useEffect } from 'react';
// Import any additional components or libraries you might need

function AdminPanel() {
  const [books, setBooks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch books from the backend when the component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    // Replace this with your actual backend call
    // Example: const response = await fetch('your-api-endpoint');
    // const books = await response.json();
    // setBooks(books);

    // Placeholder data
    setBooks([
      { id: 1, title: 'Book 1', author: 'Author 1' },
      { id: 2, title: 'Book 2', author: 'Author 2' },
      // ... more books
    ]);
  };

  const handleAddBook = (newBook) => {
    // Logic to add the new book to your backend
    // After successful addition, you can fetch the updated list or
    // simply update the local state to reflect the new book
    setBooks([...books, newBook]);
    setModalVisible(false);
  };

  return (
    <div className="admin-panel">
      <div className="admin-head-container">
        <div className="admin-button-container">
          <a href="/usersManagement" className="users-management-link">Zarządzanie użytkownikami</a>
          <button onClick={() => setModalVisible(true)} className="add-button">Dodaj pozycję do katalogu</button>
        </div>
        <div className="search-container">
          <input type="text" className="search-input" placeholder="Wyszukaj..." />
          <button className="search-button">Szukaj</button>
        </div>
      </div>

      <div className="books-container">
        {books.map(book => (
          <div key={book.id} className="book-entry">
            <p>{book.title} - {book.author}</p>
            {/* More book details */}
          </div>
        ))}
      </div>

      {modalVisible && <AddBookModal onAddBook={handleAddBook} onClose={() => setModalVisible(false)} />}
    </div>
  );
}

function AddBookModal({ onAddBook, onClose }) {
  const [newBook, setNewBook] = useState({ title: '', author: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddBook(newBook);
    setNewBook({ title: '', author: '' });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span onClick={onClose} className="close-button">&times;</span>
        <h2>Dodaj pozycję do katalogu</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            placeholder="Tytuł"
          />
          <input
            type="text"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            placeholder="Autor"
          />
          <button type="submit">Dodaj</button>
        </form>
      </div>
    </div>
  );
}

export default AdminPanel;
