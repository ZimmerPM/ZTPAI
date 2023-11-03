import React, { useState } from 'react';
import axios from 'axios';
import '../css/style.css';
import logo from '../img/logo-with-slogan.svg';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/login/', { email, password });
            if (response.data.status === 'success') {
                window.location.href = '/dashboard';
            } else {
                setMessages([response.data.message]);
            }
        } catch (error) {
            setMessages(["Błąd podczas logowania. Spróbuj ponownie."]);
        }
    };

    return (
        <div>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500&display=swap" rel="stylesheet" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

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
                    <a href="/catalog" className="register-link">Przeglądaj katalog jako Gość</a>
                </form>
            </div>
        </div>
    );
}

export default Login;
