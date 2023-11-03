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

        if(password !== confirmPassword) {
            setMessages(["Hasła się nie zgadzają."]);
            return;
        }

        try {
            const response = await axios.post('/api/register/', {
                name,
                lastname,
                email,
                password
            });
            if (response.data.status === 'success') {
                // Redirect to login or dashboard as appropriate
                window.location.href = '/login';
            } else {
                setMessages([response.data.message]);
            }
        } catch (error) {
            setMessages(["Błąd podczas rejestracji. Spróbuj ponownie."]);
        }
    };

    return (
        <div className="register-container">
            <img className="logo" src={logo} alt="combination mark logo" />
            <form onSubmit={handleSubmit}>
                <div className="messages">
                    {messages.map((message, index) => (
                        <div key={index}>{message}</div>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="imię"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="nazwisko"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="hasło"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="potwierdź hasło"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">zarejestruj</button>
            </form>
        </div>
    );
}

export default Register;
