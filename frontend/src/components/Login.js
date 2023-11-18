import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/style.css';
import logo from '../img/logo-with-slogan.svg';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/token/', { username: email, password });

            if (response.data.access) {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
                navigate('/catalog');
            } else {
                setMessages(["Nie udało się zalogować. Spróbuj ponownie."]);
            }
        } catch (error) {
            setMessages(["Błąd podczas logowania. Spróbuj ponownie."]);
        }
    };

    return (
        <div>
            {/* Meta tags and other head elements should be moved to a higher level component like App.js */}
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
