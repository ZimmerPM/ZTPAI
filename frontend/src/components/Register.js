import React, { useState } from 'react';
import axios from 'axios';
import '../css/style.css';
import logo from '../img/logo-with-slogan.svg';

function Register() {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Sprawdzanie, czy hasła się zgadzają
        if(password !== confirmPassword) {
            setMessages(["Hasła się nie zgadzają."]);
            return;
        }

        try {
            // Wysyłanie żądania POST do serwera z odpowiednimi danymi
            const response = await axios.post('http://localhost:8000/register/', {
                first_name: name,
                last_name: lastname,
                email: email,
                password: password,
                password_confirmation: confirmPassword,
            });

            // Obsługa odpowiedzi od serwera
            if (response.data.status === 'success') {
                // Przekierowanie do strony logowania lub dashboardu
                window.location.href = '/';
            } else {
                // Wyświetlanie wiadomości zwrotnej od serwera
                setMessages([response.data.message]);
            }
        } catch (error) {
            // Obsługa błędów, np. problemów z połączeniem
            setMessages(["Błąd podczas rejestracji. Spróbuj ponownie."]);
        }
    };

    return (
        <div className="register-container">
            <img className="logo" src={logo} alt="Logo z hasłem" />
            <form onSubmit={handleSubmit}>
                <div className="messages">
                    {messages.map((message, index) => (
                        <div key={index}>{message}</div>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Imię"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Nazwisko"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />
                <input
                    type="email" // Ustawienie typu na email dla walidacji po stronie klienta
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Hasło"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Potwierdź hasło"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">Zarejestruj</button>
            </form>
        </div>
    );
}

export default Register;