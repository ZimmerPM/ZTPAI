import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/table-styles.css';
import '../css/modal-styles.css';
import Header from './Header'; // Zakładając, że komponent nagłówka nazywa się Header i został odpowiednio zaimplementowany

function Catalog() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('/api/books');
                setBooks(response.data || []);
            } catch (error) {
                console.error('Error fetching books', error);
            }
        };

        fetchBooks();
    }, []);

    const handleSearch = () => {
        // Implement search functionality or filter `books` state based on `searchTerm`
    };

    const handleReserve = (book) => {
        setSelectedBook(book);
        setModalVisible(true);
    };

    const confirmReserve = async () => {
        // Send reservation request to the server
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
                />
                <button className="search-button" onClick={handleSearch}>Szukaj</button>
            </div>

            <div className="header-container">
                <div className="empty-field"></div>
                <table className="catalog-table" id="common-catalog">
                    <thead>
                        <tr>
                            <th>Tytuł</th>
                            <th>Autor</th>
                            <th>Rok wydania</th>
                            <th>Gatunek</th>
                            <th>Dostępność</th>
                            <th>Liczba dostępnych egzemplarzy</th>
                            {/* Render if user is logged in */}
                            <th>Akcja</th>
                        </tr>
                    </thead>
                </table>
            </div>

            <div className="books-container">
                {books.map((book) => (
                    <div className="book-entry" key={book.id} data-id={book.id}>
                        <div className="book-cover">
                            <img src={book.image} alt={book.title} />
                        </div>
                        <table className="catalog-table">
                            <tbody>
                                <tr>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.publicationYear}</td>
                                    <td>{book.genre}</td>
                                    <td>{book.isAvailable ? 'Dostępna' : 'Niedostępna'}</td>
                                    <td>{book.stock}</td>
                                    {/* Render if user is logged in and not admin */}
                                    <td>
                                        <div className="btn-container">
                                            <button
                                                className="borrow-btn"
                                                disabled={!book.isAvailable}
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

            {/* Modal */}
            {modalVisible && (
                <div id="reserveModal" className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={cancelReserve}>&times;</span>
                        <div className="modal-messageBox"></div>
                        <p>Czy na pewno chcesz zarezerwować egzemplarz książki "{selectedBook?.title}" do wypożyczenia?</p>
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
