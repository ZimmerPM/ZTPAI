import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/table-styles.css';
import '../css/modal-styles.css';
import Header from './Header'; // Zakładając, że komponent nagłówka nazywa się Header

function Loans() {
    const [loans, setLoans] = useState([]);
    const [role, setRole] = useState(''); // Załóżmy, że role są przechowywane i zarządzane w stanie
    const [showReturnModal, setShowReturnModal] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState(null);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await axios.get('/api/loans');
                setLoans(response.data || []);
                // Tutaj ustawić role użytkownika, np. z local storage czy API
                setRole('admin'); // Przykład
            } catch (error) {
                console.error('Error fetching loans', error);
            }
        };

        fetchLoans();
    }, []);

    const handleReturn = (loan) => {
        setSelectedLoan(loan);
        setShowReturnModal(true);
    };

    const confirmReturn = async () => {
        // Implement returning functionality
        setShowReturnModal(false);
    };

    const cancelReturn = () => {
        setShowReturnModal(false);
    };

    return (
        <>
            <Header />
            <div className="loans-container">
                <table className="loans-table">
                    <thead>
                        <tr>
                            <th>ID Wypożyczenia</th>
                            <th>Tytuł Książki</th>
                            <th>Data Wypożyczenia</th>
                            <th>Data Zwrotu</th>
                            {/* Dodatkowe nagłówki dla admina */}
                            {role === 'admin' && <th>Akcje</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {loans.map((loan) => (
                            <tr key={loan.id}>
                                <td>{loan.id}</td>
                                <td>{loan.bookTitle}</td>
                                <td>{loan.loanDate}</td>
                                <td>{loan.returnDate}</td>
                                {/* Dodatkowe akcje dla admina */}
                                {role === 'admin' && (
                                    <td>
                                        <button onClick={() => handleReturn(loan)}>Zwróć</button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showReturnModal && (
                <div id="returnModal" className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={cancelReturn}>&times;</span>
                        <p>Czy na pewno chcesz zwrócić książkę "{selectedLoan?.bookTitle}"?</p>
                        <div className="return-confirmation">
                            <button onClick={confirmReturn}>Potwierdź zwrot</button>
                            <button onClick={cancelReturn}>Anuluj</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Loans;
