import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';

function Profile() {
    const [user, setUser] = useState({
        name: '',
        lastname: '',
        email: '',
        role: ''
    });
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
    const [passwordChangeError, setPasswordChangeError] = useState('');

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://localhost:8000/get_user_info/');
                setUser({
                    name: response.data.first_name,
                    lastname: response.data.last_name,
                    email: response.data.username,
                    role: response.data.is_staff ? 'administrator' : 'czytelnik'
                });
            } catch (error) {
                console.error('Error while fetching user information:', error);
            }
        };

        fetchUserInfo();
    }, []);

    const handlePasswordChangeSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== newPasswordConfirmation) {
            setPasswordChangeError("Nowe hasła nie pasują do siebie.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/change_password/', {
                old_password: currentPassword,
                new_password: newPassword
            }, {
                headers: {
                    // Tu powinieneś dodać token JWT lub inny mechanizm autentykacji
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });

            if (response.status === 200) {
                alert('Hasło zostało zmienione.'); // Możesz zamiast tego użyć jakiegoś komponentu UI do wyświetlenia powiadomień
                setPasswordModalVisible(false);
                setCurrentPassword('');
                setNewPassword('');
                setNewPasswordConfirmation('');
                setPasswordChangeError('');
            }
        } catch (error) {
            setPasswordChangeError('Wystąpił błąd podczas zmiany hasła.');
            if (error.response && error.response.data) {
                console.log(error.response.data);
            }
        }
    };

    return (
        <>
            <Header />
            <div className="profile-container">
                <span className="profile-name">{user.name} {user.lastname}</span>
                <span className="profile-role">{user.role}</span>
                <p className="profile-info">
                    E-mail: <span>{user.email}</span>
                </p>
                <div className="button-container">
                    <button className="change-password-button" onClick={() => setPasswordModalVisible(true)}>Zmień hasło</button>
                </div>

                {passwordModalVisible && (
                    <div className="modal" id="passwordModal">
                        <div className="modal-content">
                            <span className="close-button" onClick={() => setPasswordModalVisible(false)}>&times;</span>
                            <h2>Zmień hasło</h2>
                            {passwordChangeError && <div className="modal-messageBox error">{passwordChangeError}</div>}
                            <form onSubmit={handlePasswordChangeSubmit}>
                                <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Aktualne hasło" required />
                                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Nowe hasło" required />
                                <input type="password" value={newPasswordConfirmation} onChange={(e) => setNewPasswordConfirmation(e.target.value)} placeholder="Powtórz nowe hasło" required />
                                <button type="submit" className="change-password-submit">Zatwierdź</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Profile;