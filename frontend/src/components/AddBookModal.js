import React, { useState } from 'react';

function AddBookModal({ closeModal }) {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        publicationYear: '',
        genre: '',
        stock: '',
        image: null
    });
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        if (e.target.type === "file") {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const clearForm = () => {
        setFormData({
            title: '',
            author: '',
            publicationYear: '',
            genre: '',
            stock: '',
            image: null
        });
    };

    const areFieldsValid = () => {
        // Ensure all fields are filled and image is selected
        const requiredFieldsFilled = Object.values(formData).every(value => {
            return value !== '' && value !== null;
        });
        return requiredFieldsFilled && formData.image;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!areFieldsValid()) {
            setMessage("Proszę o wypełnienie wszystkich pól!");
            return;
        }

        const formPayload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formPayload.append(key, value);
        });



        try {
            const response = await fetch('http://localhost:8000/app/addBook/', {
                method: 'POST',
                body: formPayload
            });
            const data = await response.json();

            if (data.status === 'success') {
                setMessage(`Sukces: ${data.message}`);
                setIsSubmitted(true);
                clearForm();
                closeModal();
            } else {
                setMessage(`Błąd: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage("Błąd podczas dodawania książki.");
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={closeModal}>&times;</span>
                <div className="modal-messageBox">{message}</div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Tytuł"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="author"
                        placeholder="Autor"
                        value={formData.author}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="publicationYear"
                        placeholder="Rok wydania"
                        value={formData.publicationYear}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="genre"
                        placeholder="Gatunek"
                        value={formData.genre}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="stock"
                        placeholder="Liczba dostępnych egzemplarzy"
                        value={formData.stock}
                        onChange={handleChange}
                    />
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                    />
                    <button type="submit" disabled={isSubmitted}>Dodaj</button>
                </form>
            </div>
        </div>
    );
}

export default AddBookModal;
