import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/table-styles.css';
import '../css/modal-styles.css';
import Header from './Header';
import { useAuth } from '../AuthContext';

function Catalog() {
    const { user } = useAuth();
    const [books, setBooks] = useState([]); // Lista wszystkich książek
    const [filteredBooks, setFilteredBooks] = useState([]); // Lista książek do wyświetlenia po filtracji
    const [searchTerm, setSearchTerm] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

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

    const handleReserve = (book) => {
        setSelectedBook(book);
        setModalVisible(true);
    };

    const confirmReserve = async () => {
        // Logika potwierdzenia rezerwacji książki
        setModalVisible(false);
    };

    const cancelReserve = () => {
        setModalVisible(false);
    };

    return (
        <>
            <Header />
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

            <div className="header-container">
                <div className="empty-field"></div>
                <table className="catalog-table" id="common-catalog">
                    <thead>
                        <tr>
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

            <div className="books-container" id="common-catalog">
                {filteredBooks.map((book) => (
                    <div className="book-entry" key={book.id} data-id={book.id}>
                        <div className="book-cover">
                            <img src={book.image} alt={book.title} />
                        </div>
                        <table className="catalog-table">
                            <tbody>
                                <tr>
                                    <td>{book.title}</td>
                                    <td>{book.authors.join(', ')}</td>
                                    <td>{book.publicationYear}</td>
                                    <td>{book.genre}</td>
                                    <td>{book.isbn}</td>
                                    <td>{book.stock}</td>
                                    <td>
                                        <div className="btn-container">
                                            <button
                                                className="borrow-btn"
                                                disabled={book.stock === 0 || (user && user.isStaff)}
                                                onClick={() => handleReserve(book)}
                                            >
                                                Wypożycz
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>

            {modalVisible && (
                <div id="reserveModal" className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={cancelReserve}>&times;</span>
                        <p>Czy na pewno chcesz zarezerwować egzemplarz książki "{selectedBook?.title}" do wypożyczenia?"</p>
                        <div className="reserve-confirmation">
                            <button id="confirmReserve" onClick={confirmReserve}>Rezerwuj</button>
                            <button id="cancelReserve" onClick={cancelReserve}>Anuluj</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Catalog;