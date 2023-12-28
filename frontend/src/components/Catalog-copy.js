import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/table-styles.css';
import '../css/modal-styles.css';
import Header from './Header';
import AddBookModal from './AddBookModal'; // Załóżmy, że ten komponent istnieje

function CatalogCopy() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [addBookModalVisible, setAddBookModalVisible] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

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

    const handleSearch = () => {
        // Implementacja funkcji wyszukiwania
    };

    const handleReserve = (book) => {
        setSelectedBook(book);
        setModalVisible(true);
    };

    const confirmReserve = async () => {
        // Wysłanie żądania rezerwacji do serwera
        setModalVisible(false);
    };

    const cancelReserve = () => {
        setModalVisible(false);
    };

    const openAddBookModal = () => {
        setAddBookModalVisible(true);
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
                <button onClick={openAddBookModal}>Dodaj Książkę</button>
                <table className="catalog-table" id="common-catalog">
                    <thead>
                        <tr>
                            <th>Tytuł</th>
                            <th>Autor</th>
                            <th>Rok wydania</th>
                            <th>Gatunek</th>
                            <th>Dostępność</th>
                            <th>Liczba dostępnych egzemplarzy</th>
                            <th>Akcja</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.publication_year}</td>
                                <td>{book.genre}</td>
                                <td>{book.availability ? 'Dostępna' : 'Niedostępna'}</td>
                                <td>{book.stock}</td>
                                <td>
                                    <button
                                        className="borrow-btn"
                                        disabled={!book.availability}
                                        onClick={() => handleReserve(book)}
                                    >
                                        Wypożycz
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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

            {addBookModalVisible && (
                <AddBookModal
                    closeModal={() => setAddBookModalVisible(false)}
                    // Tutaj możesz przekazać dodatkowe propsy, jeśli są potrzebne
                />
            )}
        </>
    );
}

export default CatalogCopy;
