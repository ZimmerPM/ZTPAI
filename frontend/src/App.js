import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Catalog from './components/Catalog';
import CatalogCopy from './components/Catalog-copy';
import AdminPanel from './components/Admin-panel';
import Loans from './components/Loans';
import LoansArchive from './components/Loans-archive';
import Profile from './components/Profile';
import Reservations from "./components/Reservations";
import UsersManagement from "./components/Users-management";


function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get('http://localhost:8000/api_test/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error("Błąd podczas pobierania danych:", error);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/api_test" element={<p>{message}</p>} />
          <Route path="/register" element={<Register />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog-copy" element={<CatalogCopy/>} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/loans-archive" element={<LoansArchive />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/users-management" element={<UsersManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
