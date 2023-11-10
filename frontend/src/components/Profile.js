import React, { useState } from 'react';
import '../css/style.css';
import '../css/modal-styles.css';
import Header from './Header'; // Zakładając, że komponent nagłówka nazywa się Header i został odpowiednio zaimplementowany

function Profile() {
    const [user, setUser] = useState({
        // Dane użytkownika powinny być pobierane z kontekstu aplikacji lub API
        name: 'Imię',
        lastname: 'Nazwisko',
        email: 'email@example.com',
        role: 'czytelnik' // lub 'admin'
    });
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);

    const handlePasswordChangeSubmit = (e) => {
        e.preventDefault();
        // Logika zmiany hasła
    };

    return (
        <>
            <Header />
            <div className="profile-container">
                <span className="profile-name">{user.name} {user.lastname}</span>
                <span className="profile-role">{user.role === 'admin' ? 'administrator' : 'czytelnik'}</span>
                <p className="profile-info">
                    <span>E-mail: {user.email}</span>
                </p>
                <div className="button-container">
                    <button onClick={() => setPasswordModalVisible(true)}>Zmień hasło</button>
                </div>

                {passwordModalVisible && (
                    <section id="passwordModal">
                        <div className="modal-content">
                            <span className="close-button" onClick={() => setPasswordModalVisible(false)}>&times;</span>
                            <h2>Zmień hasło</h2>
                            <div className="modal-messageBox"></div>
                            <form id="changePasswordForm" onSubmit={handlePasswordChangeSubmit}>
                                <input type="password" id="currentPassword" name="currentPassword" placeholder="Aktualne hasło" required />
                                <span className="error" id="currentPasswordError"></span>
                                <input type="password" id="newPassword" name="newPassword" placeholder="Nowe hasło" required />
                                <span className="error" id="newPasswordError"></span>
                                <input type="password" id="repeatPassword" name="repeatPassword" placeholder="Powtórz nowe hasło" required />
                                <span className="error" id="repeatPasswordError"></span>
                                <button type="submit" id="changePasswordSubmit">Zatwierdź</button>
                            </form>
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}

export default Profile;
