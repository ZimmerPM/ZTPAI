import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Zaimportuj useAuth
import '../css/style.css';
import logo from '../img/logo-with-slogan.svg';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();
    const { login } = useAuth(); // Użyj useAuth do logowania użytkownika

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessages([]); // Wyczyść błędy przed nową próbą logowania

        try {
            // Użyj funkcji login z AuthContext do logowania użytkownika
            await login(email, password);
            // Przekierowanie do strony katalogu
            navigate('/catalog');
        } catch (error) {
            // W przypadku błędu, wyświetl komunikat
            setMessages(["Nie udało się zalogować. Spróbuj ponownie."]);
            console.error("Błąd logowania:", error);
        }
    };

    return (
        <div className="login-container">
            <img className="logo" src={logo} alt="combination mark logo" />
            <form onSubmit={handleSubmit}>
                <div className="messages">
                    {messages.map((message, index) => <div key={index}>{message}</div>)}
                </div>
                <input
                    type="text"
                    placeholder="e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">zaloguj</button>
                <a href="/register" className="register-link">Nie masz konta? Zarejestruj się!</a>
            </form>
        </div>
    );
}

export default Login;
