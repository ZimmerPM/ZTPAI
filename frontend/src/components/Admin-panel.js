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
  const [showEditBookModal, setShowEditBookModal] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [newBook, setNewBook] = useState({
    title: '',
    authors: [''],
    publicationYear: '',
    genre: '',
    isbn: '',
    stock: '',
    image: null
  });
  const [showAddAuthorModal, setShowAddAuthorModal] = useState(false);
  const [authorName, setAuthorName] = useState('');

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
      book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.authors.some(author => author?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      book.genre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn?.includes(searchTerm)
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


  const handleAddAuthorSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/app/authors/', { name: authorName });
      if (response.status === 201) {
        setShowAddAuthorModal(false);
        setAuthorName('');
        // Możesz dodać odświeżenie listy autorów lub inny sposób na potwierdzenie dodania
      } else {
        console.error('Failed to add author');
      }
    } catch (error) {
      console.error('Error adding author', error);
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
    Object.keys(newBook).forEach(key => {
      if (key === 'authors') {
        newBook[key].forEach(author => formData.append(key, author));
      } else if (key !== 'image' || newBook[key]) {
        formData.append(key, newBook[key]);
      }
    });

    try {
      const url = currentBook ? `http://localhost:8000/app/books/update/${currentBook.id}/` : 'http://localhost:8000/app/addBook/';
      const method = currentBook ? 'put' : 'post';

      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if ([200, 201].includes(response.status)) {
        setShowAddBookModal(false);
        setShowEditBookModal(false);
        fetchBooks();
      } else {
        console.error('Failed to process book');
      }
    } catch (error) {
      console.error('Error processing book', error);
    }
  };

  const handleEditClick = (book) => {
    setCurrentBook(book);
    setNewBook({
      title: book.title,
      authors: book.authors,
      publicationYear: book.publicationYear,
      genre: book.genre,
      isbn: book.isbn,
      stock: book.stock,
      image: null
    });
    setShowEditBookModal(true);
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:8000/app/books/delete/${bookId}/`);
      fetchBooks();
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
            <button className="add-button" onClick={() => { setShowAddBookModal(true); setCurrentBook(null); setNewBook({ title: '', authors: [''], publicationYear: '', genre: '', isbn: '', stock: '', image: null }); }}>Dodaj pozycję do katalogu</button>
             <button className="add-button" onClick={() => setShowAddAuthorModal(true)}>Dodaj autora do bazy</button>
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
                            <th>Liczba dostępnych kopii</th>
                            <th>Akcja</th>
                        </tr>
                    </thead>
                </table>
            </div>

        <div className="books-container">
          {filteredBooks.map((book, index) => (
            <div className="book-entry" key={book.id}>
              <div className="book-cover">
                <img src={book.image} alt={book.title} />
              </div>
              <table className="catalog-table" id="admin-catalog">
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
                        <button className="delete-btn" onClick={() => handleDeleteBook(book.id)}>Usuń</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {showAddAuthorModal && (
          <div className="modal" id="addAuthorModal">
            <div className="modal-content">
              <span className="close-button" onClick={() => setShowAddAuthorModal(false)}>&times;</span>
              <h2>Dodaj nowego autora</h2>
              <form onSubmit={handleAddAuthorSubmit}>
                <input type="text" placeholder="Nazwisko autora" value={authorName} onChange={(e) => setAuthorName(e.target.value)} required />
                <button type="submit">Dodaj autora</button>
              </form>
            </div>
          </div>
        )}
        {showAddBookModal && (
          <div className="modal" id="addBookModal">
            <div className="modal-content">
              <span className="close-button" onClick={() => setShowAddBookModal(false)}>&times;</span>
              <h2>{currentBook ? 'Edytuj książkę' : 'Dodaj nową książkę'}</h2>
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
                <button type="submit">{currentBook ? 'Zaktualizuj książkę' : 'Dodaj książkę'}</button>
              </form>
            </div>
          </div>
        )}

          {showEditBookModal && (
  <div className="modal" id="editBookModal">
    <div className="modal-content">
      <span className="close-button" onClick={() => setShowEditBookModal(false)}>&times;</span>
      <h2>Edytuj książkę</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="Tytuł"
          value={newBook.title}
          onChange={(e) => handleChange(e)}
          required
        />
        {newBook.authors.map((author, index) => (
          <div key={index}>
            <input
              name="authors"
              type="text"
              placeholder={`Autor ${index + 1}`}
              value={author}
              onChange={(e) => handleChange(e, index)}
              required
            />
            <button type="button" onClick={() => handleRemoveAuthor(index)}>
              Usuń autora
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddAuthor}>
          Dodaj kolejnego autora
        </button>
        <input
          name="publicationYear"
          type="text"
          placeholder="Rok wydania"
          value={newBook.publicationYear}
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          name="genre"
          type="text"
          placeholder="Gatunek"
          value={newBook.genre}
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          name="isbn"
          type="text"
          placeholder="ISBN"
          value={newBook.isbn}
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          name="stock"
          type="number"
          placeholder="Liczba egzemplarzy"
          value={newBook.stock}
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          name="image"
          type="file"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Zaktualizuj książkę</button>
      </form>
    </div>
  </div>
)}
      </div>
    </>
  );


}

export default AdminPanel;
